import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,Events, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DataProvider } from '../providers/data/data';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin'; 
import { IntroPage } from '../pages/intro/intro';
import { CustomerProfilePage } from '../pages/customer-profile/customer-profile'; 
import { MapPage } from '../pages/map/map';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { PaymentwalletPage } from '../pages/paymentwallet/paymentwallet';
import { DriversettingPage } from '../pages/driversetting/driversetting';
import { BookinghistoryPage } from '../pages/bookinghistory/bookinghistory';
import { BookingListPage } from '../pages/booking-list/booking-list';
import { DeliveryPage } from '../pages/delivery/delivery';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
import { FeedbackPage } from '../pages/feedback/feedback';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PaymentPage } from '../pages/payment/payment';
import * as firebase from 'firebase';
import { ModalpagePage } from '../pages/modalpage/modalpage';
import { PackageBookingPage } from '../pages/package-booking/package-booking';
import { NotificationsPage } from '../pages/notifications/notifications';
import { DriverTransactionsPage } from '../pages/driver-transactions/driver-transactions';

const config = {         
  apiKey: 'AIzaSyD_mkig8BYCj7PJlCj4-yN4w6QPmJjxFbg',
  authDomain: 'localhost',
  databaseURL: 'https://transportapp-b1681.firebaseio.com/',
  projectId: 'transportapp-b1681',
  storageBucket: 'gs://transportapp-b1681.appspot.com',
};

@Component({   
  templateUrl: 'app.html'
})
export class MyApp {          
  @ViewChild(Nav) nav: Nav;
  rootPage:any;   
  pages : any;
  fname = '';
  lname = '';     
  email = '';   
  role : Number = 0; 
  id :any;
  avatar : any = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';

  constructor(private backgroundMode: BackgroundMode,private androidPermissions: AndroidPermissions, private modalCtrl: ModalController, private oneSignal: OneSignal,  platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public data : DataProvider, private storage: Storage,public events: Events,private alertCtrl: AlertController) {
    /* Initialize firebase */
    firebase.initializeApp(config);

    /* background mode enable settings */
    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({'hidden':false}); 
    this.data.getToken();

    /* Is app installed first time = display intro slides OR residect to nect page */
    this.storage.get('showSlide').then(data=>{
      if(data == null || data == undefined)
      {
        this.storage.set('showSlide', false);
        this.rootPage = IntroPage;       
      }    
      else{
        /* Is "remember me checked while login"? */
        this.storage.get('isRemember').then(data=>{
          if(data == null || data == undefined)
          {    
            this.storage.set('isRemember', false);
            this.rootPage = IntroPage;
          }
          if(data == true)
          {
            this.storage.get('user').then(user=>{   
              if(user == null || user == undefined || user == false)
              {
                this.rootPage = SigninPage;
                return false;
              }
              this.id = user[0].id;
              this.role = user[0].role;

              this.fname = user[0].first_name;
              this.lname = user[0].last_name;
              this.email = user[0].email;
              console.log('this.role==>'+this.role);

              if(user[0].role==2)
              {
                this.oneSignal.sendTag('customer_id',user[0].id);
                /* Get Customer Profile */
                let param = user[0].id; 
                this.data.getCustomerProfile(param).subscribe(result=>{
                  if(result.status == 'OK')
                  {
                    if(result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '')
                    {
                      this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                    }
                    else{
                      this.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
                    } 
                  }
                  else{ }
                });  
                /* End Get Customer Profile */
                this.rootPage = HomePage;
              }
              else if(user[0].role==3)
              {
                this.oneSignal.sendTag('driver_id',user[0].id);
                /* Get Driver Profile */
                let param = user[0].id;
                  this.data.getDriverProfile(param).subscribe(result=>{
                    if(result.status == 'OK')
                    {
                      if(result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '')
                      {
                        this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                      }
                      else{
                        this.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
                      }
                      if(result.success.profile.is_completed == 0)
                      {
                        this.rootPage = EditProfilePage;
                      }
                      else
                      {
                        this.rootPage = HomePage;
                      }
                    }
                    else{ 
                      this.storage.get('isProfile_Complete').then(data1=>{
                        if(data1 == null || data1 == undefined || data1 == false)
                        {
                          this.rootPage = EditProfilePage;       
                        }    
                        else{
                          this.rootPage = HomePage;
                        }
                      });
                    }
                }); 
                /* End Get Driver Profile */  
              }
            });
          }
          else
          {
            this.rootPage = SigninPage;
          }
        });  
      }
    });
    
    events.subscribe('user:created', (user, time) => {
      console.log('Welcome', user, 'at', time);
      this.fname = user[0].first_name;
      this.lname = user[0].last_name;
      this.email = user[0].email;
      this.role = user[0].role;
      this.id = user[0].id;
      console.log('this.role==>'+this.role);
      if(user[0].role==2)
      {
        let param = user[0].id;
                
        this.data.getCustomerProfile(param).subscribe(result=>{
          if(result.status == 'OK')
          {
            if(result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '')
            {
              this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
            }
            else{
              this.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
            }
          }
          else{}
        });  
      }
      else if(user[0].role==3)
      {
        let param = user[0].id;
        this.data.getDriverProfile(param).subscribe(result=>{
          if(result.status == 'OK')
          {
            if(result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '')
            {
              this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
            }
            else{
              this.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
            }
          }
          else{}
        });  
      }
    });
    
    platform.ready().then(() => {   
      // Okay, so the platform is ready and our plugins are available.
      statusBar.styleDefault();
      splashScreen.hide();   

      /* OneSignal Settings for push notification */
      if (isCordovaAvailable()){
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }      
    });

    /* Pages array */
    this.pages = {    
      homePage : HomePage,   
      customerProfilePage : CustomerProfilePage,     
      findabranchPage : HomePage,
      mapPage : MapPage,         
      helpPage : HelpPage,           
      settingsPage : SettingsPage,     
      paymentwalletPage : PaymentwalletPage,
      driversettingPage : DriversettingPage,
      bookinghistoryPage : BookinghistoryPage,
      bookingListPage : BookingListPage,
      deliveryPage : DeliveryPage,   
      feedbackPage : FeedbackPage,
      paymentPage : PaymentPage,
      packageBooking:PackageBookingPage,
      notificationsPage : NotificationsPage,
      driverTransactionsPage : DriverTransactionsPage             
    }            
}

/* Log Out */
private signOut(){
  let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'signout'});
  let me = this;
             
  modal.onDidDismiss(data => {   
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
                  if(result.status == 'OK')
                  {}
                  else{
                    this.data.presentToast('Error');
                  }
                });
              }
            }
          });
        }
        else{
          this.oneSignal.deleteTag('customer_id');
        }
      });
      this.storage.set('user',undefined);
      this.storage.set('token',undefined);
      this.rootPage = SigninPage;
    }  
    else{}     
  });
  modal.present();
}  
/* End Log Out */

/* On Push Notification receive, publish events accordingly */
private onPushReceived(payload: OSNotificationPayload) {

  if(payload.additionalData.action == 'booking_response'){
    this.events.publish('live_tracking_Driver_id:created', payload.additionalData.driver_id, Date.now());
  }

  if(payload.additionalData.action == 'start_ride'){
    this.events.publish('start_ride:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'finish_ride'){
    this.events.publish('finished_ride:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'cancle_booking'){
    this.events.publish('cancelled_request:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'feedback'){
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showFeedback',feedback:payload.additionalData.feedback,rating :payload.additionalData.rating},{showBackdrop: false});  
    let me = this;
      modal.onDidDismiss(data => {});
      modal.present();
  }

  if(payload.additionalData.action == 'booking_request' || payload.additionalData.action == 'ride_alert'){
    let alert1 = this.alertCtrl.create({
      title: 'Customer Request',
      cssClass:'b_r_request',
      message: '<div class="c_name">'+payload.additionalData.customer+'</div><div class="title">Location</div><div class="desc">'+payload.additionalData.source+'</div><div class="title">Time</div><div class="desc">'+payload.additionalData.pick_up+'</div>',
      buttons: [
        {
          text: 'Accept',
          handler: () => {
            console.log('Accept clicked');
            let param = new FormData();
            param.append("driver_id",payload.additionalData.driver_id);
            param.append("customer_id",payload.additionalData.customer_id); 
            param.append("booking_id",payload.additionalData.booking_id); 
              this.data.driverAcceptBooking(param).subscribe(result=>{
              if(result.status == "OK")
              {
                this.data.presentToast('Booking Confirmation Successfull!');
                  let param1 = new FormData();
                  param1.append("driver_Id",payload.additionalData.driver_id);
                  param1.append("customer_id",payload.additionalData.customer_id);
                  param1.append("booking_id",payload.additionalData.booking_id);
                 
                  this.data.DriverpostNotification(param1).subscribe(result=>{   
                    if(result.status == "ERROR")
                    {     
                      this.data.presentToast('Post Notification fail');
                    }
                    else{
                      this.data.presentToast('Post Notification Success');
                      this.events.publish('live_tracking:created',payload.additionalData, Date.now());
                    }    
                  });
                  this.data.presentToast('Request accepted successfully!'); 
              }        
              else{
                this.data.presentToast('You can not accept this ride!');
              }                 
            });          
          }
        },      
        {
          text: 'Reject',
          handler: () => {
            console.log('reject clicked');
            let param = new FormData();
            param.append("driver_id",payload.additionalData.driver_id);
            param.append("customer_id",payload.additionalData.customer_id); 
            param.append("booking_id",payload.additionalData.booking_id);     
              this.data.driverRejectBooking(param).subscribe(result=>{
              if(result.status == "OK")
              {
                this.data.presentToast('Request Rejected successfully!');
              }    
              else{
                this.data.presentToast('May be Customer Cancelled Booking!');
              }                      
            });
          }
        }
      ]
    });      
    alert1.present();
  }

  if(payload.additionalData.action == 'ride_later_alert'){
    this.events.publish('ride_later_alert:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'cashpayment'){
    this.events.publish('selected_Cash_Payment:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'otherpayment'){
    this.events.publish('selected_Other_Payment:created', payload.additionalData, Date.now());
  }

  if(payload.additionalData.action == 'cashpaymentReceived'){
    this.events.publish('cashpaymentReceived:created', payload.additionalData, Date.now());
  }
}

/* On Push Notification open, publish events accordingly */
private onPushOpened(payload: OSNotificationPayload) {
    if(payload.additionalData.action == 'booking_request' || payload.additionalData.action == 'ride_alert'){
        let alert1 = this.alertCtrl.create({
          title: 'Customer Request',
          cssClass:'b_r_request',
          message: '<div class="c_name">'+payload.additionalData.customer+'</div><div class="title">Location</div><div class="desc">'+payload.additionalData.source+'</div><div class="title">Time</div><div class="desc">'+payload.additionalData.pick_up+'</div>',
          buttons: [
            {
              text: 'Accept',
              handler: () => {
                console.log('Accept clicked');
                let param = new FormData();
                param.append("driver_id",payload.additionalData.driver_id);
                param.append("customer_id",payload.additionalData.customer_id); 
                param.append("booking_id",payload.additionalData.booking_id); 
                  this.data.driverAcceptBooking(param).subscribe(result=>{
                  if(result.status == "OK")
                  {
                    this.data.presentToast('Booking Confirmation Successfull!');
                      let param1 = new FormData();
                      param1.append("driver_Id",payload.additionalData.driver_id);
                      param1.append("customer_id",payload.additionalData.customer_id);
                      param1.append("booking_id",payload.additionalData.booking_id);
                     
                      this.data.DriverpostNotification(param1).subscribe(result=>{   
                        if(result.status == "ERROR")
                        {     
                          this.data.presentToast('Post Notification Fail');
                        }
                        else{
                          this.data.presentToast('Post Notification Success');
                          this.events.publish('live_tracking:created',payload.additionalData, Date.now());
                        }    
                      });
                      this.data.presentToast('Request accepted successfully!'); 
                  }                         
                });          
              }
            },      
            {
              text: 'Reject',
              handler: () => {
                console.log('reject clicked');
                let param = new FormData();
                param.append("driver_id",payload.additionalData.driver_id);
                param.append("customer_id",payload.additionalData.customer_id); 
                param.append("booking_id",payload.additionalData.booking_id);     
                  this.data.driverRejectBooking(param).subscribe(result=>{
                  if(result.status == "OK")
                  {
                    this.data.presentToast('Request Rejected successfully!');
                  }                         
                });
              }
            }
          ]
        });
        alert1.present();
      }
  }
}         