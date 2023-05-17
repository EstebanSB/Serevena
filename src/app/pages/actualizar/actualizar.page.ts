import { Component, OnInit } from '@angular/core';
import { userI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { InteractionsService } from 'src/app/services/interactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  userEmail = {
    correo: null,
  };

  uid: string;
  ID: any;
  userInfo: userI;
  id: any;
  idReserva: any;
  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              public alertController: AlertController,
              private interaction: InteractionsService,
              public router: Router) { }

  async ngOnInit() {
    //METODO PARA PARA QUE SE IDENTIFIQUE EL ID DEL USUARIO QUE ESTA INICIANDO
    this.auth.stateUser().subscribe( res => {
      console.log('en PERFIL estado: ', res.uid);
      this.ID = res.uid
      localStorage.setItem('IdCliente',this.ID);
      this.getUid();
    });
  }

  //FUNCION PARA OBTENER EL ID DEL USUARIO DESDE FIREBASE
  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid)
      this.getInfoUser();
    } else {
      console.log('no existe id')
    }
  }

  //FUNCION PARA OBTENER LA INFORMACION DEL USUARIO
  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<userI>(path, id).subscribe( res => {
      if(res){
        this.userInfo = res;
      }
      console.log('los datos son ->', this.userInfo.correo);
      localStorage.setItem('CorreoUsuario',this.userInfo.correo);
    })
  }    

  //FUNCION PARA EDITAR EL NOMBRE
  async editarNombre() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Nombre',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingrese Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (ev) => {
            console.log('Confirm Ok');
            this.saveNombre(ev.nombre);
          }
        }
      ]
    });

    await alert.present();
  }

  //FUNCION QUE ACTUALIZA EL NOMBRE EN LA BASE DE DATOS
  saveNombre(nombreInput: any){
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      nombre: nombreInput
    };
    this.firestore.updateDoc(path, id, updateDoc).then( (res) => {
      this.interaction.presentToast('Dato Actualizado con Éxito!')
    })
  }


  //FUNCION PARA EDITAR EL APELLIDO
  async editarApellido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Apellido',
      inputs: [
        {
          name: 'apellido',
          type: 'text',
          placeholder: 'Ingrese Apellido'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (ev) => {
            console.log('Confirm Ok');
            this.saveApellido(ev.apellido);
          }
        }
      ]
    });

    await alert.present();
  }

  //FUNCION QUE ACTUALIZA EL APELLIDO EN LA BASE DE DATOS
  saveApellido(apellidoInput: any){
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      apellido: apellidoInput
    };
    this.firestore.updateDoc(path, id, updateDoc).then( (res) => {
      this.interaction.presentToast('Dato Actualizado con Éxito!')
    })
  }

  //FUNCION PARA EDITAR EL CELULAR
  async editarCelular() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Celular',
      inputs: [
        {
          name: 'celular',
          type: 'text',
          placeholder: 'Ingrese Celular'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (ev) => {
            console.log('Confirm Ok');
            this.saveCelular(ev.celular);
          }
        }
      ]
    });

    await alert.present();
  }

  //FUNCION QUE ACTUALIZA EL CELULAR EN LA BASE DE DATOS
  saveCelular(celularInput: any){
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      celular: celularInput
    };
    this.firestore.updateDoc(path, id, updateDoc).then( (res) => {
      this.interaction.presentToast('Dato Actualizado con Éxito!')
    })
  }

  //FUNCION PARA EDITAR EL CORREO
  async editarCorreo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Correo',
      inputs: [
        {
          name: 'correo',
          type: 'text',
          placeholder: 'Ingrese Correo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (ev) => {
            console.log('Confirm Ok');
            this.saveCorreo(ev.correo);
          }
        }
      ]
    });

    await alert.present();
  }

  //FUNCION QUE ACTUALIZA EL CORREO EN LA BASE DE DATOS
  saveCorreo(correoInput: any){
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      correo: correoInput
    };
    this.firestore.updateDoc(path, id, updateDoc).then( (res) => {
      this.interaction.presentToast('Dato Actualizado con Éxito!')
    })
  }

  //FUNCION QUE RECUPERA LA CONTRASEÑA
  async recuperar(){
    try{
      const email = localStorage.getItem('CorreoUsuario');
      await this.auth.resetPassword(email);
      this.interaction.presentToast("Email enviado con éxito, Revise su carpeta de entrada.");
    }catch (error){
      console.log(error);
    }
  };

  //FUNCION QUE PREGUNTA SI QUIERES CAMBIAR LA CONTRASEÑA
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cambiar Contraseña',
      message: 'Se enviará un correo a su bandeja de entrada para cambiar su contraseña.<br><br> ¿Desea Continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.recuperar();
          }
        }
      ]
    });

    await alert.present();
  };

}
