import { createServer } from './app/http/app'

const main = async () => {
    createServer();
    console.log("1 server is running"); 
}

main();

// main()
//     .catch((e) => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })


