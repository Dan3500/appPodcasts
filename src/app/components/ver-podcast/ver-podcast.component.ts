import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../../services/podcast.service';
import { UserService } from '../../services/user.service';
import { Podcast } from '../../models/podcast';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Status } from '../../models/status';
import { global } from '../../services/global';

@Component({
  selector: 'app-ver-podcast',
  templateUrl: './ver-podcast.component.html',
  styleUrls: ['./ver-podcast.component.css'],
  providers:[
    UserService, PodcastService
  ]
})
export class VerPodcastComponent implements OnInit {

  public token; //Token del usuario
  public identity; //Identidad del usuario conectado
  public podcast:Podcast;
  public status: Status;
  public url=global.url;

  constructor(private _podcastService:PodcastService,
              private _userService:UserService,
              private _route:ActivatedRoute,
              private _router:Router) { 
    this.status=new Status();
    this.podcast=new Podcast(1,1,'','','','','');              
  }

  ngOnInit(): void {
    this.loadUser();
    //Si no hay ningun usuario conectado, se volverá a la página de registro e inicio de sesión
    if (this._userService.getToken()==null){
      this._router.navigate(["/logs"])
    }else{
      this.obtenerDatosPodcast();
    }
  }

  /**
   * Metodo para obtener los datos del podcast que se quiere visitar
   */
  obtenerDatosPodcast(){
    this._route.params.subscribe(
      params=>{
        if (params["id"]){
          this._podcastService.getPodcast(this.token,params["id"]).subscribe(
            response=>{
              this.status.status=response.status;
              //Si hay algún error o se intenta acceder a un podcast que no existe
              if (this.status.status=="error"){
                console.log(response.message);
                this._router.navigate(["/home"])
              }else{
                this.podcast=response.podcast;
              }
            },
            error=>{
              this._router.navigate(["/home"])
            }
          )//Petición AJAX para obtener un podcast
        }else{
          this._router.navigate(["/home"])
        }
      }
    )//Route Param
  }

   /**
   * Metodo para obtener los datos del usuario que se encuentran en el LocalStorage
   */
  loadUser(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  /**
   * Metodo para eliminar un podcast desde el inicio de la página
   * @param id: Id del podcast que se quiere eliminar
   */
  deletePodcast(id){
    //Se hace una petición al servidor para eliminar el podcast elegido
    this._podcastService.delete(this.token,id).subscribe(
      response=>{
        if (response.status=="success"){
          this._router.navigate(["/home"])
        }
      },
      error=>{
        this.status.message=error.message;
        console.log(error)
      }
    )
  }

}
