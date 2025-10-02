import { NextResponse } from "next/server";
import  bcrypt  from "bcrypt";
import { prisma } from "../../../lib/prisma";


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltam campos obrigatórios" }, { status: 400 });
    }

    const existentEmail = await prisma.userM.findUnique({ where: { email } });
    if(existentEmail) return NextResponse.json({ message: "Usuário existente" }, { status: 400});

    const passhashed = await bcrypt.hash(password, 12);
    await prisma.userM.create({
        data: { email: email, password_hash: passhashed }
    });

    return NextResponse.json({ message: "Usuário registrado com sucesso", user: { email } });
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
