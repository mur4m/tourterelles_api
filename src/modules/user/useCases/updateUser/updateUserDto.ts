import { MinLength, IsString, IsDefined, IsEmail, IsOptional } from 'class-validator'
import { AbstractDto } from '../../../../common/abstractDto'

export interface IRequestUpdateUserDto {
    newName: string;
    currentEmail: string;
    newEmail: string;
    currentPassword: string;
    newPassword: string;
}

export class RequestUpdateUserDto extends AbstractDto implements IRequestUpdateUserDto {
    //-------------FIELD-------------
    @IsOptional()
    @IsString({ message: 'Name cannot be number' })
    public newName: string

    //-------------FIELD-------------
    @IsEmail()
    @IsDefined({ message: 'Current email is required' })
    public currentEmail: string

    //-------------FIELD-------------
    @IsOptional()
    @IsEmail()
    public newEmail: string

    //-------------FIELD-------------

    @IsDefined({ message: 'Current password is required' })
    @IsString({message:"T'es nul"})
    public currentPassword: string

    //-------------FIELD-------------
    @IsOptional()
    @MinLength(3, {
        message: 'New Password is too short',
    })
    public newPassword: string

    constructor(props: IRequestUpdateUserDto) {
        super();

        // const { firstname, lastname, username, email, password } = props;
        const { currentEmail, currentPassword, newName, newEmail, newPassword} = props;

        this.newName = newName;
        this.currentEmail = currentEmail;
        this.newEmail = newEmail;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;

    }
}