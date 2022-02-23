import { Modal, Input } from "web3uikit"

export default function UpdateListingModal({ isVisible, onClose }) {
    const dispatch = useNotification()

    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)

    const handleUpdateListingSuccess = () => {
        dispatch({
            type: "success",
            message: "listing updated",
            title: "Listing updated - please refresh (and move blocks)",
            position: "topR",
        })
        onClose && onClose()
        setPriceToUpdateListingWith("0")
    }

    return (
        <Input
            label="Update listing price in L1 Currency (ETH)"
            name="New listing price"
            type="number"
            onChange={(event) => {
                setPriceToUpdateListingWith(event.target.value)
            }}
        />
    )
}
