import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverTransactionsPage } from './driver-transactions';

@NgModule({
  declarations: [
    DriverTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverTransactionsPage),
  ],
})
export class DriverTransactionsPageModule {}
