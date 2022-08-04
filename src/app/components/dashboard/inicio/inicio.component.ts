import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  baseURL:string = environment.baseURL;
  name:string = 'usuario';
  image:string = `${environment.baseURL}/images/users/`;
  constructor(private loginService: LoginService) {

   }

  ngOnInit(): void {
      this.name = localStorage.getItem('name') || 'Usuario';
      this.image += localStorage.getItem('image') || 'user';

  }

}
