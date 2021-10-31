import { Router } from 'express'
import { createUserController } from './useCases/createUser/index'
import { loginController } from './useCases/login/index'
import { updateUserController } from './useCases/updateUser/index'

const userRouter: Router = Router();

//Create
userRouter.post('/', (req, res) => createUserController.execute(req, res))

//Authenticate
userRouter.post('/authenticate', (req, res) => loginController.execute(req, res))

userRouter.post('/update', (req, res) => updateUserController.execute(req, res))

userRouter.get("/me", (req, res) => loginController.findMe(req, res));

export { userRouter }