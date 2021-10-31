import { UserRepo } from "../../userRepo";
import { updateUserProps } from '../../userTypes'

export class UpdateUser {
    private userRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo
    }

    public async execute(props: updateUserProps) {

        try {
                const update = this.userRepo.update(props);
                return update;
        }
        catch (err) {
            return {
                success: false,
                message: err
            }
        }
    }
}