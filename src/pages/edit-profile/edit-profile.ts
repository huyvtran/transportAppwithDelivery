import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ModalController, Events, AlertController} from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { CustomerProfilePage } from '../customer-profile/customer-profile';
import { HomePage } from '../home/home';
import { ModalpagePage } from '../modalpage/modalpage';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',     
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  user_details :any= {};
  profile : any;
  Dprofile : any;
  cust_id :any;
  role : Number;
  vehicle_types : any;
  social_media : any = [];
  prev_social_media : any = [];
  delivery_vehicle_types : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private storage: Storage,private loading: LoadingController, private modalCtrl: ModalController, public event:Events, public alertCtrl:AlertController, public service:ServiceProvider) {
    
    this.profile = new FormGroup({    
      fname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      lname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      //email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]),/*pattern("06([0-9]{8})")*/
      address: new FormControl('', [Validators.required])
      });
        

      this.Dprofile = new FormGroup({    
        fname: new FormControl('', [Validators.required]),
        lname: new FormControl('', [Validators.required]),
        //email: new FormControl('', [Validators.required,Validators.email]),
        phone: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]),/*pattern("06([0-9]{8})")----Validators.maxLength(11)*/
        address: new FormControl('', [Validators.required]),
        type: new FormControl({value:'', disabled: true}, [Validators.required]),
        vehicle_type: new FormControl('', [Validators.required]),
        vehicle_no:  new FormControl('', [Validators.required])         
      });      

      this.storage.get('user').then(data=>{   
        this.cust_id = data[0].id;
          let param = data[0].id;
          this.role = data[0].role;
          if(data[0].role==2){
            this.storage.get('token').then(token=>{
              this.service.presentLoader("Please wait...");
              this.data.getCustomerProfile(token).subscribe(result=>{
                if(result.status == 'OK')
                {
                  //console.log(result.success.profile[0].first_name);
                  this.user_details.fname = result.success.profile.first_name;
                  this.user_details.lname = result.success.profile.last_name;
                  //this.user_details.email = result.success.profile[0].email;
                  this.user_details.phone = result.success.profile.customer_details.phone;
                  this.user_details.address = result.success.profile.customer_details.address;
                  //this.user_details.avatar = result.success.profile[0].profile;
                  this.prev_social_media['facebook'] = result.success.profile.customer_details.facebook_profile == null ? '':result.success.profile.customer_details.facebook_profile;
                  this.prev_social_media['twitter'] = result.success.profile.customer_details.twitter_profile == null ? '':result.success.profile.customer_details.twitter_profile;
                  this.prev_social_media['instagram'] = result.success.profile.customer_details.instagram_profile == null ? '':result.success.profile.customer_details.instagram_profile;
                  this.prev_social_media['linkedin'] = result.success.profile.customer_details.linkedin_profile == null ? '':result.success.profile.customer_details.linkedin_profile;
                  this.social_media = this.prev_social_media;
                  this.service.dismissLoader();
                }
                else{
                  
                  this.service.dismissLoader();
                }
             },err=>{

                  this.service.dismissLoader();
             });

            })
            
          }
          else if(data[0].role==3){
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

            this.storage.get('token').then(token=>{

              this.service.presentLoader("Please wait...");

              this.data.getDriverProfile(token).subscribe(result=>{
                if(result.status == 'OK')
                {
                  //console.log(result.success.profile[0].first_name);
                  this.user_details.fname = result.success.profile.first_name;
                  this.user_details.lname = result.success.profile.last_name;
                  //this.user_details.email = result.success.profile[0].email;
                  this.user_details.phone = result.success.profile.driver_details.phone;
                  this.user_details.address = result.success.profile.driver_details.address;
                  this.user_details.type = result.success.profile.driver_details.type;
                  if(this.user_details.type == 'ride')
                  {
                    this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.id;
                  }
                  else{
                    //this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicle.id;
                    this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicles.id;
                  }
                  this.user_details.vehicle_no = result.success.profile.driver_details.vehicle_number;
                  this.prev_social_media['facebook'] = result.success.profile.driver_details.facebook_profile == null ? '':result.success.profile.driver_details.facebook_profile;
                  this.prev_social_media['twitter'] = result.success.profile.driver_details.twitter_profile == null ? '':result.success.profile.driver_details.twitter_profile;
                  this.prev_social_media['instagram'] = result.success.profile.driver_details.instagram_profile == null ? '':result.success.profile.driver_details.instagram_profile;
                  this.prev_social_media['linkedin'] = result.success.profile.driver_details.linkedin_profile == null ? '':result.success.profile.driver_details.linkedin_profile;
                  this.social_media = this.prev_social_media;
                  this.service.dismissLoader();
                }
                else{
                  this.service.dismissLoader();
                }
             },err=>{
                  this.service.dismissLoader();
             });

            })
            
          } 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ProfileForm(profile)
  {
    var phoneno = /^\d{10}$/;
    if(!profile.phone.match(phoneno))
    {
      this.data.presentToast('Please enter valid phone number.');
      return false;
    }
    
    let param = new FormData();
    if(this.role==2)
    {
      param.append("customer_id",this.cust_id);
    }
    else if(this.role==3)
    {
      param.append("driver_id",this.cust_id);
      param.append("vehicle_type",profile.vehicle_type);   
      param.append("vehicle_number",profile.vehicle_no);
      param.append("is_completed",'1');
    }
    param.append("first_name",profile.fname);
    param.append("last_name",profile.lname);
    //param.append("email",profile.email);
    param.append("phone",profile.phone);  
    param.append("address",profile.address);   
    //param.append("profile",profile.avatar);

    //if(this.social_media['facebook'] || this.social_media['twitter'] || this.social_media['linkedin'] || this.social_media['instagram'])
   //{
    //  alert(this.social_media['instagram']);
      param.append("facebook_profile",this.social_media['facebook']);  
      param.append("twitter_profile",this.social_media['twitter']);  
      param.append("linkedin_profile",this.social_media['linkedin']);  
      param.append("instagram_profile",this.social_media['instagram']);  
    //}
 
    let loader = this.loading.create({
 
         content :"Please wait...",
         spinner : 'crescent'
     });
 
     loader.present();

     if(this.role==2)
    {
      this.data.updateCustomerProfile(param).subscribe(result=>{
        //console.log(result);    
        //this.userData = result; 
        loader.dismiss();   
        if(result.status == "ERROR")
        {
              var msg = '';
              var count = 0;
              for(let i in result['error']){
                  console.log(i);
                  for(let j in result['error'][i]){
                  console.log(j);
                  console.log(result['error'][i][j]);
                  count++;

                  msg = msg +"<br>"+count+"."+result['error'][i][j]+"<br>";
                }

              }
              this.showAlert(msg);
            return false;
        }
        else
        {   
          //this.storage.set("customer_data",data.msg[0]);
          this.event.publish('name_changed',profile.fname,profile.lname);
          this.data.presentToast('Profile Updated Successfully!');

          setTimeout(()=>{
            this.navCtrl.setRoot(CustomerProfilePage);
          },3000);
               
        }                    
      }); 

    }
    else if(this.role==3)
    {
      this.data.updateDriverProfile(param).subscribe(result=>{
        //console.log(result);    
        //this.userData = result; 
        loader.dismiss();   
        if(result.status == "ERROR")
        {
            // this.data.presentToast(result.error.email);     
            // this.storage.set('isProfile_Complete', false);
            // return false;
            var msg = '';
              var count = 0;
              for(let i in result['error']){
                  console.log(i);
                  for(let j in result['error'][i]){
                  console.log(j);
                  console.log(result['error'][i][j]);
                  count++;

                  msg = msg +"<br>"+count+"."+result['error'][i][j]+"<br>";
                }

              }
              this.showAlert(msg);
            return false;
        }
        else
        {   
          //this.storage.set("customer_data",data.msg[0]);
          this.event.publish('name_changed',profile.fname,profile.lname);
          this.data.presentToast('Profile Updated Successfully!');
          this.storage.set('isProfile_Complete', true);
          //this.navCtrl.setRoot(HomePage);
          setTimeout(()=>{
            this.navCtrl.setRoot(CustomerProfilePage)
          },3000)     
          
        }                    
      });
    }

  }    

  addSocialLink(account)
  {
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'addSocialaccount',social_media:this.social_media});
    let me = this;
               
    modal.onDidDismiss(data => {   
      console.log(data);
      if(data)
      {
        this.social_media = data;
      }          
      else{
        //this.selectdId = '';        
      }     
    });
    modal.present();
    //this.navCtrl.setRoot(SigninPage); 
  }

  showAlert(err_data) {
    const alert = this.alertCtrl.create({
      subTitle: err_data,
      cssClass:'my-alert',
      buttons: ['OK']
    });
    alert.present();
  }

}
