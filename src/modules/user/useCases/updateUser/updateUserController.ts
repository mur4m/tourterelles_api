import { UpdateUser } from './updateUser'
import { Request, Response } from 'express'
import { validate } from 'class-validator'

//DTO
import { RequestUpdateUserDto } from './updateUserDto'

//Controller
export class UpdateUserController {
    private useCase: UpdateUser;

    constructor(UpdateUser: UpdateUser) {
        this.useCase = UpdateUser;
    }

    /**
     * check data using DTO && execute update
     * @param {Request}  req : [POST request, body object must comply with UpdateUserDTO]
     * @param {Response} res: [simple status with json message response, customize as needed]
     */
    public async execute(req: Request, res: Response) {
        
        const requestUserDto = new RequestUpdateUserDto(req.body);
        const errors = await validate(requestUserDto);
        const dtoErrors = await requestUserDto.isValid(requestUserDto);

        if (!!dtoErrors) {
            return res.status(400).json(dtoErrors);
        }

        try {
            const update = await this.useCase.execute(req.body);
            if (!update.success) {
                return res.status(400).json({ message: update.message })
            }

            return res.status(201).json({ message: update.message });
        }
        catch (err) {
            console.log('update controllers errors :', err);
            return err;
        }

    }
}