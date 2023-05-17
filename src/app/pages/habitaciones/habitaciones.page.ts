import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesI, ReservasI, userI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage implements OnInit {

  rooms: any;
  //VARIABLE DONDE SE GUARDARA EL ID DE LA PERSONA QUE ESTA LOGEADA
  uid: any;

  //VARIBLE DONDE SE GUARDA LA INFORMACION DEL USUARIO LOGEADO
  info: userI = null;

  habitacionFamiliar: HabitacionesI = {
    nombre: '',
    detalles: '',
    detalles2: '',
    detalles3: '',
    capacidad: '',
    password: '',
    precio: '',
    id: ''
  };

  habitacionClasica: HabitacionesI = {
    nombre: '',
    detalles: '',
    detalles2: '',
    detalles3: '',
    capacidad: '',
    password: '',
    precio: '',
    id: '',
  }

  habitacionPremium: HabitacionesI = {
    nombre: '',
    detalles: '',
    detalles2: '',
    detalles3: '',
    capacidad: '',
    password: '',
    precio: '',
    id: '',
  }

  habitacionIndividual: HabitacionesI = {
    nombre: '',
    detalles: '',
    detalles2: '',
    detalles3: '',
    capacidad: '',
    password: '',
    precio: '',
    id: '',
  }
 
  //VARIABLES DONDE SE ALMACENAN LAS FECHAS SELECCIONAS POR PANTALLA
  fechaInicio: any;
  fechaTermino: any;

  //VARIABLE EN DONDE SE GUARDA LA INFORMACION DE LAS RESERVAS
  datos: ReservasI = {
    nombreHabitacion: '',
    fechaInicio: '',
    fechaTermino: '',
    idCliente: '',
    idReserva: ''
  }

  constructor(public firestore: FirestoreService,
              private router: Router,
              private auth: AuthService,
              private interactions: InteractionsService,
              public afs: AngularFirestore) {
                this.infoHabFamiliar();
                this.infoHabClasica();
                this.infoHabPremium();
                this.infoHabIndividual();
               }

  ngOnInit() {
    this.getInfoUser();
    this.getFechaInicio();
    this.getFechaTermino();
    //METODO PARA PARA QUE SE IDENTIFIQUE EL ID DEL USUARIO QUE ESTA INICIANDO
    this.auth.stateUser().subscribe( res => {
      this.getUid();
    })
  }
  

  //FUNCION PARA OBTENER LA INFORMACION DEL USUARIO
  getInfoUser() {
    const path = 'Usuarios';
    const id = '2TTDCieLkFSJFPg6KzjRyfGDSwl2';
    this.firestore.getDoc<userI>(path, id).subscribe( res => {
      if(res){
        this.info = res;
        console.log('EL NOMBRE ES ->', this.info.nombre)
      }
    })
  }
  
  //FUNCION PARA OBTENER EL ID DEL USUARIO DESDE FIREBASE
  async getUid() {
    const uid = await this.auth.getUid();
    if (uid) {
      console.log(uid);
      this.uid = uid;
      const userId = localStorage.setItem('idUser', this.uid);
      console.log('uid ->', this.uid)
    } else {
      console.log('no existe id')
    }
  }

  //FUNCION PARA OBTENER LA FECHA DE INICIO DESDE EL LOCAL STORAGE
  getFechaInicio() {
    this.fechaInicio = localStorage.getItem('fechaInicio');
  }
  //FUNCION PARA OBTENER LA FECHA DE TERMINO DESDE EL LOCAL STORAGE
  getFechaTermino() {
    this.fechaTermino = localStorage.getItem('fechaTermino');
  }
  //FUNCION PARA REGRESAR A LA PANTALLA DE INICIO
  regresar(){
    this.router.navigate(['/inicio']);
  }

  //FUNCION PARA OBTENER LA INFORMACION DE LA HABITACION FAMILIAR
  infoHabFamiliar() {
    const path = 'Habitaciones';
    const id = '0RGCPxZywTkeFwK43DbK';
    this.firestore.getDoc<HabitacionesI>(path, id).subscribe( res => {
      if(res){
        this.habitacionFamiliar = res;
        console.log('EL NOMBRE DE LA HABITACION ES: ', this.habitacionFamiliar.nombre);
        localStorage.setItem('HabitacionFamiliar',this.habitacionFamiliar.nombre);
      };
    });
  };

  //FUNCION PARA SELECCIONAR LA HABITACION FAMILIAR Y QUE SE GUARDE LA INFORMACION EN LA BASE DE DATOS
  seleccionarHabFamiliar() {
    this.datos.nombreHabitacion = localStorage.getItem('HabitacionFamiliar');
    this.datos.fechaTermino = localStorage.getItem('fechaTermino');
    this.datos.fechaInicio = localStorage.getItem('fechaInicio');
    this.datos.idCliente = localStorage.getItem('idUser');
    this.datos.idReserva = this.firestore.getId();
    const id = this.firestore.getId();
    const path = 'Reservas';
    console.log('datos ->', this.datos);
    if(this.firestore.createDoc(this.datos, path, id)){
      this.interactions.presentToast('La Habitacion se ha reservado');
      this.router.navigate(['/inicio']);
      
    }
  }  

  // //FUNCION PARA OBTENER LA INFORMACION DE LA HABITACION
  infoHabClasica() {
    const path = 'Habitaciones';
    const id = 'vcxxzcSljSWGFDX29dBt';
    this.firestore.getDoc<HabitacionesI>(path, id).subscribe( res => {
      if(res){
        this.habitacionClasica = res;
        localStorage.setItem('HabitacionClasica',this.habitacionClasica.nombre);
      }
      console.log('los datos son --------->', this.habitacionClasica.nombre)
    })
  }  

  //FUNCION PARA SELECCIONAR LA HABITACION CLASICA Y QUE SE GUARDE LA INFORMACION EN LA BASE DE DATOS
  seleccionarHabClasica(){
    this.datos.nombreHabitacion = localStorage.getItem('HabitacionClasica');;
    this.datos.fechaTermino = localStorage.getItem('fechaTermino');
    this.datos.fechaInicio = localStorage.getItem('fechaInicio');
    this.datos.idCliente = localStorage.getItem('idUser');
    this.datos.idReserva = this.firestore.getId();
    const id = this.firestore.getId();
    const path = 'Reservas';
    console.log('datos ->', this.datos);
    if(this.firestore.createDoc(this.datos, path, id)){
      this.interactions.presentToast('La Habitacion se ha reservado');
      this.router.navigate(['/inicio']);
      
    }
  }


  // //FUNCION PARA OBTENER LA INFORMACION DE LA HABITACION PREMIUM
  infoHabPremium() {
    const path = 'Habitaciones';
    const id = 'FHqX2lhr2SBxTYIhCTOu';
    this.firestore.getDoc<HabitacionesI>(path, id).subscribe( res => {
      if(res){
        this.habitacionPremium = res;
        localStorage.setItem('HabitacionPremium',this.habitacionPremium.nombre);
      }
      console.log('los datos son --------->', this.habitacionPremium.nombre)
    })
  }   

  //FUNCION PARA SELECCIONAR LA HABITACION PREMIUM Y QUE SE GUARDE LA INFORMACION EN LA BASE DE DATOS
  seleccionarHabPremium() {
    this.datos.nombreHabitacion = localStorage.getItem('HabitacionPremium');;
    this.datos.fechaTermino = localStorage.getItem('fechaTermino');
    this.datos.fechaInicio = localStorage.getItem('fechaInicio');
    this.datos.idCliente = localStorage.getItem('idUser');
    this.datos.idReserva = this.firestore.getId();
    const id = this.firestore.getId();
    const path = 'Reservas';
    console.log('datos ->', this.datos);
    if(this.firestore.createDoc(this.datos, path, id)){
      this.interactions.presentToast('La Habitacion se ha reservado');
      this.router.navigate(['/inicio']);
    }
  }

  // //FUNCION PARA OBTENER LA INFORMACION DE LA HABITACION PREMIUM
  infoHabIndividual() {
    const path = 'Habitaciones';
    const id = 'tftSzzN0OeFWvuvDx5uK';
    this.firestore.getDoc<HabitacionesI>(path, id).subscribe( res => {
      if(res){
        this.habitacionIndividual = res;
        localStorage.setItem('HabitacionIndividual',this.habitacionIndividual.nombre);
      }
      console.log('los datos son --------->', this.habitacionIndividual.nombre)
    })
  }   

  //FUNCION PARA SELECCIONAR LA HABITACION PREMIUM Y QUE SE GUARDE LA INFORMACION EN LA BASE DE DATOS
  seleccionarHabIndividual() {
    this.datos.nombreHabitacion = localStorage.getItem('HabitacionIndividual');;
    this.datos.fechaTermino = localStorage.getItem('fechaTermino');
    this.datos.fechaInicio = localStorage.getItem('fechaInicio');
    this.datos.idCliente = localStorage.getItem('idUser');
    this.datos.idReserva = this.firestore.getId();
    const id = this.firestore.getId();
    const path = 'Reservas';
    console.log('datos ->', this.datos);
    if(this.firestore.createDoc(this.datos, path, id)){
      this.interactions.presentToast('La Habitacion se ha reservado');
      this.router.navigate(['/inicio']);
    }
  }    

}