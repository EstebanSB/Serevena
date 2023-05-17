import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { InteractionsService } from 'src/app/services/interactions.service';
import { userI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correo: null,
    password: null
  }

  datos: userI = {
    nombre: null,
    apellido: null,
    celular: null,
    correo: null,
    password: null,
    perfil: 'visitante',
    uid: null
  }

  constructor(private auth: AuthService, 
              private router: Router, 
              private interaction: InteractionsService,
              private firestore: FirestoreService) { }

  ngOnInit() {
  }

  //FUNCION PARA INGRESAR A LA APLICACION
  //VALIDA QUE LOS DATOS INGRESADOS EN EL LOGIN CORRESPONDAN A LOS QUE ESTAN REGISTRADOS EN FIREBASE 
  async ingresar(){
    console.log('credenciales ->', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error => {
      console.log('error')
      this.interaction.presentToast('Usuario o Contraseña Invalido')
    })
    if (res) {
      console.log('res ->', res);
      localStorage.setItem('ingresado', 'true');
      this.interaction.presentToast('Ingresado con Exito');
      this.router.navigate(['/inicio']);
    }
  }

  //FUNCION PARA LOGEARSE CON GOOGLE
  // loginWithGoogle(){
  //   console.log(this.credenciales);
  //   const {correo, password} = this.credenciales;
  //   this.auth.loginGoogle(correo,password).then(res => {
  //     console.log('EXITO AL CREAR EL USUARIO');
  //     const path = 'Usuarios';
  //     const id = res.user.uid;
  //     this.datos.uid = id;
  //     this.datos.password = null;
  //     this.firestore.createDoc(this.datos, path, id)
  //     this.interaction.presentToast('Registrado Con Exito!')
  //     this.router.navigate(['/inicio']);
  //     console.log("se registro", res);
  //   })
    
  // }

}
