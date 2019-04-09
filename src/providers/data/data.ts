import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http , RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {    
//"http://ccd965c3.ngrok.io/Michael_quinn/transportride/api/"//
  baseURL:string = "http://transportride.walstarmedia.com/api/";
  imgURL:string = "http://transportride.walstarmedia.com/storage/app/public/images/";
  token : string;
  headers:any;
  isRide : any = 'yes';

  isStarted = false;

  constructor(public ht: Http, public http: HttpClient, private toast: ToastController, private storage: Storage) {
    console.log('Hello DataProvider Provider');
    this.getToken();
  }

  getToken()
  {
    this.storage.get('token').then(data=>{
      this.token = data;
    });
  }

  presentToast(msg)     
  {   
      let toast = this.toast.create({

            message : msg,
            duration : 3000,
            position : 'middle'
      });

      toast.present();            
  } 

  getRoles()
  {
    return this.ht.get(this.baseURL+"roles").map(res=> res.json());
  }

  //user signup
  userSignUp(param)   
  {
   
    return this.ht.post(this.baseURL+"register",param).map(res=> res.json());
  }

  userSignIn(param)
  {
    let headers = new Headers({
      'Accept' : 'application/json'
    });
    
    return this.ht.post(this.baseURL+"login",param,{headers: headers}).map(res=> res.json());
  }

  getCustomerProfile(token){
   //return this.http.post(this.baseURL+"customer/profile",param).map(res=> res.json());

   //console.log("Token Here "+ this.token);
   //console.log('param'+param);
               
    let headers = new Headers({

        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+token
   });

    //return this.http.post(this.baseURL+"customer/profile",header,param);
     return this.ht.post(this.baseURL+"customer/profile",'',{headers: headers}).map(res=> res.json());
  }

  custChangePass(param)
  {
    //console.log("Token Here "+ this.token);
                
      let headers = new Headers({

          'Accept' : 'application/json',
          'Authorization' : 'Bearer '+this.token
    });

    

    return this.ht.post(this.baseURL+"customer/change/password", param,{headers: headers}).map(res=> res.json());
  }

  updateCustomerProfile(param)
  {
    let headers = new Headers({
          'Accept' : 'application/json',
          'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/save/profile", param,{headers: headers}).map(res=> res.json());
  }   

  forgotPass(param)
  {
    return this.ht.post(this.baseURL+"password/reset", param).map(res=> res.json());
  }  


  getDriverProfile(token)    
  {
   
    // this.storage.get('token').then(data=>{

    //   this.token = data;
    //  // console.log("Token here"+this.token);
    // });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+token
    });

   return this.ht.post(this.baseURL+"driver/profile",'',{headers: headers}).map(res=> res.json());
  }

  updateDriverProfile(param)
  {
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/save/profile", param,{headers: headers}).map(res=> res.json());
  }

  driverChangePass(param)
  {
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/change/password", param,{headers: headers}).map(res=> res.json());
  }

  getFAQ()
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

   return this.ht.get(this.baseURL+"faqs",{headers: headers}).map(res=> res.json());
  }

  getallDrivers()
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

   return this.ht.get(this.baseURL+"admin/driver/list",{headers: headers}).map(res=> res.json());
  }

  updateCustomerAvtar(param)
  {

    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });

    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/update/profile/image", param,{headers: headers}).map(res=> res.json());
  }

  updateDriverAvtar(param)
  {

    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });

    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/update/profile/image", param,{headers: headers}).map(res=> res.json());
  }

  addSuggestion(param)
  {
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/create/suggestion", param,{headers: headers}).map(res=> res.json());
  }
  
  getvehicletypes(){
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });
    return this.ht.post(this.baseURL+"driver/vehicletypes",'','').map(res=> res.json());
  }

  getvehicletypesforCustomers(){
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });
    return this.ht.post(this.baseURL+"customer/vehicletypes",'',{headers: headers}).map(res=> res.json());
  }

  storeCustomerLocation(param)
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });
    return this.ht.post(this.baseURL+"customer/store/location", param,{headers: headers}).map(res=> res.json());
  }

  storeDriverLocation(param)
  {    
    this.storage.get('token').then(data=>{

      this.token = data;
      //console.log("Token here"+this.token);
    });
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/store/location", param,{headers: headers}).map(res=> res.json());
  }

  AvailableToggle()     
  {
    this.storage.get('token').then(data=>{

      this.token = data;
      console.log("Token here"+this.token);
    });
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/toggle", '',{headers: headers}).map(res=> res.json());
  }

  getAvailableToggle()     
  {
    this.storage.get('token').then(data=>{

      this.token = data;
      //console.log("Token here"+this.token);
    });
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/get/toggle", '',{headers: headers}).map(res=> res.json());
  }

  getCloseCustomers(param)
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/closer/customers", param,{headers: headers}).map(res=> res.json());
  }

  getCloseDrivers(param)        
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/closer/drivers", param,{headers: headers}).map(res=> res.json());
  }

  getCloseVehicles(param)        
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/closer/drivers/vehicle", param,{headers: headers}).map(res=> res.json());
  }

  getSelectedDriverInfo(param)        
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/get/driver/info", param,{headers: headers}).map(res=> res.json());
  }

  getDriverToggle(param)
  {
    this.storage.get('token').then(data=>{

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/get/toggle", '',{headers: headers}).map(res=> res.json());
  }

  getCost(param)
  {
    this.storage.get('token').then(data=>{       

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/tripcost", param,{headers: headers}).map(res=> res.json());
  }

  postNotification(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/postNotification",param,{headers: headers}).map(res=> res.json());
  }

  bookingRequest(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"customer/booking/request",param,{headers: headers}).map(res=> res.json());
  }

  getBookingList(param,page)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token           
    });

    return this.ht.post(this.baseURL+"driver/booking/list?page="+page,param,{headers: headers}).map(res=> res.json());
  }

  getPendingBookingList(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/pending/booking/list",param,{headers: headers}).map(res=> res.json());
  }

  driverRejectBooking(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/reject/booking",param,{headers: headers}).map(res=> res.json());
  }

  driverAcceptBooking(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/accept/booking",param,{headers: headers}).map(res=> res.json());
  }

  customerRejectBooking(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/cancel/booking",param,{headers: headers}).map(res=> res.json());
  }

  rideLaterbookingRequest(param)
  {       
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({     
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"customer/booking/later",param,{headers: headers}).map(res=> res.json());
  }
  customerBookingDistance(param)
  {       
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({     
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"customer/booking/distance	",param,{headers: headers}).map(res=> res.json());
  }
  driverBookingDistance(param)
  {       
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({     
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"customer/booking/distance	",param,{headers: headers}).map(res=> res.json());
  }

  getBookingInfo(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({     
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"driver/booking/details	",param,{headers: headers}).map(res=> res.json());
  }

  RideCancelCharges(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });    

    let headers = new Headers({     
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token      
    });

    return this.ht.post(this.baseURL+"customer/cancellation/charges",param,{headers: headers}).map(res=> res.json());
  }
  
  DriverpostNotification(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/postNotification",param,{headers: headers}).map(res=> res.json());
  }

  feedback(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/ride/feedback",param,{headers: headers}).map(res=> res.json());
  }

  getCustInfo(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/customer/details",param,{headers: headers}).map(res=> res.json());
  }

  rideStart(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/ride/start",param,{headers: headers}).map(res=> res.json());
  }

  rideEnd(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/ride/finish",param,{headers: headers}).map(res=> res.json());
  }

  getCustomerBookingList(param,page)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/booking/history?page="+page,param,{headers: headers}).map(res=> res.json());
  }

  addFavDriver(param)    
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/add/favdriver",param,{headers: headers}).map(res=> res.json());
  }          

  removeFavDriver(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/delete/favdriver",param,{headers: headers}).map(res=> res.json());
  }

  getBookingDetails(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/booking/details",param,{headers: headers}).map(res=> res.json());
  }
  getParcelPackage(param){
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/parcel/request",param,{headers: headers}).map(res=> res.json());

  }

  addCustomerFavLocation(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/add/favlocation",param,{headers: headers}).map(res=> res.json());
  }

  removeCustomerFavLocation(param)
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/delete/favlocation",param,{headers: headers}).map(res=> res.json());
  }

  getCustomerFavLocation()
  {          
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/favlocations",'',{headers: headers}).map(res=> res.json());
  }

  getFavDrivers()
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/favdrivers",'',{headers: headers}).map(res=> res.json());
  }

  getcurrentBooking(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/booking/details",param,{headers: headers}).map(res=> res.json());
  }

  payment(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/payment",param,{headers: headers}).map(res=> res.json());
  }

  walletTopUp(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/wallet/topup",param,{headers: headers}).map(res=> res.json());
  }

  getWalletAmount(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/wallet/balance",param,{headers: headers}).map(res=> res.json());
  }

  walletPayment(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/pay/wallet",param,{headers: headers}).map(res=> res.json());
  }

  paymentByCash(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/payment/by/cash",param,{headers: headers}).map(res=> res.json());
  }

  CashMethodNotification(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;          
      // console.log("Token here"+this.token);            
    });    

    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/cashpayment/notification",param,{headers: headers}).map(res=> res.json());
  }

  feedbacktoCustomer(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/ride/feedback",param,{headers: headers}).map(res=> res.json());
  }

  driverNotifications(param,page)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/notification?page="+page,param,{headers: headers}).map(res=> res.json());
  }

  driverReadNotifications(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;   
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"driver/read/notification",param,{headers: headers}).map(res=> res.json());
  }

  getTransactions(param,page)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;   
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token        
    });

    return this.ht.post(this.baseURL+"customer/transaction?page="+page,param,{headers: headers}).map(res=> res.json());
  }

  getDriverTransactions(param,page)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;   
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token        
    });

    return this.ht.post(this.baseURL+"driver/transaction?page="+page,param,{headers: headers}).map(res=> res.json());
  }

  driverNotificationSetting(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;   
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token        
    });

    return this.ht.post(this.baseURL+"driver/setting/notification",param,{headers: headers}).map(res=> res.json());
  }

  customerNotificationSetting(param)
  {
    this.storage.get('token').then(data=>{       
      this.token = data;   
      // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token        
    });

    return this.ht.post(this.baseURL+"customer/setting/notification",param,{headers: headers}).map(res=> res.json());
  }


  /****************** Delivery API's *****************/
  getDeliveryVehicleTypes()
  {
    return this.ht.post(this.baseURL+"delivery/vehicle",'','').map(res=> res.json());
  }
  getRideVehicleTypes()
  {
    return this.ht.post(this.baseURL+"ride/vehicle",'','').map(res=> res.json());
  }
  getCostandVehicle(param)
  {
    this.storage.get('token').then(data=>{       

      this.token = data;
     // console.log("Token here"+this.token);
    });
    
    let headers = new Headers({

      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+this.token
    });

    return this.ht.post(this.baseURL+"customer/delivery/tripcost", param,{headers: headers}).map(res=> res.json());
  }
}
 