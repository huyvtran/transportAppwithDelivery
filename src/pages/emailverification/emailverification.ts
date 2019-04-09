import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';
/**
 * Generated class for the EmailverificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()   
@Component({
  selector: 'page-emailverification',
  templateUrl: 'emailverification.html',
})
export class EmailverificationPage {
  @ViewChild(Nav) nav: Nav;
  user: any;
  first_name : any;
  last_name : any;
  email : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
    //this.user = this.navParams.get('data');
    this.first_name =this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
    this.email = this.navParams.get('email');
  }   

  ionViewCanLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave()
  {
    //this.navCtrl.popTo(SigninPage);	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailverificationPage');
  }
  gotoSignIn()
  {
    console.log("I am called.....................")
    this.navCtrl.pop();
  //  this.navCtrl.setRoot(SigninPage);	
  }
  /*goBack()
  {
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.popTo(SigninPage);	
  }*/

}
