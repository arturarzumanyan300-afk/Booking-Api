import { prisma } from "../modules/config/prisma"
import request from "supertest"
import app from "../modules/app"

describe("rooms Test",()=>{
    let accessToken:string
    let refreshToken:string
    let hotelId:number
    let roomId:number
    beforeAll(async()=>{
                await prisma.booking.deleteMany()
        
        await prisma.room.deleteMany()
        await prisma.hotel.deleteMany()
        await prisma.user.deleteMany()
    })
    test("should register test",async()=>{
            const res=await request(app)
            .post("/auth/register")
            .send({email:"testc@mail.com",password:"1234567"})
            expect(res.status).toBe(201)
            expect(res.body.email).toBe("testc@mail.com")
        })
        test("should login test",async()=>{
            const res=await request(app)
            .post("/auth/login")
            .send({email:"testc@mail.com",password:"1234567"})
            expect(res.status).toBe(200)
            expect(res.body.accessToken).toBeDefined()
            expect(res.body.refreshToken).toBeDefined()
            accessToken=res.body.accessToken
            refreshToken=res.body.refreshToken
        })
        test("should create hotel test",async()=>{
        const res=await request(app)
        .post("/hotels")
        .set("Authorization",`Bearer ${accessToken}`)
        .send({name:"Edem2",address:"1 School street"})
        expect(res.status).toBe(201)
        expect(res.body.name).toBe("Edem2")
        hotelId=res.body.id
    })
    test("should create room test",async()=>{
        const res=await request(app)
        .post("/rooms")
        .set("Authorization",`Bearer ${accessToken}`)
        .send({title:"TestRoom",price:1000,capacity:2,hotelId:hotelId})
       

        expect(res.status).toBe(201)
        expect(res.body.title).toBe("TestRoom")
        expect(res.body.price).toBe(1000)
        roomId=res.body.id
    })
    test("should get All rooms test",async()=>{
        const res=await request(app)
        .get("/rooms?page=1&limit=10")
        .set("Authorization",`Bearer ${accessToken}`)

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })
        test("should get room by id test",async()=>{
        const res=await request(app)
        .get(`/rooms/${roomId}`)
        .set("Authorization",`Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id') 

    })
    test("should update room test",async()=>{
        const res=await request(app)
        .put(`/rooms/${roomId}`)
        .set("Authorization",`Bearer ${accessToken}`)
        .send({title:"TestRoom1",price:1000,capacity:2,hotelId:hotelId})
        expect(res.status).toBe(200)
        expect(res.body.title).toBe("TestRoom1")
    })
    test("should delete room test",async()=>{
        const res=await request(app)
        .delete(`/rooms/${roomId}`)
        .set("Authorization",`Bearer ${accessToken}`)
        .send({hotelId:hotelId})
         
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Deleted")
    })
})