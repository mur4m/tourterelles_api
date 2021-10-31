// import { prisma } from '../../../../app/database/prisma/index'
import { UserRepo } from '../../userRepo'
// import { authService } from '../../services';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Login } from './login'
import { LoginController } from './loginController'

const userRepo = new UserRepo(prisma)
const login = new Login(userRepo)
const loginController = new LoginController(login)

export { login, loginController }