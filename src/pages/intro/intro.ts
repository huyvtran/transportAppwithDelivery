import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin'; 
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})   
export class IntroPage {
  @ViewChild('slides') slider: any;
  mainPage : any;
  last_slide : Number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

   /* this.mainPage = {    
      homePage : SigninPage   
    }*/
    this.last_slide = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  gotoNav(){
    this.navCtrl.setRoot(SigninPage);
  }

  getNext(){
    if(this.slider.isEnd())      
    {
      this.navCtrl.setRoot(SigninPage);
    }
    else
    {
      this.slider.slideNext();

      if(this.slider.isEnd())
      {
        this.last_slide = 1;
      }
      else if(this.slider.isBeginning())
      {
        this.last_slide = 0;
      }  
      else{
        this.last_slide = 2;
      }  
                
    }
  }
    
  getPrev(){
    this.slider.slidePrev();
    if(this.slider.isBeginning())
      {
        this.last_slide = 0;
      } 
  }

  skip(){
    this.navCtrl.setRoot(SigninPage);    
  }

}
    