import { NextResponse } from "next/server";
import { prisma } from "libs/prisma";


export async function POST(request) {
    const data = await request.json()

    const userFound = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (userFound) {
        return NextResponse.json({
            message: "El usuario ya existe"
        }, {
            status: 400
        })
    }

    const usernameFound = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    })

    if (usernameFound) {
        return NextResponse.json({
            message: "El nombre de usuario ya existe"
        }, {
            status: 400
        })
    }

    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: data.password
        }
    })

    return NextResponse.json(newUser);
}