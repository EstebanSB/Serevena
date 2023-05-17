import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userI } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth) {}

  
  //FUNCION GENERICA PARA INICIAR SESION CON CORREO Y PASS
  login(correo: string, password: string) {
    return this.authfirebase.signInWithEmailAndPassword(correo, password);
  }
  //FUNCION PARA CERRAR SESION
  logout() {
    this.authfirebase.signOut();
  }
  //FUNCION PARA REGISTRAR USUARIOS EN FIREBASE
  registrar(datos: userI) {
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  stateUser() {
    return this.authfirebase.authState
  }

  //FUNCION QUE OBTIENE EL ID DEL USUARIO QUE ESTA LOGEADO
  async getUid() {
    const user: any = await this.authfirebase.currentUser;
    if (user) {
      return user.uid;
    } else{
      return null;
    }
  }

  //FUNCION PARA RECUPERAR CONTRASEÑA
  async resetPassword(email: string): Promise<void> {
    try{
      return this.authfirebase.sendPasswordResetEmail(email);
    } catch(error){
      console.log(error);
    }
  };

}
