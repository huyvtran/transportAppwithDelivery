import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackageBookingPage } from './package-booking';

@NgModule({
  declarations: [
    PackageBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(PackageBookingPage),
  ],
})
export class PackageBookingPageModule {}
