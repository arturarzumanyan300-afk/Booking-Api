import request  from "supertest";
import { prisma } from "../modules/config/prisma";
import app from "../modules/app";

describe("Auth test",()=>{
    let accessToken:string
    let refreshToken:string
    let id:number
    beforeAll(async()=>{
                await prisma.booking.deleteMany()
        
    await prisma.room.deleteMany()
    // // 2. Удаляем отели (зависят от пользователей / владельцев)
    await prisma.hotel.deleteMany();
    
    // 3. Теперь безопасно удаляем пользователей
    await prisma.user.deleteMany();
    })
    test("should register test",async()=>{
        const res=await request(app)
        .post("/auth/register")
        .send({email:"testb@mail.com",password:"1234567"})
        expect(res.status).toBe(201)
        expect(res.body.email).toBe("testb@mail.com")
    })
    test("should login test",async()=>{
        const res=await request(app)
        .post("/auth/login")
        .send({email:"testb@mail.com",password:"1234567"})
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
        .send({name:"Edem",address:"1 School street"})
        expect(res.status).toBe(201)
        expect(res.body.name).toBe("Edem")
        id=res.body.id
    })
    test("should getAll hotels test",async()=>{
        const res=await request(app)
        .get("/hotels?page=1&limit=10")
        .set("Authorization",`Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)

    })
    test("should get hotel by id test",async()=>{
        const res=await request(app)
        .get(`/hotels/${id}`)
        .set("Authorization",`Bearer ${accessToken}`)

         expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id') 
})
     test("should update test",async()=>{
        const res=await request(app)
        .put(`/hotels/${id}`)
        .set("Authorization",`Bearer ${accessToken}`)
        .send({name:"EDEM1",address:"Tumanyan"})

        expect(res.status).toBe(200)
        expect(res.body.name).toBe("EDEM1")
        expect(res.body.address).toBe("Tumanyan")

     })
     test("should delete test",async()=>{
        const res=await request(app)
        .delete(`/hotels/${id}`)
        .set("Authorization",`Bearer ${accessToken}`)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Deleted")
     })
})