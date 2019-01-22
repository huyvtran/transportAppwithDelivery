import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { CustomerProfilePage } from '../customer-profile/customer-profile';
 
declare var cordova: any;
 
/**
 * Generated class for the UploadProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-profile',
  templateUrl: 'upload-profile.html',
})
export class UploadProfilePage {
  lastImage: string = null;
  loading: Loading;
  avtarPath : any;
  role : any;

  imgPreview = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
  constructor(private imagePicker: ImagePicker, public navParams: NavParams,private base64: Base64, public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public data : DataProvider, private storage: Storage) {
    this.imgPreview = navParams.get('imgurl');

    this.storage.get('user').then(data=>{   
      //let param = data[0].id;
      this.role = data[0].role;
    });

   }

  async captureImage(useAlbum: boolean) {
    var srcType;
    if(useAlbum == true)
    {
      srcType = this.camera.PictureSourceType.CAMERA;
    }
    else{
      srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType
    }

    const imageData = await this.camera.getPicture(options);

    console.log('imageData===>'+imageData);

    this.avtarPath = 'data:image/jpg;base64,'+imageData;

    let param = new FormData();
    param.append("image_file", this.avtarPath );

    //this.photos.unshift(this.base64Image);
    if(this.role == 2)
            {
              this.data.updateCustomerAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                    this.data.presentToast('eRROR');
                    return false;
                }
                else
                {   
                  this.data.presentToast('Profile Updated Successfully!');
                  //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              }); 
            }
            if(this.role == 3)
            {
              this.data.updateDriverAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                    this.data.presentToast('eRROR');
                    return false;
                }
                else
                {   
                  this.data.presentToast('Profile Updated Successfully!');
                  //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              }); 
            }

  }

 /*getPhoto() {
    let options = {
      maximumImagesCount: 1,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };


    this.camera.getPicture(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.avtarPath = base64File;
            let param = new FormData();
            param.append("image_file", this.avtarPath );

            this.data.updateCustomerAvtar(param).subscribe(result=>{
            
              if(result.status == "ERROR")
              {
                  this.data.presentToast('eRROR');
                  return false;
              }
              else
              {   
                this.data.presentToast('Profile Updated Successfully!');
              }                    
            }); 
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { });
    
  }*/

/*public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          //this.base64.encodeFile(correctPath + currentName).then((base64File: string) => {
            this.avtarPath = 'data:image/jpg;base64,'+correctPath + currentName;
           //this.avtarPath = imagePath;
          //});
          console.log(this.avtarPath);
            let param = new FormData();
            param.append("image_file", this.avtarPath );
            if(this.role == 2)
            {
              this.data.updateCustomerAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                    this.data.presentToast('eRROR');
                    return false;
                }
                else
                {   
                  this.data.presentToast('Profile Updated Successfully!');
                  //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              }); 
            }
            if(this.role == 3)
            {
              this.data.updateDriverAvtar(param).subscribe(result=>{
            
                if(result.status == "ERROR")
                {
                    this.data.presentToast('eRROR');
                    return false;
                }
                else
                {   
                  this.data.presentToast('Profile Updated Successfully!');
                  //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  this.navCtrl.setRoot(CustomerProfilePage);
                }                    
              }); 
            }
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      /*this.base64.encodeFile(correctPath + currentName).then((base64File: string) => {
        this.avtarPath = base64File;
      });*
     this.avtarPath = 'data:image/jpg;base64,'+correctPath + currentName;
     //this.avtarPath = imagePath;
      var param = new FormData();
      param.append("image_file", this.avtarPath );
      if(this.role == 2)
      {
        this.data.updateCustomerAvtar(param).subscribe(result=>{
            
          if(result.status == "ERROR")
          {
              this.data.presentToast('eRROR');
              return false;
          }
          else
          {   
            this.data.presentToast('Profile Updated Successfully!');
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.navCtrl.setRoot(CustomerProfilePage);
          }                    
        }); 
      }
      if(this.role == 3)
      {
        this.data.updateDriverAvtar(param).subscribe(result=>{
            
          if(result.status == "ERROR")
          {
              this.data.presentToast('eRROR');
              return false;
          }
          else
          {   
            this.data.presentToast('Profile Updated Successfully!');
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.navCtrl.setRoot(CustomerProfilePage);
          }                    
        }); 
      }
    
    
  }, (err) => {
    this.data.presentToast('Error while selecting image.');
  });
}*/
}