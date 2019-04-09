import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, Events, NavController, NavParams, Platform, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { AlertController } from 'ionic-angular';
import { storage } from 'Firebase';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  fav_locations : any;
  homelocation : any = '';
  worklocation : any = '';
  otherlocations : any = '';
  showmainpage : boolean = true;
  showlocation : boolean = false;
  showdrivers : boolean = false;
  showNotifications : boolean = false;
  public isNotificationOff: boolean;
  fav_drivers : any = '';
  hideBackButton : any;
  id : any;
  role : any;

  constructor(public alertCtrl: AlertController, private loading: LoadingController, private eve: Events,public navCtrl: NavController, private modalCtrl: ModalController, private storage : Storage, public data : DataProvider, public geolocation: Geolocation, public navParams: NavParams, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public viewCtrl: ViewController, public service:ServiceProvider) {
    //this.searchDisabled = true;
    //this.saveDisabled = true;

    //let param = new FormData();
     // param.append("location_type",act); 
     this.storage.get('user').then(data => {
      this.id = data[0].id;
      this.role = data[0].role;

      let param = new FormData();
      param.append("customer_id",data[0].id);
      param.append("status",'get');
      this.data.customerNotificationSetting(param).subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          if(result.success.Get_notification_setting == "0")
          {       
            this.isNotificationOff = false;
          }
          else{
            this.isNotificationOff = true;
          }
        }
        else{
          this.data.presentToast('Error');
        }
      });
    });

    this.hideBackButton = false;
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

      this.data.getCustomerFavLocation().subscribe(result=>{
        if(result.status == "OK")
        {
          this.fav_locations = result.success.favlocations;
          this.getHomelocation(this.fav_locations).then(data=>{
            this.homelocation = data;
          });
          
          this.getWorklocation(this.fav_locations).then(data=>{
            this.worklocation = data;
          });

          this.getOtherlocation(this.fav_locations).then(data=>{
            this.otherlocations = data;
          });
        }                 
    });

   
      this.data.getFavDrivers().subscribe(result=>{
          console.log(result);  
          if(result.status == "OK")
          {   
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.fav_drivers = result.success.favdrivers;
          }                 
      });

    loader.dismiss();

    this.storage.get('fav_place').then(data=>{
        if(data){
          this.movetoFavlocations();
        }
    });

    this.storage.get('fav_driver').then(data=>{
      if(data){
        this.movetoFavdrivers();
      }
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  movetoFavlocations()
  {
    this.hideBackButton = true;
    this.showmainpage = false;
    this.showlocation = true;
  }

  movetoFavdrivers()
  {
    this.hideBackButton = true;
    this.showmainpage = false;
    this.showdrivers = true;
  }

  movetoNotifications()
  {
    this.hideBackButton = true;
    this.showmainpage = false;
    this.showNotifications = true;
  }

  goBack()
  {
    this.hideBackButton = false;
    this.showmainpage = true;
    this.showlocation = false;
    this.showdrivers = false;
    this.showNotifications = false;
  }

  getHomelocation(locations)
  {
    return new Promise((resolve,reject)=>{
      locations.forEach(element => {
        if(element.location_type == 'home')
        {
          resolve(element);
        }
      });
    })
  }
  
  getWorklocation(locations)
  {
    return new Promise((resolve,reject)=>{
      locations.forEach(element => {
        if(element.location_type == 'work')
        {
          resolve(element);
        }
      });
    })
  }

  getOtherlocation(locations)
  {
    return new Promise((resolve,reject)=>{
      var loc = [];
      locations.forEach(element => {
        if(element.location_type != 'home' && element.location_type != 'work')
        {
          loc.push(element);
        }
       /* else{
          loc.push(element);
        }*/
      });
      resolve(loc);
    })
  }

  async addAddr(act)
  {
    let modal = this.modalCtrl.create(AutocompletePage, {action: act});
    let me = this;

      modal.onDidDismiss(data => {
          if(data)
          {
            let param = new FormData();
            
            if(act!='home' && act != 'work')
            {
              param.append("location",data);
              this.getLocationType().then(loc=>{
                if(loc)
                {
                  param.append("location_type",loc.toString());
                  this.geocodeAddress(data).then(data=>{

                    var lat = data[0];
                    var lng = data[1];
                  
                    param.append("latitude",lat);
                    param.append("longitude",lng);

        
                    this.data.addCustomerFavLocation(param).subscribe(result=>{
                      console.log(result);  
                        if(result.status == "OK")
                        {
                          this.storage.set('fav_place',true);
                          this.favLocation();   
                        //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                        }                 
                    });
                  });
                }
                
              });
            }
            else{
              param.append("location",data);
              param.append("location_type",act);
              this.geocodeAddress(data).then(data=>{

                var lat = data[0];
                var lng = data[1];
               
                param.append("latitude",lat);
                param.append("longitude",lng);
     
                this.data.addCustomerFavLocation(param).subscribe(result=>{
                  console.log(result);  
                    if(result.status == "OK")
                    {
                      this.storage.set('fav_place',true);
                      this.favLocation();
                    //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }                 
                });
              });
            }

          }  
   
      });
      modal.present();
  }

  removeAddr(id)
  {
      let param = new FormData();
      param.append("location_id",id);  

      this.data.removeCustomerFavLocation(param).subscribe(result=>{
        if(result.status == "OK")
        {
          this.storage.set('fav_place',true);
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }                 
      });
    //}
    /*else{
      
    }*/
  }

  geocodeAddress(address) {
    //var address = document.getElementById('address').value;
    return new Promise((resolve,reject)=>{
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address':address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let loc = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
          resolve(loc);
        }else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }

  getLocationType()
  {
    return new Promise((resolve,reject)=>{
    const prompt = this.alertCtrl.create({
      title: 'Set Location Name',
      message: "Set name for location to save place",
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: "e.g. - Joe's Home"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);
            this.data.presentToast('Please add Location name to save as favorite location');
            prompt.dismiss();
            return false;
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            if(data.name == 'Home' || data.name == 'home' || data.name == 'work' || data.name == 'Work')
            {
              this.data.presentToast('You can not add Home and work as additional favorite locations.');
            }
            else{
              prompt.dismiss().then(() => { resolve(data.name); });
              //resolve(data.name);
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  });
  }

  notificationOff()
  {
    let param = new FormData();
    param.append("customer_id",this.id);
    param.append("status",'change');
    this.data.customerNotificationSetting(param).subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        
      }
      else{
        this.data.presentToast('Error');
      }
    });
  }

  ionViewDidLeave(){
    console.log("I am called");
    this.storage.remove('fav_place');
    this.storage.remove('fav_driver');
  }

  removeDriver(driver_id){

    let param = new FormData();
    param.append("driver_id",driver_id);
    this.data.removeFavDriver(param).subscribe(data=>{
        console.log("############");
        console.log(data);
        console.log("############");
        this.storage.set('fav_driver',true);
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
    });
  }

  favLocation(){

      this.service.presentLoader("Please wait...");
      this.data.getCustomerFavLocation().subscribe(result=>{
        if(result.status == "OK")
        {
          this.service.dismissLoader();
          this.fav_locations = result.success.favlocations;
          this.getHomelocation(this.fav_locations).then(data=>{
            this.homelocation = data;
          });
          
          this.getWorklocation(this.fav_locations).then(data=>{
            this.worklocation = data;
          });

          this.getOtherlocation(this.fav_locations).then(data=>{
            this.otherlocations = data;
          });
        }else{
          this.service.dismissLoader();
        }                 
      },err=>{
        this.service.dismissLoader();
      });
  }

}
