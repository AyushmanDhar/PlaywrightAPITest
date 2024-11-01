import {test, expect} from '@playwright/test'
const petData = require('../data/newPet.json')

let petID;

test.skip('PetStore get API testing', async({request}) =>{

    const pets = await request.get(`pet/findByStatus`,{
        params:{
            'status':'available'
        }
    });
    console.log(await pets.json());
    

})

test("PetStore Post API Test", async({request}) =>{
    const newPetResponse = await request.post(`pet`,{
        data: petData
    })
    console.log(await newPetResponse.json());
    expect(newPetResponse.status()).toBe(200);
    const newPetResponseJson = await newPetResponse.json();
    petID = await newPetResponseJson.id;
})

test('PetStore get pet API', async({request}) =>{
    console.log(petID);
    const pet = await request.get(`pet/${petID}`,{
        
    });
    const petJson = await pet.json();
    console.log(await petJson);
    expect(await petJson.name).toBe("Bamboo");

})