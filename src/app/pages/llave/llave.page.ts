import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ReservasI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-llave',
  templateUrl: './llave.page.html',
  styleUrls: ['./llave.page.scss'],
})
export class LlavePage implements OnInit {

  datocodificado: any;
  reservas: ReservasI[] = [];
  idReservas: any;
  ID: any;

  //VARIABLE DONDE SE GUARDA EL ID DEL USUARIO LOGEADO
  uid: String = null;
  constructor(private barcodeScanner: BarcodeScanner,
              public firestore: FirestoreService,
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
    const path = "Reservas/";
    this.firestore.getCollection<ReservasI>(path).subscribe( res => {
    if(res){
      this.reservas = res;
      console.log(this.reservas)
      //PARA OBTENER LOS NOMBRES DE LAS HABITACIONES
      this.reservas.forEach(reservas => {
        console.log(reservas.idReserva);
        this.idReservas = reservas.idReserva;
        });
      }
    });
  }

  CodificarTexto(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.firestore.getId()).then(
      encodedData => {
        console.log();
      },
      err => {
        console.log("Un error ha ocurrido: " + err);
        }
      );
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
}
