import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
/**  
 * Generated class for the DriverTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver-transactions',
  templateUrl: 'driver-transactions.html',
})
export class DriverTransactionsPage {
  id : any;
  role : any;
  page = 1;
  maximumPages: any;
  offset : any = 0;
  transactions : any =[];
  noTransaction : boolean = false;
  loadinCtrl : any;

  constructor(public navCtrl: NavController, private loading: LoadingController, public navParams: NavParams, public data : DataProvider, private storage: Storage) {
    this.loadinCtrl = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    this.loadinCtrl.present();

    this.storage.get('user').then(data => {
      this.id = data[0].id;
      this.role = data[0].role;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverTransactionsPage');
  }

  ionViewDidEnter()
  {
    this.loadTransactions();
  }

  loadTransactions(infiniteScroll?)
  {
    this.storage.get('user').then(data => {
      let param = new FormData();
      param.append("driver_id",data[0].id);
      param.append("offset",this.offset);
      this.data.getDriverTransactions(param,this.page).subscribe(result=>{                          
        if(result.status == "OK")  
        {   
          console.log("result.success.Transaction ");
          console.log(result.success.Transaction);
          if(result.success.Transaction == null || result.success.Transaction == "")
          {
            this.loadinCtrl.dismiss();
            if(this.transactions == null || this.transactions.length == 0){
              this.noTransaction = true;
            }
            this.data.presentToast('There is no more data available');
            return false;
          }
          else{
            this.loadinCtrl.dismiss();
            this.transactions = this.transactions.concat(result.success.Transaction);
            this.offset = result.offset;
            if(infiniteScroll) {
              infiniteScroll.complete();
            }
          }
        }
      });
    });
  }

  loadMore(infiniteScroll){
    this.page++;
    this.loadTransactions(infiniteScroll);
    if (this.page === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

}
