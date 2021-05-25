import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
/**
 * Servicio de peticiones del usuario
 */
export class UserService {

    public url=global.url; //URL al back-end
    public identity; //Datos del usuario
    public token; //Token del usuario

    constructor(
        public _http:HttpClient
    ){}

    /**
     * Metodo que hace la petición AJAX al back-end para registrar a un usuario
     * @param user: User Objeto que contiene todos los datos para registrar a un usuario
     * @return response: Resultado de la petición
     */
    registerUser(user):any{
        let json=JSON.stringify(user);
        let params="json="+json;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+"new-user",params,{headers:headers});
    }

    /**
     * Metodo que hace la petición AJAX al back-end para loguear a un usuario
     * @param user: User Objeto que contiene todos datos para loguear a un usuario
     * (email y password)
     * @param getToken: Boolean=False Indica si se quiere obtener el token del usuario conectado (True) o
     * los datos del usuario (False)
     * @return response: Resultado de la petición
     */
    loginUser(user,getToken=false):any{
        user.getToken=getToken;
        let json=JSON.stringify(user);
        let params="json="+json;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        return this._http.post(this.url+"login-user",params,{headers:headers});
    }

    /**
     * Metodo para obtener la informacion de un usuario
     * @param token 
     * @param idUser 
     */
    getUserData(token,idUser):any{
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set("Authorization",token);

        return this._http.get(this.url+"user/ver/"+idUser,{headers:headers});
    }

    editUser(token,user):any{
        let json=JSON.stringify(user);
        let params="json="+json;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                     .set("Authorization",token);

        return this._http.put(this.url+"edit-user",params,{headers:headers});
    }

    /**
     * Metodo para obtener los datos del usuario del LocalStorage
     * @return identity: Any|null Devuelve los datos del usuario o null si no
     * hay datos de un usuario en el LocalStorage
     */
    getIdentity(){
        let identity=JSON.parse(localStorage.getItem("identity"));
        if (identity&&identity!=undefined){
            this.identity=identity;
        }else{
            this.identity=null;
        }
        return this.identity;
    }

    /**
     * Metodo para obtener el token del usuario del LocalStorage
     * @return token: String|null Devuelve el token o null si no
     * existe el token de un usuario en el LocalStorage
     */
    getToken(){
        let token=localStorage.getItem("token");
        if (token&&token!=undefined){
            this.token=token;
        }else{
            this.token=null;
        }
        return this.token;
    }
}