import { UserRepo } from '../../userRepo'
import { CreateUser } from './createUser'
import { CreateUserController } from './createUserController'
// import {prisma} from '../../../../app/database/prisma/index'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Je construit mon repo avec les entités dont j'ai besoin
const userRepo = new UserRepo(prisma)
const createUser = new CreateUser(userRepo)
const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }