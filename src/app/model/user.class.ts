export class User {

  constructor(
    public displayName: string, 
    public email: string,
    public emailVerified: string,
    public photoURL: string,
    public isAnonymous: boolean,
    public uid: string,
    public providerData: string) {}
}
