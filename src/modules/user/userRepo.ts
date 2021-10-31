import { createUserProps, updateUserProps } from './userTypes'
import argon2 from 'argon2'

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

    /**
     * check integrity and update customer
     *
     * For better decoupling, I believe the userCandidate validation and the password
     * matching should be moved in a dedicated service/manager/middleware and called
     * directly from the update Controller/Action
     *
     * For example : This is more or less the same code as in the login, we could start
     * by refactor those both part into a logging service
     *
     */
    public async update(userCandidate: updateUserProps) {

        const UserEntity = this.entities.user;

        try {

            const databaseUser = await this.getUserByEmail(userCandidate.currentEmail);
            const passwordMatches = await argon2.verify(
                databaseUser.password,
                userCandidate.currentPassword
            );
            if (passwordMatches) {
                if (undefined !== userCandidate.newPassword && null !== userCandidate.newPassword) {
                    userCandidate.newPassword = await argon2.hash(userCandidate.newPassword);
                }

                const update = await UserEntity.update({
                where: {
                    email: userCandidate.currentEmail,
                },
                data: {
                    email: userCandidate.newEmail !== undefined ? userCandidate.newEmail : userCandidate.currentEmail,
                    password: userCandidate.newPassword !== undefined ? userCandidate.newPassword :databaseUser.password,
                    name: userCandidate.newName !== undefined ? userCandidate.newName : null,
                },
                });

                return update;
            }
        } catch (e) {
            console.log('error in UserRepository::update');
            console.log('error : ',  e);
            const formatError = {
                succes: false
                message: "can't update customer, verify credentials or contact services if the error persists"
                error: e.message
            }
            return formatError;
        }
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
        const UserEntity = this.entities.user;
        const result = await UserEntity.findUnique({ where: { email: email } });
        return !!result === true;
    }
}