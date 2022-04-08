import { useQuery, gql } from "@apollo/client"

const GET_MY_TEST_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            buyer
            seller
            nftAddress
        }
    }
`

export default function GraphPage() {
    const { loading, error, data } = useQuery(GET_MY_TEST_ACTIVE_ITEMS)
    console.log(data)
    return <div>hi testing the graph events</div>
}
