import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController, ActionSheetController, LoadingController, Events } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PasswordResetPage } from '../password-reset/password-reset';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UploadProfilePage } from '../upload-profile/upload-profile';
import { SigninPage } from '../signin/signin';
import { ModalpagePage } from '../modalpage/modalpage';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { OneSignal } from '@ionic-native/onesignal';
/**
 * Generated class for the CustomerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-customer-profile',
  templateUrl: 'customer-profile.html',
})
export class CustomerProfilePage {
  user_details :any= {};
  profile : any;
  cust_id :any;
  role : any;
  vehicle_types : any;
  avtarPath : any;
  display_data : boolean = false;
  
  constructor(private oneSignal: OneSignal,private androidPermissions: AndroidPermissions, public navCtrl: NavController, private loading: LoadingController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public data : DataProvider, private storage: Storage,private DomSanitizer: DomSanitizer, private camera: Camera, public http : HttpClient,private alertCtrl: AlertController, private modalCtrl: ModalController,public events:Events) {
    
  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerProfilePage');
    this.getProfile();
  }

  ionViewWillEnter()
  {
    
  }


  getProfile(){
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

      loader.present();
      this.storage.get('user').then(data=>{
        console.log(data);
          let param = data[0].id;
          this.role = data[0].role;
        if(data[0].role==2){

          this.storage.get('token').then(token=>{
            this.data.getCustomerProfile(token).subscribe(result=>{

              console.log(result);
  
              if(result.status == 'OK')
              {
                //console.log(result.success.profile[0].first_name);
                console.log("!!!!!!")
                console.log(result.success.profile);
                loader.dismiss();
                this.display_data = true;
                this.user_details.fname = result.success.profile.first_name;
                this.user_details.lname = result.success.profile.last_name;
                this.user_details.email = result.success.profile.email;
                this.user_details.phone = result.success.profile.customer_details.phone;
                this.user_details.address = result.success.profile.customer_details.address;
                this.user_details.facebook_profile = result.success.profile.customer_details.facebook_profile == null || result.success.profile.customer_details.facebook_profile == "undefined" ? "#":result.success.profile.customer_details.facebook_profile;
                this.user_details.instagram_profile = result.success.profile.customer_details.instagram_profile == null || result.success.profile.customer_details.instagram_profile == "undefined" ? "#": result.success.profile.customer_details.instagram_profile;
                this.user_details.twitter_profile = result.success.profile.customer_details.twitter_profile == null ||result.success.profile.customer_details.twitter_profile == "undefined" ? "#":result.success.profile.customer_details.twitter_profile;
                this.user_details.linkedin_profile = result.success.profile.customer_details.linkedin_profile == null || result.success.profile.customer_details.linkedin_profile == "undefined" ? "#":result.success.profile.customer_details.linkedin_profile;
                //this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile[0].profile;
  
                if(result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '')
                {
                  this.user_details.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                }
                else{
                //  this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
                this.user_details.avatar = this.data.imgURL+"customer/profile_image/"+result.success.profile.customer_details.profile;
                }
                
              }
              else{
                loader.dismiss();
              }
           });
          });
          
        }else if(data[0].role==3){    
          this.data.getRideVehicleTypes().subscribe(result=>{
        
            if(result.status == 'OK')
            {
              this.vehicle_types = result.success;

              this.storage.get('token').then(token=>{
                this.data.getDriverProfile(token).subscribe(result=>{
                  if(result.status == 'OK')    
                  {
                    console.log("!!!!!!")
                    console.log(result.success.profile);

                    loader.dismiss();
                    this.display_data = true;
                    //console.log(result.success.profile[0].first_name);
                    this.user_details.fname = result.success.profile.first_name;
                    this.user_details.lname = result.success.profile.last_name;
                    this.user_details.email = result.success.profile.email;
                    this.user_details.phone = result.success.profile.driver_details.phone;
                    this.user_details.address = result.success.profile.driver_details.address;
                    
                    this.user_details.facebook_profile = result.success.profile.driver_details.facebook_profile == null || result.success.profile.driver_details.facebook_profile == "undefined" ? "#":result.success.profile.driver_details.facebook_profile;
                    this.user_details.instagram_profile = result.success.profile.driver_details.instagram_profile == null || result.success.profile.driver_details.instagram_profile == "undefined" ? "#": result.success.profile.driver_details.instagram_profile;
                    this.user_details.twitter_profile = result.success.profile.driver_details.twitter_profile == null ||result.success.profile.driver_details.twitter_profile == "undefined" ? "#":result.success.profile.driver_details.twitter_profile;
                    this.user_details.linkedin_profile = result.success.profile.driver_details.linkedin_profile == null || result.success.profile.driver_details.linkedin_profile == "undefined" ? "#":result.success.profile.driver_details.linkedin_profile;





                    if(result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '')
                    {
                      this.user_details.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                    }
                    else{
                    //  this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
                    this.user_details.avatar = this.data.imgURL+"driver/profile_image/"+result.success.profile.driver_details.profile;
                    }
                    //this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile[0].profile;

                    console.log("!@!#!@!#!#@!#!");
                    console.log(this.user_details.avatar);
                    console.log(this.user_details.type);
                    console.log(result.success.profile.driver_details.type);
                    console.log(this.user_details);
                    
                    //if(this.user_details.type == 'ride')
                    if(result.success.profile.driver_details.type == 'ride')
                    {
                      this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.type;
                    }
                    else{
                      //this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicle.vehicle_name;
                      this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicles.vehicle_name;
                    }
                    //this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.type;
                    this.user_details.vehicle_number = result.success.profile.driver_details.vehicle_number;
                  }   
                  else{
                    loader.dismiss();
                  }
               });
              });
              
              
            }
            else{
              this.data.presentToast(result.status);
              loader.dismiss();
            }
            
          });
          
        }
          
      });
  }

  gotoChangePass()
  {
    this.navCtrl.push(PasswordResetPage);
  }  

  gotoeditProfile()                
  {      
    this.navCtrl.push(EditProfilePage);
  }     

  gotoAvatarPage()
  {
    //this.navCtrl.push(UploadProfilePage,{'imgurl':this.user_details.avatar}, { animate: true, animation: 'transition', duration: 500, direction: 'up' });
  

      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              this.captureImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              //this.takePicture(this.camera.PictureSourceType.CAMERA);
              this.captureImage(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();

  }

  signOut(){
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'signout'});
    let me = this;
               
    modal.onDidDismiss(data => {   
      console.log(data);
      if(data == true)
      {
        //this.oneSignal.deleteTag('user_id');
        this.storage.set('isRemember', false); 
        this.storage.get('user').then(data=>{   
          let param = data[0].id;
          let role = data[0].role;
          console.log(role);    
          if(role == 3)
          {
            this.oneSignal.deleteTag('driver_id');
            this.data.getDriverToggle(param).subscribe(result=>{
              if(result.status == 'OK')
              {
                if(result.success.available == 'on')
                {
                  this.data.AvailableToggle().subscribe(result=>{
                    console.log(result);
                    if(result.status == 'OK')
                    {
                      console.log(result.success.available);
                    }
                    else{
                      this.data.presentToast('Error');
                    }
                  });
                }
              }
              else{
                this.oneSignal.deleteTag('customer_id');
              }
            });
          }

        this.storage.set('user',undefined);
        this.storage.set('token',undefined);
        this.navCtrl.setRoot(SigninPage);


        });
         
      }  
      else{
        //this.selectdId = '';            
      }     
    });
    modal.present();
    //this.navCtrl.setRoot(SigninPage); 
  }   
  
  

  async captureImage(useAlbum) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    //var srcType;
    /*if(useAlbum == true)
    {
      srcType= this.camera.PictureSourceType.CAMERA;
    }
    else{
      srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }*/
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: useAlbum,
    }

    const imageData = await this.camera.getPicture(options);
    //var imageData;
    /*const imageData = await this.camera.getPicture(options).then((Data) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     imageData = 'data:image/jpeg;base64,' + Data;
     }, (err) => {
      // Handle error
     });*/

     
    this.avtarPath = 'data:image/jpg;base64,'+imageData;

    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    let param = new FormData();
    param.append("image_file", this.avtarPath );

    //this.photos.unshift(this.base64Image);
  this.storage.get('user').then(data=>{   
    let role = data[0].role;
    if(role == 2)
            {
              this.data.updateCustomerAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                  loader.dismiss();
                  this.data.presentToast('ERROR');
                  return false;
                }
                else
                {   
                  loader.dismiss();
                  console.log(result.success.imagename);
                  this.imgEvent(result.success.imagename,'customer');
                  this.data.presentToast('Profile Updated Successfully!');   
                  setTimeout(()=>{
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  },3000);
                  
                  //this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              },err=>{
                loader.dismiss();
                this.data.presentToast('ERROR');
              }); 
            }
            if(this.role == 3)
            {
              this.data.updateDriverAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                  loader.dismiss();
                  this.data.presentToast('eRROR');
                  return false;
                }
                else
                {   
                  loader.dismiss();   
                  this.imgEvent(result.success.imagename,'driver');
                  this.data.presentToast('Profile Updated Successfully!');
                  setTimeout(()=>{
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  },3000);
                  //this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              },err=>{
                loader.dismiss();
                this.data.presentToast('ERROR');
              }); 
            }
          });
  }


  imgEvent(url,role){

    this.events.publish('profile_changed',url,role);
  }

}    