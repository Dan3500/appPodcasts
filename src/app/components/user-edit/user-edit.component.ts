import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[
    UserService
  ]
})
export class UserEditComponent implements OnInit {

  public identity;
  public token;
  public user:any;
  public statusMod:Status;
  public url=global.url;

  //Configuraciones de los campos de envío de archivos 
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: this.url+"user/upload",
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
    attachPinText: "Sube tu avatar",
    replaceTexts: {
      selectFileBtn: 'Select Files',
      uploadBtn: 'Upload',
      attachPinBtn: 'Sube tu avatar',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(private _userService:UserService,
              private _route:ActivatedRoute,
              private _router:Router) { 
    this.statusMod=new Status();
    this.user=new User(1,'','','','','');
  }

  /**
   * Metodo inicial que comprueba si el usuario está logueado en la página
   * y le redirige a la página de inicio de sesión y registro si no
   * está logueado
   */
  ngOnInit(): void {
    this.loadUser();
    //Si no hay ningun usuario conectado, se volverá a la página de registro e inicio de sesión
    if (this._userService.getToken()==null){
      this._router.navigate(["/logs"])
    }else{
      this.obtenerInfoUser(this.identity.user_id);
    }
  }

  /**
   * Metodo para comprobar si hay un usuario conectado en la página
   */
  ngDoCheck(): void {
    this.loadUser();
  }

  /**
   * Obtener los datos de un usuario especifico
   * @param id: id del usuario
   */
  obtenerInfoUser(id){
    this._userService.getUserData(this.token,id).subscribe(
      response=>{
        if (response.user.id!=this.identity.user_id){
          this._router.navigate(["/home"])
        }else{
          this.user=response.user
        }
      },
      error=>{
        this.statusMod.message=error.message;
        console.log(error)
      }
    )
  }

  /**
   * Metodo para editar los datos del ususario
   * @param form 
   */
  editarUsuario(form){
    this._userService.editUser(this.token,this.user).subscribe(
      response=>{
        this.user.user_id=response.user.id;
        localStorage.setItem("identity",JSON.stringify(this.user));
        this.statusMod.message=response.message;
        this.statusMod.status=response.status;
      },
      error=>{
        this.statusMod.message=error.message;
        this.statusMod.status=error.status;
        console.log(error)
      }
    )
  }

  /**
   * Metodo para obtener los datos del usuario que se encuentran en el LocalStorage
   */
  loadUser(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  /**
   * Subir imagen de usuario al servidor
   * @param data 
   */
  imageUpload(data){
    this.user.image=data.body.name;
  }

}
