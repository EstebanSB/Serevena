import { Component, OnInit } from '@angular/core';
import { ReservasI, userI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  reservaciones: ReservasI[] = [];
  
  //VARIABLE DONDE PARA LLAMAR LOS DATOS DE LA PERSONA LOGEADA Y MOSTRARLAS POR PANTALLA
  info: userI = null;

  //VARIABLE DONDE SE GUARDA EL ID DEL USUARIO LOGEADO
  uid: String = null;
  
  //VARIABLE DONDE SE ALOJA FINALMENTE EL ID DEL USUARIO
  ID: any;
  constructor(private firestore: FirestoreService,
              private auth: AuthService) { }

  ngOnInit() {
    //METODO PARA PARA QUE SE IDENTIFIQUE EL ID DEL USUARIO QUE ESTA INICIANDO
    this.auth.stateUser().subscribe( res => {
      console.log('en PERFIL estado: ', res.uid);
      this.ID = res.uid
      this.getUid();
    })
    this.getReservas();
  }

  //FUNCION PARA OBTENER LAS HABITACIONES DESDE FIREBASE
  getReservas(){
    const path = "Reservas/"
    this.firestore.getDocu<ReservasI>(path).subscribe( res => {
      this.reservaciones = res;
      console.log(res);

    });
  }

  //FUNCION PARA OBTENER EL ID DEL USUARIO QUE ESTA LOGEADO DESDE FIREBASE
  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid)
    } else {
      console.log('no existe id')
    }
  }

   //FUNCION PARA OBTENER LA INFORMACION DEL USUARIO QUE ESTA LOGEADO
   getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<userI>(path, id).subscribe( res => {
      if(res){
        this.info = res;
      }
      console.log('los datos son ->', res.nombre)
    })
  }

}
