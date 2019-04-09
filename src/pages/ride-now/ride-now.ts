import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


/**
 * Generated class for the RideNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-ride-now',
  templateUrl: 'ride-now.html',
})
export class RideNowPage {
  distance :any;     
  vehicle_types :any;
  data1 :any;
  pick_up :any;
  drop :any;
  cost :any;
  Did :any ='';
  driver : any;
  customer_id : any;
  pick_up_lt :any;
  pick_up_lg :any;
  drop_lt :any;
  drop_lg :any;
  vehicle_img : any;
  customer_name:any;
  public active: string; 
  isnowenabled:boolean=true;
  
  constructor(private nativeGeocoder: NativeGeocoder, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private storage: Storage, public alertCtrl:AlertController) {
    console.log('navParams.get(param)==>'+navParams.get('param'));
    this.data1 = navParams.get('param');
    this.distance =this.data1.distance;
    this.vehicle_types =this.data1.vehicle_type;
    this.pick_up =this.data1.pick_up;
    this.drop =this.data1.drop;   
    this.cost =this.data1.cost;
    this.Did =this.data1.Did;

    this.active = '';

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    if(this.vehicle_types == 'Economy')
    {
      this.vehicle_img = 'assets/imgs/img1111.png';
    }
    else if(this.vehicle_types == 'Comfort')
    {
      this.vehicle_img = 'assets/imgs/img1112.png';
    }
    else if(this.vehicle_types == 'Business')
    {
      this.vehicle_img = 'assets/imgs/img1113.png';
    }
    else
    {
      this.vehicle_img = 'assets/imgs/img1113.png';
    }

      let addresses: string[] = [this.pick_up,this.drop];
      var addressFull = [];
      //var addresses = '';
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
            //console.log(address);
          } else {      
          alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
      setTimeout(() => {   
        console.log('addressFull==>'+ addressFull);
        this.pick_up_lt = addressFull[0];
        this.pick_up_lg = addressFull[1];
        this.drop_lt = addressFull[2];
        this.drop_lg = addressFull[3];
      }, 1500);
      
    //console.log(this.pick_up_lg);
    //console.log('pick_up_ltlg===>'+pick_up_ltlg);

    /*this.nativeGeocoder.forwardGeocode("'"+this.pick_up+"'", options)
    .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
    .catch((error: any) => console.log(error));*/

    this.storage.get('user').then(data=>{   
      this.customer_id = data[0].id;
      this.customer_name = data[0].first_name+' '+data[0].last_name;
    });    

   // console.log('oiuygfbhthis.distance==>>'+this.distance);
    this.driver ={
      fname : 'fname',           
      lname : 'lname',
      phone : '98745896',
      address : '',
      vehicle_type : '',
      vehicle_no : ''
    }
    if(this.Did && this.Did != '')
    {
      let param = new FormData();
      param.append("driver_id",this.Did);
     
      this.data.getSelectedDriverInfo(param).subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          console.log(result.success.driver.first_name);            
          this.driver.fname = result.success.driver.first_name;
          this.driver.lname = result.success.driver.last_name;
          //this.user_details.email = result.success.profile[0].email;
          this.driver.phone = result.success.driver.phone;
          this.driver.address = result.success.driver.address;
          this.driver.vehicle_type = result.success.driver.vehicle_type;
          this.driver.vehicle_no = result.success.driver.vehicle_number;
        }
        else{

        }
      });
    }
  }
     
  ionViewDidLoad() {
    console.log('ionViewDidLoad RideNowPage');
  }  

  
  ionViewWillLeave(){
    
  }

  
  updateActive(name)
  {
    this.active = name;
  }

  forwardGeocode(keyword : string)
  {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': keyword}, function(results, status) {
        if (status == 'OK') {
          console.log('helloooooooooooo====>'+results[0].geometry.location);
          return results[0].geometry.location;
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
        }
    });     
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
          if(parseFloat(result.success.balance) < 0 )
          {
            this.data.presentToast("Your wallet balance is in minus, So you can't take Ride");
          }
          else{
            this.isnowenabled = false; 
            let temp = this.distance.replace(",","");
            temp = temp.split(" ");     
            let param = new FormData();
  
            param.append("customer_id",this.customer_id);
            param.append("schedule","0");
            param.append("schedule_time",null);
            param.append("distance",temp[0]);
            param.append("vehicle_type",this.vehicle_types);
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
            param.append("payment_method",this.active);
            param.append("type","ride");

            this.data.bookingRequest(param).subscribe(result=>{
                console.log(result);    
                //this.userData = result; 
                if(result.status == "ERROR" || result.status == "Error")
                {
                    this.data.presentToast('Your wallet balance is low. Please select another payment method.');     
                    this.isnowenabled = true;      
                    return false;
                }
                else 
                {
                  //this.storage.set("customer_data",data.msg[0]);
                  this.data.presentToast('Booking request send successfully!');

                  let param1 = new FormData();
                  param1.append("driver_id",this.Did);
                  param1.append("customer_id",this.customer_id);
                  param1.append("booking_id",result.success.booking_request.id);
                  param1.append("pick_up",'now');
                  param1.append("source",this.pick_up);
                  param1.append("customer",this.customer_name);

                  this.data.postNotification(param1).subscribe(result=>{   
                    if(result.status == "ERROR")
                    {     
                      
                    }
                  });

                  let currentIndex = this.navCtrl.getActive().index;
                  this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.pick_up,destination:this.drop}).then(() => {
                      this.navCtrl.remove(currentIndex);
                  });
                  //this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.pick_up,destination:this.drop});
                }                             
            });

          }
        }
        else{
          this.data.presentToast('Error');     
          this.isnowenabled = true;    
          return false;
        }
      })
    }
    else{
        this.data.presentToast('Please select payment method');
        return false;
    }

    }
}
  