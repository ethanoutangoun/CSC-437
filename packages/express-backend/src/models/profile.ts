export interface Profile{
    userid: string;
    name: string;
    email: string;
    phone: string;
    numRecipes: number;
    followers: number;
    dateJoined: Date;
    picture: Buffer; // Store image as binary data
    pictureContentType: string; // Content type of the image
}