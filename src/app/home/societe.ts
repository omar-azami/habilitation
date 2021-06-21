import { TypeSociete } from "./typeSociete";

      

    export interface Societe {
        id: number;
        nom: String ;
        code: String ;
        nomAbrege: String ;
        statut: String ;
        typeSociete:TypeSociete;
    }