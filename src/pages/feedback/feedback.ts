import { NgModule, Component } from '@angular/core';
import { IonicPageModule, IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */         
@IonicPage()    
@Component({
  selector: 'page-feedback',         
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
  feedback_form : any;
  feedback :any='';
  rate : any='';
  booking_id : any;
  driver_id : any;
  isfav :any = false;
  favDriver : any = '';    
  fav_drivers : any;
  customer_id:any;
  id : any;
  role : any;

  constructor(public navCtrl: NavController,public service:ServiceProvider, private loading: LoadingController, public navParams: NavParams, private storage : Storage, public data : DataProvider, public event:Events) {
    
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    this.storage.get('user').then(data=>{   
      this.id = data[0].id
      this.role = data[0].role;
    }); 
    
    this.booking_id = navParams.get('booking_id');
    this.driver_id = navParams.get('driver_id');
    this.customer_id = navParams.get('customer_id');

    this.feedback_form = new FormGroup({    
      feedback: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      });	

      this.storage.get('user').then(data=>{   
        let role = data[0].role;
        if(role == 2)
        {
          this.data.getFavDrivers().subscribe(result=>{
            if(result.status == "OK")
            {
              this.fav_drivers = result.success.favdrivers;    //this.data.presentToast('Feedback sent successfully');
              //this.navCtrl.setRoot(HomePage);
              this.checkFavDriver(result.success.favdrivers).then(data=>{
                if(data == 'favorite')
                {
                  this.favDriver = 'Added to favourite';
                }
                else{
                  this.favDriver = 'Add driver as a favourite';
                }
                
              });
            }
            else   
            {
              
            }                           
          });
        }
      });
      loader.dismiss();
      
  }
        
  ionViewDidLoad() {                 
    console.log('ionViewDidLoad FeedbackPage');
  }

  checkFavDriver(list)
  {
    var did =  this.driver_id.toString();
    return new Promise((resolve,reject)=>{
      list.forEach(function (value) {
        console.log(value);
        if( did == value.id)
        {
          resolve('favorite');
        }
      });
      resolve('nofavorite');
    });
  }

  sendFeedback(feedback,rate)
  {
    if(feedback != '' && rate!='')
    {
      this.service.presentLoader('Please wait...');
      let param = new FormData();
      param.append("feedback",feedback);
      param.append("rating",rate);
      param.append("booking_id",this.booking_id);
      if(this.role == 2)
      {
        param.append("driver_id",this.driver_id);
        this.data.feedback(param).subscribe(result=>{
          if(result.status == "OK")
          {
            this.service.dismissLoader();
            this.data.presentToast('Feedback sent successfully');
            setTimeout(()=>{
              this.navCtrl.setRoot(HomePage);
              this.event.publish('activeItem');
            },3000);
            
          }
          else   
          {
            this.service.dismissLoader();
          }                           
        });
      }
      else if(this.role == 3 )
      {
        param.append("customer_id",this.customer_id);
        this.data.feedbacktoCustomer(param).subscribe(result=>{
          if(result.status == "OK")
          {
            this.service.dismissLoader();
            this.data.presentToast('Feedback sent successfully');
            setTimeout(()=>{
              this.navCtrl.setRoot(HomePage);
            },3000);
          }
          else    
          {
            this.service.dismissLoader();
          }                           
        });
      }

    }
  }

  public notify(isfav) {
    //console.log("Toggled: "+ isRemember);
    this.isfav = !isfav;
    if(this.isfav == true)
    {
      this.favDriver = 'Added to favourite';
      let param = new FormData();
      param.append("driver_id",this.driver_id);
      this.data.addFavDriver(param).subscribe(result=>{
        if(result.status == "OK")
        {
          this.data.presentToast('Added driver to favorite list successfully');
        }
        else   
        {
        }                           
      }); 
    }
    else{
      this.favDriver = 'Add driver as a favourite';
      let param = new FormData();
      param.append("driver_id",this.driver_id);
      this.data.removeFavDriver(param).subscribe(result=>{
        if(result.status == "OK")
        {
          this.data.presentToast('Removed driver from favorite list successfully');
        }
        else   
        {
        }                           
      }); 
    }
    //console.log("Toggled: "+ this.isRemember); 
  }
}
