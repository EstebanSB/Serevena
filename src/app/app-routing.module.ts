import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogeadoGuard } from './guards/logeado.guard';
import { NoLogeadoGuard } from './guards/no-logeado.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'habitaciones',
    redirectTo: 'habitaciones',
    pathMatch: 'full'
  },
  {
    path: 'historial',
    redirectTo: 'historial',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'llave',
    redirectTo: 'llave',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    redirectTo: 'recuperar',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'ubicacion',
    redirectTo: 'ubicacion',
    pathMatch: 'full'
  },
  {
    path: 'actualizar',
    redirectTo: 'actualizar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoLogeadoGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [LogeadoGuard]
  },
  {
    path: 'llave',
    loadChildren: () => import('./pages/llave/llave.module').then( m => m.LlavePageModule),
    canActivate: [LogeadoGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule),
    canActivate: [LogeadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoLogeadoGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule),
    canActivate: [NoLogeadoGuard]
  },
  {
    path: 'habitaciones',
    loadChildren: () => import('./pages/habitaciones/habitaciones.module').then( m => m.HabitacionesPageModule),
    canActivate: [LogeadoGuard]
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./pages/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule),
    canActivate: [LogeadoGuard]
  },
  {
    path: 'actualizar',
    loadChildren: () => import('./pages/actualizar/actualizar.module').then( m => m.ActualizarPageModule),
    canActivate: [LogeadoGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
