export interface Profile{
    userid: string;
    name: string;
    email: string;
    phone?: string;
    numRecipes: number;
    followers: number;
    dateJoined: Date;
    picture?: string;
}