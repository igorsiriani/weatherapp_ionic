import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomorrowPageRoutingModule } from './tomorrow-routing.module';

import { TomorrowPage } from './tomorrow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomorrowPageRoutingModule
  ],
  declarations: [TomorrowPage]
})
export class TomorrowPageModule {}
