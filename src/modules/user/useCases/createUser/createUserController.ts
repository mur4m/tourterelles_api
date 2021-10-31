import { CreateUser } from './createUser'
import { Request, Response } from 'express'
import { validate } from 'class-validator'

//DTO
import { RequestCreateUserDto } from './createUserDto'

//Controller
export class CreateUserController {
    private useCase: CreateUser;

    constructor(createUser: CreateUser) {
        this.useCase = createUser;
    }

    public async execute(req: Request, res: Response) {

        // body {
        //     email:"qsdqsd@qsdqs.com"
        //     password:"*******"
        // }
        console.log(req.body, "1 - req body de createUserController");
        
        const requestUserDto = new RequestCreateUserDto(req.body);
        const errors = await validate(requestUserDto);


        console.log('Request DTO create user errors : ', errors);

        const dtoErrors = await requestUserDto.isValid(requestUserDto)

        if (!!dtoErrors) {
            return res.status(400).json(dtoErrors);
        }

        try {
            const result = await this.useCase.execute(req.body);
            console.log('result', result);

            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }


            return res.status(201).json({ message: result.message });
        }
        catch (err) {
            console.log('create controllers errors :', err);
        }

    }
}