import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Router, Params, NavigationExtras } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear, getDay } from 'date-fns';
import { userI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild(IonDatetime) datetime2: IonDatetime;
 
  //llamo a los datos creados en login.page.ts
  credenciales = {
    correo: localStorage.getItem("correo"),
    password: localStorage.getItem("password")
  }
  //VARIABLE QUE SE OBTIENE AL SELECCIONAR LA FECHA DE INICIO
  today: any;

  //VARIABLE DONDE SE ALMACENARA LA FECHA MINIMA DE LA FECHA DE TERMINO
  FechaMinima: any;

  login: boolean = false;
  uid: String = null;
  //VARIABLE DONDE PARA LLAMAR LOS DATOS DE LA PERSONA LOGEADA Y MOSTRARLAS POR PANTALLA
  info: userI = null;
  
  //VARIABLES DE LA FECHA INICIO
  formattedString = '';
  showPicker = false;

  //VARIABLES DE LA FECHA TERMINO
  formattedString2 = '';
  showPicker2 = false;

  ID: any;

  //CONSTRUCTOR
  constructor(private auth: AuthService,
              private interaction: InteractionsService,
              private firestore: FirestoreService,
              private router: Router) 
  {
    //this.dateValue2 = "2020-12-01"; 
            
    //PARA SABER SI EL USUARIO ESTA LOGEADO O NO
    this.auth.stateUser().subscribe( res =>{
      if(res) {
        console.log('esta logeado');
        this.login = true;
      }else{
        console.log('no esta logeado');
        this.login = false;
      }
    })
  }

  ngOnInit() {
    this.getDate();
    //METODO PARA PARA QUE SE IDENTIFIQUE EL ID DEL USUARIO QUE ESTA INICIANDO
    this.auth.stateUser().subscribe( res => {
      console.log('en PERFIL estado: ', res.uid);
      this.ID = res.uid
      this.getUid();
    })
    this.formattedString2 = '';
    this.formattedString = '';
  }

  //FUNCION QUE HACE QUE LA FECHA MINIMA DE LA FECHA DE INICIO SEA MENOR A LA FECHA DE HOY
  getDate() { 
    const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + 
    (date.getMonth() + 1)).slice(-2) + '-' + 
    ('0' + date.getDate()).slice(-2); console.log(this.today); 
  }  

  //FUNCION PARA LA FECHA DE INICIO
  dateChanged(value: string) {
    this.formattedString = format(parseISO(value), "dd-MM-yyyy");
    localStorage.setItem('fechaInicio',  this.formattedString);
    this.showPicker = false;
    this.FechaMinima = value;
    console.log('test');
    console.log(this.formattedString);
  }

  //FUNCION PARA LA FECHA DE TERMINO
  dateChanged2(value: string) {
    this.formattedString2 = format(parseISO(value), "dd-MM-yyyy");
    localStorage.setItem('fechaTermino',  this.formattedString2);
    this.showPicker2 = false;

    console.log('test');
    console.log(this.formattedString2);
  }

  //FUNCION QUE CIERRA EL CAMPO DE FECHA
  Cancelar() {
    this.datetime.cancel(true);
  }

  //FUNCION QUE SELECCIONA EL CAMPO DE FECHA
  Aceptar() {
    this.datetime.confirm(true);
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
        this.info = res;
      }
      console.log('los datos son ->', res.nombre)
    })
  }

  logout(){
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
    this.interaction.presentToast('La sesión se ha cerrado')
  }

  habitaciones(){
    this.router.navigate(['/habitaciones'])
    window.location.assign('/habitaciones');
  }

}
