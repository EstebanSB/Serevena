import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  userEmail = {
    correo: null,
  };
 
  constructor(private auth: AuthService,
              
              private interactions: InteractionsService,
              private router: Router) { }

  ngOnInit() {
  }
  
  //FUNCION QUE RECUPERA LA CONTRASEÑA
  async recuperar(){
    try{
      const email = this.userEmail.correo;
      await this.auth.resetPassword(email);
      this.interactions.presentToast("Email enviado con exito, Revise su carpeta de entrada.");
      this.router.navigate(['/login']);
    }catch (error){
      this.interactions.presentToast("Debe Ingresar un Email Valido.");
      console.log(error);
    }
  };
}
