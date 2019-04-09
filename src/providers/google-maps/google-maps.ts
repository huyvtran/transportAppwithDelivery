import { Injectable, Component, ViewChild, ElementRef   } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { filter, delay } from 'rxjs/operators';

declare var google;
/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class GoogleMapsProvider {
  mapElement: any;
  pleaseConnect: any;
  directionsPanel: any;
  //public distance: any = '0 km';
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyD_mkig8BYCj7PJlCj4-yN4w6QPmJjxFbg";
  result:any;  
  marker:any;
  markers:any = [];
  directionsService: any;
  directionsDisplay :any;
  startMarker : any;
  stopMarker : any;
  circle : any;
  currentMapTrack = null;

  myloc = "";
  latitude : any;
  longitude : any;

  constructor(public eve: Events,public events: Events, public connectivityService: ConnectivityServiceProvider, public geolocation: Geolocation, public platform: Platform) {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions:{/*strokeColor:"#4a4a4a",*/strokeOpacity: 0.8,strokeWeight:3,strokeColor: '#278DF8' }, suppressMarkers:true });
  
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
 
  }     
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
            this.initMap().then((data) => {
              resolve(data);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
          document.body.appendChild(script); 
        }
      } else {
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
          resolve(true);
        }    
        else {
          this.disableMap();
          resolve(true);
        }
        resolve(true);
      }
     
      this.addConnectivityListeners();
    });
  }
 
  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      /*this.geolocation.watchPosition().pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe*/
      var options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1
      };
      this.geolocation.getCurrentPosition(options).then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        console.log('latLng==>'+latLng);
        //alert(latLng);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          clickableIcons: false,    
          disableDefaultUI: true,       
          zoomControl: false,      
          enableHighAccuracy: true,
        }
        var geocoder = new google.maps.Geocoder;
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(this.map);
        console.log("I am called");   
        this.addMarker().then(data=>{
          this.addInfoWindow(this.marker, data);
        })


      },err=>{console.log(JSON.stringify(err));this.initMap();});
    });
  }
 
  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
  }
 
  enableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }

 
  addConnectivityListeners(): void {
    //alert('hii');
      this.connectivityService.watchOnline().subscribe(() => {
        setTimeout(() => {

          if(typeof google == "undefined" || typeof google.maps == "undefined"){
            this.loadGoogleMaps();
          }
          else {
            if(!this.mapInitialised){
              this.initMap();
            }
  
            this.enableMap();
          }
  
        }, 2000);
  
      });
  
      this.connectivityService.watchOffline().subscribe(() => {
  
        this.disableMap();
      
      });
  }

  addMarker(){

    return new Promise((resolve,reject)=>{

      this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon : 'assets/imgs/map-pin-marked.png'
      });

     this.circle = new google.maps.Circle({
        strokeColor: '#b5bedc',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        strokeWidth:5,
        fillColor: '#c3cdee',
        fillOpacity: 0.35,
        map: this.map,
        center: this.map.getCenter(),
        radius: 200
      });/*.then((circle)=>{
        this.marker.bindTo('position',circle,'center');
      });*/
        



      var geocoder = new google.maps.Geocoder();

        var latlng = {lat: this.latitude, lng:this.longitude};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            var address = results[0].formatted_address;
            this.myloc = address;
            console.log("###########");
            console.log(this.myloc);
            console.log("###########");
            let content = this.myloc;         
     
            //this.addInfoWindow(this.marker, content);
            resolve(content);
          }        
        });
    });

  }



  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
 
  startNavigating(pickup,drop, directionsPanel: any){
    console.log("Start Navigating")
    this.marker.setMap(null);
    this.directionsPanel = directionsPanel;
    this.clearMarkers();
    this.markers = [];
    this.circle.setMap(null);
    this.directionsDisplay.setMap(null);  
    this.directionsDisplay.set('directions', null);
    //directionsDisplay.set('directions', null);
    this.getLatLng(pickup).then(data=>{
      this.startMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'],data['longitude']), map: this.map, icon: 'assets/imgs/source_pin.png' });
      this.markers.push(this.startMarker);
      this.addInfoWindow(this.startMarker,pickup);
    });
    
    this.getLatLng(drop).then(data=>{
      this.stopMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'],data['longitude']), map: this.map, icon: 'assets/imgs/destination_pin.png' });
      this.markers.push(this.stopMarker);
      this.addInfoWindow(this.stopMarker,drop);
    });

    this.directionsService.route({
        origin: pickup,
        destination: drop,
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res,status) => {
      var route = res.routes[0];
      console.log('route==>'+route.legs);
        this.events.publish('distance:created', route.legs[0].distance.text, Date.now());
        this.directionsDisplay.setMap(null);
        
        if(status == google.maps.DirectionsStatus.OK){ 
            this.directionsDisplay.setMap(this.map);
            this.directionsDisplay.setDirections(res);
        } else {
            console.warn(status);
        }
    });
  }


  getLatLng(address)
  {
    return new Promise((resolve) => {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
       resolve({latitude,longitude});
      } 
    }); 
  });
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
}