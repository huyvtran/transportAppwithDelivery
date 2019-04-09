import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DriversettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driversetting',
  templateUrl: 'driversetting.html',
})
export class DriversettingPage {
  id : any;
  role : any;
  visible : any;
  public isToggled: boolean;
  public isNotificationOff: boolean;
  page = 1;
  maximumPages: any;
  offset : any = 0;
  transactions : any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider, private storage: Storage) {
    
    this.storage.get('user').then(data => {
      this.id = data[0].id;
      this.role = data[0].role;

      let param = new FormData();
      param.append("driver_id",data[0].id);
      param.append("status",'get');
      this.data.driverNotificationSetting(param).subscribe(result=>{
        console.log(result);
        if(result.status == 'OK')
        {
          if(result.success.Get_notification_setting == "0")
          {       
            this.isNotificationOff = false;
          }
          else{
            this.isNotificationOff = true;
          }
        }
        else{
          this.data.presentToast('Error');
        }
      });
    });

   

    this.data.getAvailableToggle().subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        console.log(result.success.available);
        if(result.success.available == 'on')
        {
          this.isToggled = true;
        }
        else{
          this.isToggled = false;
        }
      }
      else{
        this.data.presentToast('Error');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriversettingPage');
  }

  

  public notify() {
    console.log("Toggled: "+ this.isToggled); 
    this.data.AvailableToggle().subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        console.log(result.success.available);
        if(result.success.available == 'Driver set to On')
        {
          this.data.presentToast('You are visible to nearby customers');
        }   
        else{
          this.data.presentToast('You are invisible to nearby customers');
        }
        
      }
      else{
        this.data.presentToast('Error');
      }
    });
  }


  notificationOff()
  {
    let param = new FormData();
    param.append("driver_id",this.id);
    param.append("status",'change');
    this.data.driverNotificationSetting(param).subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        
      }
      else{
        this.data.presentToast('Error');
      }
    });
  }


  setVisibility(visibility)
  {
    console.log("Toggled: "+ this.isToggled); 
   /*console.log('asdfghjkrtyui');
    this.visible = !visibility;
    this.data.AvailableToggle().subscribe(result=>{
      console.log(result);
      if(result.status == 'OK')
      {
        if(result.success.availble=='Driver set to On')
        {
          this.data.presentToast('You are visible to nearby customers');
        }
        else{
          this.data.presentToast('You are invisible to nearby customers');
        }
        
      }
      else{
        this.data.presentToast('Error');
      }
   });*/
    /*console.log(visibility);
    this.visible = !visibility;
    console.log(this.visible);
    if(this.visible)
    {
      //this.visible = false;
      //console.log(this.visible);
      this.data.presentToast('You are invisible to nearby customers');
    }
    else
    { 
      //this.visible = true;
      this.data.presentToast('You are visible to nearby customers');
     
    }*/
      
  }

 

}
