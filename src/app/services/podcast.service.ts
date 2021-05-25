import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Podcast } from '../models/podcast';
import { global } from './global';

@Injectable()
/**
 * Servicio de peticiones del usuario
 */
export class PodcastService {

    public url=global.url; //URL al back-end
    public identity; //Datos del usuario
    public token; //Token del usuario

    constructor(
        public _http:HttpClient
    ){}

    /**
     * Metodo para hacer la petición AJAX y obtener todos los podcast de la BD
     * @param token: Token del usuario
     * @param pag: Página de la que se van a sacar los podcast
     * @return: Resultado de la petición
     */
    getAllPodcast(token,pag):any{
        if (!pag){
            pag=1;
        }
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);

        return this._http.get(this.url+"podcast/list?page="+pag,{headers:headers})
    }

    /**
     * Metodo para hacer la petición AJAX y obtener todos los podcast de la BD
     * @param token: Token del usuario
     * @param pag: Página de la que se van a sacar los podcast
     * @param user: Usuario del que se van a obtener los podcast
     * @return: Resultado de la petición
     */
    getUserPodcast(token,pag,user):any{
        if (!pag){
            pag=1;
        }
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);

        return this._http.get(this.url+"podcast/list/"+user+"/"+pag,{headers:headers})
    }

    /**
     * Metodo para obtener toda la información de un podcast concreto
     * @param token 
     * @param id 
     */
    getPodcast(token,id):any{
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);

        return this._http.get(this.url+"podcast/ver/"+id,{headers:headers})
    }

    /**
     * Metodo que envia una petición AJAX al servidor para almacenar un nuevo podcast
     * @param token: Token del usuario
     * @param podcast: Objeto Podcast con los datos del podcast que se va a almacenar
     * @return: Resultado de la petición 
     */
    createPodcast(token,podcast):any{
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);
        let json=JSON.stringify(podcast);
        let params="json="+json;

        return this._http.post(this.url+"podcast/new",params,{headers:headers})
    }

    /**
     * Metodo que envia una petición AJAX al servidor para almacenar un nuevo podcast
     * @param token: Token del usuario
     * @param podcast: Objeto Podcast con los datos del podcast que se va a almacenar
     * @return: Resultado de la petición 
     */
    modifyPodcast(token,podcast):any{
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);
        let json=JSON.stringify(podcast);
        let params="json="+json;

        return this._http.put(this.url+"podcast/edit",params,{headers:headers})
    }

    /**
     * Metodo que envía una petición AJAX para eliminar un podcast de la BD
     * @param token: Token del usuario
     * @param id: Id del vídeo que se quiere eliminar
     * @return: Resultado de la petición
     */
    delete(token,id):any{
        let headers=new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                     .set("Authorization",token);

        return this._http.delete(this.url+"podcast/remove/"+id,{headers:headers})
    }

    /**
     * Metodo para obtener una imagen de un podcast almacenada en el servidor
     * @param name: Nombre de la imagen que se quiere obtener
     * @return: Resultado de la petición 
     */
    getImage(name):any{
        return this._http.get(this.url+"podcast/image/"+name)
    }
}