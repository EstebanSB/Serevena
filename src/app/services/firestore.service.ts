import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
 
  constructor(private firestore: AngularFirestore,
              private auth: AuthService,
              ) { }
  //CREAR UN DOCUMENTO EN LA BASE DE DATOS
  createDoc(data: any, path: any, id: any ) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  //FUNCION QUE RETORNA UN CODIGO ALEATORIO
  getId(){
    return this.firestore.createId();
  }

  //FUNCION GENERICA PARA LEER CUALQUIER DATO DE LA BASE DE DATOS
  getDoc<tipo>(path: string, id: any) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

 //FUNCION GENERICA PARA LEER CUALQUIER DATO DE LA BASE DE DATOS
  getRooms(path: string, id: any) {
  const collection = this.firestore.collection(path);
  return collection.doc(id).valueChanges();
  }

  //FUNCION GENERICA PARA LEER CUALQUIER DATO DE LA BASE DE DATOS SIN ID COMO PARAMETRO
  getDocu<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  //FUNCION GENERICA PARA LEER CUALQUIER ARREGLO DE LA BASE DE DATOS
  getCollection<tipo>(path: any) {
      const collection = this.firestore.collection<tipo>(path);
      return collection.valueChanges();
  }

  updateDoc(path: any, id, data: any){
    return this.firestore.collection(path).doc(id).update(data);
  }

}

