import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: userI = {
    nombre: null,
    apellido: null,
    celular: null,
    correo: null,
    password: null,
    perfil: 'visitante',
    uid: null
  }

  myForm:any;
  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              private interaction: InteractionsService,
              private router: Router) { }
              
  ngOnInit() {
  }

  //FUNCION PARA REGISTRAR USUARIOS
  async registro() {
    console.log('datos ->', this.datos);
    const res = await this.auth.registrar(this.datos).catch( error => {
      this.interaction.presentToast('Error al Registrarse, Revise los datos ingresados.')
      console.log('error');
    })
    if(res) {
      console.log('EXITO AL CREAR EL USUARIO');
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      const path = 'Usuarios';
      //const path = 'Usuarios/' + this.datos.uid + '/Reservas';
      await this.firestore.createDoc(this.datos, path, id)
      this.interaction.presentToast('Registrado Con Exito!')
      this.router.navigate(['/inicio']);
    }
  }

}
