import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const [proceeds, setProceeds] = useState("0")
    return (
        <div className={styles.container}>
            {proceeds != "0" ? <div>{proceeds}</div> : <div>No proceeds detected</div>}
        </div>
    )
}
