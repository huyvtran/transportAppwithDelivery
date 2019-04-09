import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { HomePage } from '../home/home';

/**
 * Generated class for the RideLaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-ride-later',
  templateUrl: 'ride-later.html',
})   
export class RideLaterPage {
  displayDrivers : any;
  mode : any;
  showSelectedDriver : any; 
  getDateTime : any;
  displaymodes : any;
  date : any;
  time : any;
  distance :any;
  data1 : any;
  vehicle_type : any;
  pick_up : any;
  drop : any;
  cost:any;
  customer_id : any;
  pick_up_lt :any;
  pick_up_lg :any;
  drop_lt :any;
  drop_lg :any;
  public active: string; 
  Did :any;
  vehicle_img :any;
  isnowenabled:boolean=true;

  constructor(private nativeGeocoder: NativeGeocoder, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private storage: Storage, public alertCtrl:AlertController) {
    console.log('navParams.get(param)==>'+navParams.get('param'));
    this.data1 = navParams.get('param');
    this.distance =this.data1.distance;
    this.vehicle_type =this.data1.vehicle_type;
    this.pick_up =this.data1.pick_up;
    this.drop =this.data1.drop;   
    this.cost =this.data1.cost;
    this.date =this.data1.date;
    this.time =this.data1.time;
    this.Did = this.data1.Did;

    this.active = '';

    if(this.vehicle_type == 'Economy')
    {
      this.vehicle_img = 'assets/imgs/img1111.png';
    }
    else if(this.vehicle_type== 'Comfort')
    {
      this.vehicle_img = 'assets/imgs/img1112.png';
    }
    else if(this.vehicle_type == 'Business')
    {
      this.vehicle_img = 'assets/imgs/img1113.png';
    }
    else
    {
      this.vehicle_img = 'assets/imgs/img1113.png';
    }

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

      let addresses: string[] = [this.pick_up,this.drop];
      
      //var addresses = '';
      this.getLatLng(addresses).then(addressFull=>{
        this.pick_up_lt = addressFull[0];
        this.pick_up_lg = addressFull[1];
        this.drop_lt = addressFull[2];
        this.drop_lg = addressFull[3];
      });

      this.storage.get('user').then(data=>{   
        this.customer_id = data[0].id;
      });    

  }

  getLatLng(addresses)
  {
    var addressFull = [];
    return new Promise((resolve,reject)=>{
    var geocoder = new google.maps.Geocoder();
      addresses.forEach(function (value) {
        console.log(value);
        geocoder.geocode( { 'address': value}, function(results, status) {
          if (status == 'OK') {   
            var address0 = results[0].geometry.location.lat();
            var address1 = results[0].geometry.location.lng();
            console.log(address0, address1);
            addressFull.push(address0);
            addressFull.push(address1);
            if(addressFull.length>3)
            {
              resolve(addressFull);
            }
            
            //console.log(address);
          } else {      
          alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideLaterPage');
  }

  updateActive(name)
  {
    this.active = name;       
  }

  showAlert(){

    const confirm = this.alertCtrl.create({
      title: 'Confirm Booking Request!',
      message: 'Do you want to book a ride?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.confirmPayment();
          }
        }
      ]
    });
    confirm.present();

  }

  confirmPayment(){
    if(this.active != '')
    {
      let param1 = new FormData();
      param1.append("customer_id",this.customer_id);
      this.data.getWalletAmount(param1).subscribe(result=>{
        if(result.status == 'OK')
        {
          if( parseFloat(result.success.balance) < 0 )
          {
            this.data.presentToast("Your wallet balance is in minus, So you can't book Ride");
          }
          else{
            this.isnowenabled = false;
            let temp = this.distance.replace(",","");
            temp = temp.split(" ");  
            let param = new FormData();
            
            var dateObj = new Date(this.date + ' ' + this.time);
            //var date = new Date(dateObj).toISOString();
            var date1 = new Date(dateObj).toDateString();
            param.append("customer_id",this.customer_id);
            param.append("schedule","0");
            param.append("pickup_date",this.date);
            //param.append("schedule_time",date);
            param.append("schedule_time",this.date + ' ' + this.time);
            param.append("distance",temp[0]);
            param.append("vehicle_type",this.vehicle_type);
            param.append("source",this.pick_up);
            param.append("source_lat",this.pick_up_lt);
            param.append("source_long",this.pick_up_lg);
            param.append("destination_lat",this.drop_lt);  
            param.append("destination_long",this.drop_lg);  
            param.append("destination",this.drop);  
            param.append("total",null);
            param.append("is_cancelled","0");
            param.append("is_completed","0");
            param.append("is_paid","0");
            param.append("status","0");
            param.append("cost",this.cost);
            param.append("driver_id",'');
            param.append("type","ride");

            console.log("#######");
            console.log(param);
            console.log("#######");

            this.data.rideLaterbookingRequest(param).subscribe(result=>{
                console.log(result);    
                //this.userData = result; 
                if(result.status == "ERROR")
                {
                    this.data.presentToast('Error');        
                    return false;
                }
                else
                {

                  /*let param1 = new FormData();
                  param1.append("driver_Id",this.Did);
                  param1.append("customer_id",this.customer_id);
                  param1.append("booking_id",result.success.booking_request.id);
                  param1.append("ride_type",'later');

                  this.data.postNotification(param1).subscribe(result=>{   
                    if(result.status == "ERROR")
                    {     
                      
                    }
                  });
                  //this.storage.set("customer_data",data.msg[0]);*/
                  this.data.presentToast('Booking Request Successfull!');
                  setTimeout(()=>{
                    this.navCtrl.setRoot(HomePage);
                  },3000);
                  
                  //this.navCtrl.setRoot(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'later'});
                }                                   
            });
          }
        }
      });
      }
      else{
        this.data.presentToast('Please select Payment method');
        return false;
      }
    
    }

}
