import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class Info {
  public id: number;
  public question: string;
  public answer: string;
}

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  
  information : any;
  original_info : any;
  icon_name = 'add';
  info : Info;
  searchTerm : string = '';
  showDiv : any = 1;
  msg : any;

  constructor(public navCtrl: NavController, private loading: LoadingController, public navParams: NavParams, public data : DataProvider, private storage: Storage) {

    let loader = this.loading.create({
      content :"Please wait...",
      spinner : 'crescent'
    });

    loader.present();

    this.data.getFAQ().subscribe(result=>{
 
      console.log(result);   

       if(result.status == "ERROR")
       {
          loader.dismiss();
           this.data.presentToast('Invalid Username or Password!');
       }
       else   
       {
        loader.dismiss();
         console.log(result);
         this.information = result.success.faqs;
         this.original_info = result.success.faqs;
         console.log(this.information);
       }                           

});


    /*this.information = [
      {
          name: 'Checklist 1',
          content: 'Content 1'
      },
      {
          title: 'Checklist 2',
          items: 'Content 2 '
      }
    ]*/



  }


  setFilteredItems() {
 
    this.information = this.filterItems(this.searchTerm);
  
  }
     

  filterItems(searchTerm){
    return this.original_info.filter((item) => {
        return item.answer.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.question.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');      
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }


  change(){

    if(this.icon_name == 'add'){
      this.icon_name = 'remove';
    }else{
      this.icon_name = 'add';    
    }
  }

  changeTab(TabNo)
  {
    this.showDiv = TabNo;      
  }

  addSuggestion(msg)
  {
    if(msg == '')
    {
      this.data.presentToast('Please add your suggestion!');
      return false;
    }
    let param = new FormData();
    param.append("suggestion",msg);
     
      this.data.addSuggestion(param).subscribe(result=>{
        console.log(result);    
        //this.userData = result; 
        //loader.dismiss();   
        if(result.status == "ERROR")
        {
            this.data.presentToast(result.error.email);
            return false;
        }
        else
        {   
          //this.storage.set("customer_data",data.msg[0]);
          this.data.presentToast('Suggestion added successfully Successfully!');
          //this.navCtrl.setRoot('');  
          this.msg = '';
        }                    
      });
  }
}
