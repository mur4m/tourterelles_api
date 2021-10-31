import { UserRepo } from "../../userRepo";
import { createUserProps } from '../../userTypes'
import argon2 from 'argon2'

export class CreateUser {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo
    }

    public async execute(props: createUserProps) {
console.log("2 - props createUser, vérifier que req.body du controller est bien arrivé", props);

        try {
            const userAlreadyExists = await this.userRepo.exists(props.email)

            console.log('5 - user already exists : ', userAlreadyExists);

            if (userAlreadyExists) {
                return {
                    success: false,
                    message: 'User already exists'
                }
            }
            console.log( 'pre hash password', props.password);

            const hashPassword = await argon2.hash(props.password);
            console.log('hashed password', hashPassword);
            
            props.password = hashPassword;
            console.log( 'post hash password', props.password);

            await this.userRepo.create(props);

            return {
                success: true,
                message: 'User is correctly created'
            }
        }
        catch (err) {
            return {
                success: false,
                message: err
            }
        }
    }
}