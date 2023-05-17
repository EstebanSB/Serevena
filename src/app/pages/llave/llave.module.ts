import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlavePageRoutingModule } from './llave-routing.module';

import { LlavePage } from './llave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlavePageRoutingModule
  ],
  declarations: [LlavePage]
})
export class LlavePageModule {}
