import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DataProvider } from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { IonicPage,ActionSheetController, Events, NavController, NavParams, Platform, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { Subscription } from 'rxjs/Subscription';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { RideNowPage } from '../ride-now/ride-now';
import { RideLaterPage } from '../ride-later/ride-later';
import { ModalpagePage } from '../modalpage/modalpage';
import { OneSignal } from '@ionic-native/onesignal';
import { AsyncPipe } from '../../../node_modules/@angular/common';
import { filter, delay } from 'rxjs/operators';
import * as firebase from 'Firebase';
import { Device } from '@ionic-native/device';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions'; 
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment'
import { FeedbackPage } from '../feedback/feedback';

declare var google;          

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription: Subscription;
  map : any;
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;     
  query: string = '';
  dest_query :string ='';
  places: any = [];
  dest_places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any; 
  action : {};
  address;
  sourceLatLng:any;
  calculated_distance : any;
  actionSheetStyles : any;
  actionSheet : any;
  role : any;
  lat : any;
  long : any;
  current_place : any;
  display_vehicleTypes : any;
  vehicle_types : any;
  vehicle_type : any = '';
  marker : any = [];
  selectdId:any = '';
  cost : any;
  infoWindow : any;
  selected_cost : any;
  public active: string; 
  isnowenabled:boolean=false;
  endRide:boolean=false;
  islaterenabled:boolean=false;
  ride_date : any = '';
  ride_time : any = '';
  drivers : any =[];
  public duration: any;
  markers = [];
  ref = firebase.database().ref('geolocations/');
  chkPickup : any = 0;
  liveRide_bookingId :any;
  liveRide_customerId :any;
  yourId : any;
  id : any;
  watch2 : Subscription;
  watch : Subscription;
  displaydistance : boolean = false;
  sub : Subscription;
  eve_unsub : any = 'true';
  leave : boolean = true;
  loadingCtr : any;
  isAvailable:boolean=true;
  facebook_link : any;
  twitter_link : any;
  instagram_link : any;
  linkedin_link : any;
  isNearby : any = [];

  constructor(private backgroundMode: BackgroundMode,private androidPermissions: AndroidPermissions, private inAppBrowser: InAppBrowser, private nativePageTransitions: NativePageTransitions, private oneSignal: OneSignal, private loading: LoadingController,private device: Device, public actionSheetCtrl: ActionSheetController, public eve: Events,public navCtrl: NavController, private modalCtrl: ModalController, private storage : Storage, public data : DataProvider, public geolocation: Geolocation, public navParams: NavParams, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public viewCtrl: ViewController) {
   this.backgroundMode.enable();
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

    this.data.isRide = 'yes';
    this.storage.get('user').then(data=>{   
      this.id = data[0].id
      this.yourId = this.id;
      this.role = data[0].role;
    }); 

    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();
   
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.active = '';
    this.calculated_distance = '0 km';  
    this.action = {
      pickup : 'pickup',
      drop : 'drop'
    };

    this.cost = {
      economy_cost : 0,
      comfort_cost : 0,
      business_cost : 0
    }

    this.address = {
      place:'',
      drop_place:''
    };
      
    this.eve.subscribe('live_tracking:created', (live_tracking_data, time) => {
      console.log("FIRST TIME "+this.id);
      this.leave = false;
      this.isnowenabled = true;
      this.watchMethod(live_tracking_data);
      this.liveRide_bookingId = live_tracking_data.booking_id;
      this.liveRide_customerId = live_tracking_data.customer_id;
      firebase.database().ref('driver/'+this.id).set({ 'status': 'live_tracking','booking_id':live_tracking_data.booking_id});
      this.eve.unsubscribe('live_tracking:created');
      let param = new FormData();
      param.append("booking_id",this.liveRide_bookingId);
        this.data.getBookingDetails(param).subscribe(result=>{
          if(result.status == "OK")
          {
            this.maps.startNavigating(result.success.booking.source,result.success.booking.destination,this.directionsPanel.nativeElement);
          }
        }); 

        this.data.AvailableToggle().subscribe(result=>{
          console.log(result);
          if(result.status == 'OK')
          {
            console.log(result.success.available);
            if(result.success.available == 'Driver set to On')
            {}   
            else{}
          }
          else{
            this.data.presentToast('Error');
          }
        });
    });

    this.eve.subscribe('cancelled_request:created', (cancelled_request, time) => {
      /*if(this.watch2){
        this.watch2.unsubscribe();
      }*/
      firebase.database().ref('driver/'+this.id).remove();
      firebase.database().ref(this.liveRide_bookingId).remove();
      this.leave = true;
      this.data.presentToast('Request cancelled by customer');
      this.eve.unsubscribe('cancelled_request:created');
      setTimeout(()=>{
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      },3000);
      

      this.data.AvailableToggle().subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          console.log(result.success.available);
          if(result.success.available == 'Driver set to On')
          {}
          else{}
        }
        else{
          this.data.presentToast('Error');
        }
      });
    });

    this.eve.subscribe('selected_Cash_Payment:created', (selected_Cash_Payment, time) => {
      firebase.database().ref('driver/'+this.id).set({ 'status': 'cashPayment','booking_id':selected_Cash_Payment.booking_id});
      this.leave = true;
      this.cashPaymentReceived(selected_Cash_Payment);
    });

    this.eve.subscribe('selected_Other_Payment:created', (selected_Other_Payment, time) => {
      //firebase.database().ref('driver/'+this.id).remove();
      //firebase.database().ref(this.liveRide_bookingId).remove();
      this.otherPaymentReceived(selected_Other_Payment);
    });
    loader.dismiss();
  }

  ionViewDidLoad(){

      //console.log(new Date("2019-02-01" + ' ' + "12:15"));
      //console.log(new Date(new Date("2019-02-01" + ' ' + "12:15")).toISOString());
      console.log("First log");
      google.maps.event.trigger( this.maps.map, 'resize' );
      setTimeout(() => {
      this.maps.init(this.mapElement.nativeElement,this.pleaseConnect.nativeElement).then((data) => { 
        this.map = data;
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.searchDisabled = false;
        console.log("Middle log");
      });
    },3000);
      console.log("Last log");
   
      this.eve.subscribe('ride_later_alert:created', (ride_later_alert, time) => {
        firebase.database().ref('customer/'+this.id).set({ 'status': 'live_tracking','booking_id':ride_later_alert.booking_id});
          this.leave = false;
          this.eve.unsubscribe('ride_later_alert');
          var pick_up;
          var drop;
              let param = new FormData();
              param.append("booking_id",ride_later_alert.booking_id);
              this.data.getcurrentBooking(param).subscribe(result=>{
                     console.log(result);
                     if(result.status == "OK")
                     {
                       pick_up = result.success.booking.source;
                       drop = result.success.booking.destination;
                       this.goToConfirmPage(ride_later_alert.booking_id,pick_up,drop);
                     }
                     else
                     {
                       this.data.presentToast('Error');
                     }
             });
         });

           this.eve.subscribe('distance:created', (distance, time) => {
            this.calculated_distance = distance;
            this.displaydistance = true;
            let param = new FormData();
              let x = this.calculated_distance.split("km");
              x = x[0].split("m");
              x = x[0].replace(",","");
              param.append("distance",x);
              if(this.role == 2)
              {
                this.data.getCost(param).subscribe(result=>{
                  if(result.status == "ERROR")
                  {
                      return false;
                  }
                  else
                  {
                    this.cost = {
                      economy_cost : Number((result.success.trip_costs[0].cost).toFixed(2)),
                      comfort_cost : Number((result.success.trip_costs[1].cost).toFixed(2)),
                      business_cost : Number((result.success.trip_costs[2].cost).toFixed(2))
                    }
                  }
                });
              }
          });
  }

  ngOnDestroy()
  {
    return new Promise((resolve: Function, reject: Function) => {
      if(this.role == 2)
      {
        /*if(this.eve_unsub) {
          this.eve.unsubscribe('ride_later_alert:created');
          this.eve.unsubscribe('selected_Other_Payment:created');
          this.eve_unsub = undefined;
        }
         
        if(this.sub){
          this.sub.unsubscribe();
        }*/
        this.eve.unsubscribe('distance');
        this.backgroundMode.disable();
        resolve();
      }
      else if(this.role == 3){
        if(this.leave == false){
            this.data.presentToast('You can not leave this page until Ride Complete');
            reject();
        }
        else{
          resolve();
          }
        }
      });
  }

  ionViewWillEnter() {    
    this.storage.get('user').then(data=>{   
      this.id = data[0].id
      this.yourId = this.id;
      this.role = data[0].role;

      this.getLatLng().then(points=>{
        this.lat = points[0];
        this.long = points[1];
        if(data[0].role == 2)
        {
          this.getStatusDataforCustomer().then(data_val=>{
            this.loadingCtr = this.loading.create({
              content :"Please wait...",  
              spinner : 'crescent'
            });

            this.loadingCtr.present();

            let param = new FormData();   
            param.append("booking_id",data_val['booking_id']);

            this.data.getcurrentBooking(param).subscribe(result=>{   
              console.log(result);    
              if(result.status == "OK")
              {
                  if(data_val['status'] == 'waiting')
                  {
                    this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking.id,rideType:'now',source:result.success.booking.source,destination:result.success.booking.destination,status : data_val['status']}).then(() => {
                      this.loadingCtr.dismiss();
                    });
                  }
                  else if(data_val['status'] == 'ongoing')
                  {
                    this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking.id,rideType:'now',source:result.success.booking.source,destination:result.success.booking.destination,status : data_val['status'],driver_id:result.success.booking.booking_details[0].driver_id}).then(() => {
                      this.loadingCtr.dismiss();
                    });
                  }
                  else if(data_val['status'] == 'payment')
                  {
                    this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking.id,rideType:'now',source:result.success.booking.source,destination:result.success.booking.destination,status : data_val['status'],driver_id:result.success.booking.booking_details[0].driver_id}).then(() => {
                      this.loadingCtr.dismiss();
                    });
                  }
              }
              else
              {
                this.data.presentToast('Error');    
                this.loadingCtr.dismiss();    
              }                            
            }); 
          });
  
          this.getPickup().then(data=>{
            this.address.place = data;
          });

          this.data.getvehicletypesforCustomers().subscribe(result=>{
            if(result.status == 'OK')        
            {
              this.vehicle_types = result.success.vehicletypes;
            }
            else{
              this.data.presentToast(result.status);
            }     
          });  

          let param = new FormData();
          param.append("latitude",points[0]);
          param.append("longitude",points[1]);
            this.data.storeCustomerLocation(param).subscribe(result=>{
              if(result.status == "ERROR")
              {
                this.data.presentToast('Not Able to get your current location');
              }
              else   
              {}                           
            });

            let param1 = this.id;
            this.data.getCustomerProfile(param1).subscribe(result=>{
              if(result.status == 'OK')
              {
                if(result.success.profile.customer_details.facebook_profile != undefined && result.success.profile.customer_details.facebook_profile && result.success.profile.customer_details.facebook_profile != 'undefined'){
                  this.facebook_link = result.success.profile.facebook_profile;
                }
                else{
                  this.facebook_link = '';
                }
                if(result.success.profile.customer_details.twitter_profile != undefined && result.success.profile.customer_details.twitter_profile && result.success.profile.customer_details.twitter_profile != 'undefined'){
                  this.twitter_link = result.success.profile.customer_details.twitter_profile;
                }else{
                  this.twitter_link = '';
                }
                if(result.success.profile.customer_details.instagram_profile != undefined && result.success.profile.customer_details.instagram_profile && result.success.profile.customer_details.instagram_profile != 'undefined'){
                  this.instagram_link = result.success.profile.customer_details.instagram_profile;
                }else{
                  this.instagram_link = '';
                }
                if(result.success.profile.customer_details.linkedin_profile != undefined && result.success.profile.customer_details.linkedin_profile && result.success.profile.customer_details.linkedin_profile != 'undefined'){
                  this.linkedin_link =  result.success.profile.customer_details.linkedin_profile;
                }else{
                  this.linkedin_link = '';
                }
              }
              else{}    
            });
        }

        if(data[0].role == 3)
        {
          this.getStatusDataforDriver().then(data_val=>{
            this.loadingCtr = this.loading.create({
              content :"Please wait...",
              spinner : 'crescent'
            });
            
            let param = new FormData();
            param.append("booking_id",data_val['booking_id']);

            this.data.getBookingInfo(param).subscribe(result=>{   
              if(result.status == "OK")
              {
                if(data_val['status'] == 'live_tracking')
                {
                  console.log("SECOND TIME");
                  var payload = {'booking_id':data_val['booking_id'],'customer_id':result.success.booking.customer_id};
                  this.eve.publish('live_tracking:created',payload, Date.now());
                  this.loadingCtr.dismiss();
                }
                else if(data_val['status'] == 'cashPayment')
                {
                  var payload1 = {'booking_id':data_val['booking_id'],'customer_id':result.success.booking.customer_id,'driver_id':result.success.booking.booking_details[0].driver_id,'amount':result.success.booking.cost};
                  this.eve.publish('selected_Cash_Payment:created', payload1, Date.now());
                  this.loadingCtr.dismiss();
                }
                else if(data_val['status'] == 'ongoing')
                {
                  var payload = {'booking_id':data_val['booking_id'],'customer_id':result.success.booking.customer_id};
                  this.eve.publish('live_tracking:created',payload, Date.now());
                  this.startRide();
                  this.loadingCtr.dismiss();
                }
              }
            });
          });

          let param = new FormData();
          param.append("latitude",points[0]);
          param.append("longitude",points[1]);
          console.log(this.lat+'==='+this.long);
            this.data.storeDriverLocation(param).subscribe(result=>{
              if(result.status == "ERROR")
              {
                  this.data.presentToast('Not Able to get your current location');
              }
              else   
              {}                           
            });

            let param1 = new FormData();
            param1.append("latitude",points[0]);
            param1.append("longitude",points[1]); 
            this.data.getCloseCustomers(param1).subscribe(result=>{                   
              if(result.status == "ERROR")
              {
                  return false;
              }
              else
              {   
                if(result.success.customers)
                {
                  var address=[];
                  for(var i = 0; i<result.success.customers.length;i++)
                  {
                    address[i]=[];
                    address[i]['lat'] = result.success.customers[0].latitude;
                    address[i]['lng'] = result.success.customers[0].longitude;
                    this.marker[i] = new google.maps.Marker({
                      map: this.maps.map,         
                      //animation: google.maps.Animation.DROP,
                      position: new google.maps.LatLng(address[i]['lat'],address[i]['lng']),
                      icon: { url : 'assets/imgs/standing-up-man-.png',
                              size: {
                                width: 50,
                                height: 55
                              } 
                            },
                      animation: google.maps.Animation.DROP
                    });         
                  }
                }
                else{
                  this.data.presentToast('No Nearby Customers!');
                }
              }                        
            });

            let param2 = this.id;
            this.data.getDriverProfile(param2).subscribe(result=>{
              if(result.status == 'OK')
              {
                if(result.success.profile.driver_details.facebook_profile != undefined && result.success.profile.driver_details.facebook_profile && result.success.profile.driver_details.facebook_profile != 'undefined'){
                  this.facebook_link = result.success.profile.driver_details.facebook_profile;
                }
                else{
                  this.facebook_link = null;
                }
                if(result.success.profile.driver_details.twitter_profile != undefined && result.success.profile.driver_details.twitter_profile && result.success.profile.driver_details.twitter_profile != 'undefined'){
                  this.twitter_link = result.success.profile.driver_details.twitter_profile;
                }else{
                  this.twitter_link = null;
                }
                if(result.success.profile.driver_details.instagram_profile != undefined && result.success.profile.driver_details.instagram_profile && result.success.profile.driver_details.instagram_profile != 'undefined'){
                  this.instagram_link = result.success.profile.driver_details.instagram_profile;
                }else{
                  this.instagram_link = null;
                }
                if(result.success.profile.driver_details.linkedin_profile != undefined && result.success.profile.driver_details.linkedin_profile && result.success.profile.driver_details.linkedin_profile != 'undefined'){
                  this.linkedin_link =  result.success.profile.driver_details.linkedin_profile;
                }else{
                  this.linkedin_link = null;
                }
              }
              else{}
            });
        }
      });
    });
   }

  ionViewDidEnter()
  {
      setTimeout(() => {
        if(this.role == 2)
        {
          this.data.getvehicletypesforCustomers().subscribe(result=>{
        
            if(result.status == 'OK')        
            {
              this.vehicle_types = result.success.vehicletypes;
            }
            else{
              this.data.presentToast(result.status);
            }     
          });  
        }

        if(this.role == 3)
        {
          this.data.getAvailableToggle().subscribe(result=>{
            console.log(result);
            if(result.status == 'OK')
            {
              console.log(result.success.available);
              if(result.success.available == 'on')
              {
                this.isAvailable = true;
              }
              else{
                this.isAvailable = false;
              }
            }
            else{
              this.data.presentToast('Error');
            }
          });
        }
        }, 1500);
        
    this.storage.get('token')
    .then(data=>{
        this.data.token = data;
    });
  }

  getStatusDataforCustomer()
  {
    return new Promise((resolve,reject)=>{
      firebase.database().ref('customer/'+this.id).once('value', function(snapshot) {
        snapshotToArray(snapshot).forEach(data => {
          let info = {'status':data.status,'booking_id':data.booking_id};
          resolve(info);
        })
      });
    }); 
  }

  getStatusDataforDriver()
  {
    return new Promise((resolve,reject)=>{
      firebase.database().ref('driver/'+this.id).once('value', function(snapshot) {
        snapshotToArray(snapshot).forEach(data => {
          let info = {'status':data.status,'booking_id':data.booking_id};
          resolve(info);
        })
      });
    }); 
  }

  getLatLng()
  {
    return new Promise((resolve,reject)=>{
      var points = [];
      var options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1
      };
      this.watch2 = this.geolocation.watchPosition(options).subscribe((position) => {   
        setTimeout(() => {
          if(position.coords !== undefined)
          {
            points.push(position.coords.latitude);
            points.push(position.coords.longitude);
            resolve(points); 
          }
          
        },0);
        if(points.length > 0)
        {
          this.watch2.unsubscribe();
        }
      });
    });
  }

  getPickup()
  {
    return new Promise((resolve,reject)=>{
      var addressFull = [];
      var geocoder = new google.maps.Geocoder();
      if(this.lat && this.long)    
      {
        var latlng = {lat: parseFloat(this.lat), lng: parseFloat(this.long)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            var address = results[0].formatted_address;
            addressFull.push(address);
            resolve(address);
          }        
        });
      }
    });
  }

  goToConfirmPage(booking_id,pick_up,drop){
    this.navCtrl.push(ConfirmPaymentPage,{'booking_id':booking_id,rideType:'now',source:pick_up,destination:drop}); 
  }

  updateActive(name)
  {
    this.active = name;
  }

  showAddressModal(act) {
    this.active = '';
    this.isnowenabled = false;
    this.islaterenabled = false;

    /*if(this.watch2){
      this.watch2.unsubscribe();
    }*/
    let modal = this.modalCtrl.create(AutocompletePage, {action: act});
    let me = this;

      modal.onDidDismiss(data => {
        if(act=='pickup')
        {
          if(data)
          {
            this.address.place = data;
          }  
        }
        else{
          if(data)
          {
            this.address.drop_place = data; 
          }
        }
        if(this.address.place && this.address.drop_place)
        {
          this.maps.startNavigating(this.address.place,this.address.drop_place,this.directionsPanel.nativeElement);    
          this.checkNearby().then(()=>{
            this.display_vehicleTypes = 1;
            console.log('this.isNearby'+ this.isNearby);
          });
        }
      });
      modal.present();
  } 

  checkNearby()
  {
    return new Promise((resolve,reject)=>{
      var k = 0;
      for(k;k<this.vehicle_types.length;k++)
      {
        this.checkClosure(k,this.vehicle_types[k].type).then(()=>{
          if(k == this.vehicle_types.length)
          {
            resolve(true);
          }
        });
      }   
    });
  }

  checkClosure(k,vehicle_type)
  {
    return new Promise((resolve,reject)=>{
      let param = new FormData();
      param.append("latitude",this.lat);
      param.append("longitude",this.long); 
      param.append("vehicle_type",vehicle_type); 
      this.data.getCloseVehicles(param).subscribe(result=>{                              
        if(result.status == "OK")
        { 
          if(result.success.drivers.length > 0)
          {
            this.isNearby[k] = true;
            resolve(this.isNearby[k]);
          }else{
            this.isNearby[k] = false;
            resolve(this.isNearby[k]);
          } 
        }     
      });
    });
  }

  selectVehicle(selected_vehicle_type,selected_cost)
  {
    this.isnowenabled = false;
    this.islaterenabled = false;
    this.vehicle_type = selected_vehicle_type;
    this.selected_cost = selected_cost;
    this.deleteMarkers();
    let param = new FormData();
    param.append("latitude",this.lat);
    param.append("longitude",this.long); 
    param.append("vehicle_type",this.vehicle_type); 
    this.data.getCloseVehicles(param).subscribe(result=>{                              
    if(result.status == "ERROR")
    {
      return false;
    }
    else
    {   
      if(result.success.drivers[0])
      {
        this.isnowenabled = true;
        this.islaterenabled = true;
        var address=[];
        for(var i = 0; i<result.success.drivers.length;i++)
        {
            address[i]=[];
            address[i]['lat'] = result.success.drivers[i].latitude;
            address[i]['lng'] = result.success.drivers[i].longitude;
            this.drivers[i] = result.success.drivers[i].id;
            this.addMarker(address[i]['lat'],address[i]['lng'],result.success.drivers[i]);    
        }               
      }
      else{
        this.data.presentToast('No Nearby Drivers!');
        this.isnowenabled = false;
        this.islaterenabled = false;
      }
    }                           
  });
  }

  addMarker(lt,lg,driver) {
    this.marker = new google.maps.Marker({
      map: this.maps.map,         
      position: new google.maps.LatLng(lt,lg),
      icon: { url : 'assets/imgs/car48x48.png',        
              size: {
                width: 64,
                height: 55
              }     
            },
      animation: google.maps.Animation.DROP
    });
    this.markers.push(this.marker);
  }

  rideNow(dist,selected_vehicle_type)
  {
    console.log(this.address.place+" "+this.address.drop_place+" "+this.vehicle_type+" "+this.selected_cost);
    if( this.address.place != '' && this.address.drop_place != '' && this.vehicle_type != '' && this.selected_cost > 0 )
    {       
      let param ;
      param = {
        'distance':dist,
        'vehicle_type':this.vehicle_type,
        'pick_up':this.address.place,
        'drop':this.address.drop_place,
        'cost':this.selected_cost,
        'Did': this.drivers
      };
      this.navCtrl.push(RideNowPage,{param:param});
    }   
    else{
      this.data.presentToast('Please select pickup and drop locations and Vehicle Type!');
    }       
  }

  rideLater(dist,selected_vehicle_type)
  {
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'getDateTime'},{showBackdrop: false});             
    modal.onDidDismiss(data => {   
      if(data)
      {
        this.ride_date = data[0];
        this.ride_time = data[1];

        if( this.address.place != '' && this.address.drop_place != '' && this.vehicle_type != '' && this.ride_date != ''&& this.ride_time != '' && this.selected_cost > 0 )
        {
          let param ;
          param = {
            'distance':dist,
            'vehicle_type':this.vehicle_type,
            'pick_up':this.address.place,
            'drop':this.address.drop_place,
            'cost':this.selected_cost,
            'date' : this.ride_date,
            'time' : this.ride_time,
            'Did': this.drivers
          };
          this.navCtrl.push(RideLaterPage,{param:param});
        }   
        else{
          this.data.presentToast('Please select pickup and drop locations, Vehicle Type, Date and Time!');
        }
      }
    });
    modal.present();
  }  

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
    var options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
      distanceFilter: 1
    };
    this.positionSubscription = this.geolocation.watchPosition(options).subscribe(data => {
      setTimeout(() => {
        this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
        this.redrawPath(this.trackedRoute);
      }, 0);
    });
  }

  redrawPath(path) {
    if (this.maps.currentMapTrack) {
      this.maps.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.maps.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.maps.currentMapTrack.setMap(this.maps.map);
    }
  }

  stopTracking() {
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    if (this.maps.currentMapTrack) {
      this.maps.currentMapTrack.setMap(null);
    }
  }

  watchMethod(live_tracking_data)
  {
    //this.eve.unsubscribe('live_tracking:created');
    var options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
      distanceFilter: 1
    };
    this.watch = this.geolocation.watchPosition(options).subscribe((data) => {
      setTimeout(() => {
        if(this.leave == false)
        {
          this.updateGeolocation(this.liveRide_customerId,this.liveRide_bookingId, data.coords.latitude,data.coords.longitude);
        }
        }, 0);
      });
    }

  updateGeolocation(customer_id,booking_id, lat, lng) {
    firebase.database().ref(booking_id+'/'+this.id).set({ 'latitude': lat, 'longitude' : lng});
  } 

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  startRide()
  {
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });
    loader.present();
    
    let param = new FormData();
    param.append("customer_id",this.liveRide_customerId); 
    param.append("booking_id",this.liveRide_bookingId); 
    param.append("driver_id",this.yourId); 

    this.data.rideStart(param).subscribe(result=>{   
      if(result.status === "OK")
      {     
        firebase.database().ref('driver/'+this.yourId).set({ 'status': 'ongoing','booking_id':this.liveRide_bookingId});
        console.log(result);
        this.data.isStarted = true;
        this.islaterenabled = true;
        this.isnowenabled = false;
        this.endRide = true;
        this.startTracking();
        loader.dismiss();
      }
      else{
        console.log('Error');
        loader.dismiss();
        this.data.presentToast('You should be near by customer');
        return false;
      }    
    });
  }

  finishRide()
  {
    this.data.isStarted = false;
    this.leave = true;
    this.stopTracking();
    this.islaterenabled = false;
    this.loadingCtr = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });
    this.watch.unsubscribe();
    let param = new FormData();
    param.append("customer_id",this.liveRide_customerId); 
    param.append("booking_id",this.liveRide_bookingId); 
    param.append("driver_id",this.yourId);    

    //this.eve.unsubscribe('live_tracking:created');
    firebase.database().ref(this.liveRide_bookingId).remove();
    firebase.database().ref('driver/'+this.id).remove();
    this.data.rideEnd(param).subscribe(result=>{   
      if(result.status == "OK")
      {    
        /*if(this.watch && this.watch != undefined)
        {
          this.watch.unsubscribe();
        }
        if(this.watch2 && this.watch2 != undefined){
          this.watch2.unsubscribe();
        }
        if(this.positionSubscription && this.positionSubscription != undefined)
        {
          this.positionSubscription.unsubscribe();
        }*/
        
        this.data.getAvailableToggle().subscribe(result=>{
          console.log(result);
          if(result.status == 'OK')
          {
            this.loadingCtr.dismiss();
            console.log(result.success.available);
            if(result.success.available == 'on')
            {
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            }
            else{
              this.loadingCtr.dismiss();
              this.data.AvailableToggle().subscribe(result=>{
                console.log(result);
                if(result.status == 'OK')
                {
                  console.log(result.success.available);
                  if(result.success.available == 'Driver set to On')
                  {
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  }   
                  else{} 
                }
                else{
                  this.data.presentToast('Error');
                }
              });
            }
          }
          else{
            this.data.presentToast('Error');
          }
        });  
      }
      else{
        console.log('Err');      
      }    
    });
  }

  cashPaymentReceived(info)
  {  
    this.eve.unsubscribe('selected_Cash_Payment:created');
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'cashPayment',bookingId:info.booking_id},{enableBackdropDismiss:false,showBackdrop:false});         
      modal.onDidDismiss(data => {   
        if(data == 'yes')
        {
          let param = new FormData();
          param.append('customer_id', info.customer_id);
          param.append('booking_id',info.booking_id);
          param.append('driver_id',info.driver_id);
          param.append('amount',info.amount);

          this.data.paymentByCash(param).subscribe(result=>{
          console.log(result);
            if(result.status == 'OK')
            {
              /*if(this.watch && this.watch !== undefined)
              {
                this.watch.unsubscribe();
              }
              if(this.watch2 && this.watch2 !== undefined){
                this.watch2.unsubscribe();
              }
              if(this.positionSubscription && this.positionSubscription !== undefined)
              {
                this.positionSubscription.unsubscribe();
              }*/
              firebase.database().ref(info.booking_id).remove();
              firebase.database().ref('driver/'+this.id).remove();
              firebase.database().ref('customer/'+info.customer_id).remove();
              let currentIndex = this.navCtrl.getActive().index;
              this.navCtrl.push(FeedbackPage,{booking_id:info.booking_id,customer_id:info.customer_id}).then(() => {
                this.navCtrl.remove(currentIndex);
              });
            }
          });
        }  
        else{
          this.data.presentToast('Something went Wrong!');    
        }     
      });
      modal.present();  
  }

  otherPaymentReceived(selected_Other_Payment)
  {
    this.eve.unsubscribe('selected_Other_Payment:created');
    /*if(this.watch && this.watch !== undefined)
    {
      this.watch.unsubscribe();
    }
    if(this.watch2 && this.watch2 !== undefined){
      this.watch2.unsubscribe();
    }
    if(this.positionSubscription && this.positionSubscription !== undefined)
    {
      this.positionSubscription.unsubscribe();
    }*/
    firebase.database().ref(selected_Other_Payment.booking_id).remove();
    firebase.database().ref('driver/'+this.id).remove();
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(FeedbackPage,{booking_id:selected_Other_Payment.booking_id,customer_id:selected_Other_Payment.customer_id}).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  redirect(link) {
    this.inAppBrowser.create('http://'+link);
  }
}       

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(function() {
      var item = snapshot.val();
      item.key = snapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
