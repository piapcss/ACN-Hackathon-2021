const { response } = require('express');
const request = require('supertest');
const app = require('./lighthouse');

const link = {
    link: "https://wwww.google.com"
}


test("Should fetch data from lighthouse", async()=>{
    const response = await request(app).post("").send(link)
    expect(response.status).toBe(200);

    
})

jest.setTimeout(50000);