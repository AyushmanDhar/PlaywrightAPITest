import {test, expect} from '@playwright/test'
const orderJson = require("../data/newOrder.json")
const fs = require('fs')

test("create & delete order", async({request})=>{
//create
    const createOrderResponse = await request.post("store/order",{
        data : orderJson
    })
    expect(createOrderResponse.status()).toBe(200)
    const createOrderJson = await createOrderResponse.json();
    //fs.writeFileSync("../PetStore-API/output/newPet.json", JSON.stringify(createOrderJson, null, 2))
    const orderID = await createOrderJson.id;
//get
    let getOrderResponse = await request.get(`store/order/${orderID}`)
    expect(getOrderResponse.status()).toBe(200)
//delete
    const deleteOrderResponse = await request.delete(`store/order/${orderID}`)
    expect(deleteOrderResponse.status()).toBe(200)
//get
    getOrderResponse = await request.get(`store/order/${orderID}`)
    expect(getOrderResponse.status()).toBe(404)

})