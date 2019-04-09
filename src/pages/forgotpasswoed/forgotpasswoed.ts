import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the ForgotpasswoedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpasswoed',
  templateUrl: 'forgotpasswoed.html',
})
export class ForgotpasswoedPage {
  forgetpass : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private loading: LoadingController, public menu:MenuController) {
    this.forgetpass = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      });	     
  }
  
  ionViewCanLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswoedPage');
  }

  forgotpass(email)
  {
    let param = new FormData();
    param.append("email",email); 
    
     let loader = this.loading.create({

            content :"Please wait...",
            spinner : 'crescent'
      });

      loader.present();
 
     this.data.forgotPass(param).subscribe(result=>{
 
           // console.log(result);  
            loader.dismiss();   
            console.log(result);
            if(result.status == "ERROR")    
            {
              this.data.presentToast(result.error.email);
            }
            else   
            {
              this.data.presentToast('Password reset instructions are sent to your email');
              this.navCtrl.setRoot(SigninPage); 
            }                      
 
     },err=>{
          loader.dismiss();
          this.data.presentToast("Something went wrong");
     });
  }

}
