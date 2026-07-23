import { prisma } from "../modules/config/prisma"
import request from "supertest"
import app from "../modules/app"

describe("rooms Test",()=>{
    let accessToken:string
    let refreshToken:string
    let hotelId:number
    let roomId:number
    let bookingId:number
    beforeAll(async()=>{
        await prisma.booking.deleteMany()
        await prisma.room.deleteMany()
        await prisma.hotel.deleteMany()
        await prisma.user.deleteMany()
    })
    test("should register test",async()=>{
            const res=await request(app)
            .post("/auth/register")
            .send({email:"testd@mail.com",password:"1234567"})
            expect(res.status).toBe(201)
            expect(res.body.email).toBe("testd@mail.com")
        })
        test("should login test",async()=>{
            const res=await request(app)
            .post("/auth/login")
            .send({email:"testd@mail.com",password:"1234567"})
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
   test("should create booking test", async () => {
    // 1. Формируем реальные даты для бронирования (сегодня и завтра)
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const startDate = today.toISOString(); // Превращает в строку вида "2026-07-21T..."
    const endDate = tomorrow.toISOString();

    // 2. Делаем запрос к серверу (убраны лишние круглые скобки из .send)
    const res = await request(app)
        .post("/bookings")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            roomId: roomId,       // Передаем ID созданной ранее комнаты
            startDate: startDate,
            endDate: endDate
        })
        expect(res.status).toBe(201)
        bookingId=res.body.id
})
test("should get all bookings test",async()=>{
    const res=await request(app)
    .get("/bookings?page=1&limit=10")
    .set("Authorization", `Bearer ${accessToken}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
})
test("should get booking by id test",async()=>{
    const res=await request(app)
    .get(`/bookings/${bookingId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id')
})
test("should update booking by id test",async()=>{
    const currentBookingId = bookingId;
    const res=await request(app)
    .put(`/bookings/${currentBookingId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    .send({status:"PENDING" })
    expect(res.status).toBe(200)
    expect(res.body.status).toBe("PENDING")
})
test("should delete booking by id test",async()=>{
    const currentBookingId = bookingId;
    const res=await request(app)
    .delete(`/bookings/${currentBookingId}`)
    .set("Authorization", `Bearer ${accessToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Deleted")
})
})