import request  from "supertest";
import { prisma } from "../modules/config/prisma";
import app from "../modules/app";

describe("Auth test",()=>{
    let accessToken:string
    let refreshToken:string
    beforeAll(async()=>{
                await prisma.booking.deleteMany()
        await prisma.room.deleteMany()
     await prisma.hotel.deleteMany()

    await prisma.user.deleteMany();
    })
    test("should register test",async()=>{
        const res=await request(app)
        .post("/auth/register")
        .send({email:"testa@mail.com",password:"1234567"})
        expect(res.status).toBe(201)
        expect(res.body.email).toBe("testa@mail.com")
    })
    test("should login test",async()=>{
        const res=await request(app)
        .post("/auth/login")
        .send({email:"testa@mail.com",password:"1234567"})
        expect(res.status).toBe(200)
        expect(res.body.accessToken).toBeDefined()
        expect(res.body.refreshToken).toBeDefined()
        accessToken=res.body.accessToken
        refreshToken=res.body.refreshToken
    })
    test("should refresh test",async()=>{
        const res=await request(app)
        .post("/auth/refresh")
        .set("Authorization",`Bearer ${accessToken}`)
        .send({refreshToken})
        expect(res.status).toBe(200)
        expect(res.body.accessToken).toBeDefined()
    })
      test("should logout test",async()=>{
        const res=await request(app)
        .post("/auth/logout")
        .set("Authorization",`Bearer ${accessToken}`)
        .send({refreshToken})
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("LOGGET OUT")
    })
})