/**
 * Modelo de Podcast
 */
export class Podcast{
    constructor(
        public id:number,
        public user_id:number,
        public title:string,
        public image:string,
        public audio:string,
        public created_at:string,
        public updated_at:string
    ){}
}