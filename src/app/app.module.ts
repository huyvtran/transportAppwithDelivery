import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Config,PageTransition,Animation } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { OneSignal } from '@ionic-native/onesignal';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Device } from '@ionic-native/device';
import { NativePageTransitions  } from '@ionic-native/native-page-transitions';
import { PayPal } from '@ionic-native/paypal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CallNumber } from '@ionic-native/call-number';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';   
import { SigninPage } from '../pages/signin/signin'; 
import { SignupPage } from '../pages/signup/signup';  
import { CustomerProfilePage } from '../pages/customer-profile/customer-profile';   
import { MapPage } from '../pages/map/map';   
import { EditProfilePage } from '../pages/edit-profile/edit-profile'; 
import { PasswordResetPage } from '../pages/password-reset/password-reset'; 
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { IntroPage } from '../pages/intro/intro';         
import { HelpPage } from '../pages/help/help';
import { RideNowPage } from '../pages/ride-now/ride-now';         
import { ForgotpasswoedPage } from '../pages/forgotpasswoed/forgotpasswoed';
import { EmailverificationPage } from '../pages/emailverification/emailverification';
import { SettingsPage } from '../pages/settings/settings';
import { DataProvider } from '../providers/data/data'; 
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule }   from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';    
import { FilePath } from '@ionic-native/file-path';
import { UploadProfilePage } from '../pages/upload-profile/upload-profile';
import { RideLaterPage } from '../pages/ride-later/ride-later';
import { PaymentwalletPage } from '../pages/paymentwallet/paymentwallet';
import { DriversettingPage } from '../pages/driversetting/driversetting';
import { BookinghistoryPage } from '../pages/bookinghistory/bookinghistory';
import { ModalpagePage } from '../pages/modalpage/modalpage';
import { ConfirmPaymentPage } from '../pages/confirm-payment/confirm-payment';
import { BookingListPage } from '../pages/booking-list/booking-list';   
import { DeliveryPage } from '../pages/delivery/delivery';
import { FeedbackPage } from '../pages/feedback/feedback';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PaymentPage } from '../pages/payment/payment';
import { NotificationsPage } from '../pages/notifications/notifications';
import { DriverTransactionsPage } from '../pages/driver-transactions/driver-transactions';
      
import { IntroPageModule  }  from '../pages/intro/intro.module';     
import { ForgotpasswoedPageModule } from '../pages/forgotpasswoed/forgotpasswoed.module';
import { EmailverificationPageModule } from '../pages/emailverification/emailverification.module';
import { HelpPageModule } from '../pages/help/help.module';
import { CustomerProfilePageModule } from '../pages/customer-profile/customer-profile.module';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { MapPageModule } from '../pages/map/map.module';
import { PasswordResetPageModule } from '../pages/password-reset/password-reset.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { UploadProfilePageModule } from '../pages/upload-profile/upload-profile.module';
import { AutocompletePageModule } from '../pages/autocomplete/autocomplete.module';
import { RideNowPageModule } from '../pages/ride-now/ride-now.module';
import { RideLaterPageModule } from '../pages/ride-later/ride-later.module';
import { PaymentwalletPageModule } from '../pages/paymentwallet/paymentwallet.module';
import { DriversettingPageModule } from '../pages/driversetting/driversetting.module';
import { BookinghistoryPageModule } from '../pages/bookinghistory/bookinghistory.module';
import { ModalpagePageModule } from '../pages/modalpage/modalpage.module';
import { ConfirmPaymentPageModule } from '../pages/confirm-payment/confirm-payment.module';
import { BookingListPageModule } from '../pages/booking-list/booking-list.module';
import { DeliveryPageModule } from '../pages/delivery/delivery.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { PaymentPageModule } from '../pages/payment/payment.module';
import { PackageBookingPageModule } from '../pages/package-booking/package-booking.module';
import { PackageBookingPage } from '../pages/package-booking/package-booking';
import { NotificationsPageModule} from '../pages/notifications/notifications.module';
import { ServiceProvider } from '../providers/service/service';
import { DriverTransactionsPageModule } from '../pages/driver-transactions/driver-transactions.module';

                    
@NgModule({                   
  declarations: [               
    MyApp,      
    HomePage,                  
    SigninPage 
  //  SignupPage,
  //  CustomerProfilePage,    
  //  MapPage,      
  //  PasswordResetPage,
  //  EditProfilePage,
  //  AvatarPage,
  //  AutocompletePage,
  //  IntroPage,      
  //  ForgotpasswoedPage,
  //  EmailverificationPage,    
  //  HelpPage,
  //  SettingsPage,
  //  UploadProfilePage
  ],   
  imports: [
    BrowserModule,
    HttpClientModule,   
    IntroPageModule,  
    ForgotpasswoedPageModule,  
    EmailverificationPageModule,
    CustomerProfilePageModule,
    EditProfilePageModule,
    MapPageModule,
    PasswordResetPageModule,
    SettingsPageModule,
    HelpPageModule,
    SignupPageModule,
    UploadProfilePageModule,
    AutocompletePageModule,
    HttpModule,
    RideNowPageModule,
    RideLaterPageModule,
    PaymentwalletPageModule,
    DriversettingPageModule,
    BookinghistoryPageModule,  
    ModalpagePageModule,
    ConfirmPaymentPageModule,
    PackageBookingPageModule,
    BookingListPageModule,
    DeliveryPageModule,
    FeedbackPageModule,
    Ionic2RatingModule,
    PaymentPageModule,
    NotificationsPageModule,
    DriverTransactionsPageModule,
    IonicModule.forRoot(MyApp,{
      preloadModules: true,    
      pageTransition: 'fade' 
    }),
    IonicStorageModule.forRoot()          
  ],
  bootstrap: [IonicApp],         
  entryComponents: [
    MyApp,        
    HomePage,
    SigninPage,              
    SignupPage,
    CustomerProfilePage,
    MapPage,
    PasswordResetPage,     
    EditProfilePage,          
    AutocompletePage,
    IntroPage,      
    ForgotpasswoedPage,
    EmailverificationPage,
    HelpPage,
    SettingsPage,
    UploadProfilePage,
    RideNowPage,
    RideLaterPage,
    PaymentwalletPage,                  
    DriversettingPage,          
    BookinghistoryPage,    
    ModalpagePage,
    ConfirmPaymentPage,
    BookingListPage,
    DeliveryPage,
    FeedbackPage,
    PaymentPage,
    PackageBookingPage,
    NotificationsPage,
    DriverTransactionsPage
  ],      
  providers: [
    StatusBar,            
    SplashScreen,    
    Geolocation,
    Camera,          
    ConnectivityServiceProvider,    
    Network,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,        
    ConnectivityServiceProvider,     
    GoogleMapsProvider,
    ImagePicker,
    Base64,     
    OneSignal,
    NativeGeocoder ,
    Device,
    NativePageTransitions,
    PayPal,
    ServiceProvider,
    InAppBrowser,
    BackgroundMode,
    AndroidPermissions,
    CallNumber
  ]       
})  
//export class AppModule {} 
export class AppModule {
  constructor(config: Config) {
    //config.setTransition('fade', FadeTansition);
  }
} 
    
/*const SHOW_BACK_BTN_CSS = 'show-back-button';
export class FadeTansition extends PageTransition {
  init() {
    super.init();
    const plt = this.plt;
    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;

    // what direction is the transition going
    const backDirection = opts.direction === 'back';

    if (enteringView) {
      if (backDirection) {
        this.duration(1000);
      } else {
        this.duration(1000);
        this.enteringPage.fromTo('opacity', 0, 1, true);
      }

      if (enteringView.hasNavbar()) {
        const enteringPageEle: Element = enteringView.pageRef().nativeElement;
        const enteringNavbarEle: Element = enteringPageEle.querySelector(
          'ion-navbar',
        );

        const enteringNavBar = new Animation(plt, enteringNavbarEle);
        this.add(enteringNavBar);

        const enteringBackButton = new Animation(
          plt,
          enteringNavbarEle.querySelector('.back-button')
        );
        this.add(enteringBackButton);
        if (enteringView.enableBack()) {
          enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS);
        } else {
          enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
        }
      }
    }

    // setup leaving view
    if (leavingView && backDirection) {
      // leaving content
      this.duration(1000);
      const leavingPage = new Animation(plt, leavingView.pageRef());
      this.add(leavingPage.fromTo('opacity', 1, 0));
    }
  }
}*/