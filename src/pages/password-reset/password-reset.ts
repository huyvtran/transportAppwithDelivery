import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController  } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { CustomerProfilePage } from '../customer-profile/customer-profile';

/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */      

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  password = [];
  change_pass : any;  
  customer_id : any;  
  
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
  passwordType2: string = 'password';
  passwordIcon2: string = 'eye-off';
  passwordType3: string = 'password';
  passwordIcon3: string = 'eye-off';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider,private loading: LoadingController, private storage: Storage) {
    this.change_pass = new FormGroup({    
      current_pass: new FormControl('', [Validators.required,Validators.minLength(6)]),
      new_pass: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirm_new_pass: new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  updatePassword(password)
  {
    //console.log(password['current_pass']);

      if(this.password['new_pass'] !== this.password['confirm_new_pass'])
      {
        this.data.presentToast('New Password and Confirm New Password must match!');
        return false;
      }else if(this.password['new_pass'] == this.password['current_pass']){

        this.data.presentToast('Old Password and New Password are same.');
        return false;
      }       
      
      this.storage.get('user').then(data=>{   
        //console.log(data); 
        //let param = new FormData();
        this.customer_id = data[0].id;
 
        let param = new FormData();
        if(data[0].role==2)
        {
          param.append("customer_id",this.customer_id);
        }
        else if(data[0].role==3)
        {
          param.append("driver_id",this.customer_id);
        }
        param.append("current_password",this.password['current_pass']);   
        param.append("password",this.password['confirm_new_pass']);     
        param.append("c_password",this.password['confirm_new_pass']);
  
        let loader = this.loading.create({
  
              content :"Please wait...",
              spinner : 'crescent'
          });
  
          loader.present();     
          
          if(data[0].role==2)
          {
            this.data.custChangePass(param).subscribe(result=>{   
              //console.log(result);    
              //this.userData = result; 
              loader.dismiss();   
              if(result.status == "ERROR")
              {
                  this.data.presentToast(result.error.password);
                  return false;
              }
              else
              {
                //this.storage.set("customer_data",data.msg[0]);
                this.data.presentToast('Password changed  successfully!');
                setTimeout(()=>{
                  this.navCtrl.setRoot(CustomerProfilePage);
                },3000)
                     
              }                    
            });
          }
          else if(data[0].role==3)
          {
            this.data.driverChangePass(param).subscribe(result=>{   
              //console.log(result);    
              //this.userData = result; 
              loader.dismiss();   
              if(result.status == "ERROR")
              {
                  this.data.presentToast(result.error.password);
                  return false;
              }
              else
              {
                //this.storage.set("customer_data",data.msg[0]);
                this.data.presentToast('Password Changed successfully!');
                setTimeout(()=>{
                  this.navCtrl.setRoot(CustomerProfilePage);
                },3000);
                     
              }                    
            });
          }
          
      });

  }

  hideShowPassword(type){
      if(type == 0){
        this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
        this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
      }else if(type == 1){
        this.passwordType2 = this.passwordType2 === 'text' ? 'password' : 'text';
        this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
      }else{
        this.passwordType3 = this.passwordType3 === 'text' ? 'password' : 'text';
        this.passwordIcon3 = this.passwordIcon3 === 'eye-off' ? 'eye' : 'eye-off';
      }
  }

}
