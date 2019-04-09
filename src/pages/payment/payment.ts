import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { FeedbackPage } from '../feedback/feedback';
import { HomePage } from '../home/home';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import * as firebase from 'Firebase';
import { BackgroundMode } from '@ionic-native/background-mode';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  id: any;
  role: any;
  booking_id: any;
  driver_id: any;
  cost : any = 0;
  leave : boolean = false;
  payBtn_text : any = 'Pay';
  isnowenabled:boolean = true;

  constructor(private backgroundMode: BackgroundMode,private loading: LoadingController, private eve: Events,public actionSheetCtrl: ActionSheetController, private payPal: PayPal, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, private storage: Storage) {
    this.backgroundMode.enable();
    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    this.booking_id = navParams.get('booking_id');
    this.driver_id = navParams.get('driver_id');
    this.storage.get('user').then(data => {
      this.id = data[0].id;
      this.role = data[0].role;
    });
    
    let param = new FormData();
    param.append("booking_id",this.booking_id);

      this.data.getcurrentBooking(param).subscribe(result=>{   
        if(result.status == "OK")
        {
          this.cost = result.success.booking.cost;
          loader.dismiss();  
        }
        else
        {
          this.data.presentToast('Error');     
          loader.dismiss();  
        }                           
      }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.eve.subscribe('cashpaymentReceived:created', (selected_Cash_Payment, time) => {
      firebase.database().ref(this.booking_id).remove();
      firebase.database().ref('customer/'+this.id).remove();
      this.eve.unsubscribe('cashpaymentReceived:created');
      this.moveForward();
    });    
  }

  ionViewCanLeave()
  {
    //this.eve.unsubscribe('cashpaymentReceived:created');
    if(this.leave == false){
      return new Promise((resolve: Function, reject: Function) => {
        this.data.presentToast('You can not leave this page until Payment Complete');
          reject();
        });
    }
    this.backgroundMode.disable();
  }

  moveForward(){
    this.leave = true;
    
    if (this.role == 2) {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(FeedbackPage, { booking_id: this.booking_id, driver_id: this.driver_id }).then(() => {
        this.navCtrl.remove(currentIndex);
      });
    }
    else if (this.role == 3) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  pay() {
    this.isnowenabled = false;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Use payment method',
      enableBackdropDismiss : false,
      buttons: [
        {
          text: 'Wallet',
          handler: () => {
            let param = new FormData();
            param.append('customer_id', this.id);
            param.append('booking_id',this.booking_id);
            param.append('driver_id',this.driver_id);
            param.append('amount',this.cost);
            param.append('method','wallet');

            this.data.CashMethodNotification(param).subscribe(result=>{
              console.log(result);
              if(result.status == 'OK')
              {
              //  this.data.presentToast('Notification success');
                this.payUsingWallet();
              }
            });
          }
        },
        {
          text: 'Paypal or Card',
          handler: () => {
            let param = new FormData();
            param.append('customer_id', this.id);
            param.append('booking_id',this.booking_id);
            param.append('driver_id',this.driver_id);
            param.append('amount',this.cost);
            param.append('method','paypal');

            this.data.CashMethodNotification(param).subscribe(result=>{
              console.log(result);
              if(result.status == 'OK')
              {
              //  this.data.presentToast('Notification success');
                this.payUsingPaypal();
              }
              
            });
            
          }
        },
        {
          text: 'Cash',
          handler: () => {
            this.payCash();
          }
        }
      ]
    });
    actionSheet.present();
  }

  payUsingPaypal()
  {
    this.leave == true;
    this.payPal.init({
      PayPalEnvironmentProduction: 'ATyecYC9QulZbd0Gd3-6EU-qwJtm_-wATZpWp0tll2Hu2eosdhr-gDK1kyh2odnEkamuRoUPWUuHflMK',
      PayPalEnvironmentSandbox: 'AWTTT5V870I-5KsL8D3pR8wu6dTF0r3cEa-zpqI9YCK33AEfUedvxXOegKfmUdM_ofYR4a247R8h7s8S'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment( this.cost, 'USD', 'This is payment for completed Ride', 'Pay');
        this.payPal.renderSinglePaymentUI(payment).then((result) => {
          console.log(JSON.stringify(result));
        
        let loader = this.loading.create({
          content :"Please wait...",
          spinner : 'crescent'
        });

        loader.present();

        if(this.cost && this.booking_id && this.id && this.driver_id){
          let param = new FormData();
          param.append("response_type",result.response_type);
          param.append("payment_id",result.response.id);
          param.append("state",result.response.state);
          param.append("create_time",result.response.create_time);
          param.append("intent",result.response.intent);
          param.append("platform",result.client.platform);
          param.append("balance",this.cost);
          param.append('customer_id', this.id);
          param.append('booking_id',this.booking_id);
          param.append('driver_id',this.driver_id);

            this.data.payment(param).subscribe(result=>{
              console.log(result);
              if(result.status == 'OK')
              {
                this.data.presentToast('Payment Successfull!');
                loader.dismiss();
                firebase.database().ref(this.booking_id).remove();
                firebase.database().ref('customer/'+this.id).remove();
                firebase.database().ref('driver/'+this.driver_id).remove();

                setTimeout(()=>{
                  this.moveForward();
                },3000);
                
              }
            });
          }
          else{
            this.data.presentToast('There is some problem please try after some time.');
          }
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
        }, (error) => {
          // Error or render dialog closed without being successful
          console.log(error);
        });
      }, (error) => {
        // Error in configuration
        console.log(error);
      });
    }, (error) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      console.log(error);
    });
  }

  payUsingWallet()
  {
        let loader = this.loading.create({
              content :"Please wait...",
              spinner : 'crescent'
            });

            loader.present();
        let param = new FormData();
        param.append("balance",this.cost);
        param.append('customer_id', this.id);
        param.append('booking_id',this.booking_id);
        param.append('driver_id',this.driver_id);

        this.data.walletPayment(param).subscribe(result=>{
          console.log(result);
          if(result.status == 'OK')
          {
            loader.dismiss();
            this.data.presentToast('Payment Successfull!');
            firebase.database().ref(this.booking_id).remove();
            firebase.database().ref('customer/'+this.id).remove();
            firebase.database().ref('driver/'+this.driver_id).remove();
            setTimeout(()=>{
              this.moveForward();
            },3000);
          }
          else
          {
            loader.dismiss();
            let param1 = new FormData();
            param1.append("customer_id",this.id);
            this.data.getWalletAmount(param1).subscribe(result=>{
            this.leave == true;
              console.log(result);
              if(result.status == 'OK')
              {
                if(parseFloat(this.cost) > parseFloat(result.success.balance))
                {
                  let actionSheet = this.actionSheetCtrl.create({
                    title: 'Wallet amount is not sufficient to pay Ride cost',
                    enableBackdropDismiss : false,
                    buttons: [
                      {
                        text: 'Add amount to wallet & pay?',
                        handler: () => {
                          var amount = (this.cost - result.success.balance+1).toString();
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
                      
                                //console.log(payment)
                      
                                //alert(JSON.stringify(result.response));
                                //this.data.presentToast('Top-Up Successfull!');
                                let loader = this.loading.create({
                                  content :"Please wait...",
                                  spinner : 'crescent'
                                });
                    
                                loader.present();

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
                                    if(this.cost && this.booking_id && this.id && this.driver_id){
                                      let param = new FormData();
                                      param.append("balance",this.cost);
                                      param.append('customer_id', this.id);
                                      param.append('booking_id',this.booking_id);
                                      param.append('driver_id',this.driver_id);
                          
                                      this.data.walletPayment(param).subscribe(result=>{
                                        console.log(result);
                                        if(result.status == 'OK')
                                        {
                                          loader.dismiss();
                                          this.data.presentToast('Payment Successfull!');
                                          firebase.database().ref(this.booking_id).remove();
                                          firebase.database().ref('customer/'+this.id).remove();
                                          firebase.database().ref('driver/'+this.driver_id).remove();
                                          setTimeout(()=>{
                                            this.moveForward();
                                          },3000);
                                        }
                                      });
                                      loader.dismiss();
                                    }
                                      else{
                                        loader.dismiss();
                                        this.data.presentToast('There is some problem please try after some time.');
                                      }
                                  }
                                });                      
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
                        }
                      },
                      {
                        text: 'Use Paypal or Card',
                        handler: () => {
                          this.payUsingPaypal();
                        }
                      },
                    ]
                  });
              
                  actionSheet.present();
                }
              }
            });        
          }
        });
  }

  payCash()
  {
    this.payBtn_text = 'Payment procressing';

    let param = new FormData();
    param.append('customer_id', this.id);
    param.append('booking_id',this.booking_id);
    param.append('driver_id',this.driver_id);
    param.append('amount',this.cost);
    param.append('method','cash');

    this.data.CashMethodNotification(param).subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        //this.data.presentToast('Notification success');
      }
    });
  }
}
