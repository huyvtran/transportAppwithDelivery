import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private loading: LoadingController) {
    this.forgetpass = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      });	     
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

            if(result.status == "ERROR")    
            {
              this.data.presentToast(result.error);
            }
            else   
            {
              this.data.presentToast('Password reset instructions are sent to your email');
              this.navCtrl.setRoot(SigninPage); 
            }                      
 
     });
  }

}
