import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController,Events, MenuController } from 'ionic-angular';
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
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {    
  signin : any;
  lat : any;
  long : any;
  isRemember :any = false;
  uname:string = '';
  pass:string = '';
  flag = 0;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor( private oneSignal: OneSignal, public navCtrl: NavController,private androidPermissions: AndroidPermissions, public alertCtrl: AlertController, public data : DataProvider, private storage: Storage, private loading: LoadingController,public events: Events, public geolocation: Geolocation, public menu:MenuController,public service:ServiceProvider) {

    
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
    this.menu.swipeEnable(true);
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
    this.storage.get("isChecked").then(data=>{
        if(data != null){
          this.isRemember = true;
          this.flag = 1;
          this.storage.get('isChecked').then(data=>{
            console.log("!@#!@!@#@!@#@!@#@@!@#@!@!");
            console.log(data);
            this.uname = data.uname;
            this.pass = data.pass;

            console.log(this.uname+" "+this.pass);
          });
        }
    })
  }

  createUser(user,token) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now(),token);
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
        content :"Please wait...",
        spinner : 'crescent'
      });

      loader.present();
 
     this.data.userSignIn(param).subscribe(result=>{
           console.log(result);  
            if(result.status == "ERROR")
            {
                //this.data.presentToast('Invalid Username or Password!');
                this.data.presentToast(result.error);
                loader.dismiss(); 
            }
            else   
            {
              console.log(result.success.user);
            //  this.createUser(result.success.user);
            
              if(result.success.user[0].active == 1)
              {   

                console.log(result.success.token);

                this.storage.set("token",result.success.token).then(()=>{
                    this.createUser(result.success.user,result.success.token);
                });
                
                this.storage.set("user",result.success.user);

                if(this.isRemember == true){

                  let data = { "uname": this.uname, "pass": this.pass };
                  this.storage.set("isChecked",data); 


                }else{
                  this.storage.remove("isChecked");
                }
                  
                
                
              //  setTimeout(() => {
                if(result.success.user[0].role == 2)
                {
                  this.oneSignal.sendTag('customer_id',result.success.user[0].id);
                  this.navCtrl.setRoot(HomePage); 
                  this.events.publish('active-menu');
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
                        //this.navCtrl.push(EditProfilePage);
                        this.navCtrl.setRoot(HomePage); 
                        this.events.publish('active-menu');
                      }
                      else
                      {
                        this.data.getToken();
                        loader.dismiss(); 
                        this.navCtrl.setRoot(HomePage);  
                        this.events.publish('active-menu');
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
                          //this.navCtrl.push(EditProfilePage);       
                          this.navCtrl.setRoot(HomePage);
                          this.events.publish('active-menu');
                        }    
                        else{
                          this.data.getToken();
                          loader.dismiss();
                          this.navCtrl.setRoot(HomePage);
                          this.events.publish('active-menu');
                        }
                      });
                    }
                 }); 
                }  
              //  }, 2500);   
                
              }
              else
              {    
                loader.dismiss(); 
                //this.navCtrl.push(EmailverificationPage,{data:result.success.user}); 
                this.navCtrl.push(EmailverificationPage,{first_name:result.success.user[0].first_name,last_name:result.success.user[0].last_name,email:result.success.user[0].email});  
                
              }    
            }                           
 
     },err=>{
        loader.dismiss(); 
        this.service.presentToast("Network error");
     });
  }    
  
  public notify(isRemember) {
    //console.log("Toggled: "+ isRemember);
    if(this.flag == 0){
      this.isRemember = !isRemember;
    }else{
      this.flag = 0;
    //  this.isRemember = false;
    }
    
   console.log("Toggled: "+ this.isRemember); 
  }
          
  gotoForgotPass()    
  {
    this.navCtrl.push(ForgotpasswoedPage);            
  }   

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
