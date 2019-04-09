import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { FeedbackPage } from '../feedback/feedback';
import { ModalpagePage } from '../modalpage/modalpage';
import { DatePipe } from '@angular/common';
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
  delivery_history : any = [];
  upcoming_deliveries : any = '';
  showDiv :any = 1;    
  showSubDiv : any = 3;
  page = 1;
  uppage = 1;
  maximumPages : any;
  loadingCtr : any;
  nohistory : boolean =false;
  noupcoming : boolean =false;

  constructor(public data : DataProvider, private loading: LoadingController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public datepipe:DatePipe) {

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
    this.loadData();
    //this.loadHistory();
    //this.loadUpcomings();
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

  loadData(infiniteScroll?){
    this.storage.get('user').then(data=>{
      let param = new FormData();
          param.append("customer_id",data[0].id);
          this.data.getCustomerBookingList(param,this.page).subscribe(result=>{
            if(result.status == 'OK'){
              if(this.loadingCtr){
                this.loadingCtr.dismiss();
              }
              if(result.success.booking.data == null || result.success.booking.data == ""){
                if(this.history == ''){
                  this.nohistory = true;
                }

                if(infiniteScroll) {
                  infiniteScroll.complete();
                }
                
                this.data.presentToast('There is no more data available');
                return false;
              }else{
                this.history = this.history.concat(result.success.booking.data);
                console.log(this.history);
                this.delivery_history = [];
                this.upcoming_deliveries = [];
                this.upcoming = [];
                for(let i=0; i<this.history.length; i++){
                  if(this.history[i].type == 'delivery'){
                      let date = this.history[i].schedule_time;
                      if(new Date().valueOf() < new Date(date).valueOf()){
                        console.log("I am from delivery type date compare");
                        this.upcoming_deliveries.push(this.history[i])
                      }else{
                        this.delivery_history.push(this.history[i]);
                      }
                  }else{
                      let date = this.history[i].schedule_time;
                      if(new Date().valueOf() < new Date(date).valueOf()){
                        console.log("I am from ride type date compare");
                        this.upcoming.push(this.history[i])
                      }
                  }
                }
                if(infiniteScroll) {
                  infiniteScroll.complete();
                }
              }
            }
          });

    });
  }

  // loadHistory(infiniteScroll?)
  // {
  //   this.storage.get('user').then(data=>{        
  //   let param = new FormData();
  //     param.append("customer_id",data[0].id);
  //     this.data.getCustomerBookingList(param,this.page).subscribe(result=>{                          
  //       if(result.status == "OK")  
  //       {   
  //         if(this.loadingCtr)
  //           {
  //             this.loadingCtr.dismiss();
  //           }
  //         if(result.success.booking.data == null)
  //         {
  //           if(this.history == '')
  //           {
  //             this.nohistory = true;
  //           }
            
  //           this.data.presentToast('There is no more data available');
  //           return false;
  //         }
  //         else{
  //           this.history = this.history.concat(result.success.booking.data);
  //           this.delivery_history = [];
  //           for(let i=0; i<this.history.length; i++){
  //             if(this.history[i].booking_details.type == 'delivery'){
  //                 this.delivery_history.push(this.history[i]);
  //             }
  //           }
  //           console.log(this.history);
  //           if(infiniteScroll) {
  //             infiniteScroll.complete();
  //           }
  //         }
  //       }
  //     });
  //   });
  // }

  // loadUpcomings(infiniteScroll?)
  // {
  //   console.log("I am Upcoming");
  //   let param = new FormData();
  //     param.append("customer_id",this.id);
  //     this.data.getCustomerBookingList(param,this.uppage).subscribe(result=>{                          
  //       if(result.status == "OK")  
  //       {   
  //         console.log(result);
  //         if(result.success.booking.data == null)
  //         {
  //           if(this.upcoming == '')
  //           {
  //             this.noupcoming = true;
  //           }
  //           this.data.presentToast('There is no more data available');
  //           return false;
  //         }
  //         else{
  //           this.upcoming = this.upcoming.concat(result.success.later.data);
  //           console.log(this.upcoming);
  //           if(infiniteScroll) {
  //             infiniteScroll.complete();
  //           }
  //         }
  //       }
  //     });
  // }

  loadMoreHistory(infiniteScroll){
    this.page++;
    //this.loadHistory(infiniteScroll);
    this.loadData(infiniteScroll);
    if (this.page === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

  // loadMoreUpcoming(infiniteScroll){
  //   this.uppage++;
  //   this.loadUpcomings(infiniteScroll);
  //   if (this.uppage === this.maximumPages){
  //     infiniteScroll.enable(false);
  //   }
  // }

  showBooking(list,i)                    
  {
    console.log(this.history[i].id);

    let modal;
    if(list == 'history')
    {
      modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showBooking',bookingId:this.history[i].id,relativeId:this.history[i]['booking_details'][0].driver_id});
    }
    else if(list == 'upcoming'){
      modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'showBooking',bookingId:this.upcoming[i].id});
    }       
    modal.onDidDismiss(data => { 
    });
    modal.present();
  }
}