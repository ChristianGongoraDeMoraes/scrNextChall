Open [http://localhost:3000/register](http://localhost:3000/register)

rotas publicas: /login, /register

rota privada: /calculadora

    npm i                         //installar pacotes
    npx prisma generate          //alinhar prisma com db -> após configurar .env
    npm run dev                  // Open [http://localhost:3000/register](http://localhost:3000/register)

    .env 
    {
        //Crie database postgres local e preencha PASSWORD e DATABASE_NOME com seus dados
        DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/{DATABASE_NOME}?schema=public"
        
        SESSION_SECRET="iashfioaad"
        
        NODE_ENV = "dev"
    
        PATH_URL_DOMAIN="http://localhost:3000"
    }
