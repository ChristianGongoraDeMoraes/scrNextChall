npm run dev

Open [http://localhost:3000/register](http://localhost:3000/register)

rotas publicas: login, register
rota privada: calculadora

roda com postgres na maquina.
.env 
DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/{DATABASE_NOME}?schema=public"
adicione sua database criada e a senha para acesso postgres no seu local.

npx prisma generate
