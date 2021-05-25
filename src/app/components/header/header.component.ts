import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[
    UserService
  ]
})
export class HeaderComponent implements OnInit {

  public identity;
  public token;
  public url=global.url;

  constructor(private _userService:UserService) { 
  }

  ngOnInit(): void {
  }

  /**
   * Metodo para comprobar si hay un usuario conectado en la página
   */
  ngDoCheck(): void {
    this.loadUser();
  }

  /**
   * Metodo para obtener los datos del usuario que se encuentran en el LocalStorage
   */
  loadUser(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

}
