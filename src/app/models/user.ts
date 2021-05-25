/**
 * Modelo de usuario
 */
export class User{
    constructor(
        public id:number,
        public username:string,
        public email:string,
        public password:string,
        public image:string,
        public created_at:string
    ){}
}