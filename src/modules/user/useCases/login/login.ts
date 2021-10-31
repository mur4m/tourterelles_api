import { UserRepo } from '../../userRepo'
import { loginUserProps } from '../../userTypes'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JWT_PASSPHRASE } from '../../../../constant'
//import { token } from 'morgan';

//Equivalent to a specific service in a CRUD API
export class Login {
    private userRepo: UserRepo

    constructor(userRepo: UserRepo) {
        this.userRepo = userRepo
    }

    //This is what our use case will do
    public async execute(props: loginUserProps) {
        try {
            const { email, password } = props;
            console.log(">>>>>>>>LOGIN - 0 -  user props");
            console.log('email : ', email);
            console.log('password : ', password);
            console.log("----------------------------------------");
            

            const user = await this.userRepo.getUserByEmail(email);

            if (!user) {
                return {
                    success: false,
                    message: "Email or password missmatch"
                }
            }

            console.log(">>>>>>>LOGIN - 0bis - user exists and here are his credentials");
            
            console.log('password user in database', user.password);
            console.log('password in body', password);
            console.log("----------------------------------------");

            console.log(">>>>>>LOGIN - 1 - check req password against db password");
            
            const passwordMatches = await argon2.verify(user.password, password)
            console.log('passwordMatches', passwordMatches);
            console.log("----------------------------------------");

            if (!passwordMatches) {
                return {
                    success: false,
                    message: "Email or password missmatch"
                }
            }

            //Création de notre JWT token
            console.log(">>>>>LOGIN - 2 - Creation du token");
            console.log("2a - LOGIN - on récupère bien user.id:", user.id);
            
            const jwtToken = jwt.sign({ id: user.id }, JWT_PASSPHRASE)
            console.log('TOKEN', jwtToken);
            console.log("----------------------------------------");

            return {
                success: true,
                payload: {
                    user,
                    token: jwtToken
                }
            }

        } catch (e) {
            console.log('error :', e)
            return {
                success: false,
                message: e
            }
        }
    }

    public async findMe(props: string) {
        try {
          const decoded = await jwt.verify(props, JWT_PASSPHRASE);
          console.log('%c decoded' ,decoded, 'color: green; font-weight: bold;');
          
          if (!decoded) {
              console.log("deocded flase");
            return {
                
              success: false,
              message: "Token can't be decoded",
            };
          }
    
          const userMe = await this.userRepo.getUserById(decoded.id);
          if (!userMe) {
              console.log("decoded true");
            return {
                
              success: false,
              message: "User not found in database",
            };
          }
    
          return {
            success: true,
            payload: {
              userMe,
            },
          };
        } catch (err) {
          console.log("error :", err);
          return {
            success: false,
            message: err,
          };
        }
    }
}