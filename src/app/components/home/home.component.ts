import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PodcastService } from '../../services/podcast.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
    UserService, PodcastService
  ]
})
export class HomeComponent implements OnInit {

  public token;
  public identity;
  public podcasts; //Lista de podcasts
  public errorMsg="";
  public url=global.url;
  //PAGINAS
  public page; //Pagina actual
  public next_page;
  public prev_page;
  public total_pages; //Todas las páginas

  constructor(private _userService:UserService,
              private _podcastService:PodcastService,
              private _router:Router,
              private _route:ActivatedRoute) { }
  /**
   * Metodo inicial que comprueba si el usuario está logueado en la página
   * y le redirige a la página de inicio de sesión y registro si no
   * está logueado
   */
  ngOnInit(): void {
    this.loadUser();
    this.obtenerPagActual();
    //Si no hay ningun usuario conectado, se volverá a la página de registro e inicio de sesión
    if (this._userService.getToken()==null){
      this._router.navigate(["/logs"])
    }
  }

  /**
   * Metodo para obtener los datos del usuario que se encuentran en el LocalStorage
   */
  loadUser(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  /**
   * Metodo para recoger de la URL el numero de la página. Después, se llamará al metodo para obtener los podcast que 
   * pertenezcan a la página recogida
   */
  obtenerPagActual(){
    this._route.params.subscribe(
      params=>{
        let page=+params["page"];
        if (!page){//Si no se recoge, se establecen los valores por defecto
          page=1
          this.prev_page=1
          this.next_page=2
        }
        this.getPodcast(page);
      }
    )
  }

  /**
   * Metodo para obtener todos los podcasts de una pagina concreta. Es llamado por el método obtenerPagActual()
   * @param pag: Numero de la página en la que se van a recoger los podcast 
   */
  getPodcast(pag){
    this._podcastService.getAllPodcast(this.token,pag).subscribe(
      response=>{
        this.podcasts=response.podcasts;
        var pages=[];
        for(let i=1;i<=response.total_pages;i++){
          pages.push(i)
        }
        this.total_pages=pages;
        if (pag>=2){
          this.prev_page=pag-1;
        }else{
          this.prev_page=1
        }
        if (pag<response.total_pages){
          this.next_page=pag+1;
        }else{
          this.next_page=response.total_pages;
        }
        this.page=pag;
      },
      error=>{
        this.errorMsg=error.message;
        console.log(error)
      }
    )
  }

  /**
   * Metodo para eliminar un podcast desde el inicio de la página
   * @param id: Id del podcast que se quiere eliminar
   */
  deletePodcast(id){
    //Se hace una petición al servidor para eliminar el podcast elegido
    this._podcastService.delete(this.token,id).subscribe(
      response=>{
        this.obtenerPagActual();
      },
      error=>{
        this.errorMsg=error.message;
        console.log(error)
      }
    )
  }

}
