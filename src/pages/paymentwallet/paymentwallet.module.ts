import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentwalletPage } from './paymentwallet';

@NgModule({
  declarations: [
    PaymentwalletPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentwalletPage),
  ],
})
export class PaymentwalletPageModule {}
