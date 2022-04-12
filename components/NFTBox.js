import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import Image from "next/image"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import UpdateListingModal from "./UpdateListingModal"

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const backChars = Math.floor(charsToShow / 2)
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const separator = "..."
    const seperatorLength = separator.length
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const [imageURI, setImageURI] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [tokenDescription, setTokenDescription] = useState("")
    const [tokenName, setTokenName] = useState("")
    const { isWeb3Enabled, account } = useMoralis()
    const dispatch = useNotification()
    const hideModal = () => setShowModal(false)

    const isOwnedByUser = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 15)

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    const handleCardClick = () => {
        isOwnedByUser
            ? setShowModal(true)
            : buyItem({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleBuyItemSuccess(),
              })
    }

    const handleBuyItemSuccess = () => {
        dispatch({
            type: "success",
            message: "Item bought!",
            title: "Item Bought",
            position: "topR",
        })
    }

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <UpdateListingModal
                            isVisible={showModal}
                            tokenId={tokenId}
                            marketplaceAddress={marketplaceAddress}
                            nftAddress={nftAddress}
                            onClose={hideModal}
                        />
                        <Card
                            title={tokenName}
                            description={tokenDescription}
                            onClick={handleCardClick}
                        >
                            <div className="p-2">
                                <div className="flex flex-col items-end gap-2">
                                    <div>#{tokenId}</div>
                                    <div className="italic text-sm">
                                        Owned by {formattedSellerAddress}
                                    </div>
                                    <Image
                                        loader={() => imageURI}
                                        src={imageURI}
                                        height="200"
                                        width="200"
                                    />
                                    <div className="font-bold">
                                        {ethers.utils.formatUnits(price, "ether")} ETH
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading please wait...</div>
                )}
            </div>
        </div>
    )
}
