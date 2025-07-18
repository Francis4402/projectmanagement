export interface IUser {
    userId: string;
    username: string;
    email: string;
    profilePictureUrl: string;
    role: 'admin' | 'user';
    cognitoId: string;
    teamId: string;
    iat: number;
    exp: number;
}