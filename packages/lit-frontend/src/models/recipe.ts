export interface Recipe{
    name: string;
    ingredients: string[];
    directions: string[];
    tags: string[];
    date: Date;
    picture: string;
    likes: number;
    userid: string;
    userPicture: string;
    cost: number;
    time: number;
}