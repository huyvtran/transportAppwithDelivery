import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalpagePage } from './modalpage';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ModalpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalpagePage),
    Ionic2RatingModule
  ],
})
export class ModalpagePageModule {}
