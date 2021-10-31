import { createUserProps } from './userTypes'

export class UserRepo {
    private entities: any

    constructor(entities: any) {
        this.entities = entities
    }

    public async create(userProps: createUserProps) {
        const UserEntity = this.entities.user

        const exists = await this.exists(userProps.email);

        if (!exists) {
            await UserEntity.create(
                {
                    data: {
                        email:userProps.email,
                        password: userProps.password,
                        name: userProps.name,  
                    }
                })
        }

        return
    }
    async getUserByEmail(email: string) {
        const UserEntity = this.entities.user;
        const result = await UserEntity.findUnique({ where: { email: email } });
        return result;
      }
    
      async getUserById(id: number) {
        const UserEntity = this.entities.user;
        const result = await UserEntity.findUnique({
          where: { id: id },
        });
    
        return result;
      }

    public async exists(email: string): Promise<boolean> {
        console.log('3 - email recupérer : ', email);

        const UserEntity = this.entities.user;

        const result = await UserEntity.findUnique({ where: { email: email } })

        console.log('4 - exists : ', result);

        return !!result === true;
    }

    // public async getUserByEmail(email: string): Promise<User> {
    //     const UserEntity = this.entities.user;

    //     const result = await UserEntity.findUnique({ where: { email: email } })

    //     return result
    // }
}