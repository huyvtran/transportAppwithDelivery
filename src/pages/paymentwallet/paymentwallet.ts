import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ModalpagePage } from '../modalpage/modalpage';
/**
 * Generated class for the PaymentwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentwallet',
  templateUrl: 'paymentwallet.html',
})
export class PaymentwalletPage {

  walletAmount : any = 0;
  id : any;
  role : any;
  fromDate : any;
  toDate : any;
  page = 1;
  maximumPages: any;
  viewTransactions : boolean = false;
  hideBackButton : any;
  paymentType : any = 'all';
  offset : any = 0;
  transactions : any =[];
  no_transactions : boolean =false;

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, private loading: LoadingController,private payPal: PayPal,public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, private storage: Storage) {
    this.hideBackButton = false;
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    this.storage.get('user').then(data => {
      this.id = data[0].id;
      this.role = data[0].role;
      
      let param = new FormData();
      param.append("customer_id",data[0].id);
      this.data.getWalletAmount(param).subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          loader.dismiss();
          this.walletAmount = result.success.balance;
        }
        else{
          loader.dismiss();
        }
      });
    });

    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentwalletPage');
  }

  pay() {

    this.getAmount().then(data=>{
      var amount = data.toString();
      this.payPal.init({
        PayPalEnvironmentProduction: 'ATyecYC9QulZbd0Gd3-6EU-qwJtm_-wATZpWp0tll2Hu2eosdhr-gDK1kyh2odnEkamuRoUPWUuHflMK',
        PayPalEnvironmentSandbox: 'AWTTT5V870I-5KsL8D3pR8wu6dTF0r3cEa-zpqI9YCK33AEfUedvxXOegKfmUdM_ofYR4a247R8h7s8S'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(amount, 'USD', 'Top-up Given amount into customer wallet', 'Top-up');
          this.payPal.renderSinglePaymentUI(payment).then(result => {
  
            let loader = this.loading.create({
              content :"Please wait...",
              spinner : 'crescent'
            });

            this.data.presentToast('Top-Up successfull!');

            setTimeout(()=>{

              loader.present();
            //console.log(payment)
  
            //alert(JSON.stringify(result.response));
            

            let param = new FormData();
            param.append("response_type",result.response_type);
            param.append("payment_id",result.response.id);
            param.append("state",result.response.state);
            param.append("create_time",result.response.create_time);
            param.append("intent",result.response.intent);
            param.append("platform",result.client.platform);
            param.append('customer_id',this.id);
            param.append('balance',amount);

            this.data.walletTopUp(param).subscribe(result=>{
              console.log(result);
              if(result.status == 'OK')
              {
                loader.dismiss();
                this.walletAmount = result.success.balance; 
                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                this.loadTransactions();
              }
              else{
                loader.dismiss();
              }
            });
            //alert(response.id);
            //this.moveForward();
  
            // Successfully paid
  
            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }

            },3000);
        
            
          }, (error) => {
            console.log(error);
            // Error or render dialog closed without being successful
          });
        }, (error) => {
          console.log(error);
          // Error in configuration
        });
      }, (error) => {
        console.log(error);
        // Error in initialization, maybe PayPal isn't supported or something else
      });
    });
 
  }

  getAmount()
  {
    return new Promise((resolve,reject)=>{
      const prompt = this.alertCtrl.create({
        title: 'Top-Up Amount',
        message: "Enter Top-Up amount",
        enableBackdropDismiss: false,
        inputs: [
          {
            name: 'amount',
            placeholder: "e.g. - 200"
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log(data);
            //  this.data.presentToast('Please add amount Top-Up.');
              prompt.dismiss();
              return false;
            }
          },
          {
            text: 'Procced',
            handler: data => {
              console.log(data);
              
                prompt.dismiss().then(() => { resolve(data.amount); });
                //resolve(data.name);
                return false;
              
            }
          }
        ]
      });
      prompt.present();
    });
  }

  goBackbtn()          
  {
    this.viewTransactions =false;
  }

  getToFrom()
  {
    let modal = this.modalCtrl.create(ModalpagePage,{modalAct : 'getToFromDate'},{showBackdrop: false});             
    modal.onDidDismiss(data => {   
        if(data)
        {
          this.viewTransactions =true;
          this.hideBackButton = true;
          this.fromDate = data[0];
          this.toDate = data[1];
          this.loadTransactions();
        }
      });
      modal.present();
  }

  gotoWallet()
  {
    this.viewTransactions = false;
  }

  loadTransactions(infiniteScroll?)
  {
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    if(this.viewTransactions === false)
    {
      this.viewTransactions = true; 
    }
      
      let param = new FormData();
      param.append("customer_id",this.id);
      param.append("offset",this.offset);
      this.data.getTransactions(param,this.page).subscribe(result=>{                          
        if(result.status == "OK")  
        {   
          if(result.success.Transaction == null || result.success.Transaction.length == 0)
          {
            loader.dismiss();
            if(this.transactions == null || this.transactions.length == 0)
            {
              this.no_transactions = true;
            }
            this.data.presentToast('There is no more data available');
            return false;
          }
          else{
            loader.dismiss();
            this.transactions = this.transactions.concat(result.success.Transaction);
            this.offset = result.offset;
            if(infiniteScroll) {
              infiniteScroll.complete();
            }
          }
        }
      });
  }

  loadMore(infiniteScroll){
    this.page++;
    this.loadTransactions(infiniteScroll);
    if (this.page === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

  getByType(type)
  {
    this.paymentType = type;
    this.loadTransactions();
  }

}
