import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  
  constructor(public toastController: ToastController,
              public loadingController: LoadingController) { }

  //FUNCION PARA LLAMAR AL TOAST DESDE CUALQUIER PARTE SOLO INYECTANDO LA FUNCIÓN
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }

}
