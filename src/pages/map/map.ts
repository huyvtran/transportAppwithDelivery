import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 // map : any;
    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    location: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public viewCtrl: ViewController) {
    this.searchDisabled = true;
        this.saveDisabled = true;
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    /*this./

    this.geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
        let mapOptions = {
          center: latLng,   
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }    
        
       this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
       this.addMarker();
      }, (err) => {
        console.log(err);
      });
  }


  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Your Current Location !</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }*/



  ionViewDidLoad(): void {
 
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.searchDisabled = false;
    });

}

selectPlace(place){

    this.places = [];

    let location = {
        lat: null,
        lng: null,
        name: place.name
    };
    this.placesService = new google.maps.places.PlacesService(this.maps.map);
    this.placesService.getDetails({placeId: place.place_id}, (details) => {
        this.zone.run(() => {

            location.name = details.name;   
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();
            this.saveDisabled = false;

            this.maps.map.setCenter({lat: location.lat, lng: location.lng});

            this.location = location;
            
        });

    });

}

searchPlace(){

    this.saveDisabled = true;
       
    if(this.query.length > 0 && !this.searchDisabled) {

        let config = {
            types: ['geocode'],
            input: this.query
        }

        this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

            if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                this.places = [];

                predictions.forEach((prediction) => {
                    this.places.push(prediction);
                });
            }
        });

    } else {
        this.places = [];
    }

}


save(){
    this.viewCtrl.dismiss(this.location);
}

close(){
    this.viewCtrl.dismiss();
}  

}

