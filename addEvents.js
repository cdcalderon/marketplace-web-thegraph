let itemListedOptions = {
    // Moralis understands a local chain is 1337
    chainId: moralisChainId,
    sync_historical: true,
    topic: "ItemListed(address,address,uint256,uint256)",
    address: contractAddress,
    abi: {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "seller",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "nftAddress",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
        ],
        name: "ItemListed",
        type: "event",
    },
    tableName: "ItemListed",
}

const listedResponse = await Moralis.Cloud.run("watchContractEvent", itemListedOptions, {
    useMasterKey: true,
})
const boughtResponse = await Moralis.Cloud.run("watchContractEvent", itemBoughtOptions, {
    useMasterKey: true,
})
const canceledResponse = await Moralis.Cloud.run("watchContractEvent", itemCanceledOptions, {
    useMasterKey: true,
})
