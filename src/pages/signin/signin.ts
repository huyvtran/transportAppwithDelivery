import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController,Events } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { OneSignal } from '@ionic-native/onesignal';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ForgotpasswoedPage } from '../forgotpasswoed/forgotpasswoed';
import { EmailverificationPage } from '../emailverification/emailverification';
import { CustomerProfilePage } from '../customer-profile/customer-profile';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {    
  signin : any;
  lat : any;
  long : any;
  isRemember :any = false;

  constructor( private oneSignal: OneSignal, public navCtrl: NavController,private androidPermissions: AndroidPermissions, public alertCtrl: AlertController, public data : DataProvider, private storage: Storage, private loading: LoadingController,public events: Events, public geolocation: Geolocation) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {console.log('Has permission?',result.hasPermission); 
      //alert('result.hasPermission==>'+result.hasPermission);
      if(result.hasPermission == false)
      {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      }
    },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );
    this.signin = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      });	     
  }      

  ionViewCanLeave(){
    
  }

  createUser(user) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now());
  }
 
  red_list(){
  	this.navCtrl.push(SignupPage);
  }   
     

  signIn(uname,pass)
  {  
   //if(this.isRemember == true)
    //{
      this.storage.set('isRemember', true); 
   // }
    
    let param = new FormData();
    param.append("email",uname);    
    param.append("password",pass);  
        
     let loader = this.loading.create({
        content :"",
        spinner : 'crescent'
      });

      loader.present();
 
     this.data.userSignIn(param).subscribe(result=>{
           console.log(result);  
            if(result.status == "ERROR")
            {
                this.data.presentToast('Invalid Username or Password!');
                loader.dismiss(); 
            }
            else   
            {
              console.log(result.success.user);
              this.createUser(result.success.user);
            
              if(result.success.user[0].active == 1)    
              {   
                this.storage.set("token",result.success.token);
                this.storage.set("user",result.success.user);
                
                setTimeout(() => {
                if(result.success.user[0].role == 2)
                {
                  this.oneSignal.sendTag('customer_id',result.success.user[0].id);
                  this.navCtrl.setRoot(HomePage); 
                  loader.dismiss();
                }else if(result.success.user[0].role == 3){
                  this.oneSignal.sendTag('driver_id',result.success.user[0].id);
                  let param = result.success.user[0].id; 
                  this.data.getDriverProfile(param).subscribe(result=>{
                         
                    if(result.status == 'OK')    
                    {
                      if(result.success.profile.is_completed == 0)
                      {
                        this.data.getToken();
                        loader.dismiss(); 
                        this.navCtrl.push(EditProfilePage);  
                      }
                      else
                      {
                        this.data.getToken();
                        loader.dismiss(); 
                        this.navCtrl.setRoot(HomePage);  
                      }
                      
                    }   
                    else{ 
                      //this.data.presentToast('Unable to get your Profile data!');
                      this.storage.get('isProfile_Complete').then(data1=>{
                        if(data1 == null || data1 == undefined || data1 == false)
                        {
                          //this.storage.set('showSlide', false);
                          //show slide logic should run
                          this.data.getToken();
                          loader.dismiss();
                          this.navCtrl.push(EditProfilePage);       
                        }    
                        else{
                          this.data.getToken();
                          loader.dismiss();
                          this.navCtrl.setRoot(HomePage);
                        }
                      });
                    }
                 }); 
                }  
                }, 2500);   
                
              }
              else
              {    
                loader.dismiss(); 
                //this.navCtrl.push(EmailverificationPage,{data:result.success.user}); 
                this.navCtrl.push(EmailverificationPage,{first_name:result.success.user[0].first_name,last_name:result.success.user[0].last_name,email:result.success.user[0].email});  
                
              }    
            }                           
 
     });
  }    
  
  public notify(isRemember) {
    //console.log("Toggled: "+ isRemember);
    this.isRemember = !isRemember
    //console.log("Toggled: "+ this.isRemember); 
  }
          
  gotoForgotPass()    
  {
    this.navCtrl.push(ForgotpasswoedPage);            
  }   
}
