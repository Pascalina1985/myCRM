export class User {
    vorname: string;
    nachname: string;
    email: string;
    geburtsdatum: number;
    street: string;
    postleihzahl: number;
    ort: string;

    constructor(
       obj?: any
    ) {
        this.vorname = obj? obj.vorname: '';
        this.nachname = obj? obj.nachname: '';
        this.email = obj? obj.email: '';
        this.geburtsdatum = obj? obj.geburtsdatum: '';
        this.street = obj? obj.street: '';
        this.postleihzahl = obj? obj.postleihzahl: '';
        this.ort = obj? obj.ort: '';
    }
}
