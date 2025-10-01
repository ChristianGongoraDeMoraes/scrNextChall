import { NextResponse } from "next/server";
import  bcrypt  from "bcrypt";
import { prisma } from "../../../../app/lib/prisma";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltam campos obrigatórios" }, { status: 400 });
    }

    const user = await prisma.userM.findUnique({ where: { email } });
    
    if (user == null) {
        return NextResponse.json({ error: "Email ou senha Invalidos" }, { status: 401 });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
      
    if( !passwordMatch ){ return NextResponse.json({ error: "Email ou senha Invalidos" }, { status: 401 }); }
    
    return NextResponse.json({ message: "Login realizado com sucesso", userId: user.id }, { status: 200});
   
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}