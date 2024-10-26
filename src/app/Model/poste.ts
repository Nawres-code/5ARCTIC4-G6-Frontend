import { User } from "./user";

export class Poste {
    idPoste: number;
    title: string;
    description: string;
    date: Date;
    userName: string;
    comments: Comment[];
    user: User;
}
