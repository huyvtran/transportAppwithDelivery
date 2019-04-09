import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage,ActionSheetController, Events, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { HomePage } from '../home/home';

/**   
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */   

declare var google;
@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  
  map : any;
  searchDisabled: boolean;
  saveDisabled: boolean;
  autocompleteService : any;
  location: any; 
  sourceLatLng:any;
  calculated_distance : any;
  role : any;
  id : any;
  lat : any;
  long : any;
  vehicle_type : any = '';
  marker : any = [];
  cost : any;
  public from: string;
  public to: any;
  public type: any;
  public weight: any;
  public height: any;
  public width: any;
  public length: any;
  public oneway: boolean;
  delivery_type : any ='';
  date : any;
  time : any;
  minDate : any;
  source_lat : any;
  source_lng : any;
  nearbyDrivers : any;
  pick_up_lt :any;
  pick_up_lg :any;
  drop_lt :any;
  drop_lg :any;
  public active: string; 
  isnowenabled:boolean=false;
  customer_name : any;
  drivers : any =[];
  
  constructor(public actionSheetCtrl: ActionSheetController, private eve: Events,public navCtrl: NavController, private modalCtrl: ModalController, private storage : Storage, public data : DataProvider, public geolocation: Geolocation, public navParams: NavParams, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public viewCtrl: ViewController) {
    this.from = this.navParams.get('from');
    this.to = this.navParams.get('to');
    this.type = this.navParams.get('type');
    this.oneway = this.navParams.get('oneway');
    this.weight = this.navParams.get('weight');
    this.length = this.navParams.get('length');
    this.width = this.navParams.get('width');
    this.height = this.navParams.get('height');

    let addresses: string[] = [this.from,this.to];
      
      //var addresses = '';
      this.getLatLng(addresses).then(addressFull=>{
        this.pick_up_lt = addressFull[0];
        this.pick_up_lg = addressFull[1];
        this.drop_lt = addressFull[2];
        this.drop_lg = addressFull[3];
      });

    if(this.navParams.get('delivery_type'))
    {
      this.delivery_type = this.navParams.get('delivery_type');
      this.date = this.navParams.get('date');
      this.time = this.navParams.get('time')
    }
    
    this.maps.getLatLng(this.from).then((data)=>{
      this.source_lat = data['latitude'];
      this.source_lng = data['longitude'];
    });
  
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.calculated_distance = '0 km';

    eve.subscribe('distance:created', (distance, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`  
      this.calculated_distance = distance;

      let param = new FormData();
      let x = this.calculated_distance.split("km");
      x = x[0].replace(",","");
      console.log("!@#!@#")
      console.log(this.calculated_distance+" "+x[0]+" "+x);
      param.append("distance",x);
      if(this.oneway)
      {
        param.append("oneway",'0');
      }
      else{
        param.append("oneway",'1');
      }
      param.append("weight",this.weight);
      param.append("length",this.length);
      param.append("width",this.width);
      param.append("height",this.height);
      param.append("source_lat",this.source_lat);
      param.append("source_lng",this.source_lng);
      this.data.getCostandVehicle(param).subscribe(result=>{   
        console.log("########");
        console.log(result);
        if(result.status == "ERROR")
        {
            this.data.presentToast(result.error);
            return false;
        }
        else
        {     
          this.vehicle_type = result.success.vehicle_type;
          this.cost = result.success.trip_costs;
          this.nearbyDrivers = result.success.deliver_trip_costs;
          console.log('this.nearbyDrivers==>'+this.nearbyDrivers);
          this.showNearbyVehicles();
        }
      });
    });

    this.storage.get('user').then(data=>{   
      this.id = data[0].id;
      this.role = data[0].role;
      this.customer_name = data[0].first_name +' '+ data[0].last_name;
    });
  }

  ionViewDidLoad(): void {
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.searchDisabled = false;  
    }); 
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.long =  position.coords.longitude;
    });
  }

  ionViewDidEnter(){
    this.maps.startNavigating(this.from,this.to,this.directionsPanel.nativeElement); 
  }

  updateActive(name)
  {
    this.active = name;
    this.isnowenabled = true;
  }

  showNearbyVehicles()
  {
    var address=[];
    if(this.nearbyDrivers.length > 0)
    {
      for(var i = 0; i<this.nearbyDrivers.length;i++)
      {
        address[i]=[];
        address[i]['lat'] = this.nearbyDrivers[i].latitude;
        address[i]['lng'] = this.nearbyDrivers[i].longitude;
        this.drivers[i] = this.nearbyDrivers[i].driver_id;
        this.addMarker(address[i]['lat'],address[i]['lng'],this.drivers[i]);
      }
    }
  }

  addMarker(lt,lg,driver) {
    this.marker = new google.maps.Marker({
      map: this.maps.map,         
      position: new google.maps.LatLng(lt,lg),
      icon: { url : 'assets/imgs/truck48x48.png',        
              size: {
                width: 64,
                height: 55
              }     
            },
      animation: google.maps.Animation.DROP
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

  confirmRequest(){
    this.isnowenabled = false;
    if(this.active != '')
    {
        if(this.delivery_type == 'now')
        {
          let param1 = new FormData();
          param1.append("customer_id",this.id);
          this.data.getWalletAmount(param1).subscribe(result=>{
            if(result.status == 'OK')
            {
              if(parseFloat(result.success.balance) < 0 )
              {
                this.data.presentToast("Your wallet balance is in minus, So you can't take Ride");
              }
              else{
                //this.isnowenabled = false;
                let temp = this.calculated_distance.replace(",","");
                temp = temp.split(" ");      
                let param = new FormData();
                param.append("isRide",this.data.isRide);
                param.append("customer_id",this.id);
                param.append("schedule","0");
                param.append("schedule_time",null);
                param.append("distance",temp[0]);
                param.append("vehicle_type",this.vehicle_type);
                param.append("source",this.from);
                param.append("source_lat",this.pick_up_lt);
                param.append("source_long",this.pick_up_lg);
                param.append("destination_lat",this.drop_lt);  
                param.append("destination_long",this.drop_lg);  
                param.append("destination",this.to);  
                param.append("total",null);
                param.append("is_cancelled","0");
                param.append("is_completed","0");
                param.append("is_paid","0");
                param.append("status","0");
                param.append("cost",this.cost);   
                param.append("driver_id",'');
                param.append("payment_method",this.active);
                param.append("type","delivery");
                param.append("parcel_type",this.type);
                param.append("height",this.height);
                param.append("weight",this.weight);
                param.append("length",this.length);
                param.append("width",this.width);

                this.data.bookingRequest(param).subscribe(result=>{
                    console.log(result);    
                    //this.userData = result; 
                    if(result.status == "ERROR" || result.status == "Error")
                    {
                        this.data.presentToast('Your wallet balance is low. Please select another payment method.');     
                        //this.isnowenabled = true;      
                        return false;
                    }
                    else 
                    {
                      //this.storage.set("customer_data",data.msg[0]);
                      this.data.presentToast('Booking request sent Successfully!');

                      let param1 = new FormData();
                      param1.append("driver_id",this.drivers);
                      param1.append("customer_id",this.id);
                      param1.append("booking_id",result.success.booking_request.id);
                      param1.append("pick_up",'now');
                      param1.append("source",this.from);
                      param1.append("customer",this.customer_name);

                      this.data.postNotification(param1).subscribe(result=>{   
                        if(result.status == "ERROR")
                        {     
                          
                        }
                      });

                      let currentIndex = this.navCtrl.getActive().index;
                      this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.from,destination:this.to}).then(() => {
                          this.navCtrl.remove(currentIndex);
                      });
                      //this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.pick_up,destination:this.drop});
                    }                             
                });
              
              }
          }
          else{
            this.data.presentToast('Please select Payment method');
            return false;
          }
        });
      }
      else
      {
        let param1 = new FormData();
        param1.append("customer_id",this.id);
        this.data.getWalletAmount(param1).subscribe(result=>{
          if(result.status == 'OK')
          {
            if( parseFloat(result.success.balance) < 0 )
            {
              this.data.presentToast("Your wallet balance is in minus, So you can't book Ride");
            }
            else{
              let temp = this.calculated_distance.replace(",","");
              temp = temp.split(" "); 
              this.isnowenabled = false;
              let param = new FormData();
              
              var dateObj = new Date(this.date + ' ' + this.time);
              var date = new Date(dateObj).toISOString();
              param.append("customer_id",this.id);
              param.append("schedule","0");
              param.append("pickup_date",this.date);
              //param.append("schedule_time",date);
              param.append("schedule_time",this.date + ' ' + this.time);
              param.append("distance",temp[0]);
              param.append("vehicle_type",this.vehicle_type);
              param.append("source",this.from);
              param.append("source_lat",this.pick_up_lt);
              param.append("source_long",this.pick_up_lg);
              param.append("destination_lat",this.drop_lt);  
              param.append("destination_long",this.drop_lg);  
              param.append("destination",this.to);
              param.append("total",null);
              param.append("is_cancelled","0");
              param.append("is_completed","0");
              param.append("is_paid","0");
              param.append("status","0");
              param.append("cost",this.cost);   
              param.append("driver_id",'');
              param.append("type","delivery");
              param.append("parcel_type",this.type);
              param.append("height",this.height);
              param.append("weight",this.weight);
              param.append("length",this.length);
              param.append("width",this.width);

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
                    this.data.presentToast('Booking request sent Successfully!');
                    setTimeout(()=>{
                      this.navCtrl.setRoot(HomePage);
                    },3000);
                    
                  }                                   
              });
            }
          }
        }); 
      }
    }
  }
}
