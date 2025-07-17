export interface IUser {
    userId: string;
    role: 'admin' | 'user';
    iat: number;
    exp: number;
}