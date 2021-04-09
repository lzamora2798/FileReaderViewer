import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkPageRoutingModule } from './link-routing.module';

import { LinkPage } from './link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkPageRoutingModule
  ],
  declarations: [LinkPage]
})
export class LinkPageModule {}
