import {Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../../providers/data/data';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the AutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription: Subscription;
  action :any;
  autocompleteItems;
  autocomplete;
  allDrivers;
  qdriver;
  lat : any;
  lng : any;
  latlng : any;
  fav_locations : any;

  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone, private storage : Storage, public data : DataProvider) {
    this.action = navParams.get('action');
    console.log(this.action);
    this.autocompleteItems = [];
    this.allDrivers = [];
    this.autocomplete = {
      query:''
    };
    this.qdriver = {
      query:''
    };


    this.data.getCustomerFavLocation().subscribe(result=>{
      if(result.status == "OK")
      {
        this.fav_locations = result.success.favlocations;
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    
    let me = this;
    
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.service.getPlacePredictions({input:this.autocomplete.query,location:latLng,radius:1000}, function (predictions, status) {
        me.autocompleteItems = []; 
        me.zone.run(function () {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
              console.log(status);
              return;
          }
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        });
      });
    });
  }

  close(){
    this.viewCtrl.dismiss();
  } 

  clear(){
    console.log(this.autocomplete.query);  
    this.autocomplete.query = "";       
  }
  
}
