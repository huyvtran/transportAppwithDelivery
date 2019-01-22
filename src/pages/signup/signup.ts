import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { SigninPage } from '../signin/signin';
import { EmailverificationPage } from '../emailverification/emailverification';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()   
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})  
export class SignupPage {  
  fname : any;
  lname : any;
  email : any;
  password : any;
  c_password : any;
  role : any = 2;
  type : any='';
  vehicle_type : any='';
  vehicle_types : any='';
  delivery_vehicle_types : any='';
  public userData : any = {};
  signup : any;
  roles : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServiceProvider, public data : DataProvider,private loading: LoadingController) {
    this.signup = new FormGroup({    
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      c_password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      type: new FormControl('',[]),
      vehicle_type: new FormControl('',[]),
    });	

      this.data.getRoles().subscribe(result=>{
        if(result.status == 'OK')
        {
          console.log(result.success.roles);
          this.roles = result.success.roles;
        }
        else{
          this.data.presentToast(result.status);
        }
      });
      this.data.getRideVehicleTypes().subscribe(result=>{
        
        if(result.status == 'OK')
        {
          this.vehicle_types = result.success;
          
        }     
        else{
          this.data.presentToast(result.status);
        }
      });
      this.data.getDeliveryVehicleTypes().subscribe(result=>{
        
        if(result.status == 'OK')
        {
          this.delivery_vehicle_types = result.success;
          
        }     
        else{
          this.data.presentToast(result.status);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    
  }

  SignupForm(){   
    console.log(this.fname);
 
    /*let param = JSON.stringify({"first_name":"test", "last_name":"test",          
  "role":1,"password":"1234","c_password":"1234","email":"abc@gmail.com"});*/

  if(this.password !== this.c_password)
  {
    this.data.presentToast('Password and Confirm Password must match!');
    return false;
  }         

  if(this.validate())
  {
    let param = new FormData();
    param.append("first_name",this.fname);
    param.append("last_name",this.lname);
    param.append("email",this.email);
    param.append("password",this.password);  
    param.append("role",this.role);   
    param.append("c_password",this.c_password);
    param.append("type",this.type);
    param.append("vehicle_type",this.vehicle_type);

      let loader = this.loading.create({
          content :"Please wait...",
          spinner : 'crescent'
      });

      loader.present();

      this.data.userSignUp(param).subscribe(result=>{
        console.log(result);    
        loader.dismiss();   
        if(result.status == "ERROR")
        {
          this.data.presentToast(result.error.email);
          return false;
        }
        else
        {
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(EmailverificationPage,{first_name:this.fname,last_name:this.lname,email:this.email}).then(()=>{
            this.navCtrl.remove(currentIndex);
          });
        }                    
      });
    }
  }  

  validate()
  {
    let result = true;

    if(this.role == 3)
    {
      if(this.type == '')
      {
        this.service.validator('Type field is required');
        result = false;
      }
      else if(this.vehicle_type == '')
      {
        this.service.validator('Vehicle Type field is required');
        result = false;
      } 
    }
    return result;
  }
}
