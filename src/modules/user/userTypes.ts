export type createUserProps = {
    name?: string,
    email: string,
    password: string,
}

export type updateUserProps = {
    newName?: string,
    currentEmail: string,
    newEmail?: string,
    currentPassword: string,
    newPassword?: string,
}

export type loginUserProps = {
    email: string,
    password: string,
}