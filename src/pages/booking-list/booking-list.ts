import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ModalpagePage } from '../modalpage/modalpage';

/**
 * Generated class for the BookingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-list',
  templateUrl: 'booking-list.html',
})
export class BookingListPage {             
               
  driver_id : any;
  bookings : any;
  pending_bookings : any;
  booking_history :any=[];
  page = 1;
  maximumPages : any;
  loadingCtr : any;
  noHistory : boolean = false;

  constructor(public navCtrl: NavController, private loading: LoadingController, public navParams: NavParams,public data : DataProvider, private storage: Storage, private modalCtrl: ModalController) {
    this.storage.get('user').then(data=>{        
      this.driver_id = data[0].id;                 
    });   

    this.bookings='pending';  

    this.loadingCtr = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    this.loadingCtr.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingListPage');
  }
  ionViewDidEnter()
  {
    this.loadHistory();
  }
  
  showBooking(i)                    
  {
    console.log(this.booking_history[i]);
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showBooking',bookingId:this.booking_history[i].booking_id,relativeId:this.booking_history[i].customer_id});
    let me = this;
               
    modal.onDidDismiss(data => { 
    });
    modal.present();
  }

  loadHistory(infiniteScroll?)
  {
    this.storage.get('user').then(data=>{ 
    let param = new FormData();
      param.append("driver_id",data[0].id);
        this.data.getBookingList(param,this.page).subscribe(result=>{     
          if(result.status == 'OK')
          {            
            if(result.success.booking.data == null || result.success.booking.data == '')
            {
              this.loadingCtr.dismiss();
              if(this.booking_history == '')
              {
                this.noHistory = true;
              }
              this.data.presentToast('There is no more data available');
              return false;
            }
            else{
              let history = result.success.booking.data;
              for (var key in history) {
                this.booking_history[key]=history[key];
              }
              console.log("this.booking_history==>"+this.booking_history);
              this.loadingCtr.dismiss();
              if(infiniteScroll) {
                infiniteScroll.complete();
              }
            }
          }
        });
      });
  }

  loadMoreHistory(infiniteScroll){
    this.page++;
    this.loadHistory(infiniteScroll);
    if (this.page === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

}
