import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadProfilePage } from './upload-profile';

@NgModule({
  declarations: [
    UploadProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UploadProfilePage),
  ],
})
export class UploadProfilePageModule {}
