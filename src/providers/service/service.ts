import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{LoadingController,ToastController,AlertController} from 'ionic-angular';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
loader:any;
  constructor(public http: HttpClient,private loadCtrl:LoadingController,private toastCtrl:ToastController,private alertCtrl:AlertController) {
    console.log('Hello ServiceProvider Provider');
  }
  presentLoader(msg) {

    this.loader = this.loadCtrl.create({
 
         content : msg,
         spinner : 'bubbles'
    });
 
    this.loader.present();
  }
 
  dismissLoader() {
 
    this.loader.dismiss();
  }
 
  presentToast(msg) {
 
    let bread = this.toastCtrl.create({
 
      message : msg,
      duration : 2000,
      position : 'middle'
 
    });
 
    bread.present();
  }
  validator(msg){
    let prompt = this.alertCtrl.create({
      title: 'Error',
      message: msg,
     
      buttons: [
        {
          text: 'Dismiss',
          handler: data => {
                        
                    }
        }
      ]
    });
    prompt.present();
  }
  presentConfirmationAlert(msg){
    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    let confirmAlert = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            resolveFunction(true)
          }
        },
        {
          text: 'No',
          handler: () => {
            resolveFunction(false)
          }
        }
      ]
    });
    confirmAlert.present();
    return promise;
  }
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }}
