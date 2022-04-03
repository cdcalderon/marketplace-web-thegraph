import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    return (
        <div className="container mx-auto">
            <div>Test NFT Cart</div>
            <NFTBox price="123" />
        </div>
    )
}
