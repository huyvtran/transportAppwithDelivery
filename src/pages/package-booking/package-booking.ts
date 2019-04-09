import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams,LoadingController,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { DeliveryPage } from '../delivery/delivery';

declare var google;  
@IonicPage()
@Component({
  selector: 'page-package-booking',
  templateUrl: 'package-booking.html',
})
export class PackageBookingPage {

  public from: any;
  public to: any;
  public type: any;
  public weight: any;
  public height: any;
  public width: any;
  public length: any;
  user_id: any;
  public oneway: boolean;
  delivery_type : any;
  date : any;
  time : any;
  minDate : any;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,public geolocation: Geolocation, public navParams: NavParams, public alertCtrl: AlertController, private service: ServiceProvider, private storage: Storage,private loading: LoadingController,public data : DataProvider) {
    this.minDate = new Date().toISOString();
    this.data.isRide = 'no';
    storage.get("user").then(data=>{
      console.log(data[0].id);
      this.user_id = data[0].id;
    });
    this.getPickup().then(data=>{
      this.from = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageBookingPage');
  }

  getPickup()
  {
    return new Promise((resolve,reject)=>{
      var addressFull = [];
      var geocoder = new google.maps.Geocoder();
      this.geolocation.getCurrentPosition().then((position) => { 
        if(position.coords.latitude && position.coords.longitude)    
        {
          var latlng = {lat: position.coords.latitude, lng:position.coords.longitude};
          geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
              var address = results[0].formatted_address;
              addressFull.push(address);
              resolve(address);
            }        
          });
        }
      });
    });
  }

  showAlert(){

    const confirm = this.alertCtrl.create({
      title: 'Confirm Booking Request!',
      message: 'Do you want to book a ride?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //this.goToSubmit();
            if(this.delivery_type == 'later')
            {
              this.navCtrl.push(DeliveryPage,{"from":this.from,"to":this.to,"type":this.type,"oneway": this.oneway,"weight":this.weight,"length":this.length,"width":this.width,"height":this.height,"delivery_type":this.delivery_type,"date":this.date, "time":this.time});
            }
            else{
              this.navCtrl.push(DeliveryPage,{"from":this.from,"to":this.to,"type":this.type,"oneway": this.oneway,"weight":this.weight,"length":this.length,"width":this.width,"height":this.height,"delivery_type":this.delivery_type});
            }
          }
        }
      ]
    });
    confirm.present();

  }



  goToSubmit() {
    if(this.validate()) {
      /*let param = new FormData();
      param.append("from",this.from);    
      param.append("to",this.to);    
      param.append("type",this.type);   
      param.append("oneway", this.oneway); 
      param.append("weight",this.weight); 
      param.append("length",this.length);    
      param.append("width",this.width);
      param.append("height",this.height); 
      param.append("user_id",this.user_id)   */
      
      this.showAlert();
    }
  }

  showAddressModal(act) {
    let modal = this.modalCtrl.create(AutocompletePage, {action: act});
    let me = this;

      modal.onDidDismiss(data => {
        if(act=='pickup')
        {
          if(data)
          {
            this.from = data;
          }  
        }
        else{
          if(data)
          {
            this.to = data; 
          }
        }
      });
      modal.present();
  } 

  validate() {
    let result = true;
    if (this.from == null || this.from == undefined || this.from == "") {
      this.service.validator('Please select your pick up location.')
      result = false
    }
    else if (this.to == null || this.to == undefined || this.to == "") {
      this.service.validator('Please select your drop off location.')
      result = false
    }
    else if (this.type == null || this.type == undefined || this.type == "") {
      this.service.validator('Please choose delivery type.')
      result = false
    }
    else if (this.length == null || this.length == undefined || this.length == "") {
      this.service.validator('Enter approx. length.')
      result = false
    }
    else if (this.width == null || this.width == undefined || this.width == "") {
      this.service.validator('Enter approx. width.')
      result = false
    }
    else if (this.height == null || this.height == undefined || this.height == "") {
      this.service.validator('Enter approx. height.')
      result = false
    }
    else if (this.weight == null || this.weight == undefined || this.weight == "") {
      this.service.validator('Enter approx. weight.')
      result = false
    }
    else if (this.delivery_type == null || this.delivery_type == undefined || this.delivery_type == "") {
      this.service.validator('Please choose your time.')
      result = false
    }
    else if(this.delivery_type == 'later') {
      if (this.date == null || this.date == undefined || this.date == "") {
        this.service.validator('Select pick up date.')
        result = false
      }
      else if(this.time == null || this.time == undefined || this.time == "") {
        this.service.validator('Select pick up time.')
        result = false
      }
    }
    else{
      if(this.length < 0){
        this.service.validator('Length must be greater than 0');
        result = false;
      }
      else if(this.width < 0){
        this.service.validator('Width must be greater than 0');
        result = false;
      }
      else if(this.height < 0){
        this.service.validator('Height must be greater than 0');
        result = false;
      }
      else if(this.weight < 0){
        this.service.validator('Weight must be greater than 0');
        result = false;
      }
    }

    return result;
  }

}
