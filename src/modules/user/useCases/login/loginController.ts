import { Login } from './login'
import { Request, Response } from 'express'
import { RequestLoginDto } from './loginDto'
import { JWT_PASSPHRASE } from 'src/constant';
import jwt  from 'jsonwebtoken';
import { verify } from 'argon2';

export class LoginController {
    private useCase: Login;

    constructor(useCase: Login) {
        this.useCase = useCase
    }

    async execute(req: Request, res: Response): Promise<void | any> {
        
        try {
            console.log(">>>>>>>LOGIN CONTROLLER - 1 send user input to login", req.body);
            const requestUserDto = new RequestLoginDto(req.body);
            const dtoErrors = await requestUserDto.isValid(requestUserDto)

            if (!!dtoErrors) {
                return res.status(400).json(dtoErrors);
            }

            const result = await this.useCase.execute(req.body)

            if (!result.success) {
                return res.status(400).json({ message: result.message })
            }

            let data;

            if (result.payload) {
                const { id, password, ...userWithoutPasswordAndId } = result.payload.user
                console.log('user controller without id and password', userWithoutPasswordAndId);
                data = userWithoutPasswordAndId
            }

            // res.cookie(
            //     "access_token",
            //     user.accessToken,
            //     { maxAge: 900000, httpOnly: true }
            // );


            return res.cookie("token", result.payload?.token, { maxAge: 900000, httpOnly: true }).status(200).json(data)

            // res.cookie(
            //     "refresh_token",
            //     user.refreshToken,
            //     { maxAge: 900000, httpOnly: true }
            // );

            // const { refreshToken, accessToken, ...userWithoutAccessAndRefreshToken } = user
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ error: err.message })
            //If something went wrong
            //Notify the client by throwing a correct status
            //Default controller error
        }
    }

    async findMe(req: Request, res: Response): Promise<void | any> {
        const token = req.cookies.token;
        
        try {
          const result = await this.useCase.findMe(token);
          if (!result.success) {
            return res.status(400).json({ message: result.message });
          }
          const { password, email, ...userMinimumInfo } = result.payload?.userMe;
          const data = userMinimumInfo;
    
          return res.status(200).json(data);
        } catch (err) {
          res
            .status(404)
            .json({ message: "error occure whith this profil :" + err });
        }
      }
}