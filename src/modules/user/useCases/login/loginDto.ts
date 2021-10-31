import { IsDefined, IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../../common/abstractDto';

export interface IRequestLoginDto {
    email: string;
    password: string;
}

export class RequestLoginDto extends AbstractDto implements IRequestLoginDto {
    //-------------FIELD-------------
    @IsEmail()
    @IsDefined({ message: 'Email is required' })
    public email: string

    //-------------FIELD-------------
    @IsString()
    @IsDefined({ message: 'Password is required' })
    public password: string

    constructor(props: IRequestLoginDto) {
        super();

        // const { firstname, lastname, username, email, password } = props;
        const { email, password } = props;

        // this.firstname = firstname;
        // this.lastname = lastname;
        // this.username = username;
        this.email = email;
        this.password = password;
    }
}