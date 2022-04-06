import { useMoralisQuery, useMoralis } from "react-moralis"
import { useQuery } from "@apollo/client"
import networkMapping from "../constants/networkMapping.json"
import NFTBox from "../components/NFTBox"
import styles from "../styles/Home.module.css"

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    return (
        <div className="container mx-auto">
            <div>Test NFT Cart Carlos</div>
        </div>
    )
}
