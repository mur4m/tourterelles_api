import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

// // Middleware 1
prisma.$use(async (params, next) => {
  console.log("params", params);
  
    if (params.model == 'User' && params.action == 'create') {
      // Logic only runs for delete action and Post model
      console.log(params);
      // const allUsers = await prisma.user.findMany()
      // console.log(allUsers)
    }
    return next(params)
  })

// // Middleware 2
// prisma.$use(async (params, next) => {
//     console.log('2')
//     const result = await next(params)
//     console.log('5')
//     return result
// })

export { prisma }