import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.user = this.navParams.get('data');
    this.first_name =this.navParams.get('first_name');
    this.last_name = this.navParams.get('last_name');
    this.email = this.navParams.get('email');
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
    this.navCtrl.setRoot(SigninPage);	
  }
  /*goBack()
  {
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.popTo(SigninPage);	
  }*/

}
