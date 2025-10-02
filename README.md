Open [http://localhost:3000/register](http://localhost:3000/register)

rotas publicas: /login, /register

rota privada: /calculadora

    npm i
    npx prisma db pull
    
    npm run dev

    .env 
    {
        __Crie database postgres local__
        DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/{DATABASE_NOME}?schema=public"
        
        SESSION_SECRET="iashfioaad"
        
        NODE_ENV = "dev"
    
        PATH_URL_DOMAIN="http://localhost:3000"
    }
