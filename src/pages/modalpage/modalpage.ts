import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events,LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { SigninPage } from '../signin/signin';
import { DataProvider } from '../../providers/data/data';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the ModalpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-modalpage',
  templateUrl: 'modalpage.html',
})
export class ModalpagePage {
  modalAct : any;
  driverId : any;
  driver : any;
  myDate : any;
  myTime : any;
  bookingId : any;
  booking_info : any;
  lat : any;
  lng : any;
  social_account : any;
  social_account_details: any = {} ;
  prev_social_accounts :any = [];
  rating : any;
  feedback : any;
  minDate : any;
  leave : boolean = true;
  fromDate :any;
  toDate : any;
  display_bookingInfo : boolean = false;
  showClose : boolean = false;
  relativeId : any;
  bookingInfo_name : any;
  bookingInfo_phone : any;
  display_relative : any = '';
  loadingCtr : any;

  constructor(public service: ServiceProvider, private callNumber: CallNumber, public eve : Events, private loading: LoadingController, public geolocation: Geolocation,private oneSignal: OneSignal, public data : DataProvider, public navCtrl: NavController, private storage: Storage, public navParams: NavParams,public viewCtrl: ViewController) {
    this.loadingCtr = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });
    //this.loadingCtr.present();

    this.modalAct = navParams.get('modalAct');
    this.driverId = navParams.get('driverId');
    this.bookingId = navParams.get('bookingId');
    this.relativeId = navParams.get('relativeId') != undefined ? navParams.get('relativeId') : '';
    this.feedback = navParams.get('feedback');
    this.rating = navParams.get('rating');
    this.minDate = new Date().toISOString();
    this.prev_social_accounts = navParams.get('social_media');
    //alert(this.prev_social_accounts['facebook']);

    if(this.modalAct == 'addSocialaccount'){
      if(this.prev_social_accounts['facebook'] != undefined && this.prev_social_accounts['facebook'] && this.prev_social_accounts['facebook'] != 'undefined'){
        this.social_account_details.facebook =  this.prev_social_accounts['facebook'];
      }
      if(this.prev_social_accounts['twitter'] != undefined && this.prev_social_accounts['twitter'] && this.prev_social_accounts['twitter'] != 'undefined'){
        this.social_account_details.twitter =  this.prev_social_accounts['twitter'];
      }
      if(this.prev_social_accounts['instagram'] != undefined && this.prev_social_accounts['instagram'] && this.prev_social_accounts['instagram'] != 'undefined'){
        this.social_account_details.instagram =  this.prev_social_accounts['instagram'];
      }
      if(this.prev_social_accounts['linkedin'] != undefined && this.prev_social_accounts['linkedin'] && this.prev_social_accounts['linkedin'] != 'undefined'){
        this.social_account_details.linkedin =  this.prev_social_accounts['linkedin'];
      }
    }
    

    this.driver ={
      fname : 'fname',
      lname : 'lname',
      phone : '9874589687',
      address : '',
      vehicle_type : '',
      vehicle_no : '',
      email : 'driver@gmail.com',
      rate : ''
    }

    this.booking_info = {
      source : '',
      destination : '',
      distance : '',
      cost : '',
      customer_id : '',
      source_lat : '',
      source_lng : '',
      destination_lat : '',
      destination_lng : '',
      booking_id : '',
      driver_id : '',
      pickup_date : '',
      schedule_time : '',
      duration : '',
      customer_name : '',
      customer_contact :''
    }

    this.social_account = new FormGroup({    
      linkedin: new FormControl(''),
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      instagram: new FormControl('')
    });	
    
    if(this.driverId && this.driverId != '')
    {
      this.loadingCtr.present();
      let param = new FormData();
      param.append("driver_id",this.driverId);
     
      this.data.getSelectedDriverInfo(param).subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          this.display_bookingInfo = true;
          this.loadingCtr.dismiss();
          console.log(result.success.driver.first_name);
          this.driver.fname = result.success.driver.first_name;
          this.driver.lname = result.success.driver.last_name;
          //this.driver.profile = result.success.profile[0].profile;
          this.driver.phone = result.success.driver.phone;
          this.driver.address = result.success.driver.address;
          this.driver.vehicle_type = result.success.driver.vehicle_type;
          this.driver.vehicle_no = result.success.driver.vehicle_number;
          this.driver.email = result.success.driver.email;
          this.driver.rate = result.success.driver.rating;

          if(result.success.driver.profile == null)
          {
            this.driver.profile = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
          }
          else{
            this.driver.profile = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.driver.profile;
          }
        }
        else{

        }
      });

      /*let param = new FormData();
        param.append("origin",this.lat+','+this.long);
        param.append("destination",driver.latitude+','+driver.longitude);

        this.data.customerBookingDistance(param).subscribe(result=>{   
          if(result.status == 'OK')
          {     
            //console.log(result);    
            this.duration = result.success.duration;
            console.log(this.duration);
          }
        });*/
    }

    if(this.bookingId && this.bookingId != '')
    {
      this.loadingCtr.present();
      if(this.modalAct == 'showBooking')
      {
        this.leave = true;
      }
      else{
        this.leave = false;
      }
      this.storage.get('user').then(data=>{   
        let id = data[0].id;
        let role = data[0].role;
        if(role == 3)
        {
          let param = new FormData();
          param.append("booking_id",this.bookingId);
        
          this.data.getBookingInfo(param).subscribe(result=>{
            console.log(result);
            if(result.status == 'OK')
            {
              this.booking_info.source = result.success.booking.source,
              this.booking_info.destination =  result.success.booking.destination,
              this.booking_info.distance = result.success.booking.distance,
              this.booking_info.cost = result.success.booking.cost,
              this.booking_info.customer_id = result.success.booking.customer_id,
              this.booking_info.source_lat = result.success.booking.source_lat,
              this.booking_info.source_lng = result.success.booking.source_long,
              this.booking_info.destination_lat = result.success.booking.destination_lat,
              this.booking_info.destination_lng = result.success.booking  .destination_long,
              this.booking_info.booking_id = result.success.booking.id,
              this.booking_info.driver_id = result.success.booking.driver_id,
              this.booking_info.pickup_date = result.success.booking.pickup_date,
              this.booking_info.schedule_time = result.success.booking.schedule_time
              if(this.relativeId !=''){
                this.display_relative = 'Customer';
                let param = new FormData();
                param.append("customer_id",this.relativeId);
                this.data.getCustInfo(param).subscribe(result=>{
                  console.log(result);
                  if(result.status == 'OK')
                  {
                    this.display_bookingInfo = true;
                    this.loadingCtr.dismiss();
                    this.bookingInfo_name = result.success.customer[0].first_name+' '+result.success.customer[0].last_name;
                    this.bookingInfo_phone = result.success.customer[0].phone;
                  }
                });
              }
              else
              {
                this.display_bookingInfo = true;
                this.loadingCtr.dismiss();
              }
            }
            else{
              this.data.presentToast('Something went Wrong!');
            }
          });
        }
        else if(role == 2)
        {
          let param = new FormData();
          param.append("booking_id",this.bookingId);

            this.data.getcurrentBooking(param).subscribe(result=>{  
              if(result.status == 'OK')
              {
                this.booking_info.source = result.success.booking.source,
                this.booking_info.destination =  result.success.booking.destination,
                this.booking_info.distance = result.success.booking.distance,
                this.booking_info.cost = result.success.booking.cost,
                this.booking_info.customer_id = result.success.booking.customer_id,
                this.booking_info.source_lat = result.success.booking.source_lat,
                this.booking_info.source_lng = result.success.booking.source_long,
                this.booking_info.destination_lat = result.success.booking.destination_lat,
                this.booking_info.destination_lng = result.success.booking  .destination_long,
                this.booking_info.booking_id = result.success.booking.id,
                this.booking_info.driver_id = result.success.booking.driver_id,
                this.booking_info.pickup_date = result.success.booking.pickup_date,
                this.booking_info.schedule_time = result.success.booking.schedule_time
                if(this.relativeId !=''){
                  this.display_relative = 'Driver';
                  let param = new FormData();
                  param.append("driver_id",this.relativeId);
                  this.data.getSelectedDriverInfo(param).subscribe(result=>{
                    console.log(result);
                    if(result.status == 'OK')
                    {
                      this.display_bookingInfo = true;
                      this.loadingCtr.dismiss();
                      this.bookingInfo_name = result.success.driver.first_name+' '+result.success.driver.last_name;
                      this.bookingInfo_phone = result.success.driver.phone;
                    }
                  });
                }
                else{
                  this.display_bookingInfo = true;
                  this.loadingCtr.dismiss();
                }
              }
            else{
              this.data.presentToast('Something went Wrong!');
            }
            }); 
       }
      });
      
    }
   // this.loadingCtr.dismiss();
  }

  ionViewDidLoad() {     
    console.log('ionViewDidLoad ModalpagePage');
  }   
  
  ionViewDidEnter()
  {
    this.showClose = true;
  }

  ionViewCanLeave()
  {
    return new Promise((resolve: Function, reject: Function) => {
      if(this.leave == false)
      {
        this.data.presentToast('You can not leave this page untill you receive payment.');
        reject();
      }
      else
      {
        resolve();
      }      
    });
  }

  close(){ 
    if(this.modalAct == 'this.modalAct')
    {
      
    }      
    else{
      this.viewCtrl.dismiss();
    }
    
  } 

  leavePage(decision)
  {
    this.viewCtrl.dismiss(decision);
  }

  /*selectDriver(Did)
  { 
    this.viewCtrl.dismiss(Did);          
  }*/

  signout()
  {
    this.viewCtrl.dismiss(true);
    //this.navCtrl.setRoot(SigninPage);
  }

  /*ride(ride)
  {
    console.log(ride);
    if(ride == 'now')
    {
      this.viewCtrl.dismiss(ride);
    }
    else{
      this.modalAct = 'getDateTime';
    }
  }*/

  gotHome()
  {
    console.log(this.myDate); 
    console.log(this.myTime);
    if(this.myDate && this.myTime)
    { 
      var data = [this.myDate,this.myTime];
      this.viewCtrl.dismiss(data);
    }
  }

  callDriver(phone){
    var msg = 'Do you want to call Driver?';
    this.service.presentConfirmationAlert(msg).then((data)=>{
      if(data == true)
      {
        this.callNumber.callNumber(phone, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
      }
      else{

      }
    });
  }
  /*gotoTransactions()
  {
    if(this.fromDate && this.toDate)              
    { 
      var data = [this.fromDate,this.toDate];
      this.viewCtrl.dismiss(data);
    }
  }*/

  /*accept_req()
  {
      let param = new FormData();
      param.append("driver_id",this.booking_info.driver_id);
      param.append("customer_id",this.booking_info.customer_id);
      param.append("booking_id",this.booking_info.booking_id);
        this.data.driverAcceptBooking(param).subscribe(result=>{
        if(result.status == "OK")
        {
          this.data.presentToast('Booking Confirmation Successfull!');
            let param1 = new FormData();
            param1.append("action",'booking_response');
            param1.append("select_driver_Id",this.booking_info.driver_id);
            param1.append("customer_id",this.booking_info.customer_id);
            param1.append("booking_id",this.booking_info.booking_id);

            this.data.DriverpostNotification(param1).subscribe(result=>{   
              if(result.status == "ERROR")
              {     
                this.data.presentToast('Notification fail!');
              }
              else
              {
                this.data.presentToast('Notification success!');
              }
            });
          this.data.presentToast('Request accepted successfully!');
          this.viewCtrl.dismiss();
        }                         
      });          
  }

  reject_req()
  {
    let param = new FormData();
    param.append("driver_id",this.booking_info.driver_id);
    param.append("customer_id",this.booking_info.customer_id);
    param.append("booking_id",this.booking_info.booking_id);  
      this.data.driverRejectBooking(param).subscribe(result=>{
        if(result.status == "OK")
        {
          this.data.presentToast('Booking Confirmation Successfull!');
            let param1 = new FormData();
            param1.append("action",'booking_response');
            param1.append("select_driver_Id",this.booking_info.driver_id);
            param1.append("customer_id",this.booking_info.customer_id);
            param1.append("booking_id",this.booking_info.booking_id);

            this.data.DriverpostNotification(param1).subscribe(result=>{      
              if(result.status == "ERROR")
              {     
                this.data.presentToast('Notification fail!');         
              }
              else{
                this.data.presentToast('Notification success!');
              }
            });
            this.data.presentToast('Request Rejected successfully!');
            this.viewCtrl.dismiss();
        }                         
      });        
  }
*/

cashPaymentReceived(isPaid)
{
  this.leave = true;
  if(isPaid=='yes')
  {
    this.viewCtrl.dismiss('yes');
  }
}


  add_social_account()
  {
    //alert(this.social_account_details['google']);
    /*let param = new FormData();
    param.append("google",this.social_account_details['google']);
    param.append("facebook",this.social_account_details['facebook']);
    param.append("twitter",this.social_account_details['twitter']);
    param.append("instagram",this.social_account_details['instagram']);*/
   // alert(this.social_account_details['facebook']);
    this.viewCtrl.dismiss(this.social_account_details);
  
     /*this.data.userSignUp(param).subscribe(result=>{
              console.log(result);    
              //this.userData = result;    
              if(result.status == "ERROR")
              {
                  this.data.presentToast(result.error.email);
                  return false;
              }
              else
              {
                this.data.presentToast('Social Medial Links stored successfully!');
                this.viewCtrl.dismiss();
              }                    
      });*/
  }

}
