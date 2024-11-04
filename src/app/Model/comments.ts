import { Poste } from "./poste";

export class Comments {
    idComm: number;
    content: string;
    description: string;
    datePub: Date;
    poste: Poste; // Change from postId to poste object
    

}