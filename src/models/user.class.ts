export class User {
    vorname: string;
    nachname: string;
    email: string;
    geburtsdatum: number;
    street: string;
    postleihzahl: number;
    ort: string;
    notiz: { text: string, date: number }[];
  
    constructor(
      obj?: Partial<User>
    ) {
      this.vorname = obj?.vorname ?? '';  // Standardwert leeres String
      this.nachname = obj?.nachname ?? '';  // Standardwert leeres String
      this.email = obj?.email ?? '';  // Standardwert leeres String
      this.geburtsdatum = obj?.geburtsdatum ?? 0;  // Standardwert 0 für number
      this.street = obj?.street ?? '';  // Standardwert leeres String
      this.postleihzahl = obj?.postleihzahl ?? 0;  // Standardwert 0 für number
      this.ort = obj?.ort ?? '';  // Standardwert leeres String
      this.notiz = obj?.notiz ?? [];
    }
  }
  