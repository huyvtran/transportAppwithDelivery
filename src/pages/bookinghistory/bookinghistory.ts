import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { FeedbackPage } from '../feedback/feedback';
import { ModalpagePage } from '../modalpage/modalpage';

/**
 * Generated class for the BookinghistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookinghistory',
  templateUrl: 'bookinghistory.html'
})
export class BookinghistoryPage {

  id : any;
  history : any = [];
  upcoming: any = [];
  delivery_history : any = '';
  upcoming_deliveries : any = '';
  showDiv :any = 1;    
  showSubDiv : any = 3;
  page = 1;
  uppage = 1;
  maximumPages : any;
  loadingCtr : any;
  nohistory : boolean =false;
  noupcoming : boolean =false;

  constructor(public data : DataProvider, private loading: LoadingController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {

    this.loadingCtr = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    this.loadingCtr.present();

    this.storage.get('user').then(data=>{        
      this.id = data[0].id;    
    }); 
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookinghistoryPage');
  }

  ionViewDidEnter()
  {
    this.loadHistory();
    this.loadUpcomings();
  }

  changeTab(TabNo)
  {
    this.showDiv = TabNo;   
    this.showSubDiv = 3;  
  }

  changeSubTab(TabNo)
  {
    this.showSubDiv = TabNo;      
  }

  loadHistory(infiniteScroll?)
  {
    this.storage.get('user').then(data=>{        
    let param = new FormData();
      param.append("customer_id",data[0].id);
      this.data.getCustomerBookingList(param,this.page).subscribe(result=>{                          
        if(result.status == "OK")  
        {   
          if(this.loadingCtr)
            {
              this.loadingCtr.dismiss();
            }
          if(result.success.booking.data == null)
          {
            if(this.history == '')
            {
              this.nohistory = true;
            }
            
            this.data.presentToast('There is no more data available');
            return false;
          }
          else{
            this.history = this.history.concat(result.success.booking.data);
            if(infiniteScroll) {
              infiniteScroll.complete();
            }
          }
        }
      });
    });
  }

  loadUpcomings(infiniteScroll?)
  {
    let param = new FormData();
      param.append("customer_id",this.id);
      this.data.getCustomerBookingList(param,this.uppage).subscribe(result=>{                          
        if(result.status == "OK")  
        {   
          if(result.success.booking.data == null)
          {
            if(this.upcoming == '')
            {
              this.noupcoming = true;
            }
            this.data.presentToast('There is no more data available');
            return false;
          }
          else{
            this.upcoming = this.upcoming.concat(result.success.later.data);
            if(infiniteScroll) {
              infiniteScroll.complete();
            }
          }
        }
      });
  }

  loadMoreHistory(infiniteScroll){
    this.page++;
    this.loadHistory(infiniteScroll);
    if (this.page === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

  loadMoreUpcoming(infiniteScroll){
    this.uppage++;
    this.loadUpcomings(infiniteScroll);
    if (this.uppage === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

  showBooking(list,i)                    
  {
    let modal;
    if(list == 'history')
    {
      modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showBooking',bookingId:this.history[i].booking_id,relativeId:this.history[i].driver_id});
    }
    else if(list == 'upcoming'){
      modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showBooking',bookingId:this.upcoming[i].id});
    }       
    modal.onDidDismiss(data => { 
    });
    modal.present();
  }
}