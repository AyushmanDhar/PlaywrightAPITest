import { test, expect } from '@playwright/test'
const petData = require("../data/newPet.json")
const petDataNew = require("../data/newPet copy.json")
const fs = require('fs')

test("create, update & delete data", async ({ request }) => {
//create    
    const newPetResponse = await request.post("pet", {
        data: petData
    })
    expect(newPetResponse.status()).toBe(200)
    const newPetResponseJson = await newPetResponse.json();

    const petID = await newPetResponseJson.id
//get
    let getPet = await request.get(`pet/${petID}`)
    let getPetJson = await getPet.json();
    //fs.writeFileSync("../PetStore-API/output/newPet.json", JSON.stringify(getPetJson, null, 2))
    console.log(`Before edit name: ${await newPetResponseJson.name}`)
//update
    const renamePetResponse = await request.put("pet", {
        data: petDataNew
    })
    const updatePetJson = await renamePetResponse.json();
//get
    getPet = await request.get(`pet/${petID}`)
    getPetJson = await getPet.json();
    //fs.writeFileSync("../../output/updatedPet.json", JSON.stringify(getPetJson, null, 2))
    console.log(`After edit name: ${await updatePetJson.name}`)
//delete
    const deletePetResponse = await request.delete(`pet/${await getPetJson.id}`)
    expect(deletePetResponse.status()).toBe(200)
//get
    getPet = await request.get(`pet/${petID}`)
    expect(getPet.status()).toBe(404)

})