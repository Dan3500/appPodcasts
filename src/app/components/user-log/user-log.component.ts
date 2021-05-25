import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Status } from '../../models/status';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css'],
  providers:[
    UserService
  ]
})
export class UserLogComponent implements OnInit {

  public user:User; //Objeto de usuario de registro
  public userLog:User; //Objeto de usuario de login
  public repPass=""; //Elemento de contraseña repetida para comprobar que las contraseñas del registro son iguales
  public identity:any; //Datos del usuario
  public token:string; //Token del usuario
  //Objetos para almacenar los datos de las peticiones HTTP que se realicen
  public statusLog:Status; //Status del Login
  public statusReg:Status; //Status del Register


  constructor(private _userService:UserService,
              private _router:Router,
              private _route:ActivatedRoute) { 
    this.user=new User(1,'','','','','');
    this.userLog=new User(1,'','','','','');
    this.statusLog=new Status();
    this.statusReg=new Status();
  }

  /**
   * Se llama al metodo que comprueba si el usuario ha cerrado sesión 
   * o se comprueba que esté logueado en la página
   * 
   */
  ngOnInit(): void {
    this.logout();
    /*Si el usuario está logueado en la página, se le redigirá a la página principal
      y no se le dejará entrar en esta página */
    if (this._userService.getToken()!=null){
      this._router.navigate(["/home"])
    }
  }

  /**
   * Metodo para registrar un usuario en la base de datos
   * Este metodo se activa al pulsar el botón de "Registrarse"
   * @param form: Form Objeto del formulario registerForm
   */
  register(form){
    //Se comprueban que las contraseñas coincidan
    if (this.repPass!=this.user.password){
      this.statusReg.status="error";
      this.statusReg.message="Las contraseñas no coinciden";
    }else{
      //Si las contraseñas coinciden, se hará la petición al back-end
      this._userService.registerUser(this.user).subscribe(
        response=>{
          this.statusReg.status=response.status;
          this.statusReg.message=response.message;
          if (response.status=="success"){
            form.reset();
          }
        },
        error=>{
          console.log(error)
          this.statusReg.status="error";
          this.statusReg.message="Error del servidor, intentalo de nuevo más tarde";
        });
    }
  }

  /**
   * Metodo para loguear a un usuario en la base de datos
   * Este metodo se activa al pulsar el botón de "Iniciar sesión"
   * @param form: Form Objeto del formulario loginForm
   */
  login(form){
    //Se hace una petición al back-end para recibir los datos del usuario (identity)
    this._userService.loginUser(this.userLog).subscribe(
      response=>{
        //Si no hay errores, se obtendrá la identidad del usuario
        if (response.status!="error"){
          this.identity=response;
          this._userService.loginUser(this.userLog,true).subscribe(
            response=>{
              //Si se obtiene el token correctamente
              if (response){
                this.token=response;
                this.statusLog.status="success";
                //Se establecen los datos del usuario y el token en el LocalStorage
                localStorage.setItem("token",this.token);
                localStorage.setItem("identity",JSON.stringify(this.identity));
                this._router.navigate(["/home"]);//Se redirige al usuario al inicio
              }else{//ERROR al generar el token
                this.statusLog.status=response.status;
                this.statusLog.message=response.message;
              }
            },
            error=>{
              console.log(error)
              this.statusLog.status="error";
              this.statusLog.message="Error del servidor, intentalo de nuevo más tarde";
            });
        }else{//ERROR de credenciales incorrectas
          this.statusLog.status=response.status;
          this.statusLog.message=response.message;
        }
    },
    error=>{
      console.log(error)
      this.statusLog.status="error";
      this.statusLog.message="Error del servidor, intentalo de nuevo más tarde";
    });
  }

  /**
   * Metodo para comprobar si el usuario ha cerrado sesión.
   * Se cierra sesión si recibe un parametro por la url. Si no, no se cerrará la sesion
   * Este metodo se llama en el método ngOnInit y se comprueba cada vez que el usuario entre
   * en esta página
   */
  logout(){
    this._route.params.subscribe(
      params=>{
        //Se intenta recoger el parámetro de la url
        let logout=params["salir"];

        if (logout==1){//Si se obtiene un dato, se cerrará sesión
          localStorage.removeItem("identity");
          localStorage.removeItem("token");

          this.token=null;
          this.identity=null;

          this._router.navigate(["/logs"]);
        }
      }
    )
  }
}
