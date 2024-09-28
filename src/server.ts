import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.get("/customers", async (req, res) => {
    const customer = await prisma.customers.findMany()
    res.json(customer);
})

app.get("/customers/:id", async (req, res) => {
    const id = req.params.id;
    const customer = await prisma.customers.findUnique({
        where: { id }
    })
    return res.json(customer);
})

app.post("/customers", async (req, res) => {
    const { name, email, document } = req.body;
    const customer = await prisma.customers.create({
        data: { name,email,document }
    });
    res.status(201).json(customer);
})

app.put("/customers/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, document } = req.body;
    const customer = await prisma.customers.update({
        where: {id},
        data: { name,email, document }
    })
    res.status(201).json(customer);
})

app.delete("/customers/:id", async (req, res) => {
    const id = req.params.id;
    const customer = await prisma.customers.findUnique({
        where: {id}
    });

    if(!customer){
        return res.status(404).json()
    }

    await prisma.customers.delete({
        where: {id}
    });

    return res.status(204).json();
})

app.listen(3000, () => console.log("Server is running."));