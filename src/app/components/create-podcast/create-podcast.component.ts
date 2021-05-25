import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { PodcastService } from '../../services/podcast.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';
import { Podcast } from '../../models/podcast';
import { Status } from '../../models/status';

@Component({
  selector: 'app-create-podcast',
  templateUrl: './create-podcast.component.html',
  styleUrls: ['./create-podcast.component.css'],
  providers:[
    UserService, PodcastService
  ]
})
export class CreatePodcastComponent implements OnInit {

  public statusMessage:Status; //Objeto Status que contiene el resultado de las peticiones que se hagan al back-end
  public podcast:Podcast; //Objeto podcast que se envíara al back-end para almacenarlo en la BD
  public url=global.url; //URL del back-end
  //Identidad y token del usuario
  public token;
  public identity;
  public msgError=false;

  //Configuraciones de los campos de envío de archivos 
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: this.url+"podcast/upload",
      method:"POST",
      headers: {
        "Authorization" :this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: "Imagen del podcast",
    replaceTexts: {
      selectFileBtn: 'Select Files',
      uploadBtn: 'Upload',
      attachPinBtn: 'Imagen del podcast',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  public afuConfigAudio = {
    multiple: false,
    formatsAllowed: ".mp3",
    maxSize: "500",
    uploadAPI:  {
      url: this.url+"podcast/upload",
      method:"POST",
      headers: {
        "Authorization" :this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinText: "Sube tu podcast",
    replaceTexts: {
      selectFileBtn: 'Select Files',
      uploadBtn: 'Upload',
      attachPinBtn: 'Sube tu podcast',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(private _userService:UserService,
              private _podcastService:PodcastService,
              private _router:Router,
              private _route:ActivatedRoute) { 
    this.podcast=new Podcast(1,1,'','','','','');
    this.statusMessage=new Status();
  }

  ngOnInit(): void {
    this.loadUser()
    /*Si el usuario está logueado en la página, se le redigirá a la página principal
      y no se le dejará entrar en esta página */
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
   * Metodo para hacer la peticion AJAX al back-end y subir los datos del objeto de podcast
   * @param form: Formulario de subida de podcast 
   */
  createPodcast(form){
    //Se llama al servicio para subir el podcast al servidor
    this._podcastService.createPodcast(this.token,this.podcast).subscribe(
      //Se establecen los resultados de la peticion
      response=>{
        this.statusMessage.status=response.status;
        this.statusMessage.message=response.message;
        if (this.statusMessage.status=="success"){
          form.reset();
          this.podcast.audio="";
          this.podcast.image="";
        }
      },
      error=>{
        this.statusMessage.status=error.status;
        this.statusMessage.message=error.message;
        console.log(error)
      }
    )
  }

  /**
   * Metodos para establecer los nombres de los archivos de audio e imagen en el objeto Podcast
   * @param data: Datos de los archivos
   */
  imageUpload(data){
    this.podcast.image=data.body.name;
  }

  audioUpload(data){
    if (data.body.name=="ERROR"){
      this.msgError=true;
      this.podcast.audio="";
    }else{
      this.podcast.audio=data.body.name;
      this.msgError=false
    }
  }

}
