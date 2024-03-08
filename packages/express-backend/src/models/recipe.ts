export interface Recipe{
    name: string;
    ingredients: string[];
    directions: string[];
    tags: string[];
    date: Date;
    picture: string;
    numLikes: number;
    numComments: number;
    userid: string;
    userPicture: string;
}