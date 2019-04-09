import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideNowPage } from './ride-now';

@NgModule({
  declarations: [
    RideNowPage,
  ],
  imports: [
    IonicPageModule.forChild(RideNowPage),
  ],
})
export class RideNowPageModule {}
