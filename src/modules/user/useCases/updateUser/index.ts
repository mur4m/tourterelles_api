import { UserRepo } from '../../userRepo'
import { UpdateUser } from './updateUser'
import { UpdateUserController } from './updateUserController'
// import {prisma} from '../../../../app/database/prisma/index'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Je construit mon repo avec les entités dont j'ai besoin
const userRepo = new UserRepo(prisma)
const updateUser = new UpdateUser(userRepo)
const updateUserController = new UpdateUserController(updateUser)

export { updateUser, updateUserController }