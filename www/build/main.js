webpackJsonp([1],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modalpage_modalpage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BookingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookingListPage = /** @class */ (function () {
    function BookingListPage(navCtrl, loading, navParams, data, storage, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.booking_history = [];
        this.page = 1;
        this.noHistory = false;
        this.isEmpty = false;
        this.storage.get('user').then(function (data) {
            _this.driver_id = data[0].id;
        });
        this.bookings = 'pending';
        this.loadingCtr = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        this.loadingCtr.present();
    }
    BookingListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookingListPage');
    };
    BookingListPage.prototype.ionViewDidEnter = function () {
        this.loadHistory();
    };
    BookingListPage.prototype.showBooking = function (i) {
        console.log(this.booking_history[i]);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'showBooking', bookingId: this.booking_history[i].booking_id, relativeId: this.booking_history[i].customer_id });
        var me = this;
        modal.onDidDismiss(function (data) {
        });
        modal.present();
    };
    BookingListPage.prototype.loadHistory = function (infiniteScroll) {
        var _this = this;
        this.storage.get('user').then(function (data) {
            var param = new FormData();
            param.append("driver_id", data[0].id);
            _this.data.getBookingList(param, _this.page).subscribe(function (result) {
                if (result.status == 'OK') {
                    if (result.success.booking.data == null || result.success.booking.data == '') {
                        _this.loadingCtr.dismiss();
                        if (_this.booking_history == '') {
                            _this.noHistory = true;
                        }
                        _this.isEmpty = true;
                        _this.data.presentToast('There is no more data available');
                        return false;
                    }
                    else {
                        var history_1 = result.success.booking.data;
                        for (var key in history_1) {
                            _this.booking_history[key] = history_1[key];
                        }
                        console.log(_this.booking_history);
                        _this.loadingCtr.dismiss();
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                    }
                }
            });
        });
    };
    BookingListPage.prototype.loadMoreHistory = function (infiniteScroll) {
        this.page++;
        this.loadHistory(infiniteScroll);
        if (this.page === this.maximumPages) {
            infiniteScroll.enable(false);
        }
    };
    BookingListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-booking-list',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/booking-list/booking-list.html"*/'<!--\n  Generated template for the BookingListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="sideMenu" hideBackButton>\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>Booking List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n             \n<ion-content>\n    <div>\n        <div *ngIf=\'booking_history != ""\'>\n          <ion-card *ngFor="let item of booking_history; let i = index">\n            <div class="abs_div">\n              <span>{{item.booking_details.created_at | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n            </div>\n            <span class="price">${{item.booking_details.cost}}</span> \n            <ion-item class="container_div" (click)=\'showBooking(i)\'>\n              <ion-icon class="src_pin" name="pin"></ion-icon>\n              <span text-wrap>{{item.booking_details.source}}</span>\n            </ion-item> \n            <ion-item class="container_div" (click)=\'showBooking(i)\'>\n              <ion-icon class="dest_pin" name="pin"></ion-icon>\n              <span text-wrap>{{item.booking_details.destination}}</span>\n            </ion-item>\n            <ion-item *ngIf="item?.feedback?.rating > 0">\n              <ion-icon name="star" [ngClass]="item.feedback.rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n              <ion-icon name="star" [ngClass]="item.feedback.rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n              <ion-icon name="star" [ngClass]="item.feedback.rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n              <ion-icon name="star" [ngClass]="item.feedback.rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n              <ion-icon name="star" [ngClass]="item.feedback.rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n            </ion-item>\n            <ion-item class="not_rated_item" *ngIf="item?.feedback == null">\n              Not Rated \n            </ion-item>\n          </ion-card>\n          <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n              <ion-infinite-scroll-content *ngIf="!isEmpty"></ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </div>\n        <div class="nulldiv emptyDiv" *ngIf=\'noHistory == true\'>\n            <img src="assets/imgs/empty_booking.png"/>\n            You haven\'t taken a ride yet.\n        </div>\n      </div>\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/booking-list/booking-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
    ], BookingListPage);
    return BookingListPage;
}());

//# sourceMappingURL=booking-list.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookinghistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the BookinghistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookinghistoryPage = /** @class */ (function () {
    function BookinghistoryPage(data, loading, storage, navCtrl, navParams, modalCtrl, datepipe) {
        var _this = this;
        this.data = data;
        this.loading = loading;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.datepipe = datepipe;
        this.history = [];
        this.upcoming = [];
        this.delivery_history = [];
        this.upcoming_deliveries = '';
        this.showDiv = 1;
        this.showSubDiv = 3;
        this.page = 1;
        this.uppage = 1;
        this.nohistory = false;
        this.noupcoming = false;
        this.loadingCtr = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        this.loadingCtr.present();
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
        });
    }
    BookinghistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookinghistoryPage');
    };
    BookinghistoryPage.prototype.ionViewDidEnter = function () {
        this.loadData();
        //this.loadHistory();
        //this.loadUpcomings();
    };
    BookinghistoryPage.prototype.changeTab = function (TabNo) {
        this.showDiv = TabNo;
        this.showSubDiv = 3;
    };
    BookinghistoryPage.prototype.changeSubTab = function (TabNo) {
        this.showSubDiv = TabNo;
    };
    BookinghistoryPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.storage.get('user').then(function (data) {
            var param = new FormData();
            param.append("customer_id", data[0].id);
            _this.data.getCustomerBookingList(param, _this.page).subscribe(function (result) {
                if (result.status == 'OK') {
                    if (_this.loadingCtr) {
                        _this.loadingCtr.dismiss();
                    }
                    if (result.success.booking.data == null || result.success.booking.data == "") {
                        if (_this.history == '') {
                            _this.nohistory = true;
                        }
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                        _this.data.presentToast('There is no more data available');
                        return false;
                    }
                    else {
                        _this.history = _this.history.concat(result.success.booking.data);
                        console.log(_this.history);
                        _this.delivery_history = [];
                        _this.upcoming_deliveries = [];
                        _this.upcoming = [];
                        for (var i = 0; i < _this.history.length; i++) {
                            if (_this.history[i].type == 'delivery') {
                                var date = _this.history[i].schedule_time;
                                if (new Date().valueOf() < new Date(date).valueOf()) {
                                    console.log("I am from delivery type date compare");
                                    _this.upcoming_deliveries.push(_this.history[i]);
                                }
                                else {
                                    _this.delivery_history.push(_this.history[i]);
                                }
                            }
                            else {
                                var date = _this.history[i].schedule_time;
                                if (new Date().valueOf() < new Date(date).valueOf()) {
                                    console.log("I am from ride type date compare");
                                    _this.upcoming.push(_this.history[i]);
                                }
                            }
                        }
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                    }
                }
            });
        });
    };
    // loadHistory(infiniteScroll?)
    // {
    //   this.storage.get('user').then(data=>{        
    //   let param = new FormData();
    //     param.append("customer_id",data[0].id);
    //     this.data.getCustomerBookingList(param,this.page).subscribe(result=>{                          
    //       if(result.status == "OK")  
    //       {   
    //         if(this.loadingCtr)
    //           {
    //             this.loadingCtr.dismiss();
    //           }
    //         if(result.success.booking.data == null)
    //         {
    //           if(this.history == '')
    //           {
    //             this.nohistory = true;
    //           }
    //           this.data.presentToast('There is no more data available');
    //           return false;
    //         }
    //         else{
    //           this.history = this.history.concat(result.success.booking.data);
    //           this.delivery_history = [];
    //           for(let i=0; i<this.history.length; i++){
    //             if(this.history[i].booking_details.type == 'delivery'){
    //                 this.delivery_history.push(this.history[i]);
    //             }
    //           }
    //           console.log(this.history);
    //           if(infiniteScroll) {
    //             infiniteScroll.complete();
    //           }
    //         }
    //       }
    //     });
    //   });
    // }
    // loadUpcomings(infiniteScroll?)
    // {
    //   console.log("I am Upcoming");
    //   let param = new FormData();
    //     param.append("customer_id",this.id);
    //     this.data.getCustomerBookingList(param,this.uppage).subscribe(result=>{                          
    //       if(result.status == "OK")  
    //       {   
    //         console.log(result);
    //         if(result.success.booking.data == null)
    //         {
    //           if(this.upcoming == '')
    //           {
    //             this.noupcoming = true;
    //           }
    //           this.data.presentToast('There is no more data available');
    //           return false;
    //         }
    //         else{
    //           this.upcoming = this.upcoming.concat(result.success.later.data);
    //           console.log(this.upcoming);
    //           if(infiniteScroll) {
    //             infiniteScroll.complete();
    //           }
    //         }
    //       }
    //     });
    // }
    BookinghistoryPage.prototype.loadMoreHistory = function (infiniteScroll) {
        this.page++;
        //this.loadHistory(infiniteScroll);
        this.loadData(infiniteScroll);
        if (this.page === this.maximumPages) {
            infiniteScroll.enable(false);
        }
    };
    // loadMoreUpcoming(infiniteScroll){
    //   this.uppage++;
    //   this.loadUpcomings(infiniteScroll);
    //   if (this.uppage === this.maximumPages){
    //     infiniteScroll.enable(false);
    //   }
    // }
    BookinghistoryPage.prototype.showBooking = function (list, i) {
        console.log(this.history[i].id);
        var modal;
        if (list == 'history') {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'showBooking', bookingId: this.history[i].id, relativeId: this.history[i]['booking_details'][0].driver_id });
        }
        else if (list == 'upcoming') {
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'showBooking', bookingId: this.upcoming[i].id });
        }
        modal.onDidDismiss(function (data) {
        });
        modal.present();
    };
    BookinghistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-bookinghistory',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/bookinghistory/bookinghistory.html"*/'<!--\n  Generated template for the BookinghistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Your Bookings</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<!-- <ion-content> Old Code\n  <div *ngIf=\'showDiv == 1\'>\n    <div class = "tabs-striped tabs-background-positive tabs-color-light">\n      <div class = "tabs toptabs">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-6 (click)=\'changeSubTab("3")\'>\n              <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 3 ? \'active\' : \'\'">\n                Past\n              </a>\n            </ion-col>\n            <ion-col col-6 (click)=\'changeSubTab("4")\'>\n              <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 4 ? \'active\' : \'\'">\n                Upcoming\n              </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n  <div *ngIf=\'showSubDiv == 3\'>\n    <div *ngIf=\'history != ""\'>\n      <ion-card *ngFor="let item of history; let i = index">\n        <div *ngIf="item.booking_details.type == \'ride\'?true:false">\n          <div class="abs_div">\n            <span>{{item.booking_details.created_at | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n          </div>\n          <span class="price">${{item.booking_details.cost}}</span> \n          <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n            <ion-icon class="src_pin" name="pin"></ion-icon>\n            <span text-wrap>{{item.booking_details.source}}</span>\n          </ion-item> \n          <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n            <ion-icon class="dest_pin" name="pin"></ion-icon>\n            <span text-wrap>{{item.booking_details.destination}}</span>\n          </ion-item>\n          <ion-item *ngIf="item?.feedback?.rating > 0">\n            <ion-icon name="star" [ngClass]="item.feedback.rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback.rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback.rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback.rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback.rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n          </ion-item>\n          <ion-item class="not_rated_item" *ngIf="item?.feedback == null && item?.booking_details.is_cancelled == 0">\n            Not Rated \n          </ion-item>\n          <ion-item class="not_rated_item" *ngIf="item?.booking_details.is_cancelled == 1">\n            <p class="cancelled">Cancelled</p>\n          </ion-item>\n        </div>\n      </ion-card>\n      <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </div>\n    <div class="nulldiv emptyDiv" *ngIf=\'history == ""\'>\n        <img src="assets/imgs/empty_booking.png"/>\n        You haven\'t taken a ride yet.\n    </div>\n  </div>\n\n  <div *ngIf=\'showSubDiv == 4\'>\n    <div *ngIf=\'upcoming != ""\'>\n      <ion-card *ngFor="let item of upcoming; let i = index">\n        <div class="abs_div">\n          <span>{{item.schedule_time | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n        </div>\n        <span class="price">${{item.cost}}</span> \n        <ion-item  (click)=\'showBooking("upcoming",i)\' class="container_div">\n          <ion-icon class="src_pin" name="pin"></ion-icon>\n          <span text-wrap>{{item.source}}</span>\n        </ion-item> \n        <ion-item  (click)=\'showBooking("upcoming",i)\' class="container_div">\n          <ion-icon class="dest_pin" name="pin"></ion-icon>\n          <span text-wrap>{{item.destination}}</span>\n        </ion-item>\n      </ion-card>\n      <ion-infinite-scroll (ionInfinite)="loadMoreUpcoming($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </div>\n    <div class="nulldiv emptyDiv" *ngIf=\'upcoming == ""\'>\n        <img src="assets/imgs/empty_booking.png"/>\n        You have no upcoming Rides.\n    </div>\n  </div> \n</div>   \n\n<div *ngIf=\'showDiv == 2\'>\n  <div class = "tabs-striped tabs-background-positive tabs-color-light">\n    <div class = "tabs toptabs">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6 (click)=\'changeSubTab("3")\'>\n            <a class = "tab-item toptab_item"  [ngClass]="showSubDiv == 3 ? \'active\' : \'\'">\n              Past\n            </a>\n          </ion-col>\n          <ion-col col-6 (click)=\'changeSubTab("4")\'>\n            <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 4 ? \'active\' : \'\'">\n              Upcoming\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n    <div *ngIf=\'showSubDiv == 3\'>\n      <div *ngIf=\'delivery_history != ""\'>\n          <ion-card *ngFor="let item of delivery_history; let i = index">\n              <div class="abs_div">\n                <span>{{item.booking_details.created_at | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n              </div>\n              <span class="price">${{item.booking_details.cost}}</span> \n              <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n                <ion-icon class="src_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.booking_details.source}}</span>\n              </ion-item> \n              <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n                <ion-icon class="dest_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.booking_details.destination}}</span>\n              </ion-item>\n              <ion-item *ngIf="item?.feedback?.rating > 0">\n                <ion-icon name="star" [ngClass]="item.feedback.rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback.rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback.rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback.rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback.rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n              </ion-item>\n              <ion-item class="not_rated_item" *ngIf="item?.feedback == null && item?.booking_details.is_cancelled == 0">\n                Not Rated \n              </ion-item>\n              <ion-item class="not_rated_item" *ngIf="item?.booking_details.is_cancelled == 1">\n                <p class="cancelled">Cancelled</p>\n              </ion-item>\n          </ion-card>\n          <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n              <ion-infinite-scroll-content></ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </div>\n        <div class="nulldiv emptyDiv" *ngIf=\'delivery_history == ""\'>\n            <img src="assets/imgs/empty_booking.png"/>\n            You haven\'t taken a delivery yet.\n        </div>\n    </div>\n  \n    <div *ngIf=\'showSubDiv == 4\'>\n        <div *ngIf=\'upcoming_deliveries != ""\'>\n            <ion-card *ngFor="let item of upcoming; let i = index">\n              <div class="abs_div">\n                <span>{{item.schedule_time}}</span>\n              </div>\n              <span class="price">${{item.cost}}</span> \n              <ion-item class="container_div">\n                <ion-icon class="src_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.source}}</span>\n              </ion-item> \n              <ion-item class="container_div">\n                <ion-icon class="dest_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.destination}}</span>\n              </ion-item>\n            </ion-card>\n            <ion-infinite-scroll (ionInfinite)="loadMoreUpcoming($event)">\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n              </ion-infinite-scroll>\n          </div>\n          <div class="nulldiv emptyDiv" *ngIf=\'upcoming_deliveries == ""\'>\n              <img src="assets/imgs/empty_booking.png"/>\n              You have no upcoming delivery.\n          </div>\n    </div>\n  </div>\n</ion-content>\n\n<div class="last_div">  \n    <div class="inner_last_div">\n      <div class = "tabs-striped tabs-background-positive tabs-color-light">\n        <div class = "tabs">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6 [ngClass]="showDiv == 1 ? \'custom-tab\': \'\'" (click)=\'changeTab("1")\'>\n                  <a class = "tab-item">\n                      Rides\n                  </a>\n              </ion-col>\n              <ion-col col-6 [ngClass]="showDiv == 2 ? \'custom-tab\': \'\'" (click)=\'changeTab("2")\'>\n                  <a class = "tab-item">\n                      Deliveries\n                  </a>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n     </div>\n    </div>    \n</div> -->\n\n\n<ion-content>\n  <div *ngIf=\'showDiv == 1\'>\n    <div class = "tabs-striped tabs-background-positive tabs-color-light">\n      <div class = "tabs toptabs">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-6 (click)=\'changeSubTab("3")\'>\n              <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 3 ? \'active\' : \'\'">\n                Past\n              </a>\n            </ion-col>\n            <ion-col col-6 (click)=\'changeSubTab("4")\'>\n              <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 4 ? \'active\' : \'\'">\n                Upcoming\n              </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n  <div *ngIf=\'showSubDiv == 3\'>\n    <div *ngIf=\'history != ""\'>\n      <ion-card *ngFor="let item of history; let i = index">\n        <div *ngIf="item.type == \'ride\'?true:false">\n          <div class="abs_div">\n            <span>{{item.created_at | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n          </div>\n          <span class="price">${{item.cost}}</span> \n          <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n            <ion-icon class="src_pin" name="pin"></ion-icon>\n            <span text-wrap>{{item.source}}</span>\n          </ion-item> \n          <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n            <ion-icon class="dest_pin" name="pin"></ion-icon>\n            <span text-wrap>{{item.destination}}</span>\n          </ion-item>\n          <ion-item *ngIf="item?.feedback[0]?.rating > 0">\n            <ion-icon name="star" [ngClass]="item.feedback[0].rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback[0].rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback[0].rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback[0].rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n            <ion-icon name="star" [ngClass]="item.feedback[0].rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n          </ion-item>\n          <ion-item class="not_rated_item" *ngIf="item?.feedback == \'\' && item?.is_cancelled != 1? true: false">\n            Not Rated \n          </ion-item>\n          <ion-item class="not_rated_item" *ngIf="item?.is_cancelled == 1">\n            <p class="cancelled">Cancelled</p>\n          </ion-item>\n        </div>\n      </ion-card>\n      <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </div>\n    <div class="nulldiv emptyDiv" *ngIf=\'history == ""\'>\n        <img src="assets/imgs/empty_booking.png"/>\n        You haven\'t taken a ride yet.\n    </div>\n  </div>\n\n  <div *ngIf=\'showSubDiv == 4\'>\n    <div *ngIf=\'upcoming != ""\'>\n      <ion-card *ngFor="let item of upcoming; let i = index">\n        <div class="abs_div">\n          <span>{{item.schedule_time | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n        </div>\n        <span class="price">${{item.cost}}</span> \n        <ion-item  (click)=\'showBooking("upcoming",i)\' class="container_div">\n          <ion-icon class="src_pin" name="pin"></ion-icon>\n          <span text-wrap>{{item.source}}</span>\n        </ion-item> \n        <ion-item  (click)=\'showBooking("upcoming",i)\' class="container_div">\n          <ion-icon class="dest_pin" name="pin"></ion-icon>\n          <span text-wrap>{{item.destination}}</span>\n        </ion-item>\n      </ion-card>\n      <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </div>\n    <div class="nulldiv emptyDiv" *ngIf=\'upcoming == ""\'>\n        <img src="assets/imgs/empty_booking.png"/>\n        You have no upcoming Rides.\n    </div>\n  </div> \n</div>   \n\n<div *ngIf=\'showDiv == 2\'>\n  <div class = "tabs-striped tabs-background-positive tabs-color-light">\n    <div class = "tabs toptabs">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6 (click)=\'changeSubTab("3")\'>\n            <a class = "tab-item toptab_item"  [ngClass]="showSubDiv == 3 ? \'active\' : \'\'">\n              Past\n            </a>\n          </ion-col>\n          <ion-col col-6 (click)=\'changeSubTab("4")\'>\n            <a class = "tab-item toptab_item" [ngClass]="showSubDiv == 4 ? \'active\' : \'\'">\n              Upcoming\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n    <div *ngIf=\'showSubDiv == 3\'>\n      <div *ngIf=\'delivery_history != ""\'>\n          <ion-card *ngFor="let item of delivery_history; let i = index">\n              <div class="abs_div">\n                <span>{{item.created_at | date : \'dd MMM, yyyy hh:mm:ss\'}}</span>\n              </div>\n              <span class="price">${{item.cost}}</span> \n              <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n                <ion-icon class="src_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.source}}</span>\n              </ion-item> \n              <ion-item (click)=\'showBooking("history",i)\' class="container_div">\n                <ion-icon class="dest_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.destination}}</span>\n              </ion-item>\n              <ion-item *ngIf="item?.feedback[0]?.rating > 0">\n                <ion-icon name="star" [ngClass]="item.feedback[0].rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback[0].rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback[0].rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback[0].rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n                <ion-icon name="star" [ngClass]="item.feedback[0].rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n              </ion-item>\n              <ion-item class="not_rated_item" *ngIf="item?.feedback == \'\' && item?.is_cancelled != 1? true: false">\n                Not Rated \n              </ion-item>\n              <ion-item class="not_rated_item" *ngIf="item?.is_cancelled == 1">\n                <p class="cancelled">Cancelled</p>\n              </ion-item>\n          </ion-card>\n          <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n              <ion-infinite-scroll-content></ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n        </div>\n        <div class="nulldiv emptyDiv" *ngIf=\'delivery_history == ""\'>\n            <img src="assets/imgs/empty_booking.png"/>\n            You haven\'t taken a delivery yet.\n        </div>\n    </div>\n  \n    <div *ngIf=\'showSubDiv == 4\'>\n        <div *ngIf=\'upcoming_deliveries != ""\'>\n            <ion-card *ngFor="let item of upcoming_deliveries; let i = index">\n              <div class="abs_div">\n                <span>{{item.schedule_time}}</span>\n              </div>\n              <span class="price">${{item.cost}}</span> \n              <ion-item class="container_div">\n                <ion-icon class="src_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.source}}</span>\n              </ion-item> \n              <ion-item class="container_div">\n                <ion-icon class="dest_pin" name="pin"></ion-icon>\n                <span text-wrap>{{item.destination}}</span>\n              </ion-item>\n            </ion-card>\n            <ion-infinite-scroll (ionInfinite)="loadMoreHistory($event)">\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n              </ion-infinite-scroll>\n          </div>\n          <div class="nulldiv emptyDiv" *ngIf=\'upcoming_deliveries == ""\'>\n              <img src="assets/imgs/empty_booking.png"/>\n              You have no upcoming delivery.\n          </div>\n    </div>\n  </div>\n</ion-content>\n\n<div class="last_div">  \n    <div class="inner_last_div">\n      <div class = "tabs-striped tabs-background-positive tabs-color-light">\n        <div class = "tabs">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-6 [ngClass]="showDiv == 1 ? \'custom-tab\': \'\'" (click)=\'changeTab("1")\'>\n                  <a class = "tab-item">\n                      Rides\n                  </a>\n              </ion-col>\n              <ion-col col-6 [ngClass]="showDiv == 2 ? \'custom-tab\': \'\'" (click)=\'changeTab("2")\'>\n                  <a class = "tab-item">\n                      Deliveries\n                  </a>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n     </div>\n    </div>    \n</div>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/bookinghistory/bookinghistory.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]])
    ], BookinghistoryPage);
    return BookinghistoryPage;
}());

//# sourceMappingURL=bookinghistory.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RideNowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__confirm_payment_confirm_payment__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_geocoder__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RideNowPage = /** @class */ (function () {
    function RideNowPage(nativeGeocoder, platform, navCtrl, navParams, data, storage, alertCtrl) {
        var _this = this;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.Did = '';
        this.isnowenabled = true;
        console.log('navParams.get(param)==>' + navParams.get('param'));
        this.data1 = navParams.get('param');
        this.distance = this.data1.distance;
        this.vehicle_types = this.data1.vehicle_type;
        this.pick_up = this.data1.pick_up;
        this.drop = this.data1.drop;
        this.cost = this.data1.cost;
        this.Did = this.data1.Did;
        this.active = '';
        var options = {
            useLocale: true,
            maxResults: 5
        };
        if (this.vehicle_types == 'Economy') {
            this.vehicle_img = 'assets/imgs/img1111.png';
        }
        else if (this.vehicle_types == 'Comfort') {
            this.vehicle_img = 'assets/imgs/img1112.png';
        }
        else if (this.vehicle_types == 'Business') {
            this.vehicle_img = 'assets/imgs/img1113.png';
        }
        else {
            this.vehicle_img = 'assets/imgs/img1113.png';
        }
        var addresses = [this.pick_up, this.drop];
        var addressFull = [];
        //var addresses = '';
        var geocoder = new google.maps.Geocoder();
        addresses.forEach(function (value) {
            console.log(value);
            geocoder.geocode({ 'address': value }, function (results, status) {
                if (status == 'OK') {
                    var address0 = results[0].geometry.location.lat();
                    var address1 = results[0].geometry.location.lng();
                    console.log(address0, address1);
                    addressFull.push(address0);
                    addressFull.push(address1);
                    //console.log(address);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
        setTimeout(function () {
            console.log('addressFull==>' + addressFull);
            _this.pick_up_lt = addressFull[0];
            _this.pick_up_lg = addressFull[1];
            _this.drop_lt = addressFull[2];
            _this.drop_lg = addressFull[3];
        }, 1500);
        //console.log(this.pick_up_lg);
        //console.log('pick_up_ltlg===>'+pick_up_ltlg);
        /*this.nativeGeocoder.forwardGeocode("'"+this.pick_up+"'", options)
        .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
        .catch((error: any) => console.log(error));*/
        this.storage.get('user').then(function (data) {
            _this.customer_id = data[0].id;
            _this.customer_name = data[0].first_name + ' ' + data[0].last_name;
        });
        // console.log('oiuygfbhthis.distance==>>'+this.distance);
        this.driver = {
            fname: 'fname',
            lname: 'lname',
            phone: '98745896',
            address: '',
            vehicle_type: '',
            vehicle_no: ''
        };
        if (this.Did && this.Did != '') {
            var param = new FormData();
            param.append("driver_id", this.Did);
            this.data.getSelectedDriverInfo(param).subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    console.log(result.success.driver.first_name);
                    _this.driver.fname = result.success.driver.first_name;
                    _this.driver.lname = result.success.driver.last_name;
                    //this.user_details.email = result.success.profile[0].email;
                    _this.driver.phone = result.success.driver.phone;
                    _this.driver.address = result.success.driver.address;
                    _this.driver.vehicle_type = result.success.driver.vehicle_type;
                    _this.driver.vehicle_no = result.success.driver.vehicle_number;
                }
                else {
                }
            });
        }
    }
    RideNowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RideNowPage');
    };
    RideNowPage.prototype.ionViewWillLeave = function () {
    };
    RideNowPage.prototype.updateActive = function (name) {
        this.active = name;
    };
    RideNowPage.prototype.forwardGeocode = function (keyword) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': keyword }, function (results, status) {
            if (status == 'OK') {
                console.log('helloooooooooooo====>' + results[0].geometry.location);
                return results[0].geometry.location;
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    RideNowPage.prototype.showAlert = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm Booking Request!',
            message: 'Do you want to book a ride?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.confirmPayment();
                    }
                }
            ]
        });
        confirm.present();
    };
    RideNowPage.prototype.confirmPayment = function () {
        var _this = this;
        if (this.active != '') {
            var param1 = new FormData();
            param1.append("customer_id", this.customer_id);
            this.data.getWalletAmount(param1).subscribe(function (result) {
                if (result.status == 'OK') {
                    if (parseFloat(result.success.balance) < 0) {
                        _this.data.presentToast("Your wallet balance is in minus, So you can't take Ride");
                    }
                    else {
                        _this.isnowenabled = false;
                        var temp = _this.distance.replace(",", "");
                        temp = temp.split(" ");
                        var param = new FormData();
                        param.append("customer_id", _this.customer_id);
                        param.append("schedule", "0");
                        param.append("schedule_time", null);
                        param.append("distance", temp[0]);
                        param.append("vehicle_type", _this.vehicle_types);
                        param.append("source", _this.pick_up);
                        param.append("source_lat", _this.pick_up_lt);
                        param.append("source_long", _this.pick_up_lg);
                        param.append("destination_lat", _this.drop_lt);
                        param.append("destination_long", _this.drop_lg);
                        param.append("destination", _this.drop);
                        param.append("total", null);
                        param.append("is_cancelled", "0");
                        param.append("is_completed", "0");
                        param.append("is_paid", "0");
                        param.append("status", "0");
                        param.append("cost", _this.cost);
                        param.append("driver_id", '');
                        param.append("payment_method", _this.active);
                        param.append("type", "ride");
                        _this.data.bookingRequest(param).subscribe(function (result) {
                            console.log(result);
                            //this.userData = result; 
                            if (result.status == "ERROR" || result.status == "Error") {
                                _this.data.presentToast('Your wallet balance is low. Please select another payment method.');
                                _this.isnowenabled = true;
                                return false;
                            }
                            else {
                                //this.storage.set("customer_data",data.msg[0]);
                                _this.data.presentToast('Booking request send successfully!');
                                var param1_1 = new FormData();
                                param1_1.append("driver_id", _this.Did);
                                param1_1.append("customer_id", _this.customer_id);
                                param1_1.append("booking_id", result.success.booking_request.id);
                                param1_1.append("pick_up", 'now');
                                param1_1.append("source", _this.pick_up);
                                param1_1.append("customer", _this.customer_name);
                                _this.data.postNotification(param1_1).subscribe(function (result) {
                                    if (result.status == "ERROR") {
                                    }
                                });
                                var currentIndex_1 = _this.navCtrl.getActive().index;
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': result.success.booking_request.id, rideType: 'now', source: _this.pick_up, destination: _this.drop }).then(function () {
                                    _this.navCtrl.remove(currentIndex_1);
                                });
                                //this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.pick_up,destination:this.drop});
                            }
                        });
                    }
                }
                else {
                    _this.data.presentToast('Error');
                    _this.isnowenabled = true;
                    return false;
                }
            });
        }
        else {
            this.data.presentToast('Please select payment method');
            return false;
        }
    };
    RideNowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ride-now',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/ride-now/ride-now.html"*/'<!--\n  Generated template for the RideNowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Ride Now</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content overflow-scroll="true">\n  <div>\n    <ion-grid padding class="srcpt">\n      <ion-row class="addr_row">\n        <ion-col col-1 >\n          <ion-icon class="nav_icon" name="navigate"></ion-icon>\n        </ion-col>\n        <ion-col col-9 class="addr">\n          {{pick_up}}    \n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid padding class="srcpt">\n      <ion-row class="addr_row">\n        <ion-col col-1 >\n          <ion-icon name="pin"></ion-icon>\n        </ion-col>\n        <ion-col col-9 class="addr">\n          {{drop}}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid padding class="srcpt">\n      <ion-row class="addr_row">\n        <ion-col col-1 >\n          <ion-icon name="car"></ion-icon>    \n        </ion-col>\n        <ion-col col-9 class="addr">\n          {{vehicle_types}}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid padding class="moreInfo">\n      <ion-row>\n        <ion-col col-3 class="title_col">\n          Distance :\n        </ion-col>\n        <ion-col col-3 class="value_col">\n          {{distance}} \n        </ion-col>\n        <ion-col col-3 class="title_col">\n          Cost : \n        </ion-col>\n        <ion-col col-3 class="value_col">\n          ${{cost}}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n    <div class="paymentMethodDiv">\n      <!--<img src={{vehicle_img}} />-->\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <div class="innerDiv" [ngClass]="active === \'cash\' ? \'active_payment\' : \'\'" (click)="updateActive(\'cash\')">\n              <img class="list_item_icon" src="assets/imgs/notes.png"/>\n              <ion-label>Cash</ion-label>\n            </div>\n          </ion-col>\n          <ion-col col-4>\n            <div class="innerDiv" [ngClass]="active === \'card\' ? \'active_payment\' : \'\'" (click)="updateActive(\'card\')">\n              <img class="list_item_icon" src="assets/imgs/credit-card.png"/>\n              <ion-label>Card</ion-label>\n            </div>\n          </ion-col>\n          <ion-col col-4>\n            <div class="innerDiv" [ngClass]="active === \'wallet\' ? \'active_payment\' : \'\'" (click)="updateActive(\'wallet\')">\n              <img class="list_item_icon" src="assets/imgs/wallet.png"/>\n              <ion-label>Wallet</ion-label>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n\n  </div>\n  <!-- <button (click)=\'showAlert()\' class="login-btn" ion-button color="primary" block [disabled]="!isnowenabled" >Confirm Ride Request</button> -->\n</ion-content>\n<ion-footer class="cust-btn-div">\n  <!-- <ion-toolbar>\n    <ion-title>Footer</ion-title>\n  </ion-toolbar> -->\n  <button (click)=\'showAlert()\' ion-button color="primary" block [disabled]="!isnowenabled" >Confirm Ride Request</button>\n</ion-footer>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/ride-now/ride-now.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RideNowPage);
    return RideNowPage;
}());

//# sourceMappingURL=ride-now.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RideLaterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_geocoder__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RideLaterPage = /** @class */ (function () {
    function RideLaterPage(nativeGeocoder, platform, navCtrl, navParams, data, storage, alertCtrl) {
        var _this = this;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.isnowenabled = true;
        console.log('navParams.get(param)==>' + navParams.get('param'));
        this.data1 = navParams.get('param');
        this.distance = this.data1.distance;
        this.vehicle_type = this.data1.vehicle_type;
        this.pick_up = this.data1.pick_up;
        this.drop = this.data1.drop;
        this.cost = this.data1.cost;
        this.date = this.data1.date;
        this.time = this.data1.time;
        this.Did = this.data1.Did;
        this.active = '';
        if (this.vehicle_type == 'Economy') {
            this.vehicle_img = 'assets/imgs/img1111.png';
        }
        else if (this.vehicle_type == 'Comfort') {
            this.vehicle_img = 'assets/imgs/img1112.png';
        }
        else if (this.vehicle_type == 'Business') {
            this.vehicle_img = 'assets/imgs/img1113.png';
        }
        else {
            this.vehicle_img = 'assets/imgs/img1113.png';
        }
        var options = {
            useLocale: true,
            maxResults: 5
        };
        var addresses = [this.pick_up, this.drop];
        //var addresses = '';
        this.getLatLng(addresses).then(function (addressFull) {
            _this.pick_up_lt = addressFull[0];
            _this.pick_up_lg = addressFull[1];
            _this.drop_lt = addressFull[2];
            _this.drop_lg = addressFull[3];
        });
        this.storage.get('user').then(function (data) {
            _this.customer_id = data[0].id;
        });
    }
    RideLaterPage.prototype.getLatLng = function (addresses) {
        var addressFull = [];
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            addresses.forEach(function (value) {
                console.log(value);
                geocoder.geocode({ 'address': value }, function (results, status) {
                    if (status == 'OK') {
                        var address0 = results[0].geometry.location.lat();
                        var address1 = results[0].geometry.location.lng();
                        console.log(address0, address1);
                        addressFull.push(address0);
                        addressFull.push(address1);
                        if (addressFull.length > 3) {
                            resolve(addressFull);
                        }
                        //console.log(address);
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        });
    };
    RideLaterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RideLaterPage');
    };
    RideLaterPage.prototype.updateActive = function (name) {
        this.active = name;
    };
    RideLaterPage.prototype.showAlert = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm Booking Request!',
            message: 'Do you want to book a ride?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.confirmPayment();
                    }
                }
            ]
        });
        confirm.present();
    };
    RideLaterPage.prototype.confirmPayment = function () {
        var _this = this;
        if (this.active != '') {
            var param1 = new FormData();
            param1.append("customer_id", this.customer_id);
            this.data.getWalletAmount(param1).subscribe(function (result) {
                if (result.status == 'OK') {
                    if (parseFloat(result.success.balance) < 0) {
                        _this.data.presentToast("Your wallet balance is in minus, So you can't book Ride");
                    }
                    else {
                        _this.isnowenabled = false;
                        var temp = _this.distance.replace(",", "");
                        temp = temp.split(" ");
                        var param = new FormData();
                        var dateObj = new Date(_this.date + ' ' + _this.time);
                        //var date = new Date(dateObj).toISOString();
                        var date1 = new Date(dateObj).toDateString();
                        param.append("customer_id", _this.customer_id);
                        param.append("schedule", "0");
                        param.append("pickup_date", _this.date);
                        //param.append("schedule_time",date);
                        param.append("schedule_time", _this.date + ' ' + _this.time);
                        param.append("distance", temp[0]);
                        param.append("vehicle_type", _this.vehicle_type);
                        param.append("source", _this.pick_up);
                        param.append("source_lat", _this.pick_up_lt);
                        param.append("source_long", _this.pick_up_lg);
                        param.append("destination_lat", _this.drop_lt);
                        param.append("destination_long", _this.drop_lg);
                        param.append("destination", _this.drop);
                        param.append("total", null);
                        param.append("is_cancelled", "0");
                        param.append("is_completed", "0");
                        param.append("is_paid", "0");
                        param.append("status", "0");
                        param.append("cost", _this.cost);
                        param.append("driver_id", '');
                        param.append("type", "ride");
                        console.log("#######");
                        console.log(param);
                        console.log("#######");
                        _this.data.rideLaterbookingRequest(param).subscribe(function (result) {
                            console.log(result);
                            //this.userData = result; 
                            if (result.status == "ERROR") {
                                _this.data.presentToast('Error');
                                return false;
                            }
                            else {
                                /*let param1 = new FormData();
                                param1.append("driver_Id",this.Did);
                                param1.append("customer_id",this.customer_id);
                                param1.append("booking_id",result.success.booking_request.id);
                                param1.append("ride_type",'later');
              
                                this.data.postNotification(param1).subscribe(result=>{
                                  if(result.status == "ERROR")
                                  {
                                    
                                  }
                                });
                                //this.storage.set("customer_data",data.msg[0]);*/
                                _this.data.presentToast('Booking Request Successfull!');
                                setTimeout(function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                                }, 3000);
                                //this.navCtrl.setRoot(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'later'});
                            }
                        });
                    }
                }
            });
        }
        else {
            this.data.presentToast('Please select Payment method');
            return false;
        }
    };
    RideLaterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-ride-later',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/ride-later/ride-later.html"*/'<!--\n  Generated template for the RideLaterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Ride Later</ion-title>\n  </ion-navbar>  \n</ion-header>\n\n<ion-content overflow-scroll="true">\n    <div>\n      <ion-grid padding class="srcpt">\n        <ion-row class="addr_row">\n          <ion-col col-1 >\n            <ion-icon class="nav_icon" name="navigate"></ion-icon>\n          </ion-col>\n          <ion-col col-9 class="addr">\n            {{pick_up}}    \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n        \n      <ion-grid padding class="srcpt">\n        <ion-row class="addr_row">\n          <ion-col col-1 >\n            <ion-icon name="pin"></ion-icon>\n          </ion-col>\n          <ion-col col-9 class="addr">\n            {{drop}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <ion-grid padding class="srcpt">\n        <ion-row class="addr_row">\n          <ion-col col-1 >\n            <ion-icon name="car"></ion-icon>    \n          </ion-col>\n          <ion-col col-9 class="addr">\n            {{vehicle_type}}\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <ion-grid padding class="moreInfo">\n        <ion-row>\n          <ion-col col-3 class="title_col">\n            Distance :\n          </ion-col>\n          <ion-col col-3 class="value_col">\n            {{distance}} \n          </ion-col>\n          <ion-col col-3 class="title_col">\n            Cost : \n          </ion-col>\n          <ion-col col-3 class="value_col">\n            ${{cost}}\n          </ion-col>\n        </ion-row> \n      </ion-grid>\n  \n      <ion-grid class="warnMessage">\n        <ion-row>\n          <ion-col>\n            <span text-center wrap-word>\n              Driver information will be send to you 5 minutes before ride begins.\n            </span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <div class="paymentMethodDiv">\n         <!--<img src={{vehicle_img}} />-->\n        <ion-grid>\n          <ion-row>\n            <ion-col col-4>\n              <div class="innerDiv" [ngClass]="active === \'cash\' ? \'active_payment\' : \'\'" (click)="updateActive(\'cash\')">\n                <img class="list_item_icon" src="assets/imgs/notes.png"/>\n                <ion-label>Cash</ion-label>\n              </div>\n            </ion-col>\n            <ion-col col-4>\n              <div class="innerDiv" [ngClass]="active === \'card\' ? \'active_payment\' : \'\'" (click)="updateActive(\'card\')">\n                <img class="list_item_icon" src="assets/imgs/credit-card.png"/>\n                <ion-label>Card</ion-label>\n              </div>\n            </ion-col>\n            <ion-col col-4>\n              <div class="innerDiv" [ngClass]="active === \'wallet\' ? \'active_payment\' : \'\'" (click)="updateActive(\'wallet\')">\n                <img class="list_item_icon" src="assets/imgs/wallet.png"/>\n                <ion-label>Wallet</ion-label>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n    </div>\n    <!-- <button (click)=\'showAlert()\' class="login-btn" ion-button color="primary" block  [disabled]="!isnowenabled">Confirm Ride Request</button> -->\n  </ion-content>\n  <!-- <ion-footer>\n    \n  </ion-footer> -->\n  <ion-footer class="cust-btn-div">\n    <!-- <ion-toolbar>\n      <ion-title>Footer</ion-title>\n    </ion-toolbar> -->\n    <button (click)=\'showAlert()\' ion-button color="primary" block  [disabled]="!isnowenabled">Confirm Ride Request</button>\n  </ion-footer>\n \n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/ride-later/ride-later.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RideLaterPage);
    return RideLaterPage;
}());

//# sourceMappingURL=ride-later.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordResetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PasswordResetPage = /** @class */ (function () {
    function PasswordResetPage(navCtrl, navParams, data, loading, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.loading = loading;
        this.storage = storage;
        this.password = [];
        this.passwordType1 = 'password';
        this.passwordIcon1 = 'eye-off';
        this.passwordType2 = 'password';
        this.passwordIcon2 = 'eye-off';
        this.passwordType3 = 'password';
        this.passwordIcon3 = 'eye-off';
        this.change_pass = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            current_pass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)]),
            new_pass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)]),
            confirm_new_pass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)])
        });
    }
    PasswordResetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordResetPage');
    };
    PasswordResetPage.prototype.updatePassword = function (password) {
        //console.log(password['current_pass']);
        var _this = this;
        if (this.password['new_pass'] !== this.password['confirm_new_pass']) {
            this.data.presentToast('New Password and Confirm New Password must match!');
            return false;
        }
        else if (this.password['new_pass'] == this.password['current_pass']) {
            this.data.presentToast('Old Password and New Password are same.');
            return false;
        }
        this.storage.get('user').then(function (data) {
            //console.log(data); 
            //let param = new FormData();
            _this.customer_id = data[0].id;
            var param = new FormData();
            if (data[0].role == 2) {
                param.append("customer_id", _this.customer_id);
            }
            else if (data[0].role == 3) {
                param.append("driver_id", _this.customer_id);
            }
            param.append("current_password", _this.password['current_pass']);
            param.append("password", _this.password['confirm_new_pass']);
            param.append("c_password", _this.password['confirm_new_pass']);
            var loader = _this.loading.create({
                content: "Please wait...",
                spinner: 'crescent'
            });
            loader.present();
            if (data[0].role == 2) {
                _this.data.custChangePass(param).subscribe(function (result) {
                    //console.log(result);    
                    //this.userData = result; 
                    loader.dismiss();
                    if (result.status == "ERROR") {
                        _this.data.presentToast(result.error.password);
                        return false;
                    }
                    else {
                        //this.storage.set("customer_data",data.msg[0]);
                        _this.data.presentToast('Password changed  successfully!');
                        setTimeout(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                        }, 3000);
                    }
                });
            }
            else if (data[0].role == 3) {
                _this.data.driverChangePass(param).subscribe(function (result) {
                    //console.log(result);    
                    //this.userData = result; 
                    loader.dismiss();
                    if (result.status == "ERROR") {
                        _this.data.presentToast(result.error.password);
                        return false;
                    }
                    else {
                        //this.storage.set("customer_data",data.msg[0]);
                        _this.data.presentToast('Password Changed successfully!');
                        setTimeout(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                        }, 3000);
                    }
                });
            }
        });
    };
    PasswordResetPage.prototype.hideShowPassword = function (type) {
        if (type == 0) {
            this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
            this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
        }
        else if (type == 1) {
            this.passwordType2 = this.passwordType2 === 'text' ? 'password' : 'text';
            this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
        }
        else {
            this.passwordType3 = this.passwordType3 === 'text' ? 'password' : 'text';
            this.passwordIcon3 = this.passwordIcon3 === 'eye-off' ? 'eye' : 'eye-off';
        }
    };
    PasswordResetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-password-reset',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/password-reset/password-reset.html"*/'<!--\n  Generated template for the PasswordResetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="sideMenu">\n    <ion-title> Change Password </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="head_container" text-center >\n    <div class="first_key">\n        <img src="assets/imgs/key.png" />\n    </div>\n    <div class="second_key">\n        <img src="assets/imgs/key.png" />\n    </div>\n  </div>\n\n  <form class="updatepass_form" [formGroup]="change_pass"> \n    <ion-list>\n      <ion-item>\n        <ion-label floating>Current Password</ion-label>\n        <ion-input [(ngModel)]="password.current_pass" [type]="passwordType1" minlength="6" formControlName="current_pass" [class.invalid]="!change_pass.valid && (change_pass.controls.current_pass.dirty || submitAttempt)" ></ion-input>\n        <ion-icon item-end [name]="passwordIcon1" class="passwordIcon" (click)=\'hideShowPassword(0)\' style="height:32px;"></ion-icon>\n      </ion-item>\n      <div class="error" *ngIf="change_pass.get(\'current_pass\').hasError(\'required\')  && change_pass.get(\'current_pass\').touched">\n          Please fill out this field\n      </div>\n      <div class="error" *ngIf="change_pass.get(\'current_pass\').hasError(\'minlength\')  && change_pass.get(\'current_pass\').touched">\n          Minimum Length of password must be 6\n      </div>\n\n      <ion-item>\n        <ion-label floating>New Password</ion-label>\n        <ion-input [(ngModel)]="password.new_pass" [type]="passwordType2"minlength="6" formControlName="new_pass" [class.invalid]="!change_pass.valid && (change_pass.controls.new_pass.dirty || submitAttempt)" ></ion-input>\n        <ion-icon item-end [name]="passwordIcon2" class="passwordIcon" (click)=\'hideShowPassword(1)\' style="height:32px;"></ion-icon>\n      </ion-item>\n      <div class="error" *ngIf="change_pass.get(\'new_pass\').hasError(\'required\')  && change_pass.get(\'new_pass\').touched">\n          Please fill out this field\n      </div>\n      <div class="error" *ngIf="change_pass.get(\'new_pass\').hasError(\'minlength\')  && change_pass.get(\'new_pass\').touched">\n          Minimum Length of password must be 6\n      </div>\n\n      <ion-item>\n        <ion-label floating>Confirm New Password</ion-label>\n        <ion-input [(ngModel)]="password.confirm_new_pass" [type]="passwordType3"minlength="6" formControlName="confirm_new_pass" [class.invalid]="!change_pass.valid && (change_pass.controls.confirm_new_pass.dirty || submitAttempt)" ></ion-input>\n        <ion-icon item-end [name]="passwordIcon3" class="passwordIcon" (click)=\'hideShowPassword(2)\' style="height:32px;"></ion-icon>\n      </ion-item>\n      <div class="error" *ngIf="change_pass.get(\'confirm_new_pass\').hasError(\'required\')  && change_pass.get(\'confirm_new_pass\').touched">\n          Please fill out this field\n      </div>\n      <div class="error" *ngIf="change_pass.get(\'confirm_new_pass\').hasError(\'minlength\')  && change_pass.get(\'confirm_new_pass\').touched">\n          Minimum Length of password must be 6\n      </div>\n\n\n      <ion-item class="submit_btn_item">\n        <button class="login-btn" ion-button color="primary" block [disabled]="!this.change_pass.valid"  (click)="updatePassword(password)">Submit</button>\n      </ion-item>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/password-reset/password-reset.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], PasswordResetPage);
    return PasswordResetPage;
}());

//# sourceMappingURL=password-reset.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(navCtrl, navParams, data, storage, loading, modalCtrl, event, alertCtrl, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.loading = loading;
        this.modalCtrl = modalCtrl;
        this.event = event;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.user_details = {};
        this.social_media = [];
        this.prev_social_media = [];
        this.profile = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            fname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[a-zA-Z ]*')]),
            lname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[a-zA-Z ]*')]),
            //email: new FormControl('', [Validators.required,Validators.email]),
            phone: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(10)]),
            address: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])
        });
        this.Dprofile = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            fname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            lname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            //email: new FormControl('', [Validators.required,Validators.email]),
            phone: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(10)]),
            address: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]({ value: '', disabled: true }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            vehicle_type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            vehicle_no: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])
        });
        this.storage.get('user').then(function (data) {
            _this.cust_id = data[0].id;
            var param = data[0].id;
            _this.role = data[0].role;
            if (data[0].role == 2) {
                _this.storage.get('token').then(function (token) {
                    _this.service.presentLoader("Please wait...");
                    _this.data.getCustomerProfile(token).subscribe(function (result) {
                        if (result.status == 'OK') {
                            //console.log(result.success.profile[0].first_name);
                            _this.user_details.fname = result.success.profile.first_name;
                            _this.user_details.lname = result.success.profile.last_name;
                            //this.user_details.email = result.success.profile[0].email;
                            _this.user_details.phone = result.success.profile.customer_details.phone;
                            _this.user_details.address = result.success.profile.customer_details.address;
                            //this.user_details.avatar = result.success.profile[0].profile;
                            _this.prev_social_media['facebook'] = result.success.profile.customer_details.facebook_profile == null ? '' : result.success.profile.customer_details.facebook_profile;
                            _this.prev_social_media['twitter'] = result.success.profile.customer_details.twitter_profile == null ? '' : result.success.profile.customer_details.twitter_profile;
                            _this.prev_social_media['instagram'] = result.success.profile.customer_details.instagram_profile == null ? '' : result.success.profile.customer_details.instagram_profile;
                            _this.prev_social_media['linkedin'] = result.success.profile.customer_details.linkedin_profile == null ? '' : result.success.profile.customer_details.linkedin_profile;
                            _this.social_media = _this.prev_social_media;
                            _this.service.dismissLoader();
                        }
                        else {
                            _this.service.dismissLoader();
                        }
                    }, function (err) {
                        _this.service.dismissLoader();
                    });
                });
            }
            else if (data[0].role == 3) {
                _this.data.getRideVehicleTypes().subscribe(function (result) {
                    if (result.status == 'OK') {
                        _this.vehicle_types = result.success;
                    }
                    else {
                        _this.data.presentToast(result.status);
                    }
                });
                _this.data.getDeliveryVehicleTypes().subscribe(function (result) {
                    if (result.status == 'OK') {
                        _this.delivery_vehicle_types = result.success;
                    }
                    else {
                        _this.data.presentToast(result.status);
                    }
                });
                _this.storage.get('token').then(function (token) {
                    _this.service.presentLoader("Please wait...");
                    _this.data.getDriverProfile(token).subscribe(function (result) {
                        if (result.status == 'OK') {
                            //console.log(result.success.profile[0].first_name);
                            _this.user_details.fname = result.success.profile.first_name;
                            _this.user_details.lname = result.success.profile.last_name;
                            //this.user_details.email = result.success.profile[0].email;
                            _this.user_details.phone = result.success.profile.driver_details.phone;
                            _this.user_details.address = result.success.profile.driver_details.address;
                            _this.user_details.type = result.success.profile.driver_details.type;
                            if (_this.user_details.type == 'ride') {
                                _this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.id;
                            }
                            else {
                                //this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicle.id;
                                _this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicles.id;
                            }
                            _this.user_details.vehicle_no = result.success.profile.driver_details.vehicle_number;
                            _this.prev_social_media['facebook'] = result.success.profile.driver_details.facebook_profile == null ? '' : result.success.profile.driver_details.facebook_profile;
                            _this.prev_social_media['twitter'] = result.success.profile.driver_details.twitter_profile == null ? '' : result.success.profile.driver_details.twitter_profile;
                            _this.prev_social_media['instagram'] = result.success.profile.driver_details.instagram_profile == null ? '' : result.success.profile.driver_details.instagram_profile;
                            _this.prev_social_media['linkedin'] = result.success.profile.driver_details.linkedin_profile == null ? '' : result.success.profile.driver_details.linkedin_profile;
                            _this.social_media = _this.prev_social_media;
                            _this.service.dismissLoader();
                        }
                        else {
                            _this.service.dismissLoader();
                        }
                    }, function (err) {
                        _this.service.dismissLoader();
                    });
                });
            }
        });
    }
    EditProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditProfilePage');
    };
    EditProfilePage.prototype.ProfileForm = function (profile) {
        var _this = this;
        var phoneno = /^\d{10}$/;
        if (!profile.phone.match(phoneno)) {
            this.data.presentToast('Please enter valid phone number.');
            return false;
        }
        var param = new FormData();
        if (this.role == 2) {
            param.append("customer_id", this.cust_id);
        }
        else if (this.role == 3) {
            param.append("driver_id", this.cust_id);
            param.append("vehicle_type", profile.vehicle_type);
            param.append("vehicle_number", profile.vehicle_no);
            param.append("is_completed", '1');
        }
        param.append("first_name", profile.fname);
        param.append("last_name", profile.lname);
        //param.append("email",profile.email);
        param.append("phone", profile.phone);
        param.append("address", profile.address);
        //param.append("profile",profile.avatar);
        //if(this.social_media['facebook'] || this.social_media['twitter'] || this.social_media['linkedin'] || this.social_media['instagram'])
        //{
        //  alert(this.social_media['instagram']);
        param.append("facebook_profile", this.social_media['facebook']);
        param.append("twitter_profile", this.social_media['twitter']);
        param.append("linkedin_profile", this.social_media['linkedin']);
        param.append("instagram_profile", this.social_media['instagram']);
        //}
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        if (this.role == 2) {
            this.data.updateCustomerProfile(param).subscribe(function (result) {
                //console.log(result);    
                //this.userData = result; 
                loader.dismiss();
                if (result.status == "ERROR") {
                    var msg = '';
                    var count = 0;
                    for (var i in result['error']) {
                        console.log(i);
                        for (var j in result['error'][i]) {
                            console.log(j);
                            console.log(result['error'][i][j]);
                            count++;
                            msg = msg + "<br>" + count + "." + result['error'][i][j] + "<br>";
                        }
                    }
                    _this.showAlert(msg);
                    return false;
                }
                else {
                    //this.storage.set("customer_data",data.msg[0]);
                    _this.event.publish('name_changed', profile.fname, profile.lname);
                    _this.data.presentToast('Profile Updated Successfully!');
                    setTimeout(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                    }, 3000);
                }
            });
        }
        else if (this.role == 3) {
            this.data.updateDriverProfile(param).subscribe(function (result) {
                //console.log(result);    
                //this.userData = result; 
                loader.dismiss();
                if (result.status == "ERROR") {
                    // this.data.presentToast(result.error.email);     
                    // this.storage.set('isProfile_Complete', false);
                    // return false;
                    var msg = '';
                    var count = 0;
                    for (var i in result['error']) {
                        console.log(i);
                        for (var j in result['error'][i]) {
                            console.log(j);
                            console.log(result['error'][i][j]);
                            count++;
                            msg = msg + "<br>" + count + "." + result['error'][i][j] + "<br>";
                        }
                    }
                    _this.showAlert(msg);
                    return false;
                }
                else {
                    //this.storage.set("customer_data",data.msg[0]);
                    _this.event.publish('name_changed', profile.fname, profile.lname);
                    _this.data.presentToast('Profile Updated Successfully!');
                    _this.storage.set('isProfile_Complete', true);
                    //this.navCtrl.setRoot(HomePage);
                    setTimeout(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                    }, 3000);
                }
            });
        }
    };
    EditProfilePage.prototype.addSocialLink = function (account) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'addSocialaccount', social_media: this.social_media });
        var me = this;
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                _this.social_media = data;
            }
            else {
                //this.selectdId = '';        
            }
        });
        modal.present();
        //this.navCtrl.setRoot(SigninPage); 
    };
    EditProfilePage.prototype.showAlert = function (err_data) {
        var alert = this.alertCtrl.create({
            subTitle: err_data,
            cssClass: 'my-alert',
            buttons: ['OK']
        });
        alert.present();
    };
    EditProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-edit-profile',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/edit-profile/edit-profile.html"*/'<!--\n  Generated template for the EditProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!--<button ion-button menuToggle >\n        <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>-->\n    <ion-title>Edit Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n         \n<ion-content >\n  <form  *ngIf=\'role == 2\' class="profile_form" [formGroup]="profile" (ngSubmit)="ProfileForm(user_details)"> \n    <ion-list>\n \n    <ion-item>\n        <ion-label stacked>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="user_details.fname" value="{{user_details.fname}}" formControlName="fname" [class.invalid]="!profile.valid && (profile.controls.fname.dirty || submitAttempt)" ></ion-input>\n      </ion-item>\n      <div class="error" *ngIf="profile.get(\'fname\').hasError(\'required\')  && profile.get(\'fname\').touched">\n          Please fill out this field\n      </div>\n      <div class="error" *ngIf="profile.get(\'fname\').hasError(\'pattern\') && !profile.get(\'fname\').hasError(\'required\')  ">\n        Please enter valid first name\n      </div>\n        \n      <ion-item>\n      <ion-label stacked>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="user_details.lname" formControlName="lname" [class.invalid]="!profile.valid && (profile.controls.lname.dirty || submitAttempt)"  ></ion-input>\n      </ion-item>\n      <div class="error" *ngIf="profile.get(\'lname\').hasError(\'required\')  && profile.get(\'lname\').touched">\n          Please fill out this field\n      </div>\n      <div class="error" *ngIf="profile.get(\'lname\').hasError(\'pattern\') && !profile.get(\'lname\').hasError(\'required\') ">\n        Please enter valid last name\n      </div>\n\n      <ion-item>\n          <ion-label stacked>Phone No.</ion-label>\n          <ion-input type="tel" [(ngModel)]="user_details.phone" maxlength="10" formControlName="phone" [class.invalid]="!profile.valid && (profile.controls.phone.dirty || submitAttempt)"  ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="profile.get(\'phone\').hasError(\'required\')  && profile.get(\'phone\').touched">\n            Please fill out this field\n        </div>\n        <div class="error" *ngIf="profile.get(\'phone\').hasError(\'maxlength\') || profile.get(\'phone\').hasError(\'minlength\')">\n            Phone number must be 10 digits.    \n        </div>\n\n      <ion-item>\n          <ion-label stacked>Address</ion-label>\n          <ion-input type="text" [(ngModel)]="user_details.address" formControlName="address" [class.invalid]="!profile.valid && (profile.controls.address.dirty || submitAttempt)"  ></ion-input>\n          </ion-item>\n          <div class="error" *ngIf="profile.get(\'address\').hasError(\'required\')  && profile.get(\'address\').touched">\n               Please fill out this field\n          </div>\n\n        <ion-list class="social_list">\n            <ion-item ion-item class="social_icons" no-lines (click)="addSocialLink()" > \n                <!-- <span class="add_social_link">Add Social Media Account Links</span> -->\n                <ion-label text-center *ngIf=" social_media[\'facebook\'] == \'\' && social_media[\'twitter\'] == \'\' && social_media[\'linkedin\'] == \'\' && social_media[\'instagram\'] == \'\' ? true : false ">Add Social Media Account Links</ion-label>\n\n                <ion-label text-center *ngIf=" social_media[\'facebook\'] != \'\' || social_media[\'twitter\'] != \'\' || social_media[\'linkedin\'] != \'\' || social_media[\'instagram\'] != \'\' ? true : false ">Update Social Media Account Links</ion-label>\n\n            </ion-item>\n        </ion-list>\n\n      <ion-item class="submit_btn_item">\n          <button class="profile-btn" ion-button color="primary" block [disabled]="!this.profile.valid">Update</button>\n      </ion-item>\n\n    </ion-list>\n  </form>\n\n\n  <form  *ngIf=\'role == 3\' class="profile_form" [formGroup]="Dprofile" (ngSubmit)="ProfileForm(user_details)"> \n    <ion-list>\n \n    <ion-item>\n        <ion-label stacked>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="user_details.fname" value="{{user_details.fname}}" formControlName="fname" [class.invalid]="!Dprofile.valid && (Dprofile.controls.fname.dirty || submitAttempt)" ></ion-input>\n      </ion-item>\n      <div class="error" *ngIf="Dprofile.get(\'fname\').hasError(\'required\')  && Dprofile.get(\'fname\').touched">\n          Please fill out this field\n      </div>\n        \n      <ion-item>\n      <ion-label stacked>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="user_details.lname" formControlName="lname" [class.invalid]="!Dprofile.valid && (Dprofile.controls.lname.dirty || submitAttempt)"  ></ion-input>\n      </ion-item>\n      <div class="error" *ngIf="Dprofile.get(\'lname\').hasError(\'required\')  && Dprofile.get(\'lname\').touched">\n          Please fill out this field\n      </div>\n\n      <ion-item>\n          <ion-label stacked>Phone No.</ion-label>\n          <ion-input type="text" [(ngModel)]="user_details.phone" formControlName="phone" [class.invalid]="!Dprofile.valid && (Dprofile.controls.phone.dirty || submitAttempt)"  ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="Dprofile.get(\'phone\').hasError(\'required\')  && Dprofile.get(\'phone\').touched">\n            Please fill out this field\n        </div>\n        <!--<div class="error" *ngIf="profile.get(\'phone\').hasError(\'required\') && profile.get(\'phone\').touched && profile.get(\'phone\').pattern">\n            Please fill out valid phone\n        </div>-->\n\n        <ion-item>\n          <ion-label stacked>Address</ion-label>\n          <ion-input type="text" [(ngModel)]="user_details.address" formControlName="address" [class.invalid]="!Dprofile.valid && (Dprofile.controls.address.dirty || submitAttempt)"  ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="Dprofile.get(\'address\').hasError(\'required\')  && Dprofile.get(\'address\').touched">\n            Please fill out this field\n        </div>\n   \n        <ion-item>\n            <ion-label stacked></ion-label>\n            <ion-input type="text" class="txt-capt" [(ngModel)]="user_details.type" formControlName="type" [class.invalid]="!Dprofile.valid && (Dprofile.controls.type.dirty || submitAttempt)"></ion-input>\n        </ion-item>\n\n        <ion-item *ngIf="user_details.type == \'ride\'">\n            <ion-label stacked></ion-label>\n            <ion-select placeholder="Vehicle Type" class="txt-capt"  [(ngModel)]="user_details.vehicle_type" formControlName="vehicle_type" [class.invalid]="!Dprofile.valid && (Dprofile.controls.vehicle_type.dirty || submitAttempt)"  >\n                <ion-option *ngFor="let types of vehicle_types" value="{{types.id}}">{{types.type}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <div class="error" *ngIf="Dprofile.get(\'vehicle_type\').hasError(\'required\')  && Dprofile.get(\'vehicle_type\').touched">\n            Please fill out this field\n        </div>\n        \n        <ion-item *ngIf="user_details.type == \'delivery\'">\n            <ion-label stacked></ion-label>\n            <ion-select placeholder="Vehicle Type" class="txt-capt"  [(ngModel)]="user_details.vehicle_type" formControlName="vehicle_type" [class.invalid]="!Dprofile.valid && (Dprofile.controls.vehicle_type.dirty || submitAttempt)"  >\n                <ion-option *ngFor="let types of delivery_vehicle_types" value="{{types.id}}">{{types.vehicle_name}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <div class="error" *ngIf="Dprofile.get(\'vehicle_type\').hasError(\'required\')  && Dprofile.get(\'vehicle_type\').touched">\n            Please fill out this field\n        </div>\n\n        <ion-item>\n            <ion-label stacked>Vehicle No.</ion-label>\n            <ion-input type="text" [(ngModel)]="user_details.vehicle_no" formControlName="vehicle_no" [class.invalid]="!Dprofile.valid && (Dprofile.controls.vehicle_no.dirty || submitAttempt)"  ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="Dprofile.get(\'vehicle_no\').hasError(\'required\')  && Dprofile.get(\'vehicle_no\').touched">\n            Please fill out this field\n        </div>\n\n        <ion-list class="social_list">\n            <ion-item ion-item class="social_icons" no-lines (click)="addSocialLink()" > \n                <!-- <span class="add_social_link">Add Social Media Account Links</span> -->\n                <ion-label text-center>Update Social Media Account Links</ion-label>\n            </ion-item>\n        </ion-list>\n\n      <ion-item class="submit_btn_item">\n          <button class="profile-btn" ion-button color="primary" block [disabled]="!this.Dprofile.valid">Update</button>\n      </ion-item>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/edit-profile/edit-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_service_service__["a" /* ServiceProvider */]])
    ], EditProfilePage);
    return EditProfilePage;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__emailverification_emailverification__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, service, data, loading, menu) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.data = data;
        this.loading = loading;
        this.menu = menu;
        this.role = 2;
        this.type = '';
        this.vehicle_type = '';
        this.vehicle_types = '';
        this.delivery_vehicle_types = '';
        this.userData = {};
        this.signup = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            fname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[a-zA-Z ]*')]),
            lname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[a-zA-Z ]*')]),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6)]),
            c_password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            role: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', []),
            vehicle_type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', []),
        });
        this.data.getRoles().subscribe(function (result) {
            if (result.status == 'OK') {
                console.log(result.success.roles);
                _this.roles = result.success.roles;
            }
            else {
                _this.data.presentToast(result.status);
            }
        });
        this.data.getRideVehicleTypes().subscribe(function (result) {
            if (result.status == 'OK') {
                _this.vehicle_types = result.success;
            }
            else {
                _this.data.presentToast(result.status);
            }
        });
        this.data.getDeliveryVehicleTypes().subscribe(function (result) {
            if (result.status == 'OK') {
                _this.delivery_vehicle_types = result.success;
            }
            else {
                _this.data.presentToast(result.status);
            }
        });
    }
    SignupPage.prototype.ionViewCanLeave = function () {
        this.menu.swipeEnable(true);
    };
    SignupPage.prototype.ionViewWillEnter = function () {
        this.menu.swipeEnable(false);
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.SignupForm = function () {
        var _this = this;
        console.log(this.fname);
        /*let param = JSON.stringify({"first_name":"test", "last_name":"test",
      "role":1,"password":"1234","c_password":"1234","email":"abc@gmail.com"});*/
        if (this.password !== this.c_password) {
            this.data.presentToast('Password and Confirm Password must match!');
            return false;
        }
        if (this.validate()) {
            var param = new FormData();
            param.append("first_name", this.fname);
            param.append("last_name", this.lname);
            param.append("email", this.email);
            param.append("password", this.password);
            param.append("role", this.role);
            param.append("c_password", this.c_password);
            param.append("type", this.type);
            param.append("vehicle_type", this.vehicle_type);
            var loader_1 = this.loading.create({
                content: "Please wait...",
                spinner: 'crescent'
            });
            loader_1.present();
            this.data.userSignUp(param).subscribe(function (result) {
                console.log(result);
                loader_1.dismiss();
                if (result.status == "ERROR") {
                    _this.data.presentToast(result.error.email);
                    return false;
                }
                else {
                    var currentIndex_1 = _this.navCtrl.getActive().index;
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__emailverification_emailverification__["a" /* EmailverificationPage */], { first_name: _this.fname, last_name: _this.lname, email: _this.email }).then(function () {
                        _this.navCtrl.remove(currentIndex_1);
                    });
                }
            }, function (err) {
                loader_1.dismiss();
                _this.data.presentToast("Network error");
            });
        }
    };
    SignupPage.prototype.validate = function () {
        var result = true;
        if (this.role == 3) {
            if (this.type == '') {
                this.service.validator('Type field is required');
                result = false;
            }
            else if (this.vehicle_type == '') {
                this.service.validator('Vehicle Type field is required');
                result = false;
            }
        }
        return result;
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar align-title="center" color="primary">\n    <ion-title>\n	    <h2>Sign Up</h2>\n	</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-content padding>\n\n  <div class="login-container">\n  	<ion-icon name="close" navPop></ion-icon>\n  	<div class="title_div">\n      <!-- <h2 class="head_title">TFH</h2> -->\n      <h2 class="sub_title">Sign Up</h2>\n    </div>\n    <!-- Sign up form-->\n    <form class="sign_up_form" [formGroup]="signup" (ngSubmit)="SignupForm()"> \n      <ion-list no-lines>\n      	<ion-item>\n          <ion-label stacked>First Name</ion-label>\n          <ion-input type="text" [(ngModel)]="fname" formControlName="fname" [class.invalid]="!signup.valid && (signup.controls.fname.dirty || submitAttempt)" ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'fname\').hasError(\'required\')  && signup.get(\'fname\').touched">\n            Please fill out this field\n        </div>\n        <div class="error" *ngIf="signup.get(\'fname\').hasError(\'pattern\') && !signup.get(\'fname\').hasError(\'required\')  && signup.get(\'fname\').touched">\n            Please enter valid Firstname\n        </div>\n\n        <ion-item>\n          <ion-label stacked>Last Name</ion-label>\n          <ion-input type="text" [(ngModel)]="lname" formControlName="lname" [class.invalid]="!signup.valid && (signup.controls.lname.dirty || submitAttempt)" ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'lname\').hasError(\'required\')  && signup.get(\'lname\').touched">\n            Please fill out this field\n        </div>\n        <div class="error" *ngIf="signup.get(\'lname\').hasError(\'pattern\') && !signup.get(\'lname\').hasError(\'required\')  && signup.get(\'lname\').touched">\n            Please enter valid Lastname\n        </div>\n\n        <ion-item>\n          <ion-label stacked>Email</ion-label>\n          <ion-input type="email" [(ngModel)]="email" formControlName="email" [class.invalid]="!signup.valid && (signup.controls.email.dirty || submitAttempt)" ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'email\').hasError(\'required\') && signup.get(\'email\').touched">\n            Please fill out this field.\n        </div>\n            \n        <div class="error" *ngIf="!signup.get(\'email\').hasError(\'required\') && (signup.get(\'email\').hasError(\'email\') && signup.get(\'email\').dirty )">\n            Please enter valid Email address\n        </div>\n\n        <ion-item>\n            <ion-label stacked>Password</ion-label>\n            <ion-input type="password" [(ngModel)]="password" minlength="6" formControlName="password" [class.invalid]="!signup.valid && (signup.controls.password.dirty || submitAttempt)"  ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'password\').hasError(\'required\')  && signup.get(\'password\').touched">\n            Please fill out this field\n        </div>\n        <div class="error" *ngIf="signup.get(\'password\').hasError(\'minlength\')  && signup.get(\'password\').touched">\n            Minimum Length of password must be 6\n        </div>\n\n        <ion-item>\n          <ion-label stacked>Confirm Password</ion-label>\n          <ion-input type="password" [(ngModel)]="c_password" formControlName="c_password" [class.invalid]="!signup.valid && (signup.controls.c_password.dirty || submitAttempt)" ></ion-input>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'c_password\').hasError(\'required\') && signup.get(\'c_password\').hasError(\'mismatchedPasswords\') && signup.get(\'c_password\').touched">\n            Please fill out this field\n        </div>\n\n        <ion-item>\n            <ion-label stacked></ion-label>\n            <ion-select placeholder="Role"  [(ngModel)]="role" formControlName="role" [class.invalid]="!signup.valid && (signup.controls.role.dirty || submitAttempt)"  >\n                <ion-option *ngFor="let role of roles" value="{{role.id}}">{{role.name}}</ion-option>\n                <!--<ion-option value="2">Customer</ion-option>\n                <ion-option value="3">Driver</ion-option>-->\n            </ion-select>\n        </ion-item>\n        <div class="error" *ngIf="signup.get(\'role\').hasError(\'required\')  && signup.get(\'role\').touched">\n            Please fill out this field\n        </div>\n\n        <ion-list  *ngIf="role == 3" radio-group [(ngModel)]="type" formControlName="type">\n            <div class="alg1">\n                <ion-card-header>\n                    Type\n                </ion-card-header>\n            </div>\n                            \n            <div class="alg2">\n                <ion-item>\n                    <ion-label>Ride</ion-label>\n                    <ion-radio value="ride" checked="true" ></ion-radio>\n                </ion-item>\n                            \n                <ion-item>\n                    <ion-label>Delivery</ion-label>\n                    <ion-radio value="delivery"></ion-radio>\n                </ion-item>\n            </div>\n        </ion-list>\n\n        <ion-item *ngIf="role == 3 && type == \'ride\'">\n                <ion-label stacked></ion-label>\n                <ion-select placeholder="Vehicle Type"  [(ngModel)]="vehicle_type" formControlName="vehicle_type" [class.invalid]="!signup.valid && (signup.controls.vehicle_type.dirty || submitAttempt)"  >\n                    <ion-option *ngFor="let types of vehicle_types" value="{{types.id}}">{{types.type}}</ion-option>\n                </ion-select>\n            </ion-item>\n    \n            <ion-item *ngIf="role == 3 && type == \'delivery\'">\n                <ion-label stacked></ion-label>\n                <ion-select placeholder="Vehicle Type"  [(ngModel)]="vehicle_type" formControlName="vehicle_type" [class.invalid]="!signup.valid && (signup.controls.vehicle_type.dirty || submitAttempt)"  >\n                    <ion-option *ngFor="let types of delivery_vehicle_types" value="{{types.id}}">{{types.vehicle_name}}</ion-option>\n                </ion-select>\n            </ion-item>\n\n        <ion-item class="submit_btn_item">\n            <button class="sign_up-btn" ion-button color="primary" block [disabled]="!this.signup.valid">Get Started</button>\n        </ion-item>\n \n      </ion-list>  \n    </form>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_service_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswoedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ForgotpasswoedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotpasswoedPage = /** @class */ (function () {
    function ForgotpasswoedPage(navCtrl, navParams, data, loading, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.loading = loading;
        this.menu = menu;
        this.forgetpass = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]),
        });
    }
    ForgotpasswoedPage.prototype.ionViewCanLeave = function () {
        this.menu.swipeEnable(true);
    };
    ForgotpasswoedPage.prototype.ionViewWillEnter = function () {
        this.menu.swipeEnable(false);
    };
    ForgotpasswoedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotpasswoedPage');
    };
    ForgotpasswoedPage.prototype.forgotpass = function (email) {
        var _this = this;
        var param = new FormData();
        param.append("email", email);
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.data.forgotPass(param).subscribe(function (result) {
            // console.log(result);  
            loader.dismiss();
            console.log(result);
            if (result.status == "ERROR") {
                _this.data.presentToast(result.error.email);
            }
            else {
                _this.data.presentToast('Password reset instructions are sent to your email');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
            }
        }, function (err) {
            loader.dismiss();
            _this.data.presentToast("Something went wrong");
        });
    };
    ForgotpasswoedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-forgotpasswoed',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/forgotpasswoed/forgotpasswoed.html"*/'<!--\n  Generated template for the ForgotpasswoedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div class="forgetPass-img" text-center>\n    <img src="../../assets/imgs/logotransperent.png" />\n  </div>\n  <form text-center [formGroup]="forgetpass">      \n    <h2>Forgot your password?</h2>\n    <p>Enter your Email below to receive your password reset instructions</p>\n    <input type="email" placeholder="Email Address" [(ngModel)]="email" formControlName="email" [class.invalid]="!forgetpass.valid && (forgetpass.controls.email.dirty || submitAttempt)" >\n    \n    <div class="error" *ngIf="forgetpass.get(\'email\').hasError(\'required\') && forgetpass.get(\'email\').touched">\n      Please fill out this field.\n    </div>\n        \n    <div class="error" *ngIf="!forgetpass.get(\'email\').hasError(\'required\') && (forgetpass.get(\'email\').hasError(\'email\') && forgetpass.get(\'email\').dirty )">\n        Please enter valid Email address\n    </div>\n\n    <button class="login-btn" ion-button color="primary" block  (click)="forgotpass(email)" [disabled]="!this.forgetpass.valid">Send</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/forgotpasswoed/forgotpasswoed.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], ForgotpasswoedPage);
    return ForgotpasswoedPage;
}());

//# sourceMappingURL=forgotpasswoed.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverTransactionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DriverTransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DriverTransactionsPage = /** @class */ (function () {
    function DriverTransactionsPage(navCtrl, loading, navParams, data, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.page = 1;
        this.offset = 0;
        this.transactions = [];
        this.noTransaction = false;
        this.loadinCtrl = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        this.loadinCtrl.present();
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
        });
    }
    DriverTransactionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DriverTransactionsPage');
    };
    DriverTransactionsPage.prototype.ionViewDidEnter = function () {
        this.loadTransactions();
    };
    DriverTransactionsPage.prototype.loadTransactions = function (infiniteScroll) {
        var _this = this;
        this.storage.get('user').then(function (data) {
            var param = new FormData();
            param.append("driver_id", data[0].id);
            param.append("offset", _this.offset);
            _this.data.getDriverTransactions(param, _this.page).subscribe(function (result) {
                if (result.status == "OK") {
                    console.log("result.success.Transaction ");
                    console.log(result.success.Transaction);
                    if (result.success.Transaction == null || result.success.Transaction == "") {
                        _this.loadinCtrl.dismiss();
                        if (_this.transactions == null || _this.transactions.length == 0) {
                            _this.noTransaction = true;
                        }
                        _this.data.presentToast('There is no more data available');
                        return false;
                    }
                    else {
                        _this.loadinCtrl.dismiss();
                        _this.transactions = _this.transactions.concat(result.success.Transaction);
                        _this.offset = result.offset;
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                    }
                }
            });
        });
    };
    DriverTransactionsPage.prototype.loadMore = function (infiniteScroll) {
        this.page++;
        this.loadTransactions(infiniteScroll);
        if (this.page === this.maximumPages) {
            infiniteScroll.enable(false);
        }
    };
    DriverTransactionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-driver-transactions',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/driver-transactions/driver-transactions.html"*/'<!--\n  Generated template for the DriverTransactionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Transactions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <ion-list>\n      <ion-item class="list_item" *ngFor="let item of transactions">\n          <div>\n            <ion-grid>\n              <ion-row>\n                <ion-col col-2>\n                  <div class="c_icon_div">\n                    <img *ngIf="item.payment_method == \'wallets\'" class="list_item_icon" src="assets/imgs/wallet.png"/>\n                    <img *ngIf="item.payment_method == \'cash_payments\'" class="list_item_icon" src="assets/imgs/notes.png"/>\n                    <img *ngIf="item.payment_method == \'paypal\'" class="list_item_icon" src="assets/imgs/credit-card.png"/>\n                  </div> \n                </ion-col>\n                <ion-col class="list_content" col-8>\n                    <h4 text-wrap *ngIf="item.payment_method == \'wallets\'">Payment By Wallet</h4>\n                    <h4 text-wrap *ngIf="item.payment_method == \'cash_payments\'">Payment By Cash</h4>\n                    <h4 text-wrap *ngIf="item.payment_method == \'paypal\'">Payment By Paypal</h4>\n                    <span class="span_left">{{item.created_at | date:\'dd MMM yyyy, H:mm\'}}</span>  \n                    <!--<span class="span_right">6.56</span>-->\n                </ion-col>\n                <ion-col col-2>\n                  <div [ngClass]="item?.transaction_status == \'Credited\' ? \'g_color\' : \'g_color\'" *ngIf="item.payment_method == \'cash_payments\'" class="t_amount">\n                    <span>-</span>${{item.amount}}\n                  </div>  \n                  <div [ngClass]="item?.transaction_status == \'Credited\' ? \'g_color\' : \'g_color\'" *ngIf="item.payment_method != \'cash_payments\'" class="t_amount">\n                    <span *ngIf="item?.transaction_status == \'Credited\'">+</span>\n                    <span *ngIf="item?.transaction_status != \'Credited\'">-</span>\n                    ${{item.balance}}\n                  </div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>  \n          </div>\n      </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf=\'noTransaction\'>\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <div class="nulldiv emptyDiv" *ngIf=\'noTransaction == true\'>\n      <img src="assets/imgs/empty_booking.png"/>\n      There is not any transactions yet.\n  </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/driver-transactions/driver-transactions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], DriverTransactionsPage);
    return DriverTransactionsPage;
}());

//# sourceMappingURL=driver-transactions.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriversettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DriversettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DriversettingPage = /** @class */ (function () {
    function DriversettingPage(navCtrl, navParams, data, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.page = 1;
        this.offset = 0;
        this.transactions = [];
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
            var param = new FormData();
            param.append("driver_id", data[0].id);
            param.append("status", 'get');
            _this.data.driverNotificationSetting(param).subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    if (result.success.Get_notification_setting == "0") {
                        _this.isNotificationOff = false;
                    }
                    else {
                        _this.isNotificationOff = true;
                    }
                }
                else {
                    _this.data.presentToast('Error');
                }
            });
        });
        this.data.getAvailableToggle().subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
                console.log(result.success.available);
                if (result.success.available == 'on') {
                    _this.isToggled = true;
                }
                else {
                    _this.isToggled = false;
                }
            }
            else {
                _this.data.presentToast('Error');
            }
        });
    }
    DriversettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DriversettingPage');
    };
    DriversettingPage.prototype.notify = function () {
        var _this = this;
        console.log("Toggled: " + this.isToggled);
        this.data.AvailableToggle().subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
                console.log(result.success.available);
                if (result.success.available == 'Driver set to On') {
                    _this.data.presentToast('You are visible to nearby customers');
                }
                else {
                    _this.data.presentToast('You are invisible to nearby customers');
                }
            }
            else {
                _this.data.presentToast('Error');
            }
        });
    };
    DriversettingPage.prototype.notificationOff = function () {
        var _this = this;
        var param = new FormData();
        param.append("driver_id", this.id);
        param.append("status", 'change');
        this.data.driverNotificationSetting(param).subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
            }
            else {
                _this.data.presentToast('Error');
            }
        });
    };
    DriversettingPage.prototype.setVisibility = function (visibility) {
        console.log("Toggled: " + this.isToggled);
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
    };
    DriversettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-driversetting',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/driversetting/driversetting.html"*/'<!--\n  Generated template for the DriversettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label>Visible to customers</ion-label>\n    <ion-toggle [(ngModel)]="isToggled" (ionChange)="notify()"></ion-toggle>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>Silent Notifications</ion-label>\n    <ion-toggle [(ngModel)]="isNotificationOff" (ionChange)="notificationOff()"></ion-toggle>\n  </ion-item>\n</ion-content> \n '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/driversetting/driversetting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], DriversettingPage);
    return DriversettingPage;
}());

//# sourceMappingURL=driversetting.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Info = /** @class */ (function () {
    function Info() {
    }
    return Info;
}());
var HelpPage = /** @class */ (function () {
    function HelpPage(navCtrl, loading, navParams, data, storage, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.service = service;
        this.icon_name = 'add';
        this.searchTerm = '';
        this.showDiv = 1;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.data.getFAQ().subscribe(function (result) {
            console.log(result);
            if (result.status == "ERROR") {
                loader.dismiss();
                _this.data.presentToast('Invalid Username or Password!');
            }
            else {
                loader.dismiss();
                console.log(result);
                _this.information = result.success.faqs;
                _this.original_info = result.success.faqs;
                console.log(_this.information);
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
    HelpPage.prototype.setFilteredItems = function () {
        this.information = this.filterItems(this.searchTerm);
    };
    HelpPage.prototype.filterItems = function (searchTerm) {
        return this.original_info.filter(function (item) {
            return item.answer.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.question.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    HelpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpPage');
    };
    HelpPage.prototype.toggleSection = function (i) {
        this.information[i].open = !this.information[i].open;
    };
    HelpPage.prototype.change = function () {
        if (this.icon_name == 'add') {
            this.icon_name = 'remove';
        }
        else {
            this.icon_name = 'add';
        }
    };
    HelpPage.prototype.changeTab = function (TabNo) {
        this.showDiv = TabNo;
    };
    HelpPage.prototype.addSuggestion = function (msg) {
        var _this = this;
        if (msg == '') {
            this.data.presentToast('Please add your suggestion!');
            return false;
        }
        var param = new FormData();
        param.append("suggestion", msg);
        this.service.presentLoader("Please wait...");
        this.data.addSuggestion(param).subscribe(function (result) {
            console.log(result);
            //this.userData = result; 
            //loader.dismiss();
            if (result.status == "ERROR") {
                _this.service.dismissLoader();
                _this.data.presentToast(result.error.email);
                return false;
            }
            else {
                _this.service.dismissLoader();
                //this.storage.set("customer_data",data.msg[0]);
                _this.data.presentToast('Suggestion added successfully!');
                //this.navCtrl.setRoot('');  
                _this.msg = '';
            }
        }, function (err) {
            _this.service.dismissLoader();
            _this.data.presentToast('Something went wrong.');
        });
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-help',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/help/help.html"*/'<!--\n  Generated template for the HelpPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Help</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div *ngIf=\'showDiv == 1\'>\n    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredItems()"></ion-searchbar>\n\n    <ion-card class=\'faqs\' *ngFor="let item of information; let i = index">\n        <ion-list>\n          <ion-item>\n              <button class="questions" text-wrap ion-item (click)="toggleSection(i)" detail-none [ngClass]="{\'section-active\': item.open, \'section\': !item.open}">\n                <ion-icon name="arrow-forward" *ngIf="!item.open"></ion-icon>\n                <ion-icon name="arrow-down" *ngIf="item.open"></ion-icon>\n                    {{ item.question }}\n              </button>\n          </ion-item>\n          <ion-item class=\'answers\' *ngIf="item.open" text-wrap>      \n              {{item.answer}}\n          </ion-item>\n      </ion-list>\n    </ion-card> \n  </div>\n\n\n  <div *ngIf=\'showDiv == 2\'>\n    <ion-card class=\'faqs\' *ngFor="let item of information; let i = index">\n        <ion-list>\n          <ion-item>\n              <button class="questions" text-wrap ion-item (click)="toggleSection(i)" detail-none [ngClass]="{\'section-active\': item.open, \'section\': !item.open}">\n                <ion-icon name="arrow-forward" *ngIf="!item.open"></ion-icon>\n                <ion-icon name="arrow-down" *ngIf="item.open"></ion-icon>\n                    {{ item.question }}\n              </button>\n          </ion-item>\n          <ion-item class=\'answers\' *ngIf="item.open" text-wrap>      \n              {{item.answer}}\n          </ion-item>\n      </ion-list>\n    </ion-card> \n  </div>\n\n\n  <div *ngIf=\'showDiv == 3\'>\n    <h2 class="suggestion_title">Have thoughts? We\'re listening...</h2>\n    <ion-card class=\'suggestions\'>\n        <ion-list>\n          <ion-item>     \n            <ion-textarea text-wrap [(ngModel)]="msg"></ion-textarea>\n          </ion-item>\n      </ion-list>\n    </ion-card>      \n      <button class="suggestion-btn" ion-button color="primary" block (click)=\'addSuggestion(msg)\'>Done</button>\n  </div>\n    \n\n\n    <!--<ion-card>\n      <ion-row class="first-row">\n        <ion-col col-1><ion-icon [name]="icon_name" (click)="change()"></ion-icon></ion-col>\n        <ion-col col-11>\n          <span>Is the first question?</span>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="icon_name == \'remove\'?true:false">\n        <ion-col col-1></ion-col>\n        <ion-col col-11>\n          <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>\n        </ion-col>\n      </ion-row>\n    </ion-card>-->\n\n\n</ion-content>\n  <div class="last_div">  \n    <div class="inner_last_div">\n      <div class = "tabs-striped tabs-background-positive tabs-color-light">\n        <div class = "tabs">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-4 [ngClass]="showDiv == 1 ? \'custom-tab\': \'\'" (click)=\'changeTab("1")\'>\n                  <a class = "tab-item">\n                      FAQ\n                   </a>\n              </ion-col>\n              <ion-col col-4 [ngClass]="showDiv == 2 ? \'custom-tab\': \'\'" (click)=\'changeTab("2")\'>\n                  <a class = "tab-item active">\n                      Help\n                    </a>\n              </ion-col>\n              <ion-col col-4 [ngClass]="showDiv == 3 ? \'custom-tab\': \'\'" (click)=\'changeTab("3")\'>\n                  <a class = "tab-item">\n                      Suggestions\n                   </a>\n             </ion-col>\n            </ion-row>\n          </ion-grid>\n           \n\n        </div>\n     </div>\n    </div>    \n  </div>     '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/help/help.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_service_service__["a" /* ServiceProvider */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IntroPage = /** @class */ (function () {
    function IntroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        /* this.mainPage = {
           homePage : SigninPage
         }*/
        this.last_slide = 0;
    }
    IntroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage');
    };
    IntroPage.prototype.gotoNav = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
    };
    IntroPage.prototype.getNext = function () {
        if (this.slider.isEnd()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
        }
        else {
            this.slider.slideNext();
            if (this.slider.isEnd()) {
                this.last_slide = 1;
            }
            else if (this.slider.isBeginning()) {
                this.last_slide = 0;
            }
            else {
                this.last_slide = 2;
            }
        }
    };
    IntroPage.prototype.getPrev = function () {
        this.slider.slidePrev();
        if (this.slider.isBeginning()) {
            this.last_slide = 0;
        }
    };
    IntroPage.prototype.skip = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('slides'),
        __metadata("design:type", Object)
    ], IntroPage.prototype, "slider", void 0);
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-intro',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/intro/intro.html"*/'<!--\n  Generated template for the IntroPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar>\n    <ion-title>Intro</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-content >\n    <!--<ion-slides  pager="true" autoplay="4000" speed="2000">-->\n        <ion-slides  pager="true" #slides>\n        <ion-slide >\n          <div class="slider-1-img">\n              <img src="assets/imgs/taxi.png" />\n          </div>\n          <div text-center class="slider-1-content">\n              <h2>Plan a Trip</h2>\n              <p>Choose your pickup and drop location. Choose cab of your choice, we have car for everything. Ride now or later.</p>\n          </div>\n        </ion-slide>\n        <ion-slide >\n            <div class="slider-2-img">\n                <img src="assets/imgs/taxi-driver.png" />\n            </div>\n            <div text-center class="slider-1-content">\n                <h2>Near By Driver</h2>\n                <p>Select near by driver of your pickup location. We give you the best price. We guaranteed!</p>\n            </div>\n        </ion-slide>\n        <ion-slide >\n            <div class="slider-3-img">\n                <img src="assets/imgs/payment-method.png" />\n            </div>\n            <div text-center class="slider-1-content">\n                <h2>Secure Payment</h2>\n                <p>Do your payment as per your convenience. Pay using Card, Wallet or Cash at departure.</p>\n              </div>\n        </ion-slide>\n      </ion-slides>\n</ion-content>\n<ion-footer>\n\n        <button  ion-button icon-only clear (click)="skip()" class="arrow-back">SKIP<!--<ion-icon name="arrow-back"></ion-icon>--></button>\n    <!-- <button *ngIf=\'last_slide==2 || last_slide==1\' ion-button icon-only clear (click)="getPrev()" class="arrow-back">Prev<ion-icon name="arrow-back"></ion-icon></button> -->\n    \n    <button *ngIf=\'last_slide!=1\' ion-button icon-only clear (click)="getNext()" class="arrow-forward">NEXT<!--<ion-icon name="arrow-forward"></ion-icon>--></button>\n    <button *ngIf=\'last_slide==1\' ion-button icon-only clear (click)="getNext()" class="arrow-forward">DONE<!--<ion-icon name="arrow-forward"></ion-icon>--></button>\n</ion-footer>\n     '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/intro/intro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, geolocation, zone, maps, platform, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.query = '';
        this.places = [];
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
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.searchDisabled = false;
        });
    };
    MapPage.prototype.selectPlace = function (place) {
        var _this = this;
        this.places = [];
        var location = {
            lat: null,
            lng: null,
            name: place.name
        };
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                _this.saveDisabled = false;
                _this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
                _this.location = location;
            });
        });
    };
    MapPage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    MapPage.prototype.save = function () {
        this.viewCtrl.dismiss(this.location);
    };
    MapPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapPage.prototype, "pleaseConnect", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar color="sideMenu" hideBackButton>\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>Map</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div id=\'map\'></div>\n</ion-content>-->\n\n\n\n\n<ion-header>\n    <ion-navbar color="primary">\n        <ion-buttons left>\n            <button ion-button (click)="close()">Cancel</button>\n        </ion-buttons>\n        <ion-buttons right>\n            <button [disabled]="saveDisabled" ion-button (click)="save()">Save</button>\n        </ion-buttons>\n    </ion-navbar>\n \n    <ion-toolbar>\n        <ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"></ion-searchbar>\n    </ion-toolbar>\n \n    <ion-list>\n        <ion-item *ngFor="let place of places" (touchstart)="selectPlace(place)">{{place.description}}</ion-item>\n    </ion-list>\n \n</ion-header>\n \n<ion-content>\n \n    <div #pleaseConnect id="please-connect">\n        <p>Please connect to the Internet...</p>\n    </div>\n \n    <div #map id="map">\n        <ion-spinner></ion-spinner>\n    </div>\n \n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(navCtrl, navParams, storage, data, loading) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.data = data;
        this.loading = loading;
        this.notifications = [];
        this.lazy_notifications = [];
        this.users = [];
        this.page = 1;
        this.last_index = 0;
        this.isEmpty = false;
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
        });
        this.loadingCtr = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        this.loadingCtr.present();
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
    };
    NotificationsPage.prototype.ionViewDidEnter = function () {
        this.loadUsers();
    };
    NotificationsPage.prototype.loadUsers = function (infiniteScroll) {
        var _this = this;
        this.storage.get('user').then(function (data) {
            var param = new FormData();
            param.append("user_id", data[0].id);
            _this.data.driverNotifications(param, _this.page).subscribe(function (result) {
                _this.loadingCtr.dismiss();
                if (result.status == "OK") {
                    if (result.success.data.length == 0) {
                        _this.data.presentToast('There is no more data available');
                        _this.isEmpty = true;
                        if (_this.users.length == 0) {
                            _this.isNotification = true;
                        }
                        return false;
                    }
                    else {
                        _this.users = _this.users.concat(result.success.data);
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                    }
                }
            }, function (err) {
                _this.loadingCtr.dismiss();
            });
        });
    };
    NotificationsPage.prototype.loadMore = function (infiniteScroll) {
        this.page++;
        this.last_index = this.users.length;
        this.loadUsers(infiniteScroll);
        if (this.page === this.maximumPages) {
            infiniteScroll.enable(false);
        }
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/notifications/notifications.html"*/'<!--\n  Generated template for the NotificationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Notifications</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    \n    <!--<ion-card *ngFor="let item of lazy_notifications; let i = index">\n        <div class="abs_div">\n          <span>{{item.message}}</span>\n        </div>\n    </ion-card>-->\n  <ion-list>\n    <!--<ion-item [ngClass]="item.status === \'1\' ? \'bc_blue\' : \'bc_white\'" class="list_item" *ngFor="let item of users">\n      <div>\n        <h4>{{item.message}}</h4>  \n        <span>{{item.created_at | date:\'dd/MM/yyyy H:mm\'}}</span>\n      </div>\n    </ion-item>-->\n    <ion-item [ngClass]="item.status === \'1\' ? \'bc_blue\' : \'bc_white\'" class="list_item" *ngFor="let item of users">\n        <div>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-2>\n                <div class="c_icon_div">\n                  <img class="list_item_icon" src="assets/imgs/comment.png"/>\n                </div> \n              </ion-col>\n              <ion-col class="list_content" col-10>\n                  <h4 text-wrap>{{item.message}}</h4>\n                  <span class="span_left">{{item.created_at | date:\'dd MMM, yyyy\'}}</span>  \n                  <span class="span_right">{{item.created_at | date:\'H:mm\'}}</span> \n              </ion-col>\n            </ion-row>\n          </ion-grid>  \n        </div>\n      </ion-item>\n      <div class="nulldiv emptyDiv" *ngIf=\'isNotification == true\'>\n          <img src="assets/imgs/empty_notification.png" />\n          There is no notifications yet.\n      </div>\n  </ion-list>\n  \n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)">\n    <ion-infinite-scroll-content *ngIf=\'isEmpty == true?false:true\'></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n         '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/notifications/notifications.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PackageBookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autocomplete_autocomplete__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__delivery_delivery__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PackageBookingPage = /** @class */ (function () {
    function PackageBookingPage(navCtrl, modalCtrl, geolocation, navParams, alertCtrl, service, storage, loading, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.storage = storage;
        this.loading = loading;
        this.data = data;
        this.minDate = new Date().toISOString();
        this.data.isRide = 'no';
        storage.get("user").then(function (data) {
            console.log(data[0].id);
            _this.user_id = data[0].id;
        });
        this.getPickup().then(function (data) {
            _this.from = data;
        });
    }
    PackageBookingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PackageBookingPage');
    };
    PackageBookingPage.prototype.getPickup = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var addressFull = [];
            var geocoder = new google.maps.Geocoder();
            _this.geolocation.getCurrentPosition().then(function (position) {
                if (position.coords.latitude && position.coords.longitude) {
                    var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    geocoder.geocode({ 'location': latlng }, function (results, status) {
                        if (status === 'OK') {
                            var address = results[0].formatted_address;
                            addressFull.push(address);
                            resolve(address);
                        }
                    });
                }
            });
        });
    };
    PackageBookingPage.prototype.showAlert = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm Booking Request!',
            message: 'Do you want to book a ride?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        //this.goToSubmit();
                        if (_this.delivery_type == 'later') {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__delivery_delivery__["a" /* DeliveryPage */], { "from": _this.from, "to": _this.to, "type": _this.type, "oneway": _this.oneway, "weight": _this.weight, "length": _this.length, "width": _this.width, "height": _this.height, "delivery_type": _this.delivery_type, "date": _this.date, "time": _this.time });
                        }
                        else {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__delivery_delivery__["a" /* DeliveryPage */], { "from": _this.from, "to": _this.to, "type": _this.type, "oneway": _this.oneway, "weight": _this.weight, "length": _this.length, "width": _this.width, "height": _this.height, "delivery_type": _this.delivery_type });
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    PackageBookingPage.prototype.goToSubmit = function () {
        if (this.validate()) {
            /*let param = new FormData();
            param.append("from",this.from);
            param.append("to",this.to);
            param.append("type",this.type);
            param.append("oneway", this.oneway);
            param.append("weight",this.weight);
            param.append("length",this.length);
            param.append("width",this.width);
            param.append("height",this.height);
            param.append("user_id",this.user_id)   */
            this.showAlert();
        }
    };
    PackageBookingPage.prototype.showAddressModal = function (act) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__autocomplete_autocomplete__["a" /* AutocompletePage */], { action: act });
        var me = this;
        modal.onDidDismiss(function (data) {
            if (act == 'pickup') {
                if (data) {
                    _this.from = data;
                }
            }
            else {
                if (data) {
                    _this.to = data;
                }
            }
        });
        modal.present();
    };
    PackageBookingPage.prototype.validate = function () {
        var result = true;
        if (this.from == null || this.from == undefined || this.from == "") {
            this.service.validator('Please select your pick up location.');
            result = false;
        }
        else if (this.to == null || this.to == undefined || this.to == "") {
            this.service.validator('Please select your drop off location.');
            result = false;
        }
        else if (this.type == null || this.type == undefined || this.type == "") {
            this.service.validator('Please choose delivery type.');
            result = false;
        }
        else if (this.length == null || this.length == undefined || this.length == "") {
            this.service.validator('Enter approx. length.');
            result = false;
        }
        else if (this.width == null || this.width == undefined || this.width == "") {
            this.service.validator('Enter approx. width.');
            result = false;
        }
        else if (this.height == null || this.height == undefined || this.height == "") {
            this.service.validator('Enter approx. height.');
            result = false;
        }
        else if (this.weight == null || this.weight == undefined || this.weight == "") {
            this.service.validator('Enter approx. weight.');
            result = false;
        }
        else if (this.delivery_type == null || this.delivery_type == undefined || this.delivery_type == "") {
            this.service.validator('Please choose your time.');
            result = false;
        }
        else if (this.delivery_type == 'later') {
            if (this.date == null || this.date == undefined || this.date == "") {
                this.service.validator('Select pick up date.');
                result = false;
            }
            else if (this.time == null || this.time == undefined || this.time == "") {
                this.service.validator('Select pick up time.');
                result = false;
            }
        }
        else {
            if (this.length < 0) {
                this.service.validator('Length must be greater than 0');
                result = false;
            }
            else if (this.width < 0) {
                this.service.validator('Width must be greater than 0');
                result = false;
            }
            else if (this.height < 0) {
                this.service.validator('Height must be greater than 0');
                result = false;
            }
            else if (this.weight < 0) {
                this.service.validator('Weight must be greater than 0');
                result = false;
            }
        }
        return result;
    };
    PackageBookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-package-booking',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/package-booking/package-booking.html"*/'<ion-header>\n\n  <ion-navbar color="sideMenu">\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>Book A Delivery</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <!-- <ion-card-header>\n      Location\n    </ion-card-header> -->\n    <ion-card-content>\n      <ion-list no-lines>\n          <div class="alg1">\n              <!-- <ion-card-header>\n                Choose Type\n              </ion-card-header> -->\n              Location\n          </div>\n\n        <ion-item (click)="showAddressModal(\'pickup\')">\n          <ion-label floating>Pickup Location</ion-label>\n          <ion-input [(ngModel)]="from" type="text" disabled ></ion-input>\n        </ion-item>\n        <ion-item (click)="showAddressModal(\'drop\')">\n          <ion-label floating>Drop Off Location</ion-label>\n          <ion-input [(ngModel)]="to" type="text" disabled ></ion-input>\n        </ion-item>\n\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n    <!-- <ion-card-header>\n      Enter Parcel Dimensions in meter\n    </ion-card-header> -->\n    <ion-card-content>\n        <ion-list radio-group [(ngModel)]="type">\n            <div class="alg1">\n              <!-- <ion-card-header>\n                Choose Type\n              </ion-card-header> -->\n              Choose Type\n            </div>\n    \n            <div class="alg2">\n              <ion-row>\n                <ion-col col-6>\n                    <ion-item>\n                      <ion-label>Document</ion-label>\n                      <ion-radio value="document" checked="true" ></ion-radio>\n                    </ion-item>\n                </ion-col>\n    \n                <ion-col col-6>\n                  <ion-item>\n                    <ion-label>Parcel</ion-label>\n                    <ion-radio value="parcel" ></ion-radio>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n              \n    \n              \n            </div>\n    \n    \n          </ion-list>\n          \n          <div class="alg1">\n              <!-- <ion-card-header>\n                Choose Type\n              </ion-card-header> -->\n              Enter Parcel Dimensions in meter\n          </div>\n      <ion-row>\n          \n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating>Length</ion-label>\n            <ion-input type="number" [(ngModel)]="length"></ion-input>\n          </ion-item>\n        </ion-col>\n\n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating>Width</ion-label>\n            <ion-input type="number" [(ngModel)]="width"></ion-input>\n          </ion-item>\n        </ion-col>\n\n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating>Height</ion-label>\n            <ion-input type="number" [(ngModel)]="height"></ion-input>\n          </ion-item>\n        </ion-col>\n\n        <ion-col col-6>\n          <ion-item>\n            <ion-label floating>Weight in kg</ion-label>\n            <ion-input type="number" [(ngModel)]="weight"></ion-input>\n          </ion-item>\n        </ion-col>\n\n      </ion-row>\n      \n      \n      \n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n      <!-- <ion-card-header>\n        Delivery Details\n      </ion-card-header> -->\n      <ion-card-content>\n          <div class="alg1">\n              <!-- <ion-card-header>\n                Choose Type\n              </ion-card-header> -->\n              Delivery Details\n          </div>\n        <ion-item padding-top>\n          <ion-label>There and Back?</ion-label>\n          <ion-toggle [(ngModel)]="oneway"></ion-toggle>\n        </ion-item>\n          <ion-list radio-group [(ngModel)]="delivery_type">\n            <div class="alg1">\n              <!-- <ion-card-header>\n                Select Time\n              </ion-card-header> -->\n              Select Time\n            </div>\n        \n            <div class="alg2">\n              <ion-row>\n                <ion-col col-6>\n                  <ion-item>\n                    <ion-label>Now</ion-label>\n                    <ion-radio value="now" checked="true" ></ion-radio>\n                  </ion-item>\n                </ion-col>\n\n                <ion-col col-6>\n                  <ion-item>\n                    <ion-label>Later</ion-label>\n                    <ion-radio value="later"></ion-radio>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n            </div>\n          </ion-list>\n        \n          <ion-list *ngIf="delivery_type == \'later\'">\n            <ion-item >\n              <ion-label class="d_label" floating>Select Date</ion-label>\n              <ion-datetime displayFormat="DD/MM/YYYY" [min]="minDate" [(ngModel)]="date"></ion-datetime>\n            </ion-item>\n            <ion-item>\n              <ion-label class="d_label" floating>Select Time</ion-label>\n              <ion-datetime displayFormat="HH:mm" [(ngModel)]="time"></ion-datetime>\n            </ion-item>\n          </ion-list>\n      </ion-card-content>\n    </ion-card>\n  \n</ion-content>\n\n<!-- <div class="cust-btn-div">\n  <button ion-button block color="primary" (click)="showAlert()">Submit</button>\n</div> -->\n<ion-footer class="cust-btn-div">\n  <!-- <ion-toolbar>\n    <ion-title>Footer</ion-title>\n  </ion-toolbar> -->\n  <button ion-button block color="primary" (click)="goToSubmit()">Submit</button>\n</ion-footer>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/package-booking/package-booking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */]])
    ], PackageBookingPage);
    return PackageBookingPage;
}());

//# sourceMappingURL=package-booking.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentwalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_paypal__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modalpage_modalpage__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PaymentwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentwalletPage = /** @class */ (function () {
    function PaymentwalletPage(alertCtrl, modalCtrl, loading, payPal, navCtrl, navParams, data, storage) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.payPal = payPal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.walletAmount = 0;
        this.page = 1;
        this.viewTransactions = false;
        this.paymentType = 'all';
        this.offset = 0;
        this.transactions = [];
        this.no_transactions = false;
        this.hideBackButton = false;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
            var param = new FormData();
            param.append("customer_id", data[0].id);
            _this.data.getWalletAmount(param).subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    loader.dismiss();
                    _this.walletAmount = result.success.balance;
                }
                else {
                    loader.dismiss();
                }
            });
        });
    }
    PaymentwalletPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaymentwalletPage');
    };
    PaymentwalletPage.prototype.pay = function () {
        var _this = this;
        this.getAmount().then(function (data) {
            var amount = data.toString();
            _this.payPal.init({
                PayPalEnvironmentProduction: 'ATyecYC9QulZbd0Gd3-6EU-qwJtm_-wATZpWp0tll2Hu2eosdhr-gDK1kyh2odnEkamuRoUPWUuHflMK',
                PayPalEnvironmentSandbox: 'AWTTT5V870I-5KsL8D3pR8wu6dTF0r3cEa-zpqI9YCK33AEfUedvxXOegKfmUdM_ofYR4a247R8h7s8S'
            }).then(function () {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_2__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                    var payment = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_paypal__["c" /* PayPalPayment */](amount, 'USD', 'Top-up Given amount into customer wallet', 'Top-up');
                    _this.payPal.renderSinglePaymentUI(payment).then(function (result) {
                        var loader = _this.loading.create({
                            content: "Please wait...",
                            spinner: 'crescent'
                        });
                        _this.data.presentToast('Top-Up successfull!');
                        setTimeout(function () {
                            loader.present();
                            //console.log(payment)
                            //alert(JSON.stringify(result.response));
                            var param = new FormData();
                            param.append("response_type", result.response_type);
                            param.append("payment_id", result.response.id);
                            param.append("state", result.response.state);
                            param.append("create_time", result.response.create_time);
                            param.append("intent", result.response.intent);
                            param.append("platform", result.client.platform);
                            param.append('customer_id', _this.id);
                            param.append('balance', amount);
                            _this.data.walletTopUp(param).subscribe(function (result) {
                                console.log(result);
                                if (result.status == 'OK') {
                                    loader.dismiss();
                                    _this.walletAmount = result.success.balance;
                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    _this.loadTransactions();
                                }
                                else {
                                    loader.dismiss();
                                }
                            });
                            //alert(response.id);
                            //this.moveForward();
                            // Successfully paid
                            // Example sandbox response
                            //
                            // {
                            //   "client": {
                            //     "environment": "sandbox",
                            //     "product_name": "PayPal iOS SDK",
                            //     "paypal_sdk_version": "2.16.0",
                            //     "platform": "iOS"
                            //   },
                            //   "response_type": "payment",
                            //   "response": {
                            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                            //     "state": "approved",
                            //     "create_time": "2016-10-03T13:33:33Z",
                            //     "intent": "sale"
                            //   }
                            // }
                        }, 3000);
                    }, function (error) {
                        console.log(error);
                        // Error or render dialog closed without being successful
                    });
                }, function (error) {
                    console.log(error);
                    // Error in configuration
                });
            }, function (error) {
                console.log(error);
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        });
    };
    PaymentwalletPage.prototype.getAmount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var prompt = _this.alertCtrl.create({
                title: 'Top-Up Amount',
                message: "Enter Top-Up amount",
                enableBackdropDismiss: false,
                inputs: [
                    {
                        name: 'amount',
                        placeholder: "e.g. - 200"
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            console.log(data);
                            //  this.data.presentToast('Please add amount Top-Up.');
                            prompt.dismiss();
                            return false;
                        }
                    },
                    {
                        text: 'Procced',
                        handler: function (data) {
                            console.log(data);
                            prompt.dismiss().then(function () { resolve(data.amount); });
                            //resolve(data.name);
                            return false;
                        }
                    }
                ]
            });
            prompt.present();
        });
    };
    PaymentwalletPage.prototype.goBackbtn = function () {
        this.viewTransactions = false;
    };
    PaymentwalletPage.prototype.getToFrom = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'getToFromDate' }, { showBackdrop: false });
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.viewTransactions = true;
                _this.hideBackButton = true;
                _this.fromDate = data[0];
                _this.toDate = data[1];
                _this.loadTransactions();
            }
        });
        modal.present();
    };
    PaymentwalletPage.prototype.gotoWallet = function () {
        this.viewTransactions = false;
    };
    PaymentwalletPage.prototype.loadTransactions = function (infiniteScroll) {
        var _this = this;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        if (this.viewTransactions === false) {
            this.viewTransactions = true;
        }
        var param = new FormData();
        param.append("customer_id", this.id);
        param.append("offset", this.offset);
        this.data.getTransactions(param, this.page).subscribe(function (result) {
            if (result.status == "OK") {
                if (result.success.Transaction == null || result.success.Transaction.length == 0) {
                    loader.dismiss();
                    if (_this.transactions == null || _this.transactions.length == 0) {
                        _this.no_transactions = true;
                    }
                    _this.data.presentToast('There is no more data available');
                    return false;
                }
                else {
                    loader.dismiss();
                    _this.transactions = _this.transactions.concat(result.success.Transaction);
                    _this.offset = result.offset;
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                }
            }
        });
    };
    PaymentwalletPage.prototype.loadMore = function (infiniteScroll) {
        this.page++;
        this.loadTransactions(infiniteScroll);
        if (this.page === this.maximumPages) {
            infiniteScroll.enable(false);
        }
    };
    PaymentwalletPage.prototype.getByType = function (type) {
        this.paymentType = type;
        this.loadTransactions();
    };
    PaymentwalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-paymentwallet',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/paymentwallet/paymentwallet.html"*/'<!--\n  Generated template for the PaymentwalletPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle >\n          <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n      </button>\n    <ion-title>My Wallet</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <div class = "tabs-striped tabs-background-positive tabs-color-light">\n    <div class = "tabs toptabs">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6 (click)=\'gotoWallet()\'>\n            <a class = "tab-item toptab_item" [ngClass]="viewTransactions === false ? \'active\' : \'\'">\n              Wallet\n            </a>\n          </ion-col>\n          <ion-col col-6 (click)=\'loadTransactions()\'>\n            <a class = "tab-item toptab_item" [ngClass]="viewTransactions === true ? \'active\' : \'\'">\n              Transactions\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </div>\n\n\n  <div *ngIf="viewTransactions === false">\n      <div class="walletBalanceDiv">\n          <img src="assets/imgs/wallet.png" height="44px" />\n          <h2>\n            Your Balance\n          </h2>\n          <h1>\n            <!--$20,578-->\n            ${{walletAmount}}\n          </h1>\n        </div>\n      \n        <div>\n         <form>\n            <ion-grid>\n              <ion-row>\n                \n                <button class="login-btn" ion-button color="primary" block (click)="pay()">Top Up</button>\n              </ion-row>\n            </ion-grid>\n          </form>\n        </div>\n        <!--<button (click)=\'getToFrom()\' class="transactions-btn" ion-button color="primary" block>Transactions</button>-->\n  </div>\n\n\n  <div *ngIf="viewTransactions === true">\n    <ion-list>\n      <ion-item class="list_item" *ngFor="let item of transactions">\n          <div>\n            <ion-grid>\n              <ion-row>\n                <ion-col col-2>\n                  <div class="c_icon_div">\n                    <img *ngIf="item.payment_method == \'wallets\'" class="list_item_icon" src="assets/imgs/wallet.png"/>\n                    <img *ngIf="item.payment_method == \'cash_payments\'" class="list_item_icon" src="assets/imgs/notes.png"/>\n                    <img *ngIf="item.payment_method == \'paypal\'" class="list_item_icon" src="assets/imgs/credit-card.png"/>\n                  </div> \n                </ion-col>\n                <ion-col class="list_content" col-7>\n                    <h4 text-wrap *ngIf="item.payment_method == \'wallets\'">Payment By Wallet</h4>\n                    <h4 text-wrap *ngIf="item.payment_method == \'cash_payments\'">Payment By Cash</h4>\n                    <h4 text-wrap *ngIf="item.payment_method == \'paypal\'">Payment By Paypal</h4>\n                    <span class="span_left">{{item.created_at | date:\'dd MMM yyyy, H:mm\'}}</span>  \n                    <!--<span class="span_right">6.56</span>-->\n                </ion-col>\n                <ion-col col-3>\n                  <div text-right [ngClass]="item?.transaction_status == \'Credited\' ? \'g_color\' : \'r_color\'" *ngIf="item.payment_method == \'cash_payments\'" class="t_amount">\n                    <span>-</span>${{item.amount}}\n                  </div>  \n                  <div text-right [ngClass]="item?.transaction_status == \'Credited\' ? \'g_color\' : \'r_color\'" *ngIf="item.payment_method != \'cash_payments\'" class="t_amount">\n                    <span *ngIf="item?.transaction_status == \'Credited\'">+</span>\n                    <span *ngIf="item?.transaction_status != \'Credited\'">-</span>\n                    ${{item.balance}}\n                  </div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>  \n          </div>\n        </ion-item>\n        <div class="nulldiv emptyDiv" *ngIf=\'no_transactions == true\'>\n          <img src="assets/imgs/empty_booking.png"/>\n          There is not any transactions yet.\n        </div>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf=\'no_transactions\'>\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/paymentwallet/paymentwallet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], PaymentwalletPage);
    return PaymentwalletPage;
}());

//# sourceMappingURL=paymentwallet.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autocomplete_autocomplete__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var SettingsPage = /** @class */ (function () {
    function SettingsPage(alertCtrl, loading, eve, navCtrl, modalCtrl, storage, data, geolocation, navParams, zone, maps, platform, viewCtrl, service) {
        //this.searchDisabled = true;
        //this.saveDisabled = true;
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.eve = eve;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.data = data;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.service = service;
        this.homelocation = '';
        this.worklocation = '';
        this.otherlocations = '';
        this.showmainpage = true;
        this.showlocation = false;
        this.showdrivers = false;
        this.showNotifications = false;
        this.fav_drivers = '';
        //let param = new FormData();
        // param.append("location_type",act); 
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
            var param = new FormData();
            param.append("customer_id", data[0].id);
            param.append("status", 'get');
            _this.data.customerNotificationSetting(param).subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    if (result.success.Get_notification_setting == "0") {
                        _this.isNotificationOff = false;
                    }
                    else {
                        _this.isNotificationOff = true;
                    }
                }
                else {
                    _this.data.presentToast('Error');
                }
            });
        });
        this.hideBackButton = false;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.data.getCustomerFavLocation().subscribe(function (result) {
            if (result.status == "OK") {
                _this.fav_locations = result.success.favlocations;
                _this.getHomelocation(_this.fav_locations).then(function (data) {
                    _this.homelocation = data;
                });
                _this.getWorklocation(_this.fav_locations).then(function (data) {
                    _this.worklocation = data;
                });
                _this.getOtherlocation(_this.fav_locations).then(function (data) {
                    _this.otherlocations = data;
                });
            }
        });
        this.data.getFavDrivers().subscribe(function (result) {
            console.log(result);
            if (result.status == "OK") {
                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                _this.fav_drivers = result.success.favdrivers;
            }
        });
        loader.dismiss();
        this.storage.get('fav_place').then(function (data) {
            if (data) {
                _this.movetoFavlocations();
            }
        });
        this.storage.get('fav_driver').then(function (data) {
            if (data) {
                _this.movetoFavdrivers();
            }
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.movetoFavlocations = function () {
        this.hideBackButton = true;
        this.showmainpage = false;
        this.showlocation = true;
    };
    SettingsPage.prototype.movetoFavdrivers = function () {
        this.hideBackButton = true;
        this.showmainpage = false;
        this.showdrivers = true;
    };
    SettingsPage.prototype.movetoNotifications = function () {
        this.hideBackButton = true;
        this.showmainpage = false;
        this.showNotifications = true;
    };
    SettingsPage.prototype.goBack = function () {
        this.hideBackButton = false;
        this.showmainpage = true;
        this.showlocation = false;
        this.showdrivers = false;
        this.showNotifications = false;
    };
    SettingsPage.prototype.getHomelocation = function (locations) {
        return new Promise(function (resolve, reject) {
            locations.forEach(function (element) {
                if (element.location_type == 'home') {
                    resolve(element);
                }
            });
        });
    };
    SettingsPage.prototype.getWorklocation = function (locations) {
        return new Promise(function (resolve, reject) {
            locations.forEach(function (element) {
                if (element.location_type == 'work') {
                    resolve(element);
                }
            });
        });
    };
    SettingsPage.prototype.getOtherlocation = function (locations) {
        return new Promise(function (resolve, reject) {
            var loc = [];
            locations.forEach(function (element) {
                if (element.location_type != 'home' && element.location_type != 'work') {
                    loc.push(element);
                }
                /* else{
                   loc.push(element);
                 }*/
            });
            resolve(loc);
        });
    };
    SettingsPage.prototype.addAddr = function (act) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var modal, me;
            return __generator(this, function (_a) {
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__autocomplete_autocomplete__["a" /* AutocompletePage */], { action: act });
                me = this;
                modal.onDidDismiss(function (data) {
                    if (data) {
                        var param_1 = new FormData();
                        if (act != 'home' && act != 'work') {
                            param_1.append("location", data);
                            _this.getLocationType().then(function (loc) {
                                if (loc) {
                                    param_1.append("location_type", loc.toString());
                                    _this.geocodeAddress(data).then(function (data) {
                                        var lat = data[0];
                                        var lng = data[1];
                                        param_1.append("latitude", lat);
                                        param_1.append("longitude", lng);
                                        _this.data.addCustomerFavLocation(param_1).subscribe(function (result) {
                                            console.log(result);
                                            if (result.status == "OK") {
                                                _this.storage.set('fav_place', true);
                                                _this.favLocation();
                                                //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                            }
                                        });
                                    });
                                }
                            });
                        }
                        else {
                            param_1.append("location", data);
                            param_1.append("location_type", act);
                            _this.geocodeAddress(data).then(function (data) {
                                var lat = data[0];
                                var lng = data[1];
                                param_1.append("latitude", lat);
                                param_1.append("longitude", lng);
                                _this.data.addCustomerFavLocation(param_1).subscribe(function (result) {
                                    console.log(result);
                                    if (result.status == "OK") {
                                        _this.storage.set('fav_place', true);
                                        _this.favLocation();
                                        //  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    }
                                });
                            });
                        }
                    }
                });
                modal.present();
                return [2 /*return*/];
            });
        });
    };
    SettingsPage.prototype.removeAddr = function (id) {
        var _this = this;
        var param = new FormData();
        param.append("location_id", id);
        this.data.removeCustomerFavLocation(param).subscribe(function (result) {
            if (result.status == "OK") {
                _this.storage.set('fav_place', true);
                _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
            }
        });
        //}
        /*else{
          
        }*/
    };
    SettingsPage.prototype.geocodeAddress = function (address) {
        //var address = document.getElementById('address').value;
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
                    resolve(loc);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    };
    SettingsPage.prototype.getLocationType = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var prompt = _this.alertCtrl.create({
                title: 'Set Location Name',
                message: "Set name for location to save place",
                enableBackdropDismiss: false,
                inputs: [
                    {
                        name: 'name',
                        placeholder: "e.g. - Joe's Home"
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                            console.log(data);
                            _this.data.presentToast('Please add Location name to save as favorite location');
                            prompt.dismiss();
                            return false;
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            console.log(data);
                            if (data.name == 'Home' || data.name == 'home' || data.name == 'work' || data.name == 'Work') {
                                _this.data.presentToast('You can not add Home and work as additional favorite locations.');
                            }
                            else {
                                prompt.dismiss().then(function () { resolve(data.name); });
                                //resolve(data.name);
                                return false;
                            }
                        }
                    }
                ]
            });
            prompt.present();
        });
    };
    SettingsPage.prototype.notificationOff = function () {
        var _this = this;
        var param = new FormData();
        param.append("customer_id", this.id);
        param.append("status", 'change');
        this.data.customerNotificationSetting(param).subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
            }
            else {
                _this.data.presentToast('Error');
            }
        });
    };
    SettingsPage.prototype.ionViewDidLeave = function () {
        console.log("I am called");
        this.storage.remove('fav_place');
        this.storage.remove('fav_driver');
    };
    SettingsPage.prototype.removeDriver = function (driver_id) {
        var _this = this;
        var param = new FormData();
        param.append("driver_id", driver_id);
        this.data.removeFavDriver(param).subscribe(function (data) {
            console.log("############");
            console.log(data);
            console.log("############");
            _this.storage.set('fav_driver', true);
            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
        });
    };
    SettingsPage.prototype.favLocation = function () {
        var _this = this;
        this.service.presentLoader("Please wait...");
        this.data.getCustomerFavLocation().subscribe(function (result) {
            if (result.status == "OK") {
                _this.service.dismissLoader();
                _this.fav_locations = result.success.favlocations;
                _this.getHomelocation(_this.fav_locations).then(function (data) {
                    _this.homelocation = data;
                });
                _this.getWorklocation(_this.fav_locations).then(function (data) {
                    _this.worklocation = data;
                });
                _this.getOtherlocation(_this.fav_locations).then(function (data) {
                    _this.otherlocations = data;
                });
            }
            else {
                _this.service.dismissLoader();
            }
        }, function (err) {
            _this.service.dismissLoader();
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n   <ion-navbar color="sideMenu" hideBackButton="{{hideBackButton}}">   \n    <!--<button ion-button menuToggle >\n        <ion-icon name="arrow-back"></ion-icon>     \n    </button>-->\n    <button ion-button menuToggle >\n        <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>\n        Settings\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div *ngIf="showmainpage == true" padding>\n      <ion-list class="set_list">\n        <ion-item (click)="movetoFavlocations()">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-2>\n                <img class="list_item_icon" src="assets/imgs/s_placeholder.png"/>\n              </ion-col>\n              <ion-col col-10>\n                Favourite Locations\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n\n        <ion-item (click)="movetoFavdrivers()">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-2>\n                <img class="list_item_icon" src="assets/imgs/s_user.png"/>\n              </ion-col>\n              <ion-col col-10>\n                Favourite Drivers\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n\n        <ion-item (click)="movetoNotifications()">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-2>\n                <img class="list_item_icon" src="assets/imgs/s_notification.png"/>\n              </ion-col>\n              <ion-col col-10>\n                Notifications\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </ion-list>\n    </div>\n   \n\n  <div *ngIf="showlocation == true">\n    <ion-item class="setting_label">\n      <ion-label>Favourite Places</ion-label>\n    </ion-item>\n    <div class="favlocDiv">\n      <ion-grid>\n          <ion-row>\n            <ion-col col-1 text-center>\n              <ion-icon class="setting_icons" name="home"></ion-icon>\n            </ion-col>\n            <ion-col class="setting_title" col-10 (click)="addAddr(\'home\')">\n              <h3 *ngIf="homelocation == \'\'">Add Home</h3>\n              <h3 *ngIf="homelocation != \'\'">Home</h3>\n              <span *ngIf="homelocation != \'\'">\n                {{homelocation?.location}}\n                <!-- <p class="delete_op" (click)="removeAddr(homelocation?.id)">Delete</p> -->\n              </span>\n              <span *ngIf="homelocation == \'\'">\n                Not added yet.\n              </span>\n            </ion-col>\n            <ion-col *ngIf="homelocation != \'\'" col-1 text-center>    \n              <ion-icon class="trash-ic" name="trash" (click)="removeAddr(homelocation?.id)"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-1 text-center>\n              <ion-icon class="setting_icons" name="briefcase"></ion-icon>\n            </ion-col>\n            <ion-col class="setting_title" col-10 (click)="addAddr(\'work\')">\n              <h3 *ngIf="worklocation == \'\'">Add Work</h3>\n              <h3 *ngIf="worklocation != \'\'">Work</h3>\n              <span *ngIf="worklocation != \'\'">\n                {{worklocation?.location}}\n                <!-- <p class="delete_op" (click)="removeAddr(worklocation?.id)">Delete</p>      -->\n              </span>\n              <span *ngIf="worklocation == \'\'">\n                Not added yet.\n              </span>\n            </ion-col>\n            <ion-col *ngIf="worklocation != \'\'" col-1 text-center>\n              <ion-icon class="trash-ic" name="trash" (click)="removeAddr(worklocation?.id)"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        \n\n        <ion-grid  *ngFor="let item of otherlocations; let i = index">\n          <ion-row>\n            <ion-col col-1 text-center>\n              <ion-icon class="setting_icons" name="star"></ion-icon>\n            </ion-col>\n            <ion-col class="setting_title" col-10>\n              <h3>{{item?.location_type}}</h3>\n              <span>\n                {{item?.location}}\n                <!-- <p class="delete_op" (click)="removeAddr(item?.id)">Delete</p>      -->\n              </span>\n            </ion-col>\n            <ion-col col-1 text-center>\n              <ion-icon class="trash-ic" name="trash" (click)="removeAddr(item?.id)"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <ion-grid (click)="addAddr(\'other\')" class="addLocGrid">\n          <ion-row>\n            <ion-col col-1 text-center>\n              <ion-icon class="setting_icons" name="add"></ion-icon>\n            </ion-col>\n            <ion-col class="setting_title" col-11>\n              <h3>Add another favourite places</h3>\n              <span>Get to your Favourite Destinations faster</span>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n    </div>\n  </div>\n\n\n  <div *ngIf="showdrivers == true">\n    <ion-item class="setting_label" *ngIf="fav_drivers == \'\'? false:true">\n      <ion-label>Favourite Drivers</ion-label>\n    </ion-item>\n    <div class="favDriverDiv">\n      <ion-grid *ngFor="let item of fav_drivers; let i = index">\n        <ion-row>\n          <ion-col col-3>\n            <ion-avatar><img src="assets/imgs/s_user.png"/></ion-avatar>\n          </ion-col>\n          <ion-col col-8>\n            <h2>{{item.first_name}} {{item.last_name}}</h2>\n            <span>{{item.email}}</span>\n            <span>{{item.phone}}</span>\n          </ion-col>\n          <ion-col col-1 text-center>\n            <ion-icon class="trash-ic" name="trash" (click)="removeDriver(item?.id)"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <h6 *ngIf="fav_drivers == \'\'? true:false" class="no_drivers">No drivers added yet.</h6>\n  </div>\n\n  <div padding class="notification" *ngIf="showNotifications == true">\n    <ion-item>\n      <ion-label>Silent Notifications</ion-label>\n      <ion-toggle [(ngModel)]="isNotificationOff" (ionChange)="notificationOff()"></ion-toggle>  \n    </ion-item>\n  </div>\n\n</ion-content>\n<div *ngIf="showmainpage != true" class="last_div" (click)="goBack()">  \n    <div class="inner_last_div">\n      <p><ion-icon name="arrow-back"></ion-icon> Go Back </p>\n    </div>\n</div> '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_7__providers_service_service__["a" /* ServiceProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/autocomplete/autocomplete.module": [
		199
	],
	"../pages/booking-list/booking-list.module": [
		203
	],
	"../pages/bookinghistory/bookinghistory.module": [
		205
	],
	"../pages/confirm-payment/confirm-payment.module": [
		206
	],
	"../pages/customer-profile/customer-profile.module": [
		217
	],
	"../pages/delivery/delivery.module": [
		218
	],
	"../pages/driver-transactions/driver-transactions.module": [
		219
	],
	"../pages/driversetting/driversetting.module": [
		220
	],
	"../pages/edit-profile/edit-profile.module": [
		221
	],
	"../pages/emailverification/emailverification.module": [
		222
	],
	"../pages/feedback/feedback.module": [
		223
	],
	"../pages/forgotpasswoed/forgotpasswoed.module": [
		225
	],
	"../pages/help/help.module": [
		226
	],
	"../pages/intro/intro.module": [
		227
	],
	"../pages/logout/logout.module": [
		385,
		0
	],
	"../pages/map/map.module": [
		228
	],
	"../pages/modalpage/modalpage.module": [
		229
	],
	"../pages/notifications/notifications.module": [
		230
	],
	"../pages/package-booking/package-booking.module": [
		231
	],
	"../pages/password-reset/password-reset.module": [
		232
	],
	"../pages/payment/payment.module": [
		233
	],
	"../pages/paymentwallet/paymentwallet.module": [
		234
	],
	"../pages/ride-later/ride-later.module": [
		235
	],
	"../pages/ride-now/ride-now.module": [
		236
	],
	"../pages/settings/settings.module": [
		237
	],
	"../pages/signup/signup.module": [
		238
	],
	"../pages/upload-profile/upload-profile.module": [
		239
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 198;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutocompletePageModule", function() { return AutocompletePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autocomplete__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AutocompletePageModule = /** @class */ (function () {
    function AutocompletePageModule() {
    }
    AutocompletePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__autocomplete__["a" /* AutocompletePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__autocomplete__["a" /* AutocompletePage */]),
            ],
        })
    ], AutocompletePageModule);
    return AutocompletePageModule;
}());

//# sourceMappingURL=autocomplete.module.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingListPageModule", function() { return BookingListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_list__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookingListPageModule = /** @class */ (function () {
    function BookingListPageModule() {
    }
    BookingListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__booking_list__["a" /* BookingListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__booking_list__["a" /* BookingListPage */]),
            ],
        })
    ], BookingListPageModule);
    return BookingListPageModule;
}());

//# sourceMappingURL=booking-list.module.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookinghistoryPageModule", function() { return BookinghistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bookinghistory__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookinghistoryPageModule = /** @class */ (function () {
    function BookinghistoryPageModule() {
    }
    BookinghistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bookinghistory__["a" /* BookinghistoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__bookinghistory__["a" /* BookinghistoryPage */]),
            ],
        })
    ], BookinghistoryPageModule);
    return BookinghistoryPageModule;
}());

//# sourceMappingURL=bookinghistory.module.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmPaymentPageModule", function() { return ConfirmPaymentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_payment__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConfirmPaymentPageModule = /** @class */ (function () {
    function ConfirmPaymentPageModule() {
    }
    ConfirmPaymentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__confirm_payment__["a" /* ConfirmPaymentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__confirm_payment__["a" /* ConfirmPaymentPage */]),
            ],
        })
    ], ConfirmPaymentPageModule);
    return ConfirmPaymentPageModule;
}());

//# sourceMappingURL=confirm-payment.module.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityServiceProvider = /** @class */ (function () {
    function ConnectivityServiceProvider(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityServiceProvider.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityServiceProvider.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    ConnectivityServiceProvider.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    ConnectivityServiceProvider.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    ConnectivityServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], ConnectivityServiceProvider);
    return ConnectivityServiceProvider;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerProfilePageModule", function() { return CustomerProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_profile__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerProfilePageModule = /** @class */ (function () {
    function CustomerProfilePageModule() {
    }
    CustomerProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__customer_profile__["a" /* CustomerProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_profile__["a" /* CustomerProfilePage */]),
            ],
        })
    ], CustomerProfilePageModule);
    return CustomerProfilePageModule;
}());

//# sourceMappingURL=customer-profile.module.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryPageModule", function() { return DeliveryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__delivery__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DeliveryPageModule = /** @class */ (function () {
    function DeliveryPageModule() {
    }
    DeliveryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__delivery__["a" /* DeliveryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__delivery__["a" /* DeliveryPage */]),
            ],
        })
    ], DeliveryPageModule);
    return DeliveryPageModule;
}());

//# sourceMappingURL=delivery.module.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriverTransactionsPageModule", function() { return DriverTransactionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__driver_transactions__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DriverTransactionsPageModule = /** @class */ (function () {
    function DriverTransactionsPageModule() {
    }
    DriverTransactionsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__driver_transactions__["a" /* DriverTransactionsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__driver_transactions__["a" /* DriverTransactionsPage */]),
            ],
        })
    ], DriverTransactionsPageModule);
    return DriverTransactionsPageModule;
}());

//# sourceMappingURL=driver-transactions.module.js.map

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(http, loadCtrl, toastCtrl, alertCtrl) {
        this.http = http;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        console.log('Hello ServiceProvider Provider');
    }
    ServiceProvider.prototype.presentLoader = function (msg) {
        this.loader = this.loadCtrl.create({
            content: msg,
            spinner: 'bubbles'
        });
        this.loader.present();
    };
    ServiceProvider.prototype.dismissLoader = function () {
        this.loader.dismiss();
    };
    ServiceProvider.prototype.presentToast = function (msg) {
        var bread = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'middle'
        });
        bread.present();
    };
    ServiceProvider.prototype.validator = function (msg) {
        var prompt = this.alertCtrl.create({
            title: 'Error',
            message: msg,
            buttons: [
                {
                    text: 'Dismiss',
                    handler: function (data) {
                    }
                }
            ]
        });
        prompt.present();
    };
    ServiceProvider.prototype.presentConfirmationAlert = function (msg) {
        var resolveFunction;
        var promise = new Promise(function (resolve) {
            resolveFunction = resolve;
        });
        var confirmAlert = this.alertCtrl.create({
            message: msg,
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        resolveFunction(true);
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        resolveFunction(false);
                    }
                }
            ]
        });
        confirmAlert.present();
        return promise;
    };
    ServiceProvider.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            message: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    ServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], ServiceProvider);
    return ServiceProvider;
}());

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriversettingPageModule", function() { return DriversettingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__driversetting__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DriversettingPageModule = /** @class */ (function () {
    function DriversettingPageModule() {
    }
    DriversettingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__driversetting__["a" /* DriversettingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__driversetting__["a" /* DriversettingPage */]),
            ],
        })
    ], DriversettingPageModule);
    return DriversettingPageModule;
}());

//# sourceMappingURL=driversetting.module.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProfilePageModule", function() { return EditProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_profile__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditProfilePageModule = /** @class */ (function () {
    function EditProfilePageModule() {
    }
    EditProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__edit_profile__["a" /* EditProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__edit_profile__["a" /* EditProfilePage */]),
            ],
        })
    ], EditProfilePageModule);
    return EditProfilePageModule;
}());

//# sourceMappingURL=edit-profile.module.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailverificationPageModule", function() { return EmailverificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__emailverification__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmailverificationPageModule = /** @class */ (function () {
    function EmailverificationPageModule() {
    }
    EmailverificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__emailverification__["a" /* EmailverificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__emailverification__["a" /* EmailverificationPage */]),
            ],
        })
    ], EmailverificationPageModule);
    return EmailverificationPageModule;
}());

//# sourceMappingURL=emailverification.module.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackPageModule", function() { return FeedbackPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FeedbackPageModule = /** @class */ (function () {
    function FeedbackPageModule() {
    }
    FeedbackPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], FeedbackPageModule);
    return FeedbackPageModule;
}());

//# sourceMappingURL=feedback.module.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotpasswoedPageModule", function() { return ForgotpasswoedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forgotpasswoed__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ForgotpasswoedPageModule = /** @class */ (function () {
    function ForgotpasswoedPageModule() {
    }
    ForgotpasswoedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__forgotpasswoed__["a" /* ForgotpasswoedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__forgotpasswoed__["a" /* ForgotpasswoedPage */]),
            ],
        })
    ], ForgotpasswoedPageModule);
    return ForgotpasswoedPageModule;
}());

//# sourceMappingURL=forgotpasswoed.module.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpPageModule", function() { return HelpPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HelpPageModule = /** @class */ (function () {
    function HelpPageModule() {
    }
    HelpPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__help__["a" /* HelpPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__help__["a" /* HelpPage */]),
            ],
        })
    ], HelpPageModule);
    return HelpPageModule;
}());

//# sourceMappingURL=help.module.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPageModule = /** @class */ (function () {
    function IntroPageModule() {
    }
    IntroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */]),
            ],
        })
    ], IntroPageModule);
    return IntroPageModule;
}());

//# sourceMappingURL=intro.module.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageModule", function() { return MapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapPageModule = /** @class */ (function () {
    function MapPageModule() {
    }
    MapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */]),
            ],
        })
    ], MapPageModule);
    return MapPageModule;
}());

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalpagePageModule", function() { return ModalpagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModalpagePageModule = /** @class */ (function () {
    function ModalpagePageModule() {
    }
    ModalpagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modalpage__["a" /* ModalpagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modalpage__["a" /* ModalpagePage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */]
            ],
        })
    ], ModalpagePageModule);
    return ModalpagePageModule;
}());

//# sourceMappingURL=modalpage.module.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationsPageModule = /** @class */ (function () {
    function NotificationsPageModule() {
    }
    NotificationsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notifications__["a" /* NotificationsPage */]),
            ],
        })
    ], NotificationsPageModule);
    return NotificationsPageModule;
}());

//# sourceMappingURL=notifications.module.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PackageBookingPageModule", function() { return PackageBookingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__package_booking__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PackageBookingPageModule = /** @class */ (function () {
    function PackageBookingPageModule() {
    }
    PackageBookingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__package_booking__["a" /* PackageBookingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__package_booking__["a" /* PackageBookingPage */]),
            ],
        })
    ], PackageBookingPageModule);
    return PackageBookingPageModule;
}());

//# sourceMappingURL=package-booking.module.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetPageModule", function() { return PasswordResetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__password_reset__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PasswordResetPageModule = /** @class */ (function () {
    function PasswordResetPageModule() {
    }
    PasswordResetPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__password_reset__["a" /* PasswordResetPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__password_reset__["a" /* PasswordResetPage */]),
            ],
        })
    ], PasswordResetPageModule);
    return PasswordResetPageModule;
}());

//# sourceMappingURL=password-reset.module.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentPageModule", function() { return PaymentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PaymentPageModule = /** @class */ (function () {
    function PaymentPageModule() {
    }
    PaymentPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__payment__["a" /* PaymentPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__payment__["a" /* PaymentPage */]),
            ],
        })
    ], PaymentPageModule);
    return PaymentPageModule;
}());

//# sourceMappingURL=payment.module.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentwalletPageModule", function() { return PaymentwalletPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paymentwallet__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PaymentwalletPageModule = /** @class */ (function () {
    function PaymentwalletPageModule() {
    }
    PaymentwalletPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__paymentwallet__["a" /* PaymentwalletPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__paymentwallet__["a" /* PaymentwalletPage */]),
            ],
        })
    ], PaymentwalletPageModule);
    return PaymentwalletPageModule;
}());

//# sourceMappingURL=paymentwallet.module.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RideLaterPageModule", function() { return RideLaterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ride_later__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RideLaterPageModule = /** @class */ (function () {
    function RideLaterPageModule() {
    }
    RideLaterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ride_later__["a" /* RideLaterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ride_later__["a" /* RideLaterPage */]),
            ],
        })
    ], RideLaterPageModule);
    return RideLaterPageModule;
}());

//# sourceMappingURL=ride-later.module.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RideNowPageModule", function() { return RideNowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ride_now__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RideNowPageModule = /** @class */ (function () {
    function RideNowPageModule() {
    }
    RideNowPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ride_now__["a" /* RideNowPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ride_now__["a" /* RideNowPage */]),
            ],
        })
    ], RideNowPageModule);
    return RideNowPageModule;
}());

//# sourceMappingURL=ride-now.module.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadProfilePageModule", function() { return UploadProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upload_profile__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UploadProfilePageModule = /** @class */ (function () {
    function UploadProfilePageModule() {
    }
    UploadProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__upload_profile__["a" /* UploadProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__upload_profile__["a" /* UploadProfilePage */]),
            ],
        })
    ], UploadProfilePageModule);
    return UploadProfilePageModule;
}());

//# sourceMappingURL=upload-profile.module.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_base64__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__customer_profile_customer_profile__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











/**
 * Generated class for the UploadProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UploadProfilePage = /** @class */ (function () {
    function UploadProfilePage(imagePicker, navParams, base64, navCtrl, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, data, storage) {
        var _this = this;
        this.imagePicker = imagePicker;
        this.navParams = navParams;
        this.base64 = base64;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.data = data;
        this.storage = storage;
        this.lastImage = null;
        this.imgPreview = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
        this.imgPreview = navParams.get('imgurl');
        this.storage.get('user').then(function (data) {
            //let param = data[0].id;
            _this.role = data[0].role;
        });
    }
    UploadProfilePage.prototype.captureImage = function (useAlbum) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var srcType, options, imageData, param;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (useAlbum == true) {
                            srcType = this.camera.PictureSourceType.CAMERA;
                        }
                        else {
                            srcType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
                        }
                        options = {
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE,
                            sourceType: srcType
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 1:
                        imageData = _a.sent();
                        console.log('imageData===>' + imageData);
                        this.avtarPath = 'data:image/jpg;base64,' + imageData;
                        param = new FormData();
                        param.append("image_file", this.avtarPath);
                        //this.photos.unshift(this.base64Image);
                        if (this.role == 2) {
                            this.data.updateCustomerAvtar(param).subscribe(function (result) {
                                if (result.status == "ERROR") {
                                    _this.data.presentToast('eRROR');
                                    return false;
                                }
                                else {
                                    _this.data.presentToast('Profile Updated Successfully!');
                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                                }
                            });
                        }
                        if (this.role == 3) {
                            this.data.updateDriverAvtar(param).subscribe(function (result) {
                                if (result.status == "ERROR") {
                                    _this.data.presentToast('eRROR');
                                    return false;
                                }
                                else {
                                    _this.data.presentToast('Profile Updated Successfully!');
                                    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__customer_profile_customer_profile__["a" /* CustomerProfilePage */]);
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-upload-profile',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/upload-profile/upload-profile.html"*/'<!--\n  Generated template for the UploadProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Upload Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <img src="{{imgPreview}}">\n  <h3 >Please Select Image!</h3>\n  <!--<img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n  <h3 [hidden]="lastImage !== null">Please Select Image!</h3>\n</ion-content>-->\n       \n<ion-footer>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <button ion-button icon-left (click)="presentActionSheet()">\n              <ion-icon name="camera"></ion-icon>Select Image\n            </button>\n          </ion-col>\n          <ion-col col-6>          \n            <button ion-button icon-left (click)="uploadImage()" >\n              <ion-icon name="cloud-upload"></ion-icon>Upload\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n</ion-footer>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/upload-profile/upload-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], UploadProfilePage);
    return UploadProfilePage;
}());

//# sourceMappingURL=upload-profile.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ModalpagePage = /** @class */ (function () {
    function ModalpagePage(service, callNumber, eve, loading, geolocation, oneSignal, data, navCtrl, storage, navParams, viewCtrl) {
        var _this = this;
        this.service = service;
        this.callNumber = callNumber;
        this.eve = eve;
        this.loading = loading;
        this.geolocation = geolocation;
        this.oneSignal = oneSignal;
        this.data = data;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.social_account_details = { facebook: "", twitter: "", instagram: "", linkedin: "" };
        this.prev_social_accounts = [];
        this.leave = true;
        this.display_bookingInfo = false;
        this.showClose = false;
        this.display_relative = '';
        this.loadingCtr = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        //this.loadingCtr.present();
        this.modalAct = navParams.get('modalAct');
        this.driverId = navParams.get('driverId');
        this.bookingId = navParams.get('bookingId');
        this.relativeId = navParams.get('relativeId') != undefined ? navParams.get('relativeId') : '';
        this.feedback = navParams.get('feedback');
        this.rating = navParams.get('rating');
        this.minDate = new Date().toISOString();
        this.prev_social_accounts = navParams.get('social_media');
        //alert(this.prev_social_accounts['facebook']);
        if (this.modalAct == 'addSocialaccount') {
            if (this.prev_social_accounts['facebook'] != undefined && this.prev_social_accounts['facebook'] && this.prev_social_accounts['facebook'] != 'undefined') {
                this.social_account_details.facebook = this.prev_social_accounts['facebook'];
            }
            if (this.prev_social_accounts['twitter'] != undefined && this.prev_social_accounts['twitter'] && this.prev_social_accounts['twitter'] != 'undefined') {
                this.social_account_details.twitter = this.prev_social_accounts['twitter'];
            }
            if (this.prev_social_accounts['instagram'] != undefined && this.prev_social_accounts['instagram'] && this.prev_social_accounts['instagram'] != 'undefined') {
                this.social_account_details.instagram = this.prev_social_accounts['instagram'];
            }
            if (this.prev_social_accounts['linkedin'] != undefined && this.prev_social_accounts['linkedin'] && this.prev_social_accounts['linkedin'] != 'undefined') {
                this.social_account_details.linkedin = this.prev_social_accounts['linkedin'];
            }
        }
        this.driver = {
            fname: 'fname',
            lname: 'lname',
            phone: '9874589687',
            address: '',
            vehicle_type: '',
            vehicle_no: '',
            email: 'driver@gmail.com',
            rate: ''
        };
        this.booking_info = {
            source: '',
            destination: '',
            distance: '',
            cost: '',
            customer_id: '',
            source_lat: '',
            source_lng: '',
            destination_lat: '',
            destination_lng: '',
            booking_id: '',
            driver_id: '',
            pickup_date: '',
            schedule_time: '',
            duration: '',
            customer_name: '',
            customer_contact: ''
        };
        this.social_account = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            linkedin: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9]*')]),
            facebook: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9]*')]),
            twitter: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9]*')]),
            instagram: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9]*')])
        });
        if (this.driverId && this.driverId != '') {
            this.loadingCtr.present();
            var param = new FormData();
            param.append("driver_id", this.driverId);
            this.data.getSelectedDriverInfo(param).subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    _this.display_bookingInfo = true;
                    _this.loadingCtr.dismiss();
                    console.log(result.success.driver.first_name);
                    _this.driver.fname = result.success.driver.first_name;
                    _this.driver.lname = result.success.driver.last_name;
                    //this.driver.profile = result.success.profile[0].profile;
                    _this.driver.phone = result.success.driver.phone;
                    _this.driver.address = result.success.driver.address;
                    _this.driver.vehicle_type = result.success.driver.vehicle_type;
                    _this.driver.vehicle_no = result.success.driver.vehicle_number;
                    _this.driver.email = result.success.driver.email;
                    _this.driver.rate = result.success.driver.rating;
                    if (result.success.driver.profile == null) {
                        _this.driver.profile = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                    }
                    else {
                        //this.driver.profile = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.driver.profile;
                        _this.driver.profile = _this.data.imgURL + "driver/profile_image/" + result.success.driver.profile;
                    }
                }
                else {
                }
            });
            /*let param = new FormData();
              param.append("origin",this.lat+','+this.long);
              param.append("destination",driver.latitude+','+driver.longitude);
      
              this.data.customerBookingDistance(param).subscribe(result=>{
                if(result.status == 'OK')
                {
                  //console.log(result);
                  this.duration = result.success.duration;
                  console.log(this.duration);
                }
              });*/
        }
        if (this.bookingId && this.bookingId != '') {
            this.loadingCtr.present();
            if (this.modalAct == 'showBooking') {
                this.leave = true;
            }
            else {
                this.leave = false;
            }
            this.storage.get('user').then(function (data) {
                var id = data[0].id;
                var role = data[0].role;
                if (role == 3) {
                    var param = new FormData();
                    param.append("booking_id", _this.bookingId);
                    _this.data.getBookingInfo(param).subscribe(function (result) {
                        console.log(result);
                        if (result.status == 'OK') {
                            _this.booking_info.source = result.success.booking.source,
                                _this.booking_info.destination = result.success.booking.destination,
                                _this.booking_info.distance = result.success.booking.distance,
                                _this.booking_info.cost = result.success.booking.cost,
                                _this.booking_info.customer_id = result.success.booking.customer_id,
                                _this.booking_info.source_lat = result.success.booking.source_lat,
                                _this.booking_info.source_lng = result.success.booking.source_long,
                                _this.booking_info.destination_lat = result.success.booking.destination_lat,
                                _this.booking_info.destination_lng = result.success.booking.destination_long,
                                _this.booking_info.booking_id = result.success.booking.id,
                                _this.booking_info.driver_id = result.success.booking.driver_id,
                                _this.booking_info.pickup_date = result.success.booking.pickup_date,
                                _this.booking_info.schedule_time = result.success.booking.schedule_time;
                            if (_this.relativeId != '') {
                                _this.display_relative = 'Customer';
                                var param_1 = new FormData();
                                param_1.append("customer_id", _this.relativeId);
                                _this.data.getCustInfo(param_1).subscribe(function (result) {
                                    console.log(result);
                                    if (result.status == 'OK') {
                                        _this.display_bookingInfo = true;
                                        _this.loadingCtr.dismiss();
                                        _this.bookingInfo_name = result.success.customer[0].first_name + ' ' + result.success.customer[0].last_name;
                                        _this.bookingInfo_phone = result.success.customer[0].phone;
                                    }
                                });
                            }
                            else {
                                _this.display_bookingInfo = true;
                                _this.loadingCtr.dismiss();
                            }
                        }
                        else {
                            _this.data.presentToast('Something went Wrong!');
                        }
                    });
                }
                else if (role == 2) {
                    var param = new FormData();
                    param.append("booking_id", _this.bookingId);
                    _this.data.getcurrentBooking(param).subscribe(function (result) {
                        if (result.status == 'OK') {
                            _this.booking_info.source = result.success.booking.source,
                                _this.booking_info.destination = result.success.booking.destination,
                                _this.booking_info.distance = result.success.booking.distance,
                                _this.booking_info.cost = result.success.booking.cost,
                                _this.booking_info.customer_id = result.success.booking.customer_id,
                                _this.booking_info.source_lat = result.success.booking.source_lat,
                                _this.booking_info.source_lng = result.success.booking.source_long,
                                _this.booking_info.destination_lat = result.success.booking.destination_lat,
                                _this.booking_info.destination_lng = result.success.booking.destination_long,
                                _this.booking_info.booking_id = result.success.booking.id,
                                _this.booking_info.driver_id = result.success.booking.driver_id,
                                _this.booking_info.pickup_date = result.success.booking.pickup_date,
                                _this.booking_info.schedule_time = result.success.booking.schedule_time;
                            if (_this.relativeId != '') {
                                _this.display_relative = 'Driver';
                                var param_2 = new FormData();
                                param_2.append("driver_id", _this.relativeId);
                                _this.data.getSelectedDriverInfo(param_2).subscribe(function (result) {
                                    console.log(result);
                                    if (result.status == 'OK') {
                                        _this.display_bookingInfo = true;
                                        _this.loadingCtr.dismiss();
                                        _this.bookingInfo_name = result.success.driver.first_name + ' ' + result.success.driver.last_name;
                                        _this.bookingInfo_phone = result.success.driver.phone;
                                    }
                                });
                            }
                            else {
                                _this.display_bookingInfo = true;
                                _this.loadingCtr.dismiss();
                            }
                        }
                        else {
                            _this.data.presentToast('Something went Wrong!');
                        }
                    });
                }
            });
        }
        // this.loadingCtr.dismiss();
    }
    ModalpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalpagePage');
    };
    ModalpagePage.prototype.ionViewDidEnter = function () {
        this.showClose = true;
    };
    ModalpagePage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.leave == false) {
                _this.data.presentToast('You can not leave this page untill you receive payment.');
                reject();
            }
            else {
                resolve();
            }
        });
    };
    ModalpagePage.prototype.close = function () {
        if (this.modalAct == 'this.modalAct') {
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    ModalpagePage.prototype.leavePage = function (decision) {
        this.viewCtrl.dismiss(decision);
    };
    /*selectDriver(Did)
    {
      this.viewCtrl.dismiss(Did);
    }*/
    ModalpagePage.prototype.signout = function () {
        this.viewCtrl.dismiss(true);
        //this.navCtrl.setRoot(SigninPage);
    };
    /*ride(ride)
    {
      console.log(ride);
      if(ride == 'now')
      {
        this.viewCtrl.dismiss(ride);
      }
      else{
        this.modalAct = 'getDateTime';
      }
    }*/
    ModalpagePage.prototype.gotHome = function () {
        console.log(this.myDate);
        console.log(this.myTime);
        if (this.myDate && this.myTime) {
            var data = [this.myDate, this.myTime];
            this.viewCtrl.dismiss(data);
        }
    };
    ModalpagePage.prototype.callDriver = function (phone) {
        var _this = this;
        var msg = 'Do you want to call Driver?';
        this.service.presentConfirmationAlert(msg).then(function (data) {
            if (data == true) {
                _this.callNumber.callNumber(phone, true)
                    .then(function (res) { return console.log('Launched dialer!', res); })
                    .catch(function (err) { return console.log('Error launching dialer', err); });
            }
            else {
            }
        });
    };
    /*gotoTransactions()
    {
      if(this.fromDate && this.toDate)
      {
        var data = [this.fromDate,this.toDate];
        this.viewCtrl.dismiss(data);
      }
    }*/
    /*accept_req()
    {
        let param = new FormData();
        param.append("driver_id",this.booking_info.driver_id);
        param.append("customer_id",this.booking_info.customer_id);
        param.append("booking_id",this.booking_info.booking_id);
          this.data.driverAcceptBooking(param).subscribe(result=>{
          if(result.status == "OK")
          {
            this.data.presentToast('Booking Confirmation Successfull!');
              let param1 = new FormData();
              param1.append("action",'booking_response');
              param1.append("select_driver_Id",this.booking_info.driver_id);
              param1.append("customer_id",this.booking_info.customer_id);
              param1.append("booking_id",this.booking_info.booking_id);
  
              this.data.DriverpostNotification(param1).subscribe(result=>{
                if(result.status == "ERROR")
                {
                  this.data.presentToast('Notification fail!');
                }
                else
                {
                  this.data.presentToast('Notification success!');
                }
              });
            this.data.presentToast('Request accepted successfully!');
            this.viewCtrl.dismiss();
          }
        });
    }
  
    reject_req()
    {
      let param = new FormData();
      param.append("driver_id",this.booking_info.driver_id);
      param.append("customer_id",this.booking_info.customer_id);
      param.append("booking_id",this.booking_info.booking_id);
        this.data.driverRejectBooking(param).subscribe(result=>{
          if(result.status == "OK")
          {
            this.data.presentToast('Booking Confirmation Successfull!');
              let param1 = new FormData();
              param1.append("action",'booking_response');
              param1.append("select_driver_Id",this.booking_info.driver_id);
              param1.append("customer_id",this.booking_info.customer_id);
              param1.append("booking_id",this.booking_info.booking_id);
  
              this.data.DriverpostNotification(param1).subscribe(result=>{
                if(result.status == "ERROR")
                {
                  this.data.presentToast('Notification fail!');
                }
                else{
                  this.data.presentToast('Notification success!');
                }
              });
              this.data.presentToast('Request Rejected successfully!');
              this.viewCtrl.dismiss();
          }
        });
    }
  */
    ModalpagePage.prototype.cashPaymentReceived = function (isPaid) {
        this.leave = true;
        if (isPaid == 'yes') {
            this.viewCtrl.dismiss('yes');
        }
    };
    ModalpagePage.prototype.add_social_account = function () {
        //alert(this.social_account_details['google']);
        /*let param = new FormData();
        param.append("google",this.social_account_details['google']);
        param.append("facebook",this.social_account_details['facebook']);
        param.append("twitter",this.social_account_details['twitter']);
        param.append("instagram",this.social_account_details['instagram']);*/
        // alert(this.social_account_details['facebook']);
        this.viewCtrl.dismiss(this.social_account_details);
        /*this.data.userSignUp(param).subscribe(result=>{
                 console.log(result);
                 //this.userData = result;
                 if(result.status == "ERROR")
                 {
                     this.data.presentToast(result.error.email);
                     return false;
                 }
                 else
                 {
                   this.data.presentToast('Social Medial Links stored successfully!');
                   this.viewCtrl.dismiss();
                 }
         });*/
    };
    ModalpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-modalpage',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/modalpage/modalpage.html"*/'<!--\n  Generated template for the ModalpagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n  <ion-navbar color="sideMenu" hideBackButton>\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>modalpage</ion-title>\n  </ion-navbar>\n</ion-header>-->\n\n<ion-content padding>\n  <ion-card> \n    <!--<div text-center *ngIf="showClose == false">Loading...</div>-->\n    <ion-grid *ngIf="modalAct==\'driverInfo\' && display_bookingInfo == true">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col class="profile_header" col-12 text-center>\n          <p>You\'ve got a</p>\n          <h3>Driver</h3>\n        </ion-col>\n        <ion-col col-6>\n          <div class="profile_imgDiv">\n            <img src="{{driver.profile}}" />\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div class="vehicle_imgDiv">\n              <img src="assets/imgs/img1.png" />\n          </div>\n        </ion-col>    \n        <ion-col col-12>\n          <div class="personalInfoDiv">\n            <div>\n              <h4>Personal Information</h4>\n            </div>\n            <ion-row>\n              <ion-col col-4>\n                <div class="Info_title">Name : </div>\n              </ion-col>\n              <ion-col col-8>\n                <div class="Info_desc">{{driver.fname}} {{driver.lname}}</div>\n              </ion-col>\n              <ion-col col-4>\n                <div class="Info_title">Phone : </div>\n              </ion-col>\n              <ion-col col-8>\n                <div class="Info_desc" (click)="callDriver(driver.phone)">{{driver.phone}}</div>\n              </ion-col>\n              <ion-col col-4>\n                <div class="Info_title">Email : </div> \n              </ion-col>\n              <ion-col col-8>\n                <div text-wrap class="Info_desc">{{driver.email}}</div>\n              </ion-col>\n              <ion-col col-4>\n                <div class="Info_title">Ratings : </div> \n              </ion-col>\n              <ion-col col-8>\n                <div class="Info_desc">\n                  <rating\n                      [(ngModel)]="driver.rate" \n                      readOnly="true"\n                      max="5"\n                      emptyStarIconName="star-outline"\n                      halfStarIconName="star-half"\n                      starIconName="star"\n                      nullable="false">\n                     </rating>\n                    <!--<ion-icon name="star"></ion-icon>\n                    <ion-icon name="star"></ion-icon>\n                    <ion-icon name="star"></ion-icon>\n                    <ion-icon name="star"></ion-icon>\n                    <ion-icon name="star"></ion-icon>-->\n                  </div>\n              </ion-col>\n            </ion-row>\n\n            <!--<div class="Info_title">Arrives In : </div>\n            <div class="Info_desc">5 min</div>--> \n          </div>     \n        </ion-col>\n        <!--<ion-col class="btn_div" col-12>\n            <button class="login-btn selectDriverbtn" (click)="selectDriver(driverId)" ion-button color="primary" block >Select</button>\n        </ion-col>-->\n      </ion-row>\n    </ion-grid>\n\n\n    <ion-grid *ngIf="modalAct==\'signout\'">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12>\n          <div class="signoutimgdiv">\n            <img src="assets/imgs/logout.png" />\n          </div>\n        </ion-col>\n        <ion-col col-12>\n          <div class="signoutcontentdiv" text-center>\n            <h5>Do you really want to</h5>\n            <h1> Sign out </h1>\n          </div>\n        </ion-col>\n        <ion-col col-12>\n          <ion-grid>\n            <ion-row>\n                <ion-col col-6>\n                  <button class="login-btn" (click)="signout()" ion-button color="primary" block >Yes</button>\n                </ion-col>\n                <ion-col col-6>\n                  <button class="login-btn" (click)="close()" ion-button color="primary" block >No</button>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  \n    <ion-grid *ngIf="modalAct==\'getDateTime\'">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12>   \n          <div class="datetimeDiv">   \n            <ion-list>\n              <ion-item >\n                  <ion-label class="d_label" floating>Select Date</ion-label>\n                  <ion-datetime displayFormat="DD/MM/YYYY" [min]="minDate" [(ngModel)]="myDate" (ngModelChange)=\'gotHome()\'></ion-datetime>\n              </ion-item>\n              <ion-item>\n                  <ion-label class="d_label" floating>Select Time</ion-label>\n                  <ion-datetime displayFormat="HH:mm" [(ngModel)]="myTime" (ngModelChange)=\'gotHome()\'></ion-datetime>\n              </ion-item>\n            </ion-list>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf="modalAct==\'showBooking\' && display_bookingInfo == true">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12>\n          <div class="pin_icon" text-center>\n              <ion-icon name="pin"></ion-icon>\n          </div>\n        </ion-col>\n        <ion-col col-12>\n          <div class="showBookingDiv">\n            <ion-row class="addrSection">\n              <ion-col col-12 text-left>\n                <ion-icon class="nav_left" name="navigate"></ion-icon>\n                <span>From</span>\n                <div text-left class="pickupaddr">{{booking_info.source}}</div>\n              </ion-col> \n              <ion-col col-12 text-left >\n                <ion-icon class="nav_right" name="navigate"></ion-icon>\n                <span>To</span>\n                <div text-left class="dropaddr">{{booking_info.destination}}</div>\n              </ion-col>\n            </ion-row>\n            \n            <ion-row class="otherInfoDiv">\n                <ion-col class="otherTitle" col-6>Distance</ion-col>\n                <ion-col class="otherTitle" col-6>Cost</ion-col>\n                <ion-col class="otherDescription" col-6>{{booking_info.distance}}</ion-col>\n                <ion-col class="otherDescription" col-6>${{booking_info.cost}}</ion-col>\n            </ion-row>\n\n            <ion-row class="customerInfoDiv" *ngIf="display_relative != \'\'">\n              <ion-item >\n                <h2>{{display_relative}} Information</h2>\n                <div class="custInfoDiv">\n                  <h3>{{bookingInfo_name}}</h3>\n                  <p><ion-icon name="call"></ion-icon> {{bookingInfo_phone}} </p>\n                </div>\n              </ion-item>\n            </ion-row>\n\n            <!--<ion-row>\n                <ion-col col-6>\n                  <button (click)=\'accept_req()\' class="login-btn accept_btn" ion-button color="primary" block >Accept</button>\n                </ion-col>\n                <ion-col col-6>\n                  <button (click)=\'reject_req()\' class="login-btn decline_btn" ion-button color="primary" block >Decline</button>\n                </ion-col>\n            </ion-row>-->\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    \n    <ion-grid *ngIf="modalAct==\'addSocialaccount\'">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12>\n          <form class="social_media_form" [formGroup]="social_account" (ngSubmit)="add_social_account()"> \n            <ion-list no-lines>\n\n              <ion-item>\n                <ion-label floating>Facebook</ion-label>\n                <ion-input [(ngModel)]="social_account_details.facebook" formControlName="facebook" type="text"></ion-input>\n              </ion-item>\n              <div class="error" *ngIf="social_account.get(\'facebook\').hasError(\'pattern\') ">\n                Please enter valid link\n              </div>\n\n              <ion-item>\n                <ion-label floating>Twitter</ion-label>\n                <ion-input [(ngModel)]="social_account_details.twitter" formControlName="twitter" type="text"></ion-input>\n              </ion-item>\n              <div class="error" *ngIf="social_account.get(\'twitter\').hasError(\'pattern\') ">\n                Please enter valid link\n              </div>\n\n              <ion-item>\n                <ion-label floating>Instagram</ion-label>\n                <ion-input [(ngModel)]="social_account_details.instagram" formControlName="instagram" type="text"></ion-input>\n              </ion-item>\n              <div class="error" *ngIf="social_account.get(\'instagram\').hasError(\'pattern\') ">\n                Please enter valid link\n              </div>\n\n              <ion-item>\n                <ion-label floating>LinkedIn</ion-label>\n                <ion-input [(ngModel)]="social_account_details.linkedin" formControlName="linkedin" type="text"></ion-input>\n              </ion-item>\n              <div class="error" *ngIf="social_account.get(\'linkedin\').hasError(\'pattern\') ">\n                Please enter valid link\n              </div>\n\n              <ion-item class="submit_btn_item">\n                <button class="sign_up-btn" ion-button color="primary" block [disabled]="!this.social_account.valid">Save</button>\n              </ion-item>\n\n            </ion-list>\n          </form>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf="modalAct==\'showFeedback\'">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12 class="showFeedback">\n          <h1>Feedback</h1>\n          <h2>{{feedback}}</h2>\n        </ion-col>\n        <ion-col col-12>\n          <ion-icon name="star" [ngClass]="rating > 0 ? \'r_star\' : \'n_start\'"></ion-icon>\n          <ion-icon name="star" [ngClass]="rating > 1 ? \'r_star\' : \'n_start\'"></ion-icon>\n          <ion-icon name="star" [ngClass]="rating > 2 ? \'r_star\' : \'n_start\'"></ion-icon>\n          <ion-icon name="star" [ngClass]="rating > 3 ? \'r_star\' : \'n_start\'"></ion-icon>\n          <ion-icon name="star" [ngClass]="rating > 4 ? \'r_star\' : \'n_start\'"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n    <ion-grid *ngIf="modalAct==\'leaveAlert\'">\n      <ion-row>\n        <ion-col col-12>\n          <div class="signoutimgdiv">\n            <img src="assets/imgs/logout.png" />\n          </div>\n        </ion-col>\n        <ion-col col-12>\n          <div class="signoutcontentdiv" text-center>\n            <h5>Do you really want to</h5>\n            <h1> Leave this page? </h1>\n          </div>\n        </ion-col>\n        <ion-col col-12>\n          <ion-grid>\n            <ion-row>\n                <ion-col col-6>\n                  <button class="login-btn" (click)="leavePage(\'yes\')" ion-button color="primary" block >Yes</button>\n                </ion-col>\n                <ion-col col-6>\n                  <button class="login-btn" (click)="leavePage(\'no\')" ion-button color="primary" block >No</button>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf="modalAct==\'cashPayment\' && display_bookingInfo == true">\n        <ion-label *ngIf="modalAct!=\'cashPayment\'" class="close" text-right (click)="close()">\n            <ion-icon name="close"></ion-icon>\n        </ion-label>\n      <ion-row>\n        <ion-col col-12>\n          <div class="pin_icon" text-center>\n              <ion-icon name="pin"></ion-icon>\n          </div>.\n        </ion-col>\n        <ion-col col-12>\n          <div class="showBookingDiv cashDiv">\n            <ion-row class="addrSection">\n              <ion-col col-12 text-left>\n                <ion-icon class="nav_left" name="navigate"></ion-icon>\n                  <span>From</span>\n                  <div text-left class="pickupaddr">{{booking_info.source}}</div>\n                </ion-col> \n                <ion-col col-12 text-left >\n                  <ion-icon class="nav_right" name="navigate"></ion-icon>\n                  <span>To</span>\n                  <div text-left class="dropaddr">{{booking_info.destination}}</div>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class="otherInfoDiv">\n                <ion-col class="otherTitle" col-6>Distance</ion-col>\n                <ion-col class="otherTitle" col-6>Cost</ion-col>\n                <ion-col class="otherDescription" col-6>{{booking_info.distance}}</ion-col>\n                <ion-col class="otherDescription" col-6>${{booking_info.cost}}</ion-col>\n            </ion-row>\n\n            <!--<ion-row class="customerInfoDiv">\n              <ion-card >\n                <h2>Customer Information</h2>\n                <div class="custInfoDiv">\n                  <h3>Swapnil Pathade</h3>\n                  <p><ion-icon name="call"></ion-icon> 9876543234 </p>\n                </div>\n              </ion-card>\n            </ion-row>-->\n            <ion-row>\n              <ion-col col-12>\n                <br/>\n              </ion-col>\n            </ion-row>\n\n            <ion-row>\n                <ion-col col-12>\n                  <button (click)=\'cashPaymentReceived("yes")\' class="login-btn accept_btn" ion-button color="primary" block >Payment Received</button>\n                </ion-col>\n                <!--<ion-col col-6>\n                  <button (click)=\'reject_req()\' class="login-btn decline_btn" ion-button color="primary" block >Decline</button>\n                </ion-col>-->\n            </ion-row>\n          </div>\n        </ion-col>\n        </ion-row>\n    </ion-grid>\n\n  </ion-card>    \n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/modalpage/modalpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_service_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], ModalpagePage);
    return ModalpagePage;
}());

//# sourceMappingURL=modalpage.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_web_animations_js_web_animations_min__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_web_animations_js_web_animations_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_web_animations_js_web_animations_min__);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_geocoder__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_page_transitions__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_paypal__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_android_permissions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_signup_signup__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_customer_profile_customer_profile__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_map_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_edit_profile_edit_profile__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_password_reset_password_reset__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_autocomplete_autocomplete__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_intro_intro__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_help_help__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_ride_now_ride_now__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_forgotpasswoed_forgotpasswoed__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_emailverification_emailverification__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_common_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_http__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_camera__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_connectivity_service_connectivity_service__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_network__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_google_maps_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_transfer__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_file_path__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_upload_profile_upload_profile__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_ride_later_ride_later__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_paymentwallet_paymentwallet__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_driversetting_driversetting__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_bookinghistory_bookinghistory__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_confirm_payment_confirm_payment__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_booking_list_booking_list__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_delivery_delivery__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_feedback_feedback__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_ionic2_rating__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_payment_payment__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_notifications_notifications__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_driver_transactions_driver_transactions__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_intro_intro_module__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_forgotpasswoed_forgotpasswoed_module__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_emailverification_emailverification_module__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_help_help_module__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_customer_profile_customer_profile_module__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_edit_profile_edit_profile_module__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_map_map_module__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_password_reset_password_reset_module__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_settings_settings_module__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_signup_signup_module__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_upload_profile_upload_profile_module__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_autocomplete_autocomplete_module__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pages_ride_now_ride_now_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_ride_later_ride_later_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_paymentwallet_paymentwallet_module__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_driversetting_driversetting_module__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_bookinghistory_bookinghistory_module__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_modalpage_modalpage_module__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_confirm_payment_confirm_payment_module__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__pages_booking_list_booking_list_module__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_delivery_delivery_module__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__pages_feedback_feedback_module__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__pages_payment_payment_module__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__pages_package_booking_package_booking_module__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__pages_package_booking_package_booking__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__pages_notifications_notifications_module__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__providers_service_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__pages_driver_transactions_driver_transactions_module__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__angular_common__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__ionic_native_aes_256__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























































































var AppModule = /** @class */ (function () {
    function AppModule(config) {
        //config.setTransition('fade', FadeTansition);
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__["a" /* SigninPage */]
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
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_34__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_57__pages_intro_intro_module__["IntroPageModule"],
                __WEBPACK_IMPORTED_MODULE_58__pages_forgotpasswoed_forgotpasswoed_module__["ForgotpasswoedPageModule"],
                __WEBPACK_IMPORTED_MODULE_59__pages_emailverification_emailverification_module__["EmailverificationPageModule"],
                __WEBPACK_IMPORTED_MODULE_61__pages_customer_profile_customer_profile_module__["CustomerProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_62__pages_edit_profile_edit_profile_module__["EditProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_63__pages_map_map_module__["MapPageModule"],
                __WEBPACK_IMPORTED_MODULE_64__pages_password_reset_password_reset_module__["PasswordResetPageModule"],
                __WEBPACK_IMPORTED_MODULE_65__pages_settings_settings_module__["SettingsPageModule"],
                __WEBPACK_IMPORTED_MODULE_60__pages_help_help_module__["HelpPageModule"],
                __WEBPACK_IMPORTED_MODULE_66__pages_signup_signup_module__["SignupPageModule"],
                __WEBPACK_IMPORTED_MODULE_67__pages_upload_profile_upload_profile_module__["UploadProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_68__pages_autocomplete_autocomplete_module__["AutocompletePageModule"],
                __WEBPACK_IMPORTED_MODULE_35__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_69__pages_ride_now_ride_now_module__["RideNowPageModule"],
                __WEBPACK_IMPORTED_MODULE_70__pages_ride_later_ride_later_module__["RideLaterPageModule"],
                __WEBPACK_IMPORTED_MODULE_71__pages_paymentwallet_paymentwallet_module__["PaymentwalletPageModule"],
                __WEBPACK_IMPORTED_MODULE_72__pages_driversetting_driversetting_module__["DriversettingPageModule"],
                __WEBPACK_IMPORTED_MODULE_73__pages_bookinghistory_bookinghistory_module__["BookinghistoryPageModule"],
                __WEBPACK_IMPORTED_MODULE_74__pages_modalpage_modalpage_module__["ModalpagePageModule"],
                __WEBPACK_IMPORTED_MODULE_75__pages_confirm_payment_confirm_payment_module__["ConfirmPaymentPageModule"],
                __WEBPACK_IMPORTED_MODULE_80__pages_package_booking_package_booking_module__["PackageBookingPageModule"],
                __WEBPACK_IMPORTED_MODULE_76__pages_booking_list_booking_list_module__["BookingListPageModule"],
                __WEBPACK_IMPORTED_MODULE_77__pages_delivery_delivery_module__["DeliveryPageModule"],
                __WEBPACK_IMPORTED_MODULE_78__pages_feedback_feedback_module__["FeedbackPageModule"],
                __WEBPACK_IMPORTED_MODULE_53_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_79__pages_payment_payment_module__["PaymentPageModule"],
                __WEBPACK_IMPORTED_MODULE_82__pages_notifications_notifications_module__["NotificationsPageModule"],
                __WEBPACK_IMPORTED_MODULE_84__pages_driver_transactions_driver_transactions_module__["DriverTransactionsPageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */], {
                    preloadModules: true,
                    pageTransition: 'fade'
                }, {
                    links: [
                        { loadChildren: '../pages/autocomplete/autocomplete.module#AutocompletePageModule', name: 'AutocompletePage', segment: 'autocomplete', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/booking-list/booking-list.module#BookingListPageModule', name: 'BookingListPage', segment: 'booking-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bookinghistory/bookinghistory.module#BookinghistoryPageModule', name: 'BookinghistoryPage', segment: 'bookinghistory', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/confirm-payment/confirm-payment.module#ConfirmPaymentPageModule', name: 'ConfirmPaymentPage', segment: 'confirm-payment', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-profile/customer-profile.module#CustomerProfilePageModule', name: 'CustomerProfilePage', segment: 'customer-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/delivery/delivery.module#DeliveryPageModule', name: 'DeliveryPage', segment: 'delivery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/driver-transactions/driver-transactions.module#DriverTransactionsPageModule', name: 'DriverTransactionsPage', segment: 'driver-transactions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/driversetting/driversetting.module#DriversettingPageModule', name: 'DriversettingPage', segment: 'driversetting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-profile/edit-profile.module#EditProfilePageModule', name: 'EditProfilePage', segment: 'edit-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/emailverification/emailverification.module#EmailverificationPageModule', name: 'EmailverificationPage', segment: 'emailverification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgotpasswoed/forgotpasswoed.module#ForgotpasswoedPageModule', name: 'ForgotpasswoedPage', segment: 'forgotpasswoed', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/help/help.module#HelpPageModule', name: 'HelpPage', segment: 'help', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutPageModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modalpage/modalpage.module#ModalpagePageModule', name: 'ModalpagePage', segment: 'modalpage', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/package-booking/package-booking.module#PackageBookingPageModule', name: 'PackageBookingPage', segment: 'package-booking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/password-reset/password-reset.module#PasswordResetPageModule', name: 'PasswordResetPage', segment: 'password-reset', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/payment/payment.module#PaymentPageModule', name: 'PaymentPage', segment: 'payment', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/paymentwallet/paymentwallet.module#PaymentwalletPageModule', name: 'PaymentwalletPage', segment: 'paymentwallet', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ride-later/ride-later.module#RideLaterPageModule', name: 'RideLaterPage', segment: 'ride-later', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ride-now/ride-now.module#RideNowPageModule', name: 'RideNowPage', segment: 'ride-now', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload-profile/upload-profile.module#UploadProfilePageModule', name: 'UploadProfilePage', segment: 'upload-profile', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_33__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_customer_profile_customer_profile__["a" /* CustomerProfilePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_password_reset_password_reset__["a" /* PasswordResetPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_autocomplete_autocomplete__["a" /* AutocompletePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_intro_intro__["a" /* IntroPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_forgotpasswoed_forgotpasswoed__["a" /* ForgotpasswoedPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_emailverification_emailverification__["a" /* EmailverificationPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_upload_profile_upload_profile__["a" /* UploadProfilePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_ride_now_ride_now__["a" /* RideNowPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_ride_later_ride_later__["a" /* RideLaterPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_paymentwallet_paymentwallet__["a" /* PaymentwalletPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_driversetting_driversetting__["a" /* DriversettingPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_bookinghistory_bookinghistory__["a" /* BookinghistoryPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_modalpage_modalpage__["a" /* ModalpagePage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_booking_list_booking_list__["a" /* BookingListPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_delivery_delivery__["a" /* DeliveryPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_81__pages_package_booking_package_booking__["a" /* PackageBookingPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_driver_transactions_driver_transactions__["a" /* DriverTransactionsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_37__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_file_path__["a" /* FilePath */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_32__providers_data_data__["a" /* DataProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_39__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_page_transitions__["a" /* NativePageTransitions */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_paypal__["a" /* PayPal */],
                __WEBPACK_IMPORTED_MODULE_83__providers_service_service__["a" /* ServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_85__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_86__ionic_native_aes_256__["a" /* AES256 */]
            ]
        })
        //export class AppModule {} 
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Config */]])
    ], AppModule);
    return AppModule;
}());

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
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__autocomplete_autocomplete__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ride_now_ride_now__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ride_later_ride_later__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_page_transitions__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__confirm_payment_confirm_payment__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__feedback_feedback__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var HomePage = /** @class */ (function () {
    function HomePage(backgroundMode, androidPermissions, inAppBrowser, nativePageTransitions, oneSignal, loading, device, actionSheetCtrl, eve, navCtrl, modalCtrl, storage, data, geolocation, navParams, zone, maps, platform, viewCtrl) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.androidPermissions = androidPermissions;
        this.inAppBrowser = inAppBrowser;
        this.nativePageTransitions = nativePageTransitions;
        this.oneSignal = oneSignal;
        this.loading = loading;
        this.device = device;
        this.actionSheetCtrl = actionSheetCtrl;
        this.eve = eve;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.data = data;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.query = '';
        this.dest_query = '';
        this.places = [];
        this.dest_places = [];
        this.vehicle_type = '';
        this.marker = [];
        this.selectdId = '';
        this.isnowenabled = false;
        this.endRide = false;
        this.islaterenabled = false;
        this.ride_date = '';
        this.ride_time = '';
        this.drivers = [];
        this.markers = [];
        this.ref = __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('geolocations/');
        this.chkPickup = 0;
        this.displaydistance = false;
        this.eve_unsub = 'true';
        this.leave = true;
        this.isAvailable = true;
        this.isNearby = [];
        this.backgroundMode.enable();
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(function (result) {
            console.log('Has permission?', result.hasPermission);
            //alert('result.hasPermission==>'+result.hasPermission);
            if (result.hasPermission == false) {
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);
            }
        }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION); });
        this.data.isRide = 'yes';
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.yourId = _this.id;
            _this.role = data[0].role;
        });
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.active = '';
        this.calculated_distance = '0 km';
        this.action = {
            pickup: 'pickup',
            drop: 'drop'
        };
        this.cost = {
            economy_cost: 0,
            comfort_cost: 0,
            business_cost: 0
        };
        this.address = {
            place: '',
            drop_place: ''
        };
        this.eve.subscribe('live_tracking:created', function (live_tracking_data, time) {
            console.log("FIRST TIME " + _this.id);
            _this.leave = false;
            _this.isnowenabled = true;
            _this.watchMethod(live_tracking_data);
            _this.liveRide_bookingId = live_tracking_data.booking_id;
            _this.liveRide_customerId = live_tracking_data.customer_id;
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.id).set({ 'status': 'live_tracking', 'booking_id': live_tracking_data.booking_id });
            _this.eve.unsubscribe('live_tracking:created');
            var param = new FormData();
            param.append("booking_id", _this.liveRide_bookingId);
            _this.data.getBookingDetails(param).subscribe(function (result) {
                if (result.status == "OK") {
                    _this.maps.startNavigating(result.success.booking.source, result.success.booking.destination, _this.directionsPanel.nativeElement);
                }
            });
            _this.data.AvailableToggle().subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    console.log(result.success.available);
                    if (result.success.available == 'Driver set to On') { }
                    else { }
                }
                else {
                    _this.data.presentToast('Error');
                }
            });
        });
        this.eve.subscribe('cancelled_request:created', function (cancelled_request, time) {
            /*if(this.watch2){
              this.watch2.unsubscribe();
            }*/
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.id).remove();
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref(_this.liveRide_bookingId).remove();
            _this.leave = true;
            _this.data.presentToast('Request cancelled by customer');
            _this.eve.unsubscribe('cancelled_request:created');
            setTimeout(function () {
                _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
            }, 3000);
            _this.data.AvailableToggle().subscribe(function (result) {
                console.log(result);
                if (result.status == 'OK') {
                    console.log(result.success.available);
                    if (result.success.available == 'Driver set to On') { }
                    else { }
                }
                else {
                    _this.data.presentToast('Error');
                }
            });
        });
        this.eve.subscribe('selected_Cash_Payment:created', function (selected_Cash_Payment, time) {
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.id).set({ 'status': 'cashPayment', 'booking_id': selected_Cash_Payment.booking_id });
            _this.leave = true;
            _this.cashPaymentReceived(selected_Cash_Payment);
        });
        this.eve.subscribe('selected_Other_Payment:created', function (selected_Other_Payment, time) {
            //firebase.database().ref('driver/'+this.id).remove();
            //firebase.database().ref(this.liveRide_bookingId).remove();
            _this.otherPaymentReceived(selected_Other_Payment);
        });
        loader.dismiss();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //console.log(new Date("2019-02-01" + ' ' + "12:15"));
        //console.log(new Date(new Date("2019-02-01" + ' ' + "12:15")).toISOString());
        console.log("First log");
        google.maps.event.trigger(this.maps.map, 'resize');
        setTimeout(function () {
            _this.maps.init(_this.mapElement.nativeElement, _this.pleaseConnect.nativeElement).then(function (data) {
                _this.map = data;
                _this.autocompleteService = new google.maps.places.AutocompleteService();
                _this.searchDisabled = false;
                console.log("Middle log");
            });
        }, 3000);
        console.log("Last log");
        this.eve.subscribe('ride_later_alert:created', function (ride_later_alert, time) {
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('customer/' + _this.id).set({ 'status': 'live_tracking', 'booking_id': ride_later_alert.booking_id });
            _this.leave = false;
            _this.eve.unsubscribe('ride_later_alert');
            var pick_up;
            var drop;
            var param = new FormData();
            param.append("booking_id", ride_later_alert.booking_id);
            _this.data.getcurrentBooking(param).subscribe(function (result) {
                console.log(result);
                if (result.status == "OK") {
                    pick_up = result.success.booking.source;
                    drop = result.success.booking.destination;
                    _this.goToConfirmPage(ride_later_alert.booking_id, pick_up, drop);
                }
                else {
                    _this.data.presentToast('Error');
                }
            });
        });
        this.eve.subscribe('distance:created', function (distance, time) {
            _this.calculated_distance = distance;
            _this.displaydistance = true;
            var param = new FormData();
            var x = _this.calculated_distance.split("km");
            x = x[0].split("m");
            x = x[0].replace(",", "");
            param.append("distance", x);
            if (_this.role == 2) {
                _this.data.getCost(param).subscribe(function (result) {
                    if (result.status == "ERROR") {
                        return false;
                    }
                    else {
                        _this.cost = {
                            economy_cost: Number((result.success.trip_costs[0].cost).toFixed(2)),
                            comfort_cost: Number((result.success.trip_costs[1].cost).toFixed(2)),
                            business_cost: Number((result.success.trip_costs[2].cost).toFixed(2))
                        };
                    }
                });
            }
        });
    };
    HomePage.prototype.ngOnDestroy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.role == 2) {
                /*if(this.eve_unsub) {
                  this.eve.unsubscribe('ride_later_alert:created');
                  this.eve.unsubscribe('selected_Other_Payment:created');
                  this.eve_unsub = undefined;
                }
                 
                if(this.sub){
                  this.sub.unsubscribe();
                }*/
                _this.eve.unsubscribe('distance');
                _this.backgroundMode.disable();
                resolve();
            }
            else if (_this.role == 3) {
                if (_this.leave == false) {
                    _this.data.presentToast('You can not leave this page until Ride Complete');
                    reject();
                }
                else {
                    resolve();
                }
            }
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.yourId = _this.id;
            _this.role = data[0].role;
            _this.getLatLng().then(function (points) {
                _this.lat = points[0];
                _this.long = points[1];
                if (data[0].role == 2) {
                    _this.getStatusDataforCustomer().then(function (data_val) {
                        _this.loadingCtr = _this.loading.create({
                            content: "Please wait...",
                            spinner: 'crescent'
                        });
                        _this.loadingCtr.present();
                        var param = new FormData();
                        param.append("booking_id", data_val['booking_id']);
                        _this.data.getcurrentBooking(param).subscribe(function (result) {
                            console.log(result);
                            if (result.status == "OK") {
                                if (data_val['status'] == 'waiting') {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': result.success.booking.id, rideType: 'now', source: result.success.booking.source, destination: result.success.booking.destination, status: data_val['status'] }).then(function () {
                                        _this.loadingCtr.dismiss();
                                    });
                                }
                                else if (data_val['status'] == 'ongoing') {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': result.success.booking.id, rideType: 'now', source: result.success.booking.source, destination: result.success.booking.destination, status: data_val['status'], driver_id: result.success.booking.booking_details[0].driver_id }).then(function () {
                                        _this.loadingCtr.dismiss();
                                    });
                                }
                                else if (data_val['status'] == 'payment') {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': result.success.booking.id, rideType: 'now', source: result.success.booking.source, destination: result.success.booking.destination, status: data_val['status'], driver_id: result.success.booking.booking_details[0].driver_id }).then(function () {
                                        _this.loadingCtr.dismiss();
                                    });
                                }
                            }
                            else {
                                _this.data.presentToast('Error');
                                _this.loadingCtr.dismiss();
                            }
                        });
                    });
                    _this.getPickup().then(function (data) {
                        _this.address.place = data;
                    });
                    _this.data.getvehicletypesforCustomers().subscribe(function (result) {
                        if (result.status == 'OK') {
                            _this.vehicle_types = result.success.vehicletypes;
                        }
                        else {
                            _this.data.presentToast(result.status);
                        }
                    });
                    var param = new FormData();
                    param.append("latitude", points[0]);
                    param.append("longitude", points[1]);
                    _this.data.storeCustomerLocation(param).subscribe(function (result) {
                        if (result.status == "ERROR") {
                            _this.data.presentToast('Not Able to get your current location');
                        }
                        else { }
                    });
                    var param1 = _this.id;
                    _this.data.getCustomerProfile(param1).subscribe(function (result) {
                        if (result.status == 'OK') {
                            if (result.success.profile.customer_details.facebook_profile != undefined && result.success.profile.customer_details.facebook_profile && result.success.profile.customer_details.facebook_profile != 'undefined') {
                                _this.facebook_link = result.success.profile.facebook_profile;
                            }
                            else {
                                _this.facebook_link = '';
                            }
                            if (result.success.profile.customer_details.twitter_profile != undefined && result.success.profile.customer_details.twitter_profile && result.success.profile.customer_details.twitter_profile != 'undefined') {
                                _this.twitter_link = result.success.profile.customer_details.twitter_profile;
                            }
                            else {
                                _this.twitter_link = '';
                            }
                            if (result.success.profile.customer_details.instagram_profile != undefined && result.success.profile.customer_details.instagram_profile && result.success.profile.customer_details.instagram_profile != 'undefined') {
                                _this.instagram_link = result.success.profile.customer_details.instagram_profile;
                            }
                            else {
                                _this.instagram_link = '';
                            }
                            if (result.success.profile.customer_details.linkedin_profile != undefined && result.success.profile.customer_details.linkedin_profile && result.success.profile.customer_details.linkedin_profile != 'undefined') {
                                _this.linkedin_link = result.success.profile.customer_details.linkedin_profile;
                            }
                            else {
                                _this.linkedin_link = '';
                            }
                        }
                        else { }
                    });
                }
                if (data[0].role == 3) {
                    _this.getStatusDataforDriver().then(function (data_val) {
                        _this.loadingCtr = _this.loading.create({
                            content: "Please wait...",
                            spinner: 'crescent'
                        });
                        var param = new FormData();
                        param.append("booking_id", data_val['booking_id']);
                        _this.data.getBookingInfo(param).subscribe(function (result) {
                            if (result.status == "OK") {
                                if (data_val['status'] == 'live_tracking') {
                                    console.log("SECOND TIME");
                                    var payload = { 'booking_id': data_val['booking_id'], 'customer_id': result.success.booking.customer_id };
                                    _this.eve.publish('live_tracking:created', payload, Date.now());
                                    _this.loadingCtr.dismiss();
                                }
                                else if (data_val['status'] == 'cashPayment') {
                                    var payload1 = { 'booking_id': data_val['booking_id'], 'customer_id': result.success.booking.customer_id, 'driver_id': result.success.booking.booking_details[0].driver_id, 'amount': result.success.booking.cost };
                                    _this.eve.publish('selected_Cash_Payment:created', payload1, Date.now());
                                    _this.loadingCtr.dismiss();
                                }
                                else if (data_val['status'] == 'ongoing') {
                                    var payload = { 'booking_id': data_val['booking_id'], 'customer_id': result.success.booking.customer_id };
                                    _this.eve.publish('live_tracking:created', payload, Date.now());
                                    _this.startRide();
                                    _this.loadingCtr.dismiss();
                                }
                            }
                        });
                    });
                    var param = new FormData();
                    param.append("latitude", points[0]);
                    param.append("longitude", points[1]);
                    console.log(_this.lat + '===' + _this.long);
                    _this.data.storeDriverLocation(param).subscribe(function (result) {
                        if (result.status == "ERROR") {
                            _this.data.presentToast('Not Able to get your current location');
                        }
                        else { }
                    });
                    var param1 = new FormData();
                    param1.append("latitude", points[0]);
                    param1.append("longitude", points[1]);
                    _this.data.getCloseCustomers(param1).subscribe(function (result) {
                        if (result.status == "ERROR") {
                            return false;
                        }
                        else {
                            if (result.success.customers) {
                                var address = [];
                                for (var i = 0; i < result.success.customers.length; i++) {
                                    address[i] = [];
                                    address[i]['lat'] = result.success.customers[0].latitude;
                                    address[i]['lng'] = result.success.customers[0].longitude;
                                    _this.marker[i] = new google.maps.Marker({
                                        map: _this.maps.map,
                                        //animation: google.maps.Animation.DROP,
                                        position: new google.maps.LatLng(address[i]['lat'], address[i]['lng']),
                                        icon: { url: 'assets/imgs/standing-up-man-.png',
                                            size: {
                                                width: 50,
                                                height: 55
                                            }
                                        },
                                        animation: google.maps.Animation.DROP
                                    });
                                }
                            }
                            else {
                                _this.data.presentToast('No Nearby Customers!');
                            }
                        }
                    });
                    var param2 = _this.id;
                    _this.data.getDriverProfile(param2).subscribe(function (result) {
                        if (result.status == 'OK') {
                            if (result.success.profile.driver_details.facebook_profile != undefined && result.success.profile.driver_details.facebook_profile && result.success.profile.driver_details.facebook_profile != 'undefined') {
                                _this.facebook_link = result.success.profile.driver_details.facebook_profile;
                            }
                            else {
                                _this.facebook_link = null;
                            }
                            if (result.success.profile.driver_details.twitter_profile != undefined && result.success.profile.driver_details.twitter_profile && result.success.profile.driver_details.twitter_profile != 'undefined') {
                                _this.twitter_link = result.success.profile.driver_details.twitter_profile;
                            }
                            else {
                                _this.twitter_link = null;
                            }
                            if (result.success.profile.driver_details.instagram_profile != undefined && result.success.profile.driver_details.instagram_profile && result.success.profile.driver_details.instagram_profile != 'undefined') {
                                _this.instagram_link = result.success.profile.driver_details.instagram_profile;
                            }
                            else {
                                _this.instagram_link = null;
                            }
                            if (result.success.profile.driver_details.linkedin_profile != undefined && result.success.profile.driver_details.linkedin_profile && result.success.profile.driver_details.linkedin_profile != 'undefined') {
                                _this.linkedin_link = result.success.profile.driver_details.linkedin_profile;
                            }
                            else {
                                _this.linkedin_link = null;
                            }
                        }
                        else { }
                    });
                }
            });
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.role == 2) {
                _this.data.getvehicletypesforCustomers().subscribe(function (result) {
                    if (result.status == 'OK') {
                        _this.vehicle_types = result.success.vehicletypes;
                    }
                    else {
                        _this.data.presentToast(result.status);
                    }
                });
            }
            if (_this.role == 3) {
                _this.data.getAvailableToggle().subscribe(function (result) {
                    console.log(result);
                    if (result.status == 'OK') {
                        console.log(result.success.available);
                        if (result.success.available == 'on') {
                            _this.isAvailable = true;
                        }
                        else {
                            _this.isAvailable = false;
                        }
                    }
                    else {
                        _this.data.presentToast('Error');
                    }
                });
            }
        }, 1500);
        this.storage.get('token')
            .then(function (data) {
            _this.data.token = data;
        });
    };
    HomePage.prototype.getStatusDataforCustomer = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('customer/' + _this.id).once('value', function (snapshot) {
                snapshotToArray(snapshot).forEach(function (data) {
                    var info = { 'status': data.status, 'booking_id': data.booking_id };
                    resolve(info);
                });
            });
        });
    };
    HomePage.prototype.getStatusDataforDriver = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.id).once('value', function (snapshot) {
                snapshotToArray(snapshot).forEach(function (data) {
                    var info = { 'status': data.status, 'booking_id': data.booking_id };
                    resolve(info);
                });
            });
        });
    };
    HomePage.prototype.getLatLng = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var points = [];
            var options = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0,
                distanceFilter: 1
            };
            _this.watch2 = _this.geolocation.watchPosition(options).subscribe(function (position) {
                setTimeout(function () {
                    if (position.coords !== undefined) {
                        points.push(position.coords.latitude);
                        points.push(position.coords.longitude);
                        resolve(points);
                    }
                }, 0);
                if (points.length > 0) {
                    _this.watch2.unsubscribe();
                }
            });
        });
    };
    HomePage.prototype.getPickup = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var addressFull = [];
            var geocoder = new google.maps.Geocoder();
            if (_this.lat && _this.long) {
                var latlng = { lat: parseFloat(_this.lat), lng: parseFloat(_this.long) };
                geocoder.geocode({ 'location': latlng }, function (results, status) {
                    if (status === 'OK') {
                        var address = results[0].formatted_address;
                        addressFull.push(address);
                        resolve(address);
                    }
                });
            }
        });
    };
    HomePage.prototype.goToConfirmPage = function (booking_id, pick_up, drop) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_17__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': booking_id, rideType: 'now', source: pick_up, destination: drop });
    };
    HomePage.prototype.updateActive = function (name) {
        this.active = name;
    };
    HomePage.prototype.showAddressModal = function (act) {
        var _this = this;
        this.active = '';
        this.isnowenabled = false;
        this.islaterenabled = false;
        /*if(this.watch2){
          this.watch2.unsubscribe();
        }*/
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__autocomplete_autocomplete__["a" /* AutocompletePage */], { action: act });
        var me = this;
        modal.onDidDismiss(function (data) {
            if (act == 'pickup') {
                if (data) {
                    _this.address.place = data;
                }
            }
            else {
                if (data) {
                    _this.address.drop_place = data;
                }
            }
            if (_this.address.place && _this.address.drop_place) {
                _this.maps.startNavigating(_this.address.place, _this.address.drop_place, _this.directionsPanel.nativeElement);
                _this.checkNearby().then(function () {
                    _this.display_vehicleTypes = 1;
                    console.log('this.isNearby' + _this.isNearby);
                });
            }
        });
        modal.present();
    };
    HomePage.prototype.checkNearby = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var k = 0;
            for (k; k < _this.vehicle_types.length; k++) {
                _this.checkClosure(k, _this.vehicle_types[k].type).then(function () {
                    if (k == _this.vehicle_types.length) {
                        resolve(true);
                    }
                });
            }
        });
    };
    HomePage.prototype.checkClosure = function (k, vehicle_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var param = new FormData();
            param.append("latitude", _this.lat);
            param.append("longitude", _this.long);
            param.append("vehicle_type", vehicle_type);
            _this.data.getCloseVehicles(param).subscribe(function (result) {
                if (result.status == "OK") {
                    if (result.success.drivers.length > 0) {
                        _this.isNearby[k] = true;
                        resolve(_this.isNearby[k]);
                    }
                    else {
                        _this.isNearby[k] = false;
                        resolve(_this.isNearby[k]);
                    }
                }
            });
        });
    };
    HomePage.prototype.selectVehicle = function (selected_vehicle_type, selected_cost) {
        var _this = this;
        this.isnowenabled = false;
        this.islaterenabled = false;
        this.vehicle_type = selected_vehicle_type;
        this.selected_cost = selected_cost;
        this.deleteMarkers();
        var param = new FormData();
        param.append("latitude", this.lat);
        param.append("longitude", this.long);
        param.append("vehicle_type", this.vehicle_type);
        this.data.getCloseVehicles(param).subscribe(function (result) {
            if (result.status == "ERROR") {
                return false;
            }
            else {
                if (result.success.drivers[0]) {
                    _this.isnowenabled = true;
                    _this.islaterenabled = true;
                    var address = [];
                    for (var i = 0; i < result.success.drivers.length; i++) {
                        address[i] = [];
                        address[i]['lat'] = result.success.drivers[i].latitude;
                        address[i]['lng'] = result.success.drivers[i].longitude;
                        _this.drivers[i] = result.success.drivers[i].id;
                        _this.addMarker(address[i]['lat'], address[i]['lng'], result.success.drivers[i]);
                    }
                }
                else {
                    _this.data.presentToast('No Nearby Drivers!');
                    _this.isnowenabled = false;
                    _this.islaterenabled = false;
                }
            }
        });
    };
    HomePage.prototype.addMarker = function (lt, lg, driver) {
        this.marker = new google.maps.Marker({
            map: this.maps.map,
            position: new google.maps.LatLng(lt, lg),
            icon: { url: 'assets/imgs/car48x48.png',
                size: {
                    width: 64,
                    height: 55
                }
            },
            animation: google.maps.Animation.DROP
        });
        this.markers.push(this.marker);
    };
    HomePage.prototype.rideNow = function (dist, selected_vehicle_type) {
        console.log(this.address.place + " " + this.address.drop_place + " " + this.vehicle_type + " " + this.selected_cost);
        if (this.address.place != '' && this.address.drop_place != '' && this.vehicle_type != '' && this.selected_cost > 0) {
            var param = void 0;
            param = {
                'distance': dist,
                'vehicle_type': this.vehicle_type,
                'pick_up': this.address.place,
                'drop': this.address.drop_place,
                'cost': this.selected_cost,
                'Did': this.drivers
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__ride_now_ride_now__["a" /* RideNowPage */], { param: param });
        }
        else {
            this.data.presentToast('Please select pickup and drop locations and Vehicle Type!');
        }
    };
    HomePage.prototype.rideLater = function (dist, selected_vehicle_type) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'getDateTime' }, { showBackdrop: false });
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.ride_date = data[0];
                _this.ride_time = data[1];
                if (_this.address.place != '' && _this.address.drop_place != '' && _this.vehicle_type != '' && _this.ride_date != '' && _this.ride_time != '' && _this.selected_cost > 0) {
                    var param = void 0;
                    param = {
                        'distance': dist,
                        'vehicle_type': _this.vehicle_type,
                        'pick_up': _this.address.place,
                        'drop': _this.address.drop_place,
                        'cost': _this.selected_cost,
                        'date': _this.ride_date,
                        'time': _this.ride_time,
                        'Did': _this.drivers
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__ride_later_ride_later__["a" /* RideLaterPage */], { param: param });
                }
                else {
                    _this.data.presentToast('Please select pickup and drop locations, Vehicle Type, Date and Time!');
                }
            }
        });
        modal.present();
    };
    HomePage.prototype.startTracking = function () {
        var _this = this;
        this.isTracking = true;
        this.trackedRoute = [];
        var options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
            distanceFilter: 1
        };
        this.positionSubscription = this.geolocation.watchPosition(options).subscribe(function (data) {
            setTimeout(function () {
                _this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
                _this.redrawPath(_this.trackedRoute);
            }, 0);
        });
    };
    HomePage.prototype.redrawPath = function (path) {
        if (this.maps.currentMapTrack) {
            this.maps.currentMapTrack.setMap(null);
        }
        if (path.length > 1) {
            this.maps.currentMapTrack = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#ff00ff',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            this.maps.currentMapTrack.setMap(this.maps.map);
        }
    };
    HomePage.prototype.stopTracking = function () {
        this.isTracking = false;
        this.positionSubscription.unsubscribe();
        if (this.maps.currentMapTrack) {
            this.maps.currentMapTrack.setMap(null);
        }
    };
    HomePage.prototype.watchMethod = function (live_tracking_data) {
        var _this = this;
        //this.eve.unsubscribe('live_tracking:created');
        var options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
            distanceFilter: 1
        };
        this.watch = this.geolocation.watchPosition(options).subscribe(function (data) {
            setTimeout(function () {
                if (_this.leave == false) {
                    _this.updateGeolocation(_this.liveRide_customerId, _this.liveRide_bookingId, data.coords.latitude, data.coords.longitude);
                }
            }, 0);
        });
    };
    HomePage.prototype.updateGeolocation = function (customer_id, booking_id, lat, lng) {
        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref(booking_id + '/' + this.id).set({ 'latitude': lat, 'longitude': lng });
    };
    HomePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    HomePage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    HomePage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    HomePage.prototype.startRide = function () {
        var _this = this;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        var param = new FormData();
        param.append("customer_id", this.liveRide_customerId);
        param.append("booking_id", this.liveRide_bookingId);
        param.append("driver_id", this.yourId);
        this.data.rideStart(param).subscribe(function (result) {
            if (result.status === "OK") {
                __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.yourId).set({ 'status': 'ongoing', 'booking_id': _this.liveRide_bookingId });
                console.log(result);
                _this.data.isStarted = true;
                _this.islaterenabled = true;
                _this.isnowenabled = false;
                _this.endRide = true;
                _this.startTracking();
                loader.dismiss();
            }
            else {
                console.log('Error');
                loader.dismiss();
                _this.data.presentToast('You should be near by customer');
                return false;
            }
        });
    };
    HomePage.prototype.finishRide = function () {
        var _this = this;
        this.data.isStarted = false;
        this.leave = true;
        this.stopTracking();
        this.islaterenabled = false;
        this.loadingCtr = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        this.watch.unsubscribe();
        var param = new FormData();
        param.append("customer_id", this.liveRide_customerId);
        param.append("booking_id", this.liveRide_bookingId);
        param.append("driver_id", this.yourId);
        //this.eve.unsubscribe('live_tracking:created');
        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref(this.liveRide_bookingId).remove();
        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + this.id).remove();
        this.data.rideEnd(param).subscribe(function (result) {
            if (result.status == "OK") {
                /*if(this.watch && this.watch != undefined)
                {
                  this.watch.unsubscribe();
                }
                if(this.watch2 && this.watch2 != undefined){
                  this.watch2.unsubscribe();
                }
                if(this.positionSubscription && this.positionSubscription != undefined)
                {
                  this.positionSubscription.unsubscribe();
                }*/
                _this.data.getAvailableToggle().subscribe(function (result) {
                    console.log(result);
                    if (result.status == 'OK') {
                        _this.loadingCtr.dismiss();
                        console.log(result.success.available);
                        if (result.success.available == 'on') {
                            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                        }
                        else {
                            _this.loadingCtr.dismiss();
                            _this.data.AvailableToggle().subscribe(function (result) {
                                console.log(result);
                                if (result.status == 'OK') {
                                    console.log(result.success.available);
                                    if (result.success.available == 'Driver set to On') {
                                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                                    }
                                    else { }
                                }
                                else {
                                    _this.data.presentToast('Error');
                                }
                            });
                        }
                    }
                    else {
                        _this.data.presentToast('Error');
                    }
                });
            }
            else {
                console.log('Err');
            }
        });
    };
    HomePage.prototype.cashPaymentReceived = function (info) {
        var _this = this;
        this.eve.unsubscribe('selected_Cash_Payment:created');
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'cashPayment', bookingId: info.booking_id }, { enableBackdropDismiss: false, showBackdrop: false });
        modal.onDidDismiss(function (data) {
            if (data == 'yes') {
                var param = new FormData();
                param.append('customer_id', info.customer_id);
                param.append('booking_id', info.booking_id);
                param.append('driver_id', info.driver_id);
                param.append('amount', info.amount);
                _this.data.paymentByCash(param).subscribe(function (result) {
                    console.log(result);
                    if (result.status == 'OK') {
                        /*if(this.watch && this.watch !== undefined)
                        {
                          this.watch.unsubscribe();
                        }
                        if(this.watch2 && this.watch2 !== undefined){
                          this.watch2.unsubscribe();
                        }
                        if(this.positionSubscription && this.positionSubscription !== undefined)
                        {
                          this.positionSubscription.unsubscribe();
                        }*/
                        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref(info.booking_id).remove();
                        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + _this.id).remove();
                        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('customer/' + info.customer_id).remove();
                        var currentIndex_1 = _this.navCtrl.getActive().index;
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_18__feedback_feedback__["a" /* FeedbackPage */], { booking_id: info.booking_id, customer_id: info.customer_id }).then(function () {
                            _this.navCtrl.remove(currentIndex_1);
                        });
                    }
                });
            }
            else {
                _this.data.presentToast('Something went Wrong!');
            }
        });
        modal.present();
    };
    HomePage.prototype.otherPaymentReceived = function (selected_Other_Payment) {
        var _this = this;
        this.eve.unsubscribe('selected_Other_Payment:created');
        /*if(this.watch && this.watch !== undefined)
        {
          this.watch.unsubscribe();
        }
        if(this.watch2 && this.watch2 !== undefined){
          this.watch2.unsubscribe();
        }
        if(this.positionSubscription && this.positionSubscription !== undefined)
        {
          this.positionSubscription.unsubscribe();
        }*/
        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref(selected_Other_Payment.booking_id).remove();
        __WEBPACK_IMPORTED_MODULE_14_Firebase__["database"]().ref('driver/' + this.id).remove();
        var currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_18__feedback_feedback__["a" /* FeedbackPage */], { booking_id: selected_Other_Payment.booking_id, customer_id: selected_Other_Payment.customer_id }).then(function () {
            _this.navCtrl.remove(currentIndex);
        });
    };
    HomePage.prototype.redirect = function (link) {
        this.inAppBrowser.create('http://' + link);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], HomePage.prototype, "pleaseConnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('directionsPanel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], HomePage.prototype, "directionsPanel", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="sideMenu" hideBackButton>\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title *ngIf=\'role == 2\'>\n        Book A Ride\n    </ion-title>\n    <ion-title *ngIf=\'role == 3\'>\n       Dashboard\n  </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content  class="home-content">\n    <div #pleaseConnect id="please-connect">\n        <p>Please connect to the Internet ...</p>\n      </div>\n  <ion-card class="directionsPanel">\n      <ion-card-content>\n          <div #directionsPanel></div>\n      </ion-card-content>\n  </ion-card>\n  \n  <div #map id="map">\n    <ion-spinner></ion-spinner>\n  </div>\n  \n  <ion-card *ngIf=\'role == 2\' class="card-content">  \n      <ion-list no-lines>\n        <ion-item (click)="showAddressModal(action.pickup)">\n            <ion-icon item-start ios="md-navigate" md="md-navigate"></ion-icon>\n            <ion-label stacked>Pickup Location</ion-label>\n            <ion-input [(ngModel)]="address.place" type="text" disabled ></ion-input>\n        </ion-item>\n        <ion-item (click)="showAddressModal(action.drop)">\n            <ion-icon item-start ios="md-pin" md="md-pin"></ion-icon>\n            <ion-label stacked>Drop Off Location</ion-label>\n            <ion-input [(ngModel)]="address.drop_place" type="text" disabled ></ion-input>\n        </ion-item>\n        <div *ngIf=\'displaydistance == true\' #distance id="distance">\n            <!--<ion-input [(ngModel)]="distance" type="hidden"  ></ion-input>-->\n           {{calculated_distance}}\n        </div>\n      </ion-list>   \n    </ion-card>\n\n\n    <ion-card *ngIf=\'isAvailable === false\' class="card-content isAvailable">\n      Please turn on your visibility from settings for reaching to customers.\n    </ion-card>\n    \n    <!--<div class="card-content">  \n      <ion-fab top right edge class="topRightEdge">\n        <button ion-fab mini><ion-icon name="add"></ion-icon></button>\n        <ion-fab-list>\n          <button *ngIf="facebook_link" ion-fab mini (click)="redirect(facebook_link)"><ion-icon name="logo-facebook"></ion-icon></button>\n          <button *ngIf="twitter_link" ion-fab mini (click)="redirect(twitter_link)"><ion-icon name="logo-twitter"></ion-icon></button>\n          <button *ngIf="instagram_link" ion-fab mini (click)="redirect(instagram_link)"><ion-icon name="logo-vimeo"></ion-icon></button>\n          <button *ngIf="linkedin_link" ion-fab mini (click)="redirect(linkedin_link)"><ion-icon name="logo-googleplus"></ion-icon></button>\n        </ion-fab-list>\n      </ion-fab>\n    </div>-->\n\n\n</ion-content>\n<div *ngIf=\'role == 2\' class="last_div">  \n  <div *ngIf=\'display_vehicleTypes==1\' class="type_btn_div">\n    <ion-grid>\n      <ion-row>   \n        <ion-col col-4 text-center>\n          <button class="type_btn" [ngClass]="active === \'economy\' ? \'active_payment\' : \'\'" [disabled]="!isNearby[0]" (click)="updateActive(\'economy\')" (click)=\'selectVehicle(vehicle_types[0].type,cost.economy_cost)\'>\n            <img src="assets/imgs/img3.png" />\n            <p>{{vehicle_types[0].type}}</p>\n            <div class="appx_cost">${{cost.economy_cost}} Appx.</div>\n          </button>\n        </ion-col>\n        <ion-col col-4 text-center>\n          <button class="type_btn" [ngClass]="active === \'comfort\' ? \'active_payment\' : \'\'" [disabled]="!isNearby[1]" (click)="updateActive(\'comfort\')" (click)=\'selectVehicle(vehicle_types[1].type,cost.comfort_cost)\'>\n            <img src="assets/imgs/img2.png" />\n            <p>{{vehicle_types[1].type}}</p>\n            <div class="appx_cost">${{cost.comfort_cost}} Appx.</div>\n          </button>\n        </ion-col>\n        <ion-col col-4 text-center>\n          <button class="type_btn" [ngClass]="active === \'business\' ? \'active_payment\' : \'\'" [disabled]="!isNearby[2]" (click)="updateActive(\'business\')" (click)=\'selectVehicle(vehicle_types[2].type,cost.business_cost)\'>\n            <img src="assets/imgs/img1.png" />    \n            <p>{{vehicle_types[2].type}}</p>\n            <div class="appx_cost">${{cost.business_cost}} Appx.</div>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>   \n  <div class="inner_last_div">\n    <ion-grid>\n      <ion-row>\n        <button col-6 class="ride_now" (click)=\'rideNow(calculated_distance,vehicle_type)\' [disabled]="!isnowenabled"><p>Ride Now</p></button>\n        <button col-6 class="ride_later" (click)=\'rideLater(calculated_distance,vehicle_type)\' [disabled]="!islaterenabled"><p>Ride Later</p></button>\n      </ion-row>\n    </ion-grid>\n  </div>\n</div>\n\n\n<div *ngIf=\'role == 3\' class="last_div">  \n  <div class="inner_last_div">\n    <ion-grid>\n      <ion-row>\n        <button col-12 class="ride_now" (click)=\'startRide()\' *ngIf="isnowenabled == true"><p>Start Ride</p></button>\n        <button col-12 class="ride_now" (click)=\'finishRide()\' [disabled]="!islaterenabled" *ngIf="endRide == true"><p>End Ride</p></button>\n      </ion-row>\n    </ion-grid>\n  </div>\n</div>\n   '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_page_transitions__["a" /* NativePageTransitions */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["q" /* ViewController */]])
    ], HomePage);
    return HomePage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function () {
        var item = snapshot.val();
        item.key = snapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_intro_intro__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_customer_profile_customer_profile__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_map_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_help_help__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_paymentwallet_paymentwallet__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_driversetting_driversetting__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_bookinghistory_bookinghistory__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_booking_list_booking_list__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_delivery_delivery__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_onesignal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__common_is_cordova_available__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__config__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_feedback_feedback__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_payment_payment__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_firebase__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_package_booking_package_booking__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_notifications_notifications__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_driver_transactions_driver_transactions__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};































var config = {
    apiKey: 'AIzaSyD_mkig8BYCj7PJlCj4-yN4w6QPmJjxFbg',
    authDomain: 'localhost',
    databaseURL: 'https://transportapp-b1681.firebaseio.com/',
    projectId: 'transportapp-b1681',
    storageBucket: 'gs://transportapp-b1681.appspot.com',
};
var MyApp = /** @class */ (function () {
    function MyApp(backgroundMode, androidPermissions, modalCtrl, oneSignal, platform, statusBar, splashScreen, data, storage, events, alertCtrl, service) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.androidPermissions = androidPermissions;
        this.modalCtrl = modalCtrl;
        this.oneSignal = oneSignal;
        this.data = data;
        this.storage = storage;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.fname = '';
        this.lname = '';
        this.email = '';
        this.role = 0;
        this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
        this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
        /* Initialize firebase */
        __WEBPACK_IMPORTED_MODULE_25_firebase__["initializeApp"](config);
        /* background mode enable settings */
        this.backgroundMode.enable();
        this.backgroundMode.setDefaults({ 'hidden': false });
        this.data.getToken();
        this.events.subscribe('profile_changed', function (url, role) {
            if (role == "driver") {
                _this.avatar = _this.data.imgURL + "driver/profile_image/" + url;
            }
            else {
                _this.avatar = _this.data.imgURL + "customer/profile_image/" + url;
            }
        });
        this.events.subscribe('name_changed', function (fname, lname) {
            _this.fname = fname;
            _this.lname = lname;
            _this.storage.get('user').then(function (user) {
                user[0].first_name = fname;
                user[0].last_name = lname;
                _this.storage.set('user', user);
                console.log("!@#!@#!@#");
                console.log(user);
                console.log("!@#!@#!@#");
            });
        });
        platform.ready().then(function () {
            /* Is app installed first time = display intro slides OR residect to nect page */
            _this.storage.get('showSlide').then(function (data) {
                if (data == null || data == undefined) {
                    _this.storage.set('showSlide', false);
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_intro_intro__["a" /* IntroPage */];
                }
                else {
                    /* Is "remember me checked while login"? */
                    _this.storage.get('isRemember').then(function (data) {
                        if (data == null || data == undefined) {
                            _this.storage.set('isRemember', false);
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_intro_intro__["a" /* IntroPage */];
                        }
                        if (data == true) {
                            _this.storage.get('user').then(function (user) {
                                if (user == null || user == undefined || user == false) {
                                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */];
                                    return false;
                                }
                                _this.id = user[0].id;
                                _this.role = user[0].role;
                                _this.fname = user[0].first_name;
                                _this.lname = user[0].last_name;
                                _this.email = user[0].email;
                                console.log('this.role==>' + _this.role);
                                if (user[0].role == 2) {
                                    _this.oneSignal.sendTag('customer_id', user[0].id);
                                    /* Get Customer Profile */
                                    var param = user[0].id;
                                    _this.storage.get('token').then(function (token) {
                                        _this.data.getCustomerProfile(token).subscribe(function (result) {
                                            if (result.status == 'OK') {
                                                if (result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '') {
                                                    _this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                                                }
                                                else {
                                                    //  this.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
                                                    _this.avatar = _this.data.imgURL + "customer/profile_image/" + result.success.profile.customer_details.profile;
                                                }
                                            }
                                            else { }
                                        });
                                    });
                                    /* End Get Customer Profile */
                                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                    _this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                }
                                else if (user[0].role == 3) {
                                    _this.oneSignal.sendTag('driver_id', user[0].id);
                                    /* Get Driver Profile */
                                    var param = user[0].id;
                                    _this.storage.get('token').then(function (token) {
                                        _this.data.getDriverProfile(token).subscribe(function (result) {
                                            if (result.status == 'OK') {
                                                if (result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '') {
                                                    _this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                                                }
                                                else {
                                                    //  this.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
                                                    _this.avatar = _this.data.imgURL + "driver/profile_image/" + result.success.profile.driver_details.profile;
                                                }
                                                // if(result.success.profile.is_completed == 0)
                                                // {
                                                //   this.rootPage = EditProfilePage;
                                                // }
                                                // else
                                                // {
                                                //   this.rootPage = HomePage;
                                                // }
                                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                                _this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                            }
                                            else {
                                                // this.storage.get('isProfile_Complete').then(data1=>{
                                                //   if(data1 == null || data1 == undefined || data1 == false)
                                                //   {
                                                //     this.rootPage = EditProfilePage;       
                                                //   }    
                                                //   else{
                                                //     this.rootPage = HomePage;
                                                //   }
                                                // });
                                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                                _this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
                                            }
                                        });
                                    });
                                    /* End Get Driver Profile */
                                }
                            });
                        }
                        else {
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */];
                        }
                    });
                }
            });
        });
        events.subscribe('user:created', function (user, time, token) {
            console.log('Welcome', user, 'at', time);
            _this.fname = user[0].first_name;
            _this.lname = user[0].last_name;
            _this.email = user[0].email;
            _this.role = user[0].role;
            _this.id = user[0].id;
            console.log('this.role==>' + _this.role);
            if (user[0].role == 2) {
                var param = user[0].id;
                _this.data.getCustomerProfile(token).subscribe(function (result) {
                    if (result.status == 'OK') {
                        if (result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '') {
                            _this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                        }
                        else {
                            //  this.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
                            _this.avatar = _this.data.imgURL + "customer/profile_image/" + result.success.profile.customer_details.profile;
                        }
                    }
                    else { }
                });
            }
            else if (user[0].role == 3) {
                console.log("I am Driver");
                console.log(user);
                var param = user[0].id;
                _this.data.getDriverProfile(token).subscribe(function (result) {
                    console.log("I am Driver");
                    console.log(result);
                    if (result.status == 'OK') {
                        console.log("I am Driver");
                        console.log(result.success.profile.driver_details.profile);
                        if (result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '') {
                            _this.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                        }
                        else {
                            //  this.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
                            _this.avatar = _this.data.imgURL + "driver/profile_image/" + result.success.profile.driver_details.profile;
                        }
                    }
                    else { }
                });
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            statusBar.styleDefault();
            splashScreen.hide();
            /* OneSignal Settings for push notification */
            if (Object(__WEBPACK_IMPORTED_MODULE_21__common_is_cordova_available__["a" /* isCordovaAvailable */])()) {
                _this.oneSignal.startInit(__WEBPACK_IMPORTED_MODULE_22__config__["a" /* oneSignalAppId */], __WEBPACK_IMPORTED_MODULE_22__config__["b" /* sender_id */]);
                _this.oneSignal.inFocusDisplaying(_this.oneSignal.OSInFocusDisplayOption.Notification);
                _this.oneSignal.handleNotificationReceived().subscribe(function (data) { return _this.onPushReceived(data.payload); });
                _this.oneSignal.handleNotificationOpened().subscribe(function (data) { return _this.onPushOpened(data.notification.payload); });
                _this.oneSignal.endInit();
            }
        });
        /* Pages array */
        this.pages = {
            homePage: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            customerProfilePage: __WEBPACK_IMPORTED_MODULE_11__pages_customer_profile_customer_profile__["a" /* CustomerProfilePage */],
            findabranchPage: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            mapPage: __WEBPACK_IMPORTED_MODULE_12__pages_map_map__["a" /* MapPage */],
            helpPage: __WEBPACK_IMPORTED_MODULE_13__pages_help_help__["a" /* HelpPage */],
            settingsPage: __WEBPACK_IMPORTED_MODULE_14__pages_settings_settings__["a" /* SettingsPage */],
            paymentwalletPage: __WEBPACK_IMPORTED_MODULE_15__pages_paymentwallet_paymentwallet__["a" /* PaymentwalletPage */],
            driversettingPage: __WEBPACK_IMPORTED_MODULE_16__pages_driversetting_driversetting__["a" /* DriversettingPage */],
            bookinghistoryPage: __WEBPACK_IMPORTED_MODULE_17__pages_bookinghistory_bookinghistory__["a" /* BookinghistoryPage */],
            bookingListPage: __WEBPACK_IMPORTED_MODULE_18__pages_booking_list_booking_list__["a" /* BookingListPage */],
            deliveryPage: __WEBPACK_IMPORTED_MODULE_19__pages_delivery_delivery__["a" /* DeliveryPage */],
            feedbackPage: __WEBPACK_IMPORTED_MODULE_23__pages_feedback_feedback__["a" /* FeedbackPage */],
            paymentPage: __WEBPACK_IMPORTED_MODULE_24__pages_payment_payment__["a" /* PaymentPage */],
            packageBooking: __WEBPACK_IMPORTED_MODULE_27__pages_package_booking_package_booking__["a" /* PackageBookingPage */],
            notificationsPage: __WEBPACK_IMPORTED_MODULE_28__pages_notifications_notifications__["a" /* NotificationsPage */],
            driverTransactionsPage: __WEBPACK_IMPORTED_MODULE_29__pages_driver_transactions_driver_transactions__["a" /* DriverTransactionsPage */]
        };
        this.activePage = this.pages.homePage;
        this.events.subscribe('active-menu', function () {
            _this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
        });
        this.events.subscribe('activeItem', function () {
            _this.activePage = __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */];
            _this.checkActive(__WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]);
        });
    }
    /* Log Out */
    MyApp.prototype.signOut = function () {
        var _this = this;
        console.log("#########################");
        console.log(this.data.isStarted);
        if (this.data.isStarted && this.role == 3) {
            this.service.presentToast("You can't sign out until ride completed.");
        }
        else {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_26__pages_modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'signout' });
            var me = this;
            modal.onDidDismiss(function (data) {
                if (data == true) {
                    //this.oneSignal.deleteTag('user_id');
                    _this.storage.set('isRemember', false);
                    _this.storage.get('user').then(function (data) {
                        console.log("!@#@!@#!@#");
                        console.log(data);
                        var param = data[0].id;
                        var role = data[0].role;
                        console.log(role);
                        if (role == 3) {
                            _this.oneSignal.deleteTag('driver_id');
                            _this.data.getDriverToggle(param).subscribe(function (result) {
                                if (result.status == 'OK') {
                                    if (result.success.available == 'on') {
                                        _this.data.AvailableToggle().subscribe(function (result) {
                                            console.log(result);
                                            if (result.status == 'OK') { }
                                            else {
                                                _this.data.presentToast('Error');
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            _this.oneSignal.deleteTag('customer_id');
                        }
                        _this.storage.set('user', undefined);
                        _this.storage.set('token', undefined);
                        //this.rootPage = SigninPage;
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_signin_signin__["a" /* SigninPage */]);
                    });
                }
                else { }
            });
            modal.present();
        }
    };
    /* End Log Out */
    /* On Push Notification receive, publish events accordingly */
    MyApp.prototype.onPushReceived = function (payload) {
        var _this = this;
        if (payload.additionalData.action == 'booking_response') {
            this.events.publish('live_tracking_Driver_id:created', payload.additionalData.driver_id, Date.now());
        }
        if (payload.additionalData.action == 'start_ride') {
            console.log("I am from the app component start ride");
            this.events.publish('start_ride:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'finish_ride') {
            this.events.publish('finished_ride:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'cancle_booking') {
            this.events.publish('cancelled_request:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'feedback') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_26__pages_modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'showFeedback', feedback: payload.additionalData.feedback, rating: payload.additionalData.rating }, { showBackdrop: false });
            var me = this;
            modal.onDidDismiss(function (data) { });
            modal.present();
        }
        if (payload.additionalData.action == 'booking_request' || payload.additionalData.action == 'ride_alert') {
            var alert1 = this.alertCtrl.create({
                title: 'Customer Request',
                cssClass: 'b_r_request',
                message: '<div class="c_name">' + payload.additionalData.customer + '</div><div class="title">Location</div><div class="desc">' + payload.additionalData.source + '</div><div class="title">Time</div><div class="desc">' + payload.additionalData.pick_up + '</div>',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Accept',
                        handler: function () {
                            console.log('Accept clicked');
                            var param = new FormData();
                            param.append("driver_id", payload.additionalData.driver_id);
                            param.append("customer_id", payload.additionalData.customer_id);
                            param.append("booking_id", payload.additionalData.booking_id);
                            _this.data.driverAcceptBooking(param).subscribe(function (result) {
                                if (result.status == "OK") {
                                    _this.data.presentToast('Booking Confirmation Successfull!');
                                    var param1 = new FormData();
                                    param1.append("driver_Id", payload.additionalData.driver_id);
                                    param1.append("customer_id", payload.additionalData.customer_id);
                                    param1.append("booking_id", payload.additionalData.booking_id);
                                    _this.data.DriverpostNotification(param1).subscribe(function (result) {
                                        if (result.status == "ERROR") {
                                            _this.data.presentToast('Post Notification fail');
                                        }
                                        else {
                                            //this.data.presentToast('Post Notification Success');
                                            _this.events.publish('live_tracking:created', payload.additionalData, Date.now());
                                        }
                                    });
                                    _this.data.presentToast('Request accepted successfully!');
                                }
                                else {
                                    _this.data.presentToast('You can not accept this ride!');
                                }
                            });
                        }
                    },
                    {
                        text: 'Reject',
                        handler: function () {
                            console.log('reject clicked');
                            var param = new FormData();
                            param.append("driver_id", payload.additionalData.driver_id);
                            param.append("customer_id", payload.additionalData.customer_id);
                            param.append("booking_id", payload.additionalData.booking_id);
                            _this.data.driverRejectBooking(param).subscribe(function (result) {
                                if (result.status == "OK") {
                                    _this.data.presentToast('Request Rejected successfully!');
                                }
                                else {
                                    _this.data.presentToast('May be Customer Cancelled Booking!');
                                }
                            });
                        }
                    }
                ]
            });
            alert1.present();
        }
        if (payload.additionalData.action == 'ride_later_alert') {
            this.events.publish('ride_later_alert:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'cashpayment') {
            this.events.publish('selected_Cash_Payment:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'otherpayment') {
            this.events.publish('selected_Other_Payment:created', payload.additionalData, Date.now());
        }
        if (payload.additionalData.action == 'cashpaymentReceived') {
            this.events.publish('cashpaymentReceived:created', payload.additionalData, Date.now());
        }
    };
    /* On Push Notification open, publish events accordingly */
    MyApp.prototype.onPushOpened = function (payload) {
        var _this = this;
        if (payload.additionalData.action == 'booking_request' || payload.additionalData.action == 'ride_alert') {
            var alert1 = this.alertCtrl.create({
                title: 'Customer Request',
                cssClass: 'b_r_request',
                message: '<div class="c_name">' + payload.additionalData.customer + '</div><div class="title">Location</div><div class="desc">' + payload.additionalData.source + '</div><div class="title">Time</div><div class="desc">' + payload.additionalData.pick_up + '</div>',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Accept',
                        handler: function () {
                            console.log('Accept clicked');
                            var param = new FormData();
                            param.append("driver_id", payload.additionalData.driver_id);
                            param.append("customer_id", payload.additionalData.customer_id);
                            param.append("booking_id", payload.additionalData.booking_id);
                            _this.data.driverAcceptBooking(param).subscribe(function (result) {
                                if (result.status == "OK") {
                                    _this.data.presentToast('Booking Confirmation Successfull!');
                                    var param1 = new FormData();
                                    param1.append("driver_Id", payload.additionalData.driver_id);
                                    param1.append("customer_id", payload.additionalData.customer_id);
                                    param1.append("booking_id", payload.additionalData.booking_id);
                                    _this.data.DriverpostNotification(param1).subscribe(function (result) {
                                        if (result.status == "ERROR") {
                                            _this.data.presentToast('Post Notification Fail');
                                        }
                                        else {
                                            //this.data.presentToast('Post Notification Success');
                                            _this.events.publish('live_tracking:created', payload.additionalData, Date.now());
                                        }
                                    });
                                    _this.data.presentToast('Request accepted successfully!');
                                }
                            });
                        }
                    },
                    {
                        text: 'Reject',
                        handler: function () {
                            console.log('reject clicked');
                            var param = new FormData();
                            param.append("driver_id", payload.additionalData.driver_id);
                            param.append("customer_id", payload.additionalData.customer_id);
                            param.append("booking_id", payload.additionalData.booking_id);
                            _this.data.driverRejectBooking(param).subscribe(function (result) {
                                if (result.status == "OK") {
                                    _this.data.presentToast('Request Rejected successfully!');
                                }
                            });
                        }
                    }
                ]
            });
            alert1.present();
        }
    };
    MyApp.prototype.openPage = function (page) {
        this.activePage = page;
        this.nav.setRoot(page);
    };
    MyApp.prototype.checkActive = function (page) {
        return page == this.activePage;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/app/app.html"*/'<!-- Side Menu -->\n<ion-menu [content]="content">\n    <ion-header> \n      <!-- User Profile Info Card -->\n      <ion-card class="menu-card" menuClose (click)="openPage(pages.customerProfilePage)">\n        <ion-item text-center>\n          <ion-avatar>\n            <img class="menu_header_avtar" src="{{avatar}}">\n          </ion-avatar>\n          <h2 class="txt-capt">{{fname}} {{lname}}</h2>\n          <p>{{email}}</p>\n        </ion-item>\n      </ion-card>\n      <!-- End User Profile Info Card -->\n    </ion-header>\n  \n     <!-- Customer Menu -->\n    <ion-content *ngIf="role==2" class="sideMenu">\n      <ion-list class="menu-list" no-lines>\n        <!-- Book a Ride -->\n        <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.homePage)" (click)="openPage(pages.homePage)">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3>\n                  <img class="list_item_icon" src="assets/imgs/riding-car.png"/>\n                </ion-col>\n                <ion-col col-9>\n                    <div class="list_item_title">Book A Ride</div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </button>\n        <!-- Book a Delivery -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.packageBooking)" (click)="openPage(pages.packageBooking)">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3>\n                  <img class="list_item_icon" src="assets/imgs/delivery-truck.png"/>\n                </ion-col>\n                <ion-col col-9>\n                    <div class="list_item_title">Book A Delivery</div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </button>\n        <!-- Profile -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.customerProfilePage)" (click)="openPage(pages.customerProfilePage)">  \n            <ion-grid>\n                <ion-row>\n                  <ion-col col-3>\n                    <img class="list_item_icon" src="assets/imgs/user.png"/>\n                  </ion-col>\n                  <ion-col col-9>\n                      <div class="list_item_title">Profile</div>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n          </button>\n        <!-- Your Bookings -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.bookinghistoryPage)" (click)="openPage(pages.bookinghistoryPage)">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/calendar-page-with-circular-clock-symbol.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">My Bookings</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </button>\n        <!-- My Wallet -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.paymentwalletPage)" (click)="openPage(pages.paymentwalletPage)">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/wallet1.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">My Wallet</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid> \n          </button>\n        <!-- Settings -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.settingsPage)" (click)="openPage(pages.settingsPage)">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>   \n                      <img class="list_item_icon" src="assets/imgs/settings.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">Settings</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </button>\n        <!-- Help -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.helpPage)" (click)="openPage(pages.helpPage)">  \n              <ion-grid>\n                  <ion-row>      \n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/chat.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">Help</div>    \n                    </ion-col>\n                  </ion-row>\n                </ion-grid>    \n          </button>\n        <!-- Log Out -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left (click)="signOut()">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/menu_logout.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">Sign out</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </button>\n      </ion-list>    \n    </ion-content>\n    <!-- End Customer Menu -->\n\n    <!--Driver Menu-->\n    <ion-content *ngIf="role==3" class="sideMenu">\n        <ion-list class="menu-list" no-lines>\n        <!-- Dashboard -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.homePage)" (click)="openPage(pages.homePage)">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-3>\n                  <img class="list_item_icon" src="assets/imgs/dashboard.png"/>\n                </ion-col>\n                <ion-col col-9>\n                    <div class="list_item_title">Dashboard</div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </button>\n        <!-- Profile -->\n            <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.customerProfilePage)" (click)="openPage(pages.customerProfilePage)">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/user.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">Profile</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n            </button>\n          <!-- Transactions -->\n            <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.driverTransactionsPage)" (click)="openPage(pages.driverTransactionsPage)">  \n                <ion-grid>\n                    <ion-row>\n                      <ion-col col-3>\n                        <img class="list_item_icon" src="assets/imgs/transaction.png"/>\n                      </ion-col>\n                      <ion-col col-9>\n                          <div class="list_item_title">Transactions</div>\n                      </ion-col>\n                    </ion-row>\n                  </ion-grid> \n            </button>\n          <!-- Settings -->\n            <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.driversettingPage)" (click)="openPage(pages.driversettingPage)">  \n                <ion-grid>\n                    <ion-row>\n                      <ion-col col-3>   \n                        <img class="list_item_icon" src="assets/imgs/settings.png"/>\n                      </ion-col>\n                      <ion-col col-9>\n                          <div class="list_item_title">Settings</div>\n                      </ion-col>\n                    </ion-row>\n                  </ion-grid>\n            </button>\n          <!-- History -->\n            <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.bookingListPage)" (click)="openPage(pages.bookingListPage)">  \n              <ion-grid>\n                  <ion-row>\n                    <ion-col col-3>\n                      <img class="list_item_icon" src="assets/imgs/calendar-page-with-circular-clock-symbol.png"/>\n                    </ion-col>\n                    <ion-col col-9>\n                        <div class="list_item_title">History</div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </button>\n        <!-- Notifications -->\n          <button class="sideMenuItem" menuClose detail-none ion-item icon-left [class.activeItem]="checkActive(pages.notificationsPage)" (click)="openPage(pages.notificationsPage)">  \n            <ion-grid>\n                <ion-row>\n                  <ion-col col-3>\n                    <img class="list_item_icon" src="assets/imgs/notification.png"/>\n                  </ion-col>\n                  <ion-col col-9>\n                      <div class="list_item_title">Notifications</div>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n        </button>\n      <!-- Log Out -->\n        <button *ngIf="!data.isStarted" class="sideMenuItem" menuClose detail-none ion-item icon-left (click)="signOut()">  \n            <ion-grid>\n                <ion-row>\n                  <ion-col col-3>\n                    <img class="list_item_icon" src="assets/imgs/menu_logout.png"/>\n                  </ion-col>\n                  <ion-col col-9>\n                      <div class="list_item_title">Sign out</div>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n        </button>\n        </ion-list>       \n      </ion-content>\n    <!-- End Driver Menu -->\n  </ion-menu>\n  \n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n     '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_20__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_30__providers_service_service__["a" /* ServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isCordovaAvailable; });
var isCordovaAvailable = function () {
    if (!window.cordova) {
        alert('This is a native feature. Please use a device');
        return false;
    }
    return true;
};
//# sourceMappingURL=is-cordova-available.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sender_id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return oneSignalAppId; });
var sender_id = '1046014935493';
var oneSignalAppId = '3e0e1252-5e94-416e-8442-9b2498d6124e';
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connectivity_service_connectivity_service__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GoogleMapsProvider = /** @class */ (function () {
    function GoogleMapsProvider(eve, events, connectivityService, geolocation, platform) {
        this.eve = eve;
        this.events = events;
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.platform = platform;
        this.mapInitialised = false;
        this.apiKey = "AIzaSyD_mkig8BYCj7PJlCj4-yN4w6QPmJjxFbg";
        this.markers = [];
        this.currentMapTrack = null;
        this.myloc = "";
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { /*strokeColor:"#4a4a4a",*/ strokeOpacity: 0.8, strokeWeight: 3, strokeColor: '#278DF8' }, suppressMarkers: true });
    }
    GoogleMapsProvider.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMapsProvider.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function (data) {
                            resolve(data);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                    resolve(true);
                }
                else {
                    _this.disableMap();
                    resolve(true);
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMapsProvider.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
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
            _this.geolocation.getCurrentPosition(options).then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                console.log('latLng==>' + latLng);
                //alert(latLng);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    clickableIcons: false,
                    disableDefaultUI: true,
                    zoomControl: false,
                    enableHighAccuracy: true,
                };
                var geocoder = new google.maps.Geocoder;
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                resolve(_this.map);
                console.log("I am called");
                _this.addMarker().then(function (data) {
                    _this.addInfoWindow(_this.marker, data);
                });
            }, function (err) { console.log(JSON.stringify(err)); _this.initMap(); });
        });
    };
    GoogleMapsProvider.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMapsProvider.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMapsProvider.prototype.addConnectivityListeners = function () {
        var _this = this;
        //alert('hii');
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMapsProvider.prototype.addMarker = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.marker = new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: _this.map.getCenter(),
                icon: 'assets/imgs/map-pin-marked.png'
            });
            _this.circle = new google.maps.Circle({
                strokeColor: '#b5bedc',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                strokeWidth: 5,
                fillColor: '#c3cdee',
                fillOpacity: 0.35,
                map: _this.map,
                center: _this.map.getCenter(),
                radius: 200
            }); /*.then((circle)=>{
              this.marker.bindTo('position',circle,'center');
            });*/
            var geocoder = new google.maps.Geocoder();
            var latlng = { lat: _this.latitude, lng: _this.longitude };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    var address = results[0].formatted_address;
                    this.myloc = address;
                    console.log("###########");
                    console.log(this.myloc);
                    console.log("###########");
                    var content = this.myloc;
                    //this.addInfoWindow(this.marker, content);
                    resolve(content);
                }
            });
        });
    };
    GoogleMapsProvider.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    GoogleMapsProvider.prototype.startNavigating = function (pickup, drop, directionsPanel) {
        var _this = this;
        console.log("Start Navigating");
        this.marker.setMap(null);
        this.directionsPanel = directionsPanel;
        this.clearMarkers();
        this.markers = [];
        this.circle.setMap(null);
        this.directionsDisplay.setMap(null);
        this.directionsDisplay.set('directions', null);
        //directionsDisplay.set('directions', null);
        this.getLatLng(pickup).then(function (data) {
            _this.startMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'], data['longitude']), map: _this.map, icon: 'assets/imgs/source_pin.png' });
            _this.markers.push(_this.startMarker);
            _this.addInfoWindow(_this.startMarker, pickup);
        });
        this.getLatLng(drop).then(function (data) {
            _this.stopMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'], data['longitude']), map: _this.map, icon: 'assets/imgs/destination_pin.png' });
            _this.markers.push(_this.stopMarker);
            _this.addInfoWindow(_this.stopMarker, drop);
        });
        this.directionsService.route({
            origin: pickup,
            destination: drop,
            travelMode: google.maps.TravelMode['DRIVING']
        }, function (res, status) {
            var route = res.routes[0];
            console.log('route==>' + route.legs);
            _this.events.publish('distance:created', route.legs[0].distance.text, Date.now());
            _this.directionsDisplay.setMap(null);
            if (status == google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setMap(_this.map);
                _this.directionsDisplay.setDirections(res);
            }
            else {
                console.warn(status);
            }
        });
    };
    GoogleMapsProvider.prototype.getLatLng = function (address) {
        return new Promise(function (resolve) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    resolve({ latitude: latitude, longitude: longitude });
                }
            });
        });
    };
    GoogleMapsProvider.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    GoogleMapsProvider.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    GoogleMapsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */]])
    ], GoogleMapsProvider);
    return GoogleMapsProvider;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password_reset_password_reset__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__edit_profile_edit_profile__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__signin_signin__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_onesignal__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var CustomerProfilePage = /** @class */ (function () {
    function CustomerProfilePage(oneSignal, androidPermissions, navCtrl, loading, actionSheetCtrl, navParams, data, storage, DomSanitizer, camera, http, alertCtrl, modalCtrl, events) {
        this.oneSignal = oneSignal;
        this.androidPermissions = androidPermissions;
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.DomSanitizer = DomSanitizer;
        this.camera = camera;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.user_details = {};
        this.display_data = false;
    }
    CustomerProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerProfilePage');
        this.getProfile();
    };
    CustomerProfilePage.prototype.ionViewWillEnter = function () {
    };
    CustomerProfilePage.prototype.getProfile = function () {
        var _this = this;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.storage.get('user').then(function (data) {
            console.log(data);
            var param = data[0].id;
            _this.role = data[0].role;
            if (data[0].role == 2) {
                _this.storage.get('token').then(function (token) {
                    _this.data.getCustomerProfile(token).subscribe(function (result) {
                        console.log(result);
                        if (result.status == 'OK') {
                            //console.log(result.success.profile[0].first_name);
                            console.log("!!!!!!");
                            console.log(result.success.profile);
                            loader.dismiss();
                            _this.display_data = true;
                            _this.user_details.fname = result.success.profile.first_name;
                            _this.user_details.lname = result.success.profile.last_name;
                            _this.user_details.email = result.success.profile.email;
                            _this.user_details.phone = result.success.profile.customer_details.phone;
                            _this.user_details.address = result.success.profile.customer_details.address;
                            _this.user_details.facebook_profile = result.success.profile.customer_details.facebook_profile == null || result.success.profile.customer_details.facebook_profile == "undefined" ? "#" : result.success.profile.customer_details.facebook_profile;
                            _this.user_details.instagram_profile = result.success.profile.customer_details.instagram_profile == null || result.success.profile.customer_details.instagram_profile == "undefined" ? "#" : result.success.profile.customer_details.instagram_profile;
                            _this.user_details.twitter_profile = result.success.profile.customer_details.twitter_profile == null || result.success.profile.customer_details.twitter_profile == "undefined" ? "#" : result.success.profile.customer_details.twitter_profile;
                            _this.user_details.linkedin_profile = result.success.profile.customer_details.linkedin_profile == null || result.success.profile.customer_details.linkedin_profile == "undefined" ? "#" : result.success.profile.customer_details.linkedin_profile;
                            //this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile[0].profile;
                            if (result.success.profile.customer_details.profile == null || result.success.profile.customer_details.profile == undefined || result.success.profile.customer_details.profile == '') {
                                _this.user_details.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                            }
                            else {
                                //  this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/customer/profile_image/'+result.success.profile.customer_details.profile;
                                _this.user_details.avatar = _this.data.imgURL + "customer/profile_image/" + result.success.profile.customer_details.profile;
                            }
                        }
                        else {
                            loader.dismiss();
                        }
                    });
                });
            }
            else if (data[0].role == 3) {
                _this.data.getRideVehicleTypes().subscribe(function (result) {
                    if (result.status == 'OK') {
                        _this.vehicle_types = result.success;
                        _this.storage.get('token').then(function (token) {
                            _this.data.getDriverProfile(token).subscribe(function (result) {
                                if (result.status == 'OK') {
                                    console.log("!!!!!!");
                                    console.log(result.success.profile);
                                    loader.dismiss();
                                    _this.display_data = true;
                                    //console.log(result.success.profile[0].first_name);
                                    _this.user_details.fname = result.success.profile.first_name;
                                    _this.user_details.lname = result.success.profile.last_name;
                                    _this.user_details.email = result.success.profile.email;
                                    _this.user_details.phone = result.success.profile.driver_details.phone;
                                    _this.user_details.address = result.success.profile.driver_details.address;
                                    _this.user_details.facebook_profile = result.success.profile.driver_details.facebook_profile == null || result.success.profile.driver_details.facebook_profile == "undefined" ? "#" : result.success.profile.driver_details.facebook_profile;
                                    _this.user_details.instagram_profile = result.success.profile.driver_details.instagram_profile == null || result.success.profile.driver_details.instagram_profile == "undefined" ? "#" : result.success.profile.driver_details.instagram_profile;
                                    _this.user_details.twitter_profile = result.success.profile.driver_details.twitter_profile == null || result.success.profile.driver_details.twitter_profile == "undefined" ? "#" : result.success.profile.driver_details.twitter_profile;
                                    _this.user_details.linkedin_profile = result.success.profile.driver_details.linkedin_profile == null || result.success.profile.driver_details.linkedin_profile == "undefined" ? "#" : result.success.profile.driver_details.linkedin_profile;
                                    if (result.success.profile.driver_details.profile == null || result.success.profile.driver_details.profile == undefined || result.success.profile.driver_details.profile == '') {
                                        _this.user_details.avatar = 'assets/imgs/kisspng-user-profile-computer-icons-girl-customer-5af32956696762.8139603615258852704317.png';
                                    }
                                    else {
                                        //  this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile.driver_details.profile;
                                        _this.user_details.avatar = _this.data.imgURL + "driver/profile_image/" + result.success.profile.driver_details.profile;
                                    }
                                    //this.user_details.avatar = 'http://transport.walstarmedia.com/public/storage/images/driver/profile_image/'+result.success.profile[0].profile;
                                    console.log("!@!#!@!#!#@!#!");
                                    console.log(_this.user_details.avatar);
                                    console.log(_this.user_details.type);
                                    console.log(result.success.profile.driver_details.type);
                                    console.log(_this.user_details);
                                    //if(this.user_details.type == 'ride')
                                    if (result.success.profile.driver_details.type == 'ride') {
                                        _this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.type;
                                    }
                                    else {
                                        //this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicle.vehicle_name;
                                        _this.user_details.vehicle_type = result.success.profile.driver_details.deliver_vehicles.vehicle_name;
                                    }
                                    //this.user_details.vehicle_type = result.success.profile.driver_details.vehicle_type.type;
                                    _this.user_details.vehicle_number = result.success.profile.driver_details.vehicle_number;
                                }
                                else {
                                    loader.dismiss();
                                }
                            });
                        });
                    }
                    else {
                        _this.data.presentToast(result.status);
                        loader.dismiss();
                    }
                });
            }
        });
    };
    CustomerProfilePage.prototype.gotoChangePass = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__password_reset_password_reset__["a" /* PasswordResetPage */]);
    };
    CustomerProfilePage.prototype.gotoeditProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__edit_profile_edit_profile__["a" /* EditProfilePage */]);
    };
    CustomerProfilePage.prototype.gotoAvatarPage = function () {
        //this.navCtrl.push(UploadProfilePage,{'imgurl':this.user_details.avatar}, { animate: true, animation: 'transition', duration: 500, direction: 'up' });
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                        _this.captureImage(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        //this.takePicture(this.camera.PictureSourceType.CAMERA);
                        _this.captureImage(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    CustomerProfilePage.prototype.signOut = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'signout' });
        var me = this;
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data == true) {
                //this.oneSignal.deleteTag('user_id');
                _this.storage.set('isRemember', false);
                _this.storage.get('user').then(function (data) {
                    var param = data[0].id;
                    var role = data[0].role;
                    console.log(role);
                    if (role == 3) {
                        _this.oneSignal.deleteTag('driver_id');
                        _this.data.getDriverToggle(param).subscribe(function (result) {
                            if (result.status == 'OK') {
                                if (result.success.available == 'on') {
                                    _this.data.AvailableToggle().subscribe(function (result) {
                                        console.log(result);
                                        if (result.status == 'OK') {
                                            console.log(result.success.available);
                                        }
                                        else {
                                            _this.data.presentToast('Error');
                                        }
                                    });
                                }
                            }
                            else {
                                _this.oneSignal.deleteTag('customer_id');
                            }
                        });
                    }
                    _this.storage.set('user', undefined);
                    _this.storage.set('token', undefined);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__signin_signin__["a" /* SigninPage */]);
                });
            }
            else {
                //this.selectdId = '';            
            }
        });
        modal.present();
        //this.navCtrl.setRoot(SigninPage); 
    };
    CustomerProfilePage.prototype.captureImage = function (useAlbum) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options, imageData, loader, param;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(function (result) { return console.log('Has permission?', result.hasPermission); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA); });
                        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
                        options = {
                            destinationType: this.camera.DestinationType.DATA_URL,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE,
                            sourceType: useAlbum,
                        };
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 1:
                        imageData = _a.sent();
                        //var imageData;
                        /*const imageData = await this.camera.getPicture(options).then((Data) => {
                          // imageData is either a base64 encoded string or a file URI
                          // If it's base64 (DATA_URL):
                         imageData = 'data:image/jpeg;base64,' + Data;
                         }, (err) => {
                          // Handle error
                         });*/
                        this.avtarPath = 'data:image/jpg;base64,' + imageData;
                        loader = this.loading.create({
                            content: "Please wait...",
                            spinner: 'crescent'
                        });
                        loader.present();
                        param = new FormData();
                        param.append("image_file", this.avtarPath);
                        //this.photos.unshift(this.base64Image);
                        this.storage.get('user').then(function (data) {
                            var role = data[0].role;
                            if (role == 2) {
                                _this.data.updateCustomerAvtar(param).subscribe(function (result) {
                                    if (result.status == "ERROR") {
                                        loader.dismiss();
                                        _this.data.presentToast('ERROR');
                                        return false;
                                    }
                                    else {
                                        loader.dismiss();
                                        console.log(result.success.imagename);
                                        _this.imgEvent(result.success.imagename, 'customer');
                                        _this.data.presentToast('Profile Updated Successfully!');
                                        setTimeout(function () {
                                            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                                        }, 3000);
                                        //this.navCtrl.setRoot(CustomerProfilePage);
                                    }
                                }, function (err) {
                                    loader.dismiss();
                                    _this.data.presentToast('ERROR');
                                });
                            }
                            if (_this.role == 3) {
                                _this.data.updateDriverAvtar(param).subscribe(function (result) {
                                    if (result.status == "ERROR") {
                                        loader.dismiss();
                                        _this.data.presentToast('eRROR');
                                        return false;
                                    }
                                    else {
                                        loader.dismiss();
                                        _this.imgEvent(result.success.imagename, 'driver');
                                        _this.data.presentToast('Profile Updated Successfully!');
                                        setTimeout(function () {
                                            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                                        }, 3000);
                                        //this.navCtrl.setRoot(CustomerProfilePage);
                                    }
                                }, function (err) {
                                    loader.dismiss();
                                    _this.data.presentToast('ERROR');
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerProfilePage.prototype.imgEvent = function (url, role) {
        this.events.publish('profile_changed', url, role);
    };
    CustomerProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-customer-profile',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/customer-profile/customer-profile.html"*/'<!--\n  Generated template for the CustomerProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle >\n        <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>Profile</ion-title>\n    <ion-buttons end>\n        <button icon-only class="edit-ic" (click)="gotoeditProfile()">\n            <ion-icon ios="md-create" md="md-create" ></ion-icon>\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>  \n    <div *ngIf="display_data == true">\n        <ion-card>\n            <!-- <ion-list>\n                <ion-item class="profile_edit_list">\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-4>\n                                <ion-avatar item-start (click)="gotoAvatarPage()">\n                                    <img src="{{user_details.avatar}}">\n                                </ion-avatar>  \n                            </ion-col>\n                            <ion-col col-6> \n                                <h2 class="profile_name">\n                                    {{user_details.fname}} {{user_details.lname}}\n                                </h2>\n                                <h3>{{user_details.email}}</h3>\n                                <p>{{user_details.phone}}</p>\n                            </ion-col>\n                            <ion-col col-2 text-center class="profile_edit_icon" (click)="gotoeditProfile()">\n                                <ion-icon ios="ios-create" md="md-create" class="ion-md-create profile_edit_icon_main"></ion-icon>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-item>\n            </ion-list> -->\n            <div class="img-div" padding-vertical>\n                <img src="{{user_details.avatar}}" (click)="gotoAvatarPage()">\n                <h2 class="profile_name txt-capt" text-center>\n                    {{user_details.fname}} {{user_details.lname}}\n                </h2>\n                <h3 text-center>{{user_details.email}}</h3>\n            </div>\n            \n            \n        </ion-card>\n\n        <!-- <ion-card class="personal_info">\n            <ion-card-header>Personal Information</ion-card-header>\n            <ion-item class="home-item">\n                <ion-thumbnail item-start>\n                    <ion-icon name="home"></ion-icon>\n                </ion-thumbnail>\n                    <h2>Home</h2>\n                    <p>{{user_details.address}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-thumbnail item-start>\n                    <ion-icon name="call"></ion-icon>\n                </ion-thumbnail>\n                    <h2>Contact Number</h2>\n                    <p>{{user_details.phone}}</p>\n            </ion-item>\n        </ion-card> -->\n        <ion-card class="personal_info">\n            <ion-card-header>Personal Information</ion-card-header>\n            <ion-card-content>\n            \n                <ion-row>\n                    <ion-col col-2>\n                        <ion-icon name="home"></ion-icon>\n                    </ion-col>\n                    <ion-col col-10>\n                        <div class="info-div">\n                            <h2 class="title-color">Home</h2>\n                            <p>{{user_details.address}}</p>\n                        </div>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-2>\n                        <ion-icon name="call"></ion-icon>\n                    </ion-col>\n                    <ion-col col-10>\n                        <div class="info-div">\n                            <h2 class="title-color">Contact Number</h2>\n                            <p>{{user_details.phone}}</p>\n                        </div>\n                    </ion-col>\n                </ion-row>\n                    \n            </ion-card-content>\n        </ion-card>\n\n\n        <ion-card *ngIf=\'role==3\' class="Saved_places_card vehicle_details_header">\n            <ion-card-header> \n            Vehicle Details\n            </ion-card-header>\n            <ion-card-content class="vehicle_details">\n                <ion-row>\n                    <ion-col col-5 class="title-color">\n                        Type\n                    </ion-col>\n                    <ion-col col-1>:</ion-col>\n                    <ion-col col-6 text-capitalize>\n                        {{user_details.vehicle_type}}\n                    </ion-col>\n                    <ion-col col-5 class="title-color">\n                        Number\n                    </ion-col>\n                    <ion-col col-1>:</ion-col>\n                    <ion-col col-6>\n                        {{user_details.vehicle_number}}\n                    </ion-col>\n                </ion-row>\n                <!-- <h3>Number : </h3>\n                <span>{{user_details.vehicle_number}}</span>\n                <h3>Type : </h3>\n                <span>{{user_details.vehicle_type}}</span> -->\n            </ion-card-content>\n        </ion-card>\n        <ion-list class="menu-list" no-lines>\n            <button class="sideMenuItem change_pass_btn" menuClose ion-item (click)="gotoChangePass()">\n                <ion-icon ios="ios-lock" md="md-lock" class="lock-icon"></ion-icon>\n                <span class="change_pass_text">Change Password</span>\n            </button>   \n        </ion-list>\n\n        <!-- <ion-card class="Saved_places_card">\n            <ion-card-header> \n            Home\n            </ion-card-header>\n            <ion-card-content>\n                {{user_details.address}}        \n            </ion-card-content>\n        </ion-card>\n\n        <ion-card class="Saved_places_card">\n            <ion-card-header> \n            Contact Number\n            </ion-card-header>\n            <ion-card-content>\n                {{user_details.phone}}        \n            </ion-card-content>\n        </ion-card> -->\n\n        <ion-row class="social-media">\n            <ion-col col-3 text-center>\n                <a [href]="user_details.facebook_profile">\n                <ion-icon [ngClass]="user_details.facebook_profile == \'#\'? \'social-link\':\'\'" name="logo-facebook"></ion-icon></a>\n            </ion-col>\n            <ion-col col-3 text-center>\n                <a [href]="user_details.instagram_profile">\n                <ion-icon [ngClass]="user_details.instagram_profile == \'#\'? \'social-link\':\'\'" name="logo-instagram"></ion-icon></a>\n            </ion-col>\n            <ion-col col-3 text-center>\n                <a [href]="user_details.twitter_profile">\n                <ion-icon [ngClass]="user_details.twitter_profile == \'#\'? \'social-link\':\'\'" name="logo-twitter"></ion-icon></a>\n            </ion-col>\n            <ion-col col-3 text-center>\n                <a [href]="user_details.linkedin_profile">\n                <ion-icon [ngClass]="user_details.linkedin_profile == \'#\'? \'social-link\':\'\'" name="logo-linkedin"></ion-icon></a>\n            </ion-col>\n        </ion-row>\n        \n    </div>\n</ion-content>\n<!-- <div class="last_div" (click)="signOut()">  \n    <div class="inner_last_div">\n      <p> Sign Out </p>\n    </div>\n</div>  -->\n\n<ion-footer>\n  <!-- <ion-toolbar>\n    <ion-title text-center>Sign Out</ion-title>\n  </ion-toolbar> -->\n  <button ion-button block color="primary" (click)="signOut()">Sign out</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/customer-profile/customer-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], CustomerProfilePage);
    return CustomerProfilePage;
}());

//# sourceMappingURL=customer-profile.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutocompletePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AutocompletePage = /** @class */ (function () {
    function AutocompletePage(navCtrl, geolocation, navParams, viewCtrl, zone, storage, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.storage = storage;
        this.data = data;
        this.currentMapTrack = null;
        this.isTracking = false;
        this.trackedRoute = [];
        this.previousTracks = [];
        this.service = new google.maps.places.AutocompleteService();
        this.action = navParams.get('action');
        console.log(this.action);
        this.autocompleteItems = [];
        this.allDrivers = [];
        this.autocomplete = {
            query: ''
        };
        this.qdriver = {
            query: ''
        };
        this.data.getCustomerFavLocation().subscribe(function (result) {
            if (result.status == "OK") {
                _this.fav_locations = result.success.favlocations;
            }
        });
    }
    AutocompletePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AutocompletePage');
    };
    AutocompletePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AutocompletePage.prototype.chooseItem = function (item) {
        this.viewCtrl.dismiss(item);
    };
    AutocompletePage.prototype.updateSearch = function () {
        var _this = this;
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.service.getPlacePredictions({ input: _this.autocomplete.query, location: latLng, radius: 1000 }, function (predictions, status) {
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
    };
    AutocompletePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AutocompletePage.prototype.clear = function () {
        console.log(this.autocomplete.query);
        this.autocomplete.query = "";
    };
    AutocompletePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-autocomplete',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/autocomplete/autocomplete.html"*/'<!--\n  Generated template for the AutocompletePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n        <ion-label class="close" text-right>\n            <ion-icon name="close" (click)="close()"></ion-icon>\n        </ion-label>\n        <!-- <ion-navbar>\n          <ion-buttons>\n            <button icon-only><ion-icon name="close"></ion-icon></button>\n          </ion-buttons>\n        </ion-navbar> -->\n    \n\n  </ion-header>\n  <ion-content>\n      <ion-item *ngIf="action == \'pickup\'" class="pickup">\n          <ion-icon item-start ios="md-navigate" md="md-navigate"></ion-icon>\n          <ion-label stacked>Pickup Location</ion-label>    \n          <ion-input [(ngModel)]="autocomplete.query" (ionChange)="updateSearch()" (ionCancel)="dismiss()"></ion-input>\n          <button *ngIf="autocomplete.query != \'\'? true : false" icon-only  ion-button small item-end (click)="clear()"><ion-icon ios="md-close" md="md-close"></ion-icon></button>\n      </ion-item>\n      \n      <ion-item *ngIf="action == \'drop\'" class="drop">\n          <ion-icon item-start ios="md-pin" md="md-pin"></ion-icon>\n          <ion-label stacked>Drop Off Location</ion-label>\n          <ion-input [(ngModel)]="autocomplete.query" (ionChange)="updateSearch()" (ionCancel)="dismiss()"></ion-input>\n        <button *ngIf="autocomplete.query != \'\'? true : false" icon-only  ion-button small item-end (click)="clear()"><ion-icon ios="md-close" md="md-close"></ion-icon></button>\n      </ion-item>\n\n      <ion-item *ngIf="action == \'home\' || action == \'work\' || action == \'other\'" class="drop">\n          <ion-icon item-start ios="md-pin" md="md-pin"></ion-icon>\n          <ion-label stacked>Select Location</ion-label>\n          <ion-input [(ngModel)]="autocomplete.query" (ionChange)="updateSearch()" (ionCancel)="dismiss()"></ion-input>\n      </ion-item>\n    <ion-list>\n      <ion-item *ngFor="let item of autocompleteItems" tappable (click)="chooseItem(item)">\n        <ion-icon item-start ios="md-pin" md="md-pin"></ion-icon>\n        {{ item }}\n      </ion-item>\n    </ion-list>\n      <ion-list *ngIf="action != \'home\' && action != \'work\' && action != \'other\' && autocompleteItems == \'\'">\n        <ion-item *ngFor="let item of fav_locations" class="fav_loc" tappable (click)="chooseItem(item.location)" >\n         <ion-icon item-start name="star"></ion-icon>\n            {{ item.location_type }}\n        </ion-item>\n      </ion-list>\n    \n  </ion-content>\n  '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/autocomplete/autocomplete.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]])
    ], AutocompletePage);
    return AutocompletePage;
}());

//# sourceMappingURL=autocomplete.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmPaymentPage; });
/* unused harmony export snapshotToArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_google_maps_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__payment_payment__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modalpage_modalpage__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_service_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ConfirmPaymentPage = /** @class */ (function () {
    function ConfirmPaymentPage(service, geolocation, modalCtrl, loading, device, navParams, zone, platform, viewCtrl, actionSheetCtrl, eve, navCtrl, data, storage, alertCtrl, maps, datepipe) {
        var _this = this;
        this.service = service;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.loading = loading;
        this.device = device;
        this.navParams = navParams;
        this.zone = zone;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.eve = eve;
        this.navCtrl = navCtrl;
        this.data = data;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.maps = maps;
        this.datepipe = datepipe;
        this.duration = '0 min';
        this.marker = null;
        this.markers = [];
        this.currentMapTrack = null;
        this.trackedRoute = [];
        this.userData = {};
        this.leave = false;
        this.eve_unsub = 'true';
        this.Pre_lat = 0;
        this.Pre_lng = 0;
        this.isStarted = false;
        this.destination_lat = 0;
        this.destination_lng = 0;
        this.cancel_btn = false;
        this.booking_id = navParams.get('booking_id');
        this.rideType = navParams.get('rideType');
        this.source = navParams.get('source');
        this.destination = navParams.get('destination');
        this.driver_id = '';
        this.active = 'reject';
        this.traking = 'image';
        this.storage.get('user').then(function (data) {
            _this.customer_id = data[0].id;
            _this.eve.subscribe('live_tracking_Driver_id:created', function (live_tracking_Driver_id, time) {
                __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref('customer/' + _this.customer_id).set({ 'status': 'ongoing', 'booking_id': _this.booking_id });
                console.log('live_tracking_Driver_id' + live_tracking_Driver_id);
                _this.driver_id = live_tracking_Driver_id;
                _this.subscribeAction();
            });
            _this.eve.subscribe('start_ride:created', function (finished_ride_data, time) {
                console.log("I am from the confirm payment start ride");
                _this.isStarted = true;
                _this.eve.unsubscribe('start_ride:created');
                _this.service.presentAlert('Ride Started');
            });
            _this.eve.subscribe('finished_ride:created', function (finished_ride_data, time) {
                _this.leave = true;
                /*if(this.watch && this.watch !== undefined){
                  this.watch.unsubscribe();
                }*/
                clearInterval(_this.intervalVar);
                _this.eve.unsubscribe('finished_ride:created');
                __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref('customer/' + _this.customer_id).set({ 'status': 'payment', 'booking_id': _this.booking_id });
                __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref(_this.booking_id).remove();
                var currentIndex = _this.navCtrl.getActive().index;
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__payment_payment__["a" /* PaymentPage */], { booking_id: _this.booking_id, driver_id: _this.driver_id }).then(function () {
                    _this.navCtrl.remove(currentIndex);
                });
            });
            if (navParams.get('status')) {
                _this.loadingCtr = _this.loading.create({
                    content: "Please wait...",
                    spinner: 'crescent'
                });
                _this.live_status = navParams.get('status');
                if (_this.live_status != 'waiting') {
                    _this.driver_id = navParams.get('driver_id');
                    if (_this.live_status == 'ongoing') {
                        _this.eve.publish('live_tracking_Driver_id:created', _this.driver_id, Date.now());
                        _this.loadingCtr.dismiss();
                    }
                    else if (_this.live_status == 'payment') {
                        _this.eve.publish('finished_ride:created', _this.driver_id, Date.now());
                        _this.loadingCtr.dismiss();
                    }
                }
                else {
                    _this.loadingCtr.dismiss();
                }
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref('customer/' + _this.customer_id).set({ 'status': 'waiting', 'booking_id': _this.booking_id });
            }
        });
        setTimeout(function () {
            if (_this.driver_id == '' && _this.leave == false) {
                _this.data.presentToast("Unfortunately, Your request is not accepted by any driver. Please request a new ride and we'll get you moving shortly.");
                var param = new FormData();
                param.append("customer_id", _this.customer_id);
                if (_this.driver_id != '') {
                    param.append("driver_id", _this.driver_id);
                }
                else {
                    param.append("driver_id", '0');
                }
                param.append("booking_id", _this.booking_id);
                console.log(_this.booking_id + " " + _this.driver_id + " " + _this.customer_id);
                _this.data.customerRejectBooking(param).subscribe(function (result) {
                    console.log("@@@@@@@@@@@@@@@@@");
                    console.log(result);
                    if (result.status == 'OK') {
                        /*if(this.watch && this.watch !== undefined)
                        {
                          this.watch.unsubscribe();
                        }*/
                        __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref('customer/' + _this.customer_id).remove();
                        __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref(_this.booking_id).remove();
                        _this.leave = true;
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                    }
                });
            }
        }, 600000);
    }
    ConfirmPaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfirmPaymentPage');
        this.loadMap();
    };
    ConfirmPaymentPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        if (this.leave == false) {
            return new Promise(function (resolve, reject) {
                _this.data.presentToast('You can not leave this page until ride complete');
                reject();
            });
        }
    };
    ConfirmPaymentPage.prototype.ionViewWillLeave = function () {
        //this.eve.unsubscribe('finished_ride:created');
    };
    ConfirmPaymentPage.prototype.subscribeAction = function () {
        var _this = this;
        /*if(this.eve_unsub) {
          this.eve.unsubscribe('live_tracking_Driver_id:created',this.eve_unsub);
          this.eve_unsub = undefined;
        } */
        this.eve.unsubscribe('live_tracking_Driver_id:created');
        this.traking = 'div';
        this.active = 'accept';
        this.showSelectDriverModal(this.driver_id);
        //this.watchMethod();
        var marker = null;
        this.updateTrak().then(function (data) {
            _this.userData = data;
            marker = new google.maps.Marker({
                position: data,
                map: _this.map,
                icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 4,
                    strokeColor: '#00F',
                    rotation: 0 }
            });
            if (_this.isStarted == false) {
                _this.getDuration(data).then(function (data) {
                    _this.duration = data;
                });
            }
            else {
                var dest = new google.maps.LatLng(_this.destination_lat, _this.destination_lng);
                _this.getDuration(dest).then(function (data) {
                    _this.duration = data;
                });
            }
        });
        this.intervalVar = setInterval(function () {
            if (_this.leave == false) {
                //this.watchMethod();
                _this.updateTrak().then(function (data) {
                    _this.userData = data;
                    _this.bearing(_this.Pre_lat, _this.Pre_lng, _this.userData.lat(), _this.userData.lng());
                    marker.setPosition({ lat: _this.userData.lat(), lng: _this.userData.lng() });
                    var bearing = _this.bearing(_this.Pre_lat, _this.Pre_lng, _this.userData.lat(), _this.userData.lng());
                    console.log(bearing);
                    var icon = marker.getIcon();
                    icon.rotation = bearing;
                    marker.setIcon(icon);
                    _this.trackedRoute.push({ lat: _this.userData.lat(), lng: _this.userData.lng() });
                    _this.redrawPath(_this.trackedRoute);
                    _this.Pre_lat = _this.userData.lat();
                    _this.Pre_lng = _this.userData.lng();
                    if (_this.isStarted == false) {
                        _this.getDuration(data).then(function (data) {
                            _this.duration = data;
                        });
                    }
                    else {
                        var dest = new google.maps.LatLng(_this.destination_lat, _this.destination_lng);
                        _this.getDuration(dest).then(function (data) {
                            _this.duration = data;
                        });
                    }
                });
            }
        }, 5000);
    };
    ConfirmPaymentPage.prototype.abc = function (marker, data) {
        this.userData = data;
        marker.setPosition({ lat: this.userData.lat(), lng: this.userData.lng() });
    };
    ConfirmPaymentPage.prototype.showSelectDriverModal = function (did) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__modalpage_modalpage__["a" /* ModalpagePage */], { modalAct: 'driverInfo', driverId: did });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.startNavigating(_this.source, _this.destination);
            if (data) { }
            else { }
        });
        modal.present();
    };
    ConfirmPaymentPage.prototype.loadMap = function () {
        var _this = this;
        //this.geolocation.watchPosition().subscribe((position) =>  {
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.latitude = position.coords.latitude;
            _this.longitude = position.coords.longitude;
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                clickableIcons: false,
                disableDefaultUI: true,
                zoomControl: false,
                enableHighAccuracy: true,
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
        }, function (err) {
            console.log(err);
        });
    };
    ConfirmPaymentPage.prototype.getDuration = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [new google.maps.LatLng(_this.latitude, _this.longitude)],
                destinations: [new google.maps.LatLng(data.lat(), data.lng())],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function (response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                    var distance = response.rows[0].elements[0].distance.text;
                    var duration = response.rows[0].elements[0].duration.text;
                    resolve(duration);
                }
                else {
                    this.data.presentToast("Unable to find the distance via road.");
                }
            });
        });
    };
    ConfirmPaymentPage.prototype.confirm_cancel = function () {
        var _this = this;
        this.cancel_btn = true;
        // var CancelDuration1;
        // var CancelCharge1;
        // var CancelDuration2;
        // var CancelCharge2;
        // var CancelDuration3;
        // var CancelCharge3;
        var current_date = new Date();
        var cancel_time = this.datepipe.transform(current_date, 'yyyy-MM-dd h:mm:ss');
        console.log("#################");
        console.log(current_date);
        console.log(cancel_time);
        console.log("#################");
        var param = new FormData();
        param.append("booking_id", this.booking_id);
        //  param.append("cancellation_time",cancel_time);
        this.data.RideCancelCharges(param).subscribe(function (result) {
            console.log("I am cancel booking");
            console.log(result);
            console.log(result.success.Charges_list);
            if (result.status == 'OK') {
                //CancelDuration1 = result.success.Charges_list[0].cancellation_time;
                //CancelCharge1 = result.success.Charges_list[0].charges;
                //CancelDuration2 = result.success.Charges_list[1].cancellation_time;
                //CancelCharge2 = result.success.Charges_list[1].charges;
                // CancelDuration3 = result.success.Charges_list[2].cancellation_time;
                // CancelCharge3 = result.success.Charges_list[2].charges;
                var alert_1 = _this.alertCtrl.create({
                    title: 'Cancellation Charges',
                    cssClass: 'cancel_booking_alert',
                    // message:'<div class="info">There are some cancellation charges as per following.</div><div class="min">For '+CancelDuration1+' min : </div><div class="charge">$'+CancelCharge1+'</div> <div class="min">For '+CancelDuration2+' min : </div><div class="charge"> $'+CancelCharge2+'</div><div class="min"> For '+CancelDuration3+' min : </div><div class="charge">$'+CancelCharge3+' </div><div class="que">Do you Really want to cancel Ride?</div>',
                    message: '<div class="info">You will be charged <span class="charge">$' + result.success.Charges_list + ' </span>for cancellation of this trip.</div>',
                    buttons: [
                        {
                            text: 'Yes',
                            handler: function () {
                                console.log('Accept clicked');
                                var param = new FormData();
                                param.append("customer_id", _this.customer_id);
                                if (_this.driver_id != '') {
                                    param.append("driver_id", _this.driver_id);
                                }
                                else {
                                    param.append("driver_id", '0');
                                }
                                param.append("booking_id", _this.booking_id);
                                console.log(_this.booking_id + " " + _this.driver_id + " " + _this.customer_id);
                                _this.data.customerRejectBooking(param).subscribe(function (result) {
                                    console.log("@@@@@@@@@@@@@@@@@");
                                    console.log(result);
                                    if (result.status == 'OK') {
                                        _this.data.presentToast('Request cancelled successfully');
                                        clearInterval(_this.intervalVar);
                                        _this.eve.unsubscribe('finished_ride:created');
                                        /*if(this.watch && this.watch !== undefined)
                                        {
                                          this.watch.unsubscribe();
                                        }*/
                                        __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref('customer/' + _this.customer_id).remove();
                                        __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref(_this.booking_id).remove();
                                        _this.leave = true;
                                        setTimeout(function () {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                            _this.eve.publish('activeItem');
                                        }, 3000);
                                    }
                                });
                                _this.cancel_btn = false;
                            }
                        },
                        {
                            text: 'No',
                            handler: function () {
                                _this.cancel_btn = false;
                                console.log('reject clicked ' + _this.cancel_btn);
                            }
                        }
                    ],
                    enableBackdropDismiss: false
                });
                alert_1.present();
            }
        });
    };
    ConfirmPaymentPage.prototype.addMarker = function () {
        this.deleteMarkers();
        var marker;
        marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        new google.maps.Circle({
            strokeColor: '#3853fa55',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            strokeWidth: 5,
            fillColor: '#00880055',
            fillOpacity: 0.35,
            map: this.map,
            center: this.map.getCenter(),
            radius: 300
        }).then(function (circle) {
            marker.bindTo('position', circle, 'center');
        });
        var content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    };
    ConfirmPaymentPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    ConfirmPaymentPage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    ConfirmPaymentPage.prototype.watchMethod = function () {
        /*var options = {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          distanceFilter: 1
        };
        this.watch = this.geolocation.watchPosition(options).subscribe((data) => {
          if(this.leave == false)
          {
            this.updateGeolocation(this.customer_id,this.booking_id, data.coords.latitude,data.coords.longitude);
          }
        });*/
    };
    ConfirmPaymentPage.prototype.updateGeolocation = function (customer_id, booking_id, lat, lng) {
        __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref(booking_id + '/' + customer_id).set({ 'latitude': lat, 'longitude': lng });
    };
    ConfirmPaymentPage.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    ConfirmPaymentPage.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    ConfirmPaymentPage.prototype.updateTrak = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_8_Firebase__["database"]().ref(_this.booking_id + '/' + _this.driver_id).on('value', function (snapshot) {
                snapshotToArray(snapshot).forEach(function (data) {
                    var image = 'assets/imgs/car48x48.png';
                    var updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
                    resolve(updatelocation);
                });
            });
        });
    };
    ConfirmPaymentPage.prototype.RideLaterOk = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    ConfirmPaymentPage.prototype.startNavigating = function (pickup, drop) {
        var _this = this;
        this.directionsPanel = this.directionsPanelElement.nativeElement;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { /*strokeColor:"#4a4a4a",*/ strokeOpacity: 0.8, strokeWeight: 3, strokeColor: '#278DF8' }, suppressMarkers: true });
        this.getLatLng(pickup).then(function (data) {
            _this.updateGeolocation(_this.customer_id, _this.booking_id, data['latitude'], data['longitude']);
            _this.startMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'], data['longitude']), map: _this.map, icon: 'assets/imgs/source_pin.png' });
            _this.markers.push(_this.startMarker);
        });
        this.getLatLng(drop).then(function (data) {
            _this.stopMarker = new google.maps.Marker({ position: new google.maps.LatLng(data['latitude'], data['longitude']), map: _this.map, icon: 'assets/imgs/destination_pin.png' });
            _this.markers.push(_this.stopMarker);
            _this.destination_lat = data['latitude'];
            _this.destination_lng = data['longitude'];
        });
        this.directionsService.route({
            origin: pickup,
            destination: drop,
            travelMode: google.maps.TravelMode['DRIVING']
        }, function (res, status) {
            var route = res.routes[0];
            //this.eve.publish('distance:created', route.legs[0].distance.text, Date.now());
            _this.directionsDisplay.setMap(null);
            if (status == google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setMap(_this.map);
                _this.directionsDisplay.setDirections(res);
            }
            else {
                console.warn(status);
            }
        });
    };
    ConfirmPaymentPage.prototype.redrawPath = function (path) {
        if (path.length > 1) {
            this.currentMapTrack = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#ff00ff',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            this.currentMapTrack.setMap(this.map);
        }
    };
    ConfirmPaymentPage.prototype.getLatLng = function (address) {
        return new Promise(function (resolve) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    resolve({ latitude: latitude, longitude: longitude });
                }
            });
        });
    };
    ConfirmPaymentPage.prototype.bearing = function (lat1, lng1, lat2, lng2) {
        var dLon = (lng2 - lng1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        var brng = this._toDeg(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
    };
    ConfirmPaymentPage.prototype._toDeg = function (rad) {
        return rad * 180 / Math.PI;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ConfirmPaymentPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('directionsPanel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], ConfirmPaymentPage.prototype, "directionsPanelElement", void 0);
    ConfirmPaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-confirm-payment',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/confirm-payment/confirm-payment.html"*/'<!--\n  Generated template for the ConfirmPaymentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="sideMenu" >\n    <ion-buttons end icon-only *ngIf="traking === \'div\'">\n      <button ion-button (click)="showSelectDriverModal(driver_id)">\n       <!--<ion-icon class="callIcon" name="call"></ion-icon>-->\n       <img class="callIcon" src="assets/imgs/taxi-driver.png" />\n      </button>\n    </ion-buttons>\n    <ion-title *ngIf =\'rideType == "now"\'>Ride Tracking</ion-title>\n    <ion-title *ngIf =\'rideType == "later"\'>Ride Information</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding *ngIf =\'rideType == "now"\'>\n  <ion-grid >\n    <ion-row>\n      <ion-col col-12>\n        <div class="signoutcontentdiv" text-center>\n          <!-- <h1> Your Ride Confirmation Successful! </h1> -->\n          <h1> Your request has been sent successfully. Please wait for response. </h1>\n        </div>\n      </ion-col>\n     \n      <ion-col col-12>\n        <div class="signoutimgdiv">\n          <img [ngClass]="traking === \'image\' ? \'trak_image\' : \'no_trak_image\'" class="live_trak" src="assets/imgs/checked-symbol.png" />\n          <div [ngClass]="traking === \'div\' ? \'track_div\' : \'no_trak_div\'" class="live_trak">\n              <div id="distance">\n                 {{duration}}\n              </div>\n            <div #map id="map"></div>\n            <div #directionsPanel id="directionsPanel"></div>\n          </div>\n        </div>\n        <div class="driver_status" [ngClass]="active === \'reject\' ? \'bg_reject\' : \'bg_accept\'"></div>\n      </ion-col> \n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-content padding *ngIf=\'rideType == "later"\'>\n  <ion-grid >\n    <ion-row>     \n      <ion-col col-12>\n        <div class="signoutcontentdiv" text-center>\n          <h1> Your Ride Request saved successfully. </h1>\n          <p>\n            Driver information will send to you 10 minutes before your Ride\n          </p>\n        </div>\n        <button (click)=\'RideLaterOk()\' class="login-btn" ion-button color="primary" block >OK</button>\n      </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <button (click)=\'confirm_cancel()\' class="login-btn" ion-button color="primary" *ngIf="!isStarted" block [disabled]="cancel_btn">Cancel Booking</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/confirm-payment/confirm-payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__providers_service_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_12__angular_common__["d" /* DatePipe */]])
    ], ConfirmPaymentPage);
    return ConfirmPaymentPage;
}());

var snapshotToArray = function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function () {
        var item = snapshot.val();
        item.key = snapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};
//# sourceMappingURL=confirm-payment.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, service, loading, navParams, storage, data, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loading = loading;
        this.navParams = navParams;
        this.storage = storage;
        this.data = data;
        this.event = event;
        this.feedback = '';
        this.rate = '';
        this.isfav = false;
        this.favDriver = '';
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
        });
        this.booking_id = navParams.get('booking_id');
        this.driver_id = navParams.get('driver_id');
        this.customer_id = navParams.get('customer_id');
        this.feedback_form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            feedback: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            rate: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
        });
        this.storage.get('user').then(function (data) {
            var role = data[0].role;
            if (role == 2) {
                _this.data.getFavDrivers().subscribe(function (result) {
                    if (result.status == "OK") {
                        _this.fav_drivers = result.success.favdrivers; //this.data.presentToast('Feedback sent successfully');
                        //this.navCtrl.setRoot(HomePage);
                        _this.checkFavDriver(result.success.favdrivers).then(function (data) {
                            if (data == 'favorite') {
                                _this.favDriver = 'Added to favourite';
                            }
                            else {
                                _this.favDriver = 'Add driver as a favourite';
                            }
                        });
                    }
                    else {
                    }
                });
            }
        });
        loader.dismiss();
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    FeedbackPage.prototype.checkFavDriver = function (list) {
        var did = this.driver_id.toString();
        return new Promise(function (resolve, reject) {
            list.forEach(function (value) {
                console.log(value);
                if (did == value.id) {
                    resolve('favorite');
                }
            });
            resolve('nofavorite');
        });
    };
    FeedbackPage.prototype.sendFeedback = function (feedback, rate) {
        var _this = this;
        if (feedback != '' && rate != '') {
            this.service.presentLoader('Please wait...');
            var param = new FormData();
            param.append("feedback", feedback);
            param.append("rating", rate);
            param.append("booking_id", this.booking_id);
            if (this.role == 2) {
                param.append("driver_id", this.driver_id);
                this.data.feedback(param).subscribe(function (result) {
                    if (result.status == "OK") {
                        _this.service.dismissLoader();
                        _this.data.presentToast('Feedback sent successfully');
                        setTimeout(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                            _this.event.publish('activeItem');
                        }, 3000);
                    }
                    else {
                        _this.service.dismissLoader();
                    }
                });
            }
            else if (this.role == 3) {
                param.append("customer_id", this.customer_id);
                this.data.feedbacktoCustomer(param).subscribe(function (result) {
                    if (result.status == "OK") {
                        _this.service.dismissLoader();
                        _this.data.presentToast('Feedback sent successfully');
                        setTimeout(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        }, 3000);
                    }
                    else {
                        _this.service.dismissLoader();
                    }
                });
            }
        }
    };
    FeedbackPage.prototype.notify = function (isfav) {
        var _this = this;
        //console.log("Toggled: "+ isRemember);
        this.isfav = !isfav;
        if (this.isfav == true) {
            this.favDriver = 'Added to favourite';
            var param = new FormData();
            param.append("driver_id", this.driver_id);
            this.data.addFavDriver(param).subscribe(function (result) {
                if (result.status == "OK") {
                    _this.data.presentToast('Added driver to favorite list successfully');
                }
                else {
                }
            });
        }
        else {
            this.favDriver = 'Add driver as a favourite';
            var param = new FormData();
            param.append("driver_id", this.driver_id);
            this.data.removeFavDriver(param).subscribe(function (result) {
                if (result.status == "OK") {
                    _this.data.presentToast('Removed driver from favorite list successfully');
                }
                else {
                }
            });
        }
        //console.log("Toggled: "+ this.isRemember); 
    };
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-feedback',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/feedback/feedback.html"*/'<!--\n  Generated template for the FeedbackPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Feedback</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div class="forgetPass-img" text-center>\n    <img src="assets/imgs/website-rating-feedback-and-review.png" />\n    <ion-item *ngIf="role==2"> \n        <button *ngIf="favDriver !=\'\'" class="fav_driver" (click)="notify(isfav)">{{favDriver}}</button>\n    </ion-item>\n  </div>\n  <form [formGroup]="feedback_form" text-center>      \n    <h2>Feedback</h2>\n    <p>Please help us to serve you better by feeling out a feedback form</p>\n    <ion-textarea formControlName="feedback" [(ngModel)]="feedback" [class.invalid]="!feedback_form.valid && (feedback_form.controls.feedback.dirty || submitAttempt)"></ion-textarea>\n    <div class="error" *ngIf="feedback_form.get(\'feedback\').hasError(\'required\')  && feedback_form.get(\'feedback\').touched">\n      Please fill out this field\n    </div>\n\n    <rating formControlName="rate" [(ngModel)]="rate" \n        readOnly="false"\n        max="5"\n        emptyStarIconName="star-outline" \n        halfStarIconName="star-half"\n        starIconName="star"\n        nullable="false"\n        [class.invalid]="!feedback_form.valid && (feedback_form.controls.rate.dirty || submitAttempt)"\n        >\n    </rating>\n    <div class="error" *ngIf="feedback_form.get(\'feedback\').hasError(\'required\')  && feedback_form.get(\'feedback\').touched">\n      Please fill out this field\n    </div>\n\n    <button class="login-btn" ion-button color="primary" [disabled]="!this.feedback_form.valid" (click)="sendFeedback(feedback,rate)" block >Send</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/feedback/feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_service_service__["a" /* ServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signup_signup__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__forgotpasswoed_forgotpasswoed__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__emailverification_emailverification__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_service_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SigninPage = /** @class */ (function () {
    function SigninPage(oneSignal, navCtrl, androidPermissions, alertCtrl, data, storage, loading, events, geolocation, menu, service) {
        var _this = this;
        this.oneSignal = oneSignal;
        this.navCtrl = navCtrl;
        this.androidPermissions = androidPermissions;
        this.alertCtrl = alertCtrl;
        this.data = data;
        this.storage = storage;
        this.loading = loading;
        this.events = events;
        this.geolocation = geolocation;
        this.menu = menu;
        this.service = service;
        this.isRemember = false;
        this.uname = '';
        this.pass = '';
        this.flag = 0;
        this.passwordType = 'password';
        this.passwordIcon = 'eye-off';
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(function (result) {
            console.log('Has permission?', result.hasPermission);
            //alert('result.hasPermission==>'+result.hasPermission);
            if (result.hasPermission == false) {
                _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);
            }
        }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION); });
        this.signin = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
        });
    }
    SigninPage.prototype.ionViewCanLeave = function () {
        this.menu.swipeEnable(true);
    };
    SigninPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menu.swipeEnable(false);
        this.storage.get("isChecked").then(function (data) {
            if (data != null) {
                _this.isRemember = true;
                _this.flag = 1;
                _this.storage.get('isChecked').then(function (data) {
                    console.log("!@#!@!@#@!@#@!@#@@!@#@!@!");
                    console.log(data);
                    _this.uname = data.uname;
                    _this.pass = data.pass;
                    console.log(_this.uname + " " + _this.pass);
                });
            }
        });
    };
    SigninPage.prototype.createUser = function (user, token) {
        console.log('User created!');
        this.events.publish('user:created', user, Date.now(), token);
    };
    SigninPage.prototype.red_list = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.signIn = function (uname, pass) {
        var _this = this;
        //if(this.isRemember == true)
        //{
        this.storage.set('isRemember', true);
        // }
        var param = new FormData();
        param.append("email", uname);
        param.append("password", pass);
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.data.userSignIn(param).subscribe(function (result) {
            console.log(result);
            if (result.status == "ERROR") {
                //this.data.presentToast('Invalid Username or Password!');
                _this.data.presentToast(result.error);
                loader.dismiss();
            }
            else {
                console.log(result.success.user);
                //  this.createUser(result.success.user);
                if (result.success.user[0].active == 1) {
                    console.log(result.success.token);
                    _this.storage.set("token", result.success.token).then(function () {
                        _this.createUser(result.success.user, result.success.token);
                    });
                    _this.storage.set("user", result.success.user);
                    if (_this.isRemember == true) {
                        var data = { "uname": _this.uname, "pass": _this.pass };
                        _this.storage.set("isChecked", data);
                    }
                    else {
                        _this.storage.remove("isChecked");
                    }
                    //  setTimeout(() => {
                    if (result.success.user[0].role == 2) {
                        _this.oneSignal.sendTag('customer_id', result.success.user[0].id);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                        _this.events.publish('active-menu');
                        loader.dismiss();
                    }
                    else if (result.success.user[0].role == 3) {
                        _this.oneSignal.sendTag('driver_id', result.success.user[0].id);
                        var param_1 = result.success.user[0].id;
                        _this.data.getDriverProfile(param_1).subscribe(function (result) {
                            if (result.status == 'OK') {
                                if (result.success.profile.is_completed == 0) {
                                    _this.data.getToken();
                                    loader.dismiss();
                                    //this.navCtrl.push(EditProfilePage);
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                    _this.events.publish('active-menu');
                                }
                                else {
                                    _this.data.getToken();
                                    loader.dismiss();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                    _this.events.publish('active-menu');
                                }
                            }
                            else {
                                //this.data.presentToast('Unable to get your Profile data!');
                                _this.storage.get('isProfile_Complete').then(function (data1) {
                                    if (data1 == null || data1 == undefined || data1 == false) {
                                        //this.storage.set('showSlide', false);
                                        //show slide logic should run
                                        _this.data.getToken();
                                        loader.dismiss();
                                        //this.navCtrl.push(EditProfilePage);       
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                        _this.events.publish('active-menu');
                                    }
                                    else {
                                        _this.data.getToken();
                                        loader.dismiss();
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                        _this.events.publish('active-menu');
                                    }
                                });
                            }
                        });
                    }
                    //  }, 2500);   
                }
                else {
                    loader.dismiss();
                    //this.navCtrl.push(EmailverificationPage,{data:result.success.user}); 
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__emailverification_emailverification__["a" /* EmailverificationPage */], { first_name: result.success.user[0].first_name, last_name: result.success.user[0].last_name, email: result.success.user[0].email });
                }
            }
        }, function (err) {
            loader.dismiss();
            _this.service.presentToast("Network error");
        });
    };
    SigninPage.prototype.notify = function (isRemember) {
        //console.log("Toggled: "+ isRemember);
        if (this.flag == 0) {
            this.isRemember = !isRemember;
        }
        else {
            this.flag = 0;
            //  this.isRemember = false;
        }
        console.log("Toggled: " + this.isRemember);
    };
    SigninPage.prototype.gotoForgotPass = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__forgotpasswoed_forgotpasswoed__["a" /* ForgotpasswoedPage */]);
    };
    SigninPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/signin/signin.html"*/'<!--<ion-header>\n  <ion-navbar align-title="center" color="primary">\n    <ion-title>\n      <h2>Sign In</h2>\n    <!--   <p>Sign In</p> --\n    </ion-title>\n  </ion-navbar>\n</ion-header>-->\n\n<ion-content padding> \n\n  <div class="login-container">\n\n    <div class="title_div">\n      <h2 class="head_title">TFH</h2>\n      <h3 class="sub_title">Welcome Back!</h3>\n      <p class="title_info">Sign In to continue to TaXI App</p>\n    </div>\n    <!-- Login form-->\n    <form class="sign_in_form" [formGroup]="signin" > \n      <ion-list no-lines>\n        <ion-item>\n          <ion-label stacked>Email Address</ion-label>\n          <ion-input type="email" [(ngModel)]="uname" formControlName="email" [class.invalid]="!signin.valid && (signin.controls.email.dirty || submitAttempt)" ></ion-input>\n        </ion-item>\n\n        <div class="error" *ngIf="signin.get(\'email\').hasError(\'required\') && signin.get(\'email\').touched">\n            Please fill out this field.\n        </div>\n            \n        <div class="error" *ngIf="!signin.get(\'email\').hasError(\'required\') && (signin.get(\'email\').hasError(\'email\') && signin.get(\'email\').dirty )">\n            Please enter valid Email address\n        </div>\n\n        <ion-item>\n            <ion-label stacked>Password</ion-label>\n            <ion-input [type]="passwordType" [(ngModel)]="pass" formControlName="password" [class.invalid]="!signin.valid && (signin.controls.password.dirty || submitAttempt)" ></ion-input>\n            <ion-icon item-end [name]="passwordIcon" class="passwordIcon" (click)=\'hideShowPassword()\' style="height:32px;"></ion-icon>\n        </ion-item>\n\n        <div class="error" *ngIf="signin.get(\'password\').hasError(\'required\')  && signin.get(\'password\').touched">\n            Please fill out this field\n        </div>\n\n        <ion-item>\n            <ion-label>Remember Me</ion-label>\n            <ion-checkbox (ionChange)="notify(isRemember)" [checked]="isRemember"></ion-checkbox>\n        </ion-item>\n    \n        <ion-item class="submit_btn_item">\n          <a class="forgot_pass" (click)="gotoForgotPass()"><p>Forgot password?</p></a>\n          <button class="login-btn" ion-button color="primary" block  (click)="signIn(uname, pass)" [disabled]="!this.signin.valid">SIGN IN</button>\n          <p class="new_acc" (click)=\'red_list()\'>Create New Account</p>\n        </ion-item>\n      </ion-list> \n    </form>\n  </div>\n</ion-content>      \n\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/signin/signin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_12__providers_service_service__["a" /* ServiceProvider */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feedback_feedback__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Firebase__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_Firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_Firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_background_mode__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PaymentPage = /** @class */ (function () {
    function PaymentPage(backgroundMode, loading, eve, actionSheetCtrl, payPal, navCtrl, navParams, data, storage) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.loading = loading;
        this.eve = eve;
        this.actionSheetCtrl = actionSheetCtrl;
        this.payPal = payPal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = data;
        this.storage = storage;
        this.cost = 0;
        this.leave = false;
        this.payBtn_text = 'Pay';
        this.isnowenabled = true;
        this.backgroundMode.enable();
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        this.booking_id = navParams.get('booking_id');
        this.driver_id = navParams.get('driver_id');
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
        });
        var param = new FormData();
        param.append("booking_id", this.booking_id);
        this.data.getcurrentBooking(param).subscribe(function (result) {
            if (result.status == "OK") {
                _this.cost = result.success.booking.cost;
                loader.dismiss();
            }
            else {
                _this.data.presentToast('Error');
                loader.dismiss();
            }
        });
    }
    PaymentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PaymentPage');
        this.eve.subscribe('cashpaymentReceived:created', function (selected_Cash_Payment, time) {
            __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref(_this.booking_id).remove();
            __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('customer/' + _this.id).remove();
            _this.eve.unsubscribe('cashpaymentReceived:created');
            _this.moveForward();
        });
    };
    PaymentPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        //this.eve.unsubscribe('cashpaymentReceived:created');
        if (this.leave == false) {
            return new Promise(function (resolve, reject) {
                _this.data.presentToast('You can not leave this page until Payment Complete');
                reject();
            });
        }
        this.backgroundMode.disable();
    };
    PaymentPage.prototype.moveForward = function () {
        var _this = this;
        this.leave = true;
        if (this.role == 2) {
            var currentIndex_1 = this.navCtrl.getActive().index;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__feedback_feedback__["a" /* FeedbackPage */], { booking_id: this.booking_id, driver_id: this.driver_id }).then(function () {
                _this.navCtrl.remove(currentIndex_1);
            });
        }
        else if (this.role == 3) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        }
    };
    PaymentPage.prototype.pay = function () {
        var _this = this;
        this.isnowenabled = false;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Use payment method',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Wallet',
                    handler: function () {
                        var param = new FormData();
                        param.append('customer_id', _this.id);
                        param.append('booking_id', _this.booking_id);
                        param.append('driver_id', _this.driver_id);
                        param.append('amount', _this.cost);
                        param.append('method', 'wallet');
                        _this.data.CashMethodNotification(param).subscribe(function (result) {
                            console.log(result);
                            if (result.status == 'OK') {
                                //  this.data.presentToast('Notification success');
                                _this.payUsingWallet();
                            }
                        });
                    }
                },
                {
                    text: 'Paypal or Card',
                    handler: function () {
                        var param = new FormData();
                        param.append('customer_id', _this.id);
                        param.append('booking_id', _this.booking_id);
                        param.append('driver_id', _this.driver_id);
                        param.append('amount', _this.cost);
                        param.append('method', 'paypal');
                        _this.data.CashMethodNotification(param).subscribe(function (result) {
                            console.log(result);
                            if (result.status == 'OK') {
                                //  this.data.presentToast('Notification success');
                                _this.payUsingPaypal();
                            }
                        });
                    }
                },
                {
                    text: 'Cash',
                    handler: function () {
                        _this.payCash();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PaymentPage.prototype.payUsingPaypal = function () {
        var _this = this;
        this.leave == true;
        this.payPal.init({
            PayPalEnvironmentProduction: 'ATyecYC9QulZbd0Gd3-6EU-qwJtm_-wATZpWp0tll2Hu2eosdhr-gDK1kyh2odnEkamuRoUPWUuHflMK',
            PayPalEnvironmentSandbox: 'AWTTT5V870I-5KsL8D3pR8wu6dTF0r3cEa-zpqI9YCK33AEfUedvxXOegKfmUdM_ofYR4a247R8h7s8S'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                var payment = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__["c" /* PayPalPayment */](_this.cost, 'USD', 'This is payment for completed Ride', 'Pay');
                _this.payPal.renderSinglePaymentUI(payment).then(function (result) {
                    console.log(JSON.stringify(result));
                    var loader = _this.loading.create({
                        content: "Please wait...",
                        spinner: 'crescent'
                    });
                    loader.present();
                    if (_this.cost && _this.booking_id && _this.id && _this.driver_id) {
                        var param = new FormData();
                        param.append("response_type", result.response_type);
                        param.append("payment_id", result.response.id);
                        param.append("state", result.response.state);
                        param.append("create_time", result.response.create_time);
                        param.append("intent", result.response.intent);
                        param.append("platform", result.client.platform);
                        param.append("balance", _this.cost);
                        param.append('customer_id', _this.id);
                        param.append('booking_id', _this.booking_id);
                        param.append('driver_id', _this.driver_id);
                        _this.data.payment(param).subscribe(function (result) {
                            console.log(result);
                            if (result.status == 'OK') {
                                _this.data.presentToast('Payment Successfull!');
                                loader.dismiss();
                                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref(_this.booking_id).remove();
                                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('customer/' + _this.id).remove();
                                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('driver/' + _this.driver_id).remove();
                                setTimeout(function () {
                                    _this.moveForward();
                                }, 3000);
                            }
                        });
                    }
                    else {
                        _this.data.presentToast('There is some problem please try after some time.');
                    }
                    // Successfully paid
                    // Example sandbox response
                    //
                    // {
                    //   "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                }, function (error) {
                    // Error or render dialog closed without being successful
                    console.log(error);
                });
            }, function (error) {
                // Error in configuration
                console.log(error);
            });
        }, function (error) {
            // Error in initialization, maybe PayPal isn't supported or something else
            console.log(error);
        });
    };
    PaymentPage.prototype.payUsingWallet = function () {
        var _this = this;
        var loader = this.loading.create({
            content: "Please wait...",
            spinner: 'crescent'
        });
        loader.present();
        var param = new FormData();
        param.append("balance", this.cost);
        param.append('customer_id', this.id);
        param.append('booking_id', this.booking_id);
        param.append('driver_id', this.driver_id);
        this.data.walletPayment(param).subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
                loader.dismiss();
                _this.data.presentToast('Payment Successfull!');
                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref(_this.booking_id).remove();
                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('customer/' + _this.id).remove();
                __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('driver/' + _this.driver_id).remove();
                setTimeout(function () {
                    _this.moveForward();
                }, 3000);
            }
            else {
                loader.dismiss();
                var param1 = new FormData();
                param1.append("customer_id", _this.id);
                _this.data.getWalletAmount(param1).subscribe(function (result) {
                    _this.leave == true;
                    console.log(result);
                    if (result.status == 'OK') {
                        if (parseFloat(_this.cost) > parseFloat(result.success.balance)) {
                            var actionSheet = _this.actionSheetCtrl.create({
                                title: 'Wallet amount is not sufficient to pay Ride cost',
                                enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: 'Add amount to wallet & pay?',
                                        handler: function () {
                                            var amount = (_this.cost - result.success.balance + 1).toString();
                                            _this.payPal.init({
                                                PayPalEnvironmentProduction: 'ATyecYC9QulZbd0Gd3-6EU-qwJtm_-wATZpWp0tll2Hu2eosdhr-gDK1kyh2odnEkamuRoUPWUuHflMK',
                                                PayPalEnvironmentSandbox: 'AWTTT5V870I-5KsL8D3pR8wu6dTF0r3cEa-zpqI9YCK33AEfUedvxXOegKfmUdM_ofYR4a247R8h7s8S'
                                            }).then(function () {
                                                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                                                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                                                    var payment = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__["c" /* PayPalPayment */](amount, 'USD', 'Top-up Given amount into customer wallet', 'Top-up');
                                                    _this.payPal.renderSinglePaymentUI(payment).then(function (result) {
                                                        //console.log(payment)
                                                        //alert(JSON.stringify(result.response));
                                                        //this.data.presentToast('Top-Up Successfull!');
                                                        var loader = _this.loading.create({
                                                            content: "Please wait...",
                                                            spinner: 'crescent'
                                                        });
                                                        loader.present();
                                                        var param = new FormData();
                                                        param.append("response_type", result.response_type);
                                                        param.append("payment_id", result.response.id);
                                                        param.append("state", result.response.state);
                                                        param.append("create_time", result.response.create_time);
                                                        param.append("intent", result.response.intent);
                                                        param.append("platform", result.client.platform);
                                                        param.append('customer_id', _this.id);
                                                        param.append('balance', amount);
                                                        _this.data.walletTopUp(param).subscribe(function (result) {
                                                            console.log(result);
                                                            if (result.status == 'OK') {
                                                                if (_this.cost && _this.booking_id && _this.id && _this.driver_id) {
                                                                    var param_1 = new FormData();
                                                                    param_1.append("balance", _this.cost);
                                                                    param_1.append('customer_id', _this.id);
                                                                    param_1.append('booking_id', _this.booking_id);
                                                                    param_1.append('driver_id', _this.driver_id);
                                                                    _this.data.walletPayment(param_1).subscribe(function (result) {
                                                                        console.log(result);
                                                                        if (result.status == 'OK') {
                                                                            loader.dismiss();
                                                                            _this.data.presentToast('Payment Successfull!');
                                                                            __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref(_this.booking_id).remove();
                                                                            __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('customer/' + _this.id).remove();
                                                                            __WEBPACK_IMPORTED_MODULE_7_Firebase__["database"]().ref('driver/' + _this.driver_id).remove();
                                                                            setTimeout(function () {
                                                                                _this.moveForward();
                                                                            }, 3000);
                                                                        }
                                                                    });
                                                                    loader.dismiss();
                                                                }
                                                                else {
                                                                    loader.dismiss();
                                                                    _this.data.presentToast('There is some problem please try after some time.');
                                                                }
                                                            }
                                                        });
                                                        // Successfully paid
                                                        // Example sandbox response
                                                        //
                                                        // {
                                                        //   "client": {
                                                        //     "environment": "sandbox",
                                                        //     "product_name": "PayPal iOS SDK",
                                                        //     "paypal_sdk_version": "2.16.0",
                                                        //     "platform": "iOS"
                                                        //   },
                                                        //   "response_type": "payment",
                                                        //   "response": {
                                                        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                                                        //     "state": "approved",
                                                        //     "create_time": "2016-10-03T13:33:33Z",
                                                        //     "intent": "sale"
                                                        //   }
                                                        // }
                                                    }, function (error) {
                                                        console.log(error);
                                                        // Error or render dialog closed without being successful
                                                    });
                                                }, function (error) {
                                                    console.log(error);
                                                    // Error in configuration
                                                });
                                            }, function (error) {
                                                console.log(error);
                                                // Error in initialization, maybe PayPal isn't supported or something else
                                            });
                                        }
                                    },
                                    {
                                        text: 'Use Paypal or Card',
                                        handler: function () {
                                            _this.payUsingPaypal();
                                        }
                                    },
                                ]
                            });
                            actionSheet.present();
                        }
                    }
                });
            }
        });
    };
    PaymentPage.prototype.payCash = function () {
        this.payBtn_text = 'Payment procressing';
        var param = new FormData();
        param.append('customer_id', this.id);
        param.append('booking_id', this.booking_id);
        param.append('driver_id', this.driver_id);
        param.append('amount', this.cost);
        param.append('method', 'cash');
        this.data.CashMethodNotification(param).subscribe(function (result) {
            console.log(result);
            if (result.status == 'OK') {
                //this.data.presentToast('Notification success');
            }
        });
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/payment/payment.html"*/'<!--\n  Generated template for the PaymentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="sideMenu" hideBackButton>\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n\n    <ion-title>Payment</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-item class="desc">\n    <div text-center>\n        <img class="thumbImg" src="assets/imgs/thumbs-up.png"/>\n    </div>\n    <h3>Ride Completed Successfully.</h3>\n    <img src="assets/imgs/1300231.svg"/>\n  </ion-item>\n  <span class="cost">${{cost}}</span>\n  <button class="profile-btn" ion-button color="primary" (click)="pay()" *ngIf="cost > 0" [disabled]="!isnowenabled" block>{{payBtn_text}}</button>\n</ion-content>\n'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/payment/payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailverificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the EmailverificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailverificationPage = /** @class */ (function () {
    function EmailverificationPage(navCtrl, navParams, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        //this.user = this.navParams.get('data');
        this.first_name = this.navParams.get('first_name');
        this.last_name = this.navParams.get('last_name');
        this.email = this.navParams.get('email');
    }
    EmailverificationPage.prototype.ionViewCanLeave = function () {
        this.menu.swipeEnable(true);
    };
    EmailverificationPage.prototype.ionViewWillEnter = function () {
        this.menu.swipeEnable(false);
    };
    EmailverificationPage.prototype.ionViewWillLeave = function () {
        //this.navCtrl.popTo(SigninPage);	
    };
    EmailverificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmailverificationPage');
    };
    EmailverificationPage.prototype.gotoSignIn = function () {
        console.log("I am called.....................");
        this.navCtrl.pop();
        //  this.navCtrl.setRoot(SigninPage);	
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], EmailverificationPage.prototype, "nav", void 0);
    EmailverificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-emailverification',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/emailverification/emailverification.html"*/'<!--\n  Generated template for the EmailverificationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Email Verification</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <!--<button ion-button (click)=\'goBack()\' >Go Back</button>-->\n  <div class="emptydiv" text-center>\n    <img src="assets/imgs/letter.png" />\n  </div>\n  <div class="contentdiv" text-center>\n    <h2>Verify your email address</h2>\n    <p>{{first_name}} {{last_name}} to start using TFH, we need to verify your email ID : {{email}}.</p>\n    <p>Check your email & click the verification link to activate your account.</p>\n    <button ion-button class="login-btn" clear (click)="gotoSignIn()">Sign In</button>     \n  </div>\n</ion-content>\n   '/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/emailverification/emailverification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], EmailverificationPage);
    return EmailverificationPage;
}());

//# sourceMappingURL=emailverification.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeliveryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__confirm_payment_confirm_payment__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DeliveryPage = /** @class */ (function () {
    function DeliveryPage(actionSheetCtrl, eve, navCtrl, modalCtrl, storage, data, geolocation, navParams, zone, maps, platform, viewCtrl) {
        var _this = this;
        this.actionSheetCtrl = actionSheetCtrl;
        this.eve = eve;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.data = data;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.vehicle_type = '';
        this.marker = [];
        this.delivery_type = '';
        this.isnowenabled = false;
        this.drivers = [];
        this.from = this.navParams.get('from');
        this.to = this.navParams.get('to');
        this.type = this.navParams.get('type');
        this.oneway = this.navParams.get('oneway');
        this.weight = this.navParams.get('weight');
        this.length = this.navParams.get('length');
        this.width = this.navParams.get('width');
        this.height = this.navParams.get('height');
        var addresses = [this.from, this.to];
        //var addresses = '';
        this.getLatLng(addresses).then(function (addressFull) {
            _this.pick_up_lt = addressFull[0];
            _this.pick_up_lg = addressFull[1];
            _this.drop_lt = addressFull[2];
            _this.drop_lg = addressFull[3];
        });
        if (this.navParams.get('delivery_type')) {
            this.delivery_type = this.navParams.get('delivery_type');
            this.date = this.navParams.get('date');
            this.time = this.navParams.get('time');
        }
        this.maps.getLatLng(this.from).then(function (data) {
            _this.source_lat = data['latitude'];
            _this.source_lng = data['longitude'];
        });
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.calculated_distance = '0 km';
        eve.subscribe('distance:created', function (distance, time) {
            // user and time are the same arguments passed in `events.publish(user, time)`  
            _this.calculated_distance = distance;
            var param = new FormData();
            var x = _this.calculated_distance.split("km");
            x = x[0].replace(",", "");
            console.log("!@#!@#");
            console.log(_this.calculated_distance + " " + x[0] + " " + x);
            param.append("distance", x);
            if (_this.oneway) {
                param.append("oneway", '0');
            }
            else {
                param.append("oneway", '1');
            }
            param.append("weight", _this.weight);
            param.append("length", _this.length);
            param.append("width", _this.width);
            param.append("height", _this.height);
            param.append("source_lat", _this.source_lat);
            param.append("source_lng", _this.source_lng);
            _this.data.getCostandVehicle(param).subscribe(function (result) {
                console.log("########");
                console.log(result);
                if (result.status == "ERROR") {
                    _this.data.presentToast(result.error);
                    return false;
                }
                else {
                    _this.vehicle_type = result.success.vehicle_type;
                    _this.cost = result.success.trip_costs;
                    _this.nearbyDrivers = result.success.deliver_trip_costs;
                    console.log('this.nearbyDrivers==>' + _this.nearbyDrivers);
                    _this.showNearbyVehicles();
                }
            });
        });
        this.storage.get('user').then(function (data) {
            _this.id = data[0].id;
            _this.role = data[0].role;
            _this.customer_name = data[0].first_name + ' ' + data[0].last_name;
        });
    }
    DeliveryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.searchDisabled = false;
        });
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.lat = position.coords.latitude;
            _this.long = position.coords.longitude;
        });
    };
    DeliveryPage.prototype.ionViewDidEnter = function () {
        this.maps.startNavigating(this.from, this.to, this.directionsPanel.nativeElement);
    };
    DeliveryPage.prototype.updateActive = function (name) {
        this.active = name;
        this.isnowenabled = true;
    };
    DeliveryPage.prototype.showNearbyVehicles = function () {
        var address = [];
        if (this.nearbyDrivers.length > 0) {
            for (var i = 0; i < this.nearbyDrivers.length; i++) {
                address[i] = [];
                address[i]['lat'] = this.nearbyDrivers[i].latitude;
                address[i]['lng'] = this.nearbyDrivers[i].longitude;
                this.drivers[i] = this.nearbyDrivers[i].driver_id;
                this.addMarker(address[i]['lat'], address[i]['lng'], this.drivers[i]);
            }
        }
    };
    DeliveryPage.prototype.addMarker = function (lt, lg, driver) {
        this.marker = new google.maps.Marker({
            map: this.maps.map,
            position: new google.maps.LatLng(lt, lg),
            icon: { url: 'assets/imgs/truck48x48.png',
                size: {
                    width: 64,
                    height: 55
                }
            },
            animation: google.maps.Animation.DROP
        });
    };
    DeliveryPage.prototype.getLatLng = function (addresses) {
        var addressFull = [];
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            addresses.forEach(function (value) {
                console.log(value);
                geocoder.geocode({ 'address': value }, function (results, status) {
                    if (status == 'OK') {
                        var address0 = results[0].geometry.location.lat();
                        var address1 = results[0].geometry.location.lng();
                        console.log(address0, address1);
                        addressFull.push(address0);
                        addressFull.push(address1);
                        if (addressFull.length > 3) {
                            resolve(addressFull);
                        }
                        //console.log(address);
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        });
    };
    DeliveryPage.prototype.confirmRequest = function () {
        var _this = this;
        this.isnowenabled = false;
        if (this.active != '') {
            if (this.delivery_type == 'now') {
                var param1 = new FormData();
                param1.append("customer_id", this.id);
                this.data.getWalletAmount(param1).subscribe(function (result) {
                    if (result.status == 'OK') {
                        if (parseFloat(result.success.balance) < 0) {
                            _this.data.presentToast("Your wallet balance is in minus, So you can't take Ride");
                        }
                        else {
                            //this.isnowenabled = false;
                            var temp = _this.calculated_distance.replace(",", "");
                            temp = temp.split(" ");
                            var param = new FormData();
                            param.append("isRide", _this.data.isRide);
                            param.append("customer_id", _this.id);
                            param.append("schedule", "0");
                            param.append("schedule_time", null);
                            param.append("distance", temp[0]);
                            param.append("vehicle_type", _this.vehicle_type);
                            param.append("source", _this.from);
                            param.append("source_lat", _this.pick_up_lt);
                            param.append("source_long", _this.pick_up_lg);
                            param.append("destination_lat", _this.drop_lt);
                            param.append("destination_long", _this.drop_lg);
                            param.append("destination", _this.to);
                            param.append("total", null);
                            param.append("is_cancelled", "0");
                            param.append("is_completed", "0");
                            param.append("is_paid", "0");
                            param.append("status", "0");
                            param.append("cost", _this.cost);
                            param.append("driver_id", '');
                            param.append("payment_method", _this.active);
                            param.append("type", "delivery");
                            param.append("parcel_type", _this.type);
                            param.append("height", _this.height);
                            param.append("weight", _this.weight);
                            param.append("length", _this.length);
                            param.append("width", _this.width);
                            _this.data.bookingRequest(param).subscribe(function (result) {
                                console.log(result);
                                //this.userData = result; 
                                if (result.status == "ERROR" || result.status == "Error") {
                                    _this.data.presentToast('Your wallet balance is low. Please select another payment method.');
                                    //this.isnowenabled = true;      
                                    return false;
                                }
                                else {
                                    //this.storage.set("customer_data",data.msg[0]);
                                    _this.data.presentToast('Booking request sent Successfully!');
                                    var param1_1 = new FormData();
                                    param1_1.append("driver_id", _this.drivers);
                                    param1_1.append("customer_id", _this.id);
                                    param1_1.append("booking_id", result.success.booking_request.id);
                                    param1_1.append("pick_up", 'now');
                                    param1_1.append("source", _this.from);
                                    param1_1.append("customer", _this.customer_name);
                                    _this.data.postNotification(param1_1).subscribe(function (result) {
                                        if (result.status == "ERROR") {
                                        }
                                    });
                                    var currentIndex_1 = _this.navCtrl.getActive().index;
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__confirm_payment_confirm_payment__["a" /* ConfirmPaymentPage */], { 'booking_id': result.success.booking_request.id, rideType: 'now', source: _this.from, destination: _this.to }).then(function () {
                                        _this.navCtrl.remove(currentIndex_1);
                                    });
                                    //this.navCtrl.push(ConfirmPaymentPage,{'booking_id':result.success.booking_request.id,rideType:'now',source:this.pick_up,destination:this.drop});
                                }
                            });
                        }
                    }
                    else {
                        _this.data.presentToast('Please select Payment method');
                        return false;
                    }
                });
            }
            else {
                var param1 = new FormData();
                param1.append("customer_id", this.id);
                this.data.getWalletAmount(param1).subscribe(function (result) {
                    if (result.status == 'OK') {
                        if (parseFloat(result.success.balance) < 0) {
                            _this.data.presentToast("Your wallet balance is in minus, So you can't book Ride");
                        }
                        else {
                            var temp = _this.calculated_distance.replace(",", "");
                            temp = temp.split(" ");
                            _this.isnowenabled = false;
                            var param = new FormData();
                            var dateObj = new Date(_this.date + ' ' + _this.time);
                            var date = new Date(dateObj).toISOString();
                            param.append("customer_id", _this.id);
                            param.append("schedule", "0");
                            param.append("pickup_date", _this.date);
                            //param.append("schedule_time",date);
                            param.append("schedule_time", _this.date + ' ' + _this.time);
                            param.append("distance", temp[0]);
                            param.append("vehicle_type", _this.vehicle_type);
                            param.append("source", _this.from);
                            param.append("source_lat", _this.pick_up_lt);
                            param.append("source_long", _this.pick_up_lg);
                            param.append("destination_lat", _this.drop_lt);
                            param.append("destination_long", _this.drop_lg);
                            param.append("destination", _this.to);
                            param.append("total", null);
                            param.append("is_cancelled", "0");
                            param.append("is_completed", "0");
                            param.append("is_paid", "0");
                            param.append("status", "0");
                            param.append("cost", _this.cost);
                            param.append("driver_id", '');
                            param.append("type", "delivery");
                            param.append("parcel_type", _this.type);
                            param.append("height", _this.height);
                            param.append("weight", _this.weight);
                            param.append("length", _this.length);
                            param.append("width", _this.width);
                            _this.data.rideLaterbookingRequest(param).subscribe(function (result) {
                                console.log(result);
                                //this.userData = result; 
                                if (result.status == "ERROR") {
                                    _this.data.presentToast('Error');
                                    return false;
                                }
                                else {
                                    _this.data.presentToast('Booking request sent Successfully!');
                                    setTimeout(function () {
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                                    }, 3000);
                                }
                            });
                        }
                    }
                });
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DeliveryPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DeliveryPage.prototype, "pleaseConnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('directionsPanel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DeliveryPage.prototype, "directionsPanel", void 0);
    DeliveryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-delivery',template:/*ion-inline-start:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/delivery/delivery.html"*/'<!--\n  Generated template for the DeliveryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="sideMenu">\n    <button ion-button menuToggle >\n      <ion-icon ios="ios-list" md="md-list" class="ion-md-list"></ion-icon>\n    </button>\n    <ion-title>Book a Delivery</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content  class="home-content">\n  <div #pleaseConnect id="please-connect">\n    <p>Please connect to the Internet...</p>\n  </div>\n\n  <ion-card class="directionsPanel">\n      <ion-card-content>\n          <div #directionsPanel></div>\n      </ion-card-content>\n  </ion-card>\n\n  <div #map id="map">\n      <ion-spinner class="spin-center"></ion-spinner>\n  </div>\n\n</ion-content>\n<div class="last_div" *ngIf="vehicle_type != \'\'">  \n  <div class="type_btn_div">\n      <div class="paymentMethodDiv">\n          <!--<img src={{vehicle_img}} />-->\n          <ion-grid>\n            <ion-row>\n              <ion-col col-4>\n                <div class="innerDiv" [ngClass]="active === \'cash\' ? \'active_payment\' : \'\'" (click)="updateActive(\'cash\')">\n                  <img class="list_item_icon" src="assets/imgs/notes.png"/>\n                  <ion-label>Cash</ion-label>\n                </div>\n              </ion-col>\n              <ion-col col-4>\n                <div class="innerDiv" [ngClass]="active === \'card\' ? \'active_payment\' : \'\'" (click)="updateActive(\'card\')">\n                  <img class="list_item_icon" src="assets/imgs/credit-card.png"/>\n                  <ion-label>Card</ion-label>\n                </div>\n              </ion-col>\n              <ion-col col-4>\n                <div class="innerDiv" [ngClass]="active === \'wallet\' ? \'active_payment\' : \'\'" (click)="updateActive(\'wallet\')">\n                  <img class="list_item_icon" src="assets/imgs/wallet.png"/>\n                  <ion-label>Wallet</ion-label>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n          <button class="type_btn active_payment">\n            <img src="assets/imgs/img2.png" /> \n          </button>\n        </ion-col>\n        <ion-col class="vehicle_info" col-6>\n            <p>{{vehicle_type}}</p>\n            <div class="appx_cost">${{cost}} Appx.</div>\n            <div class="distance">{{calculated_distance}}</div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    \n  </div>   \n  <div class="inner_last_div">\n    <!--<ion-grid>\n      <ion-row>\n        <ion-col col-12 class="ride_now">\n            \n          <p></p></ion-col>\n      </ion-row>\n    </ion-grid>-->\n    <button (click)=\'confirmRequest()\' class="login-btn" ion-button color="primary" block  [disabled]="!isnowenabled">Confirm Request</button>\n  </div>\n</div>'/*ion-inline-end:"/Users/osx/Documents/transportAppwithDelivery-master/src/pages/delivery/delivery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */], __WEBPACK_IMPORTED_MODULE_5__providers_google_maps_google_maps__["a" /* GoogleMapsProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ViewController */]])
    ], DeliveryPage);
    return DeliveryPage;
}());

//# sourceMappingURL=delivery.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(ht, http, toast, storage) {
        this.ht = ht;
        this.http = http;
        this.toast = toast;
        this.storage = storage;
        //"http://ccd965c3.ngrok.io/Michael_quinn/transportride/api/"//
        this.baseURL = "http://transportride.walstarmedia.com/api/";
        this.imgURL = "http://transportride.walstarmedia.com/storage/app/public/images/";
        this.isRide = 'yes';
        this.isStarted = false;
        console.log('Hello DataProvider Provider');
        this.getToken();
    }
    DataProvider.prototype.getToken = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
        });
    };
    DataProvider.prototype.presentToast = function (msg) {
        var toast = this.toast.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    DataProvider.prototype.getRoles = function () {
        return this.ht.get(this.baseURL + "roles").map(function (res) { return res.json(); });
    };
    //user signup
    DataProvider.prototype.userSignUp = function (param) {
        return this.ht.post(this.baseURL + "register", param).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.userSignIn = function (param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json'
        });
        return this.ht.post(this.baseURL + "login", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCustomerProfile = function (token) {
        //return this.http.post(this.baseURL+"customer/profile",param).map(res=> res.json());
        //console.log("Token Here "+ this.token);
        //console.log('param'+param);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        //return this.http.post(this.baseURL+"customer/profile",header,param);
        return this.ht.post(this.baseURL + "customer/profile", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.custChangePass = function (param) {
        //console.log("Token Here "+ this.token);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/change/password", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.updateCustomerProfile = function (param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/save/profile", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.forgotPass = function (param) {
        return this.ht.post(this.baseURL + "password/reset", param).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getDriverProfile = function (token) {
        // this.storage.get('token').then(data=>{
        //   this.token = data;
        //  // console.log("Token here"+this.token);
        // });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.ht.post(this.baseURL + "driver/profile", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.updateDriverProfile = function (param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/save/profile", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverChangePass = function (param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/change/password", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getFAQ = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.get(this.baseURL + "faqs", { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getallDrivers = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.get(this.baseURL + "admin/driver/list", { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.updateCustomerAvtar = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/update/profile/image", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.updateDriverAvtar = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/update/profile/image", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.addSuggestion = function (param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/create/suggestion", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getvehicletypes = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/vehicletypes", '', '').map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getvehicletypesforCustomers = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/vehicletypes", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.storeCustomerLocation = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/store/location", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.storeDriverLocation = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            //console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/store/location", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.AvailableToggle = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            console.log("Token here" + _this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/toggle", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getAvailableToggle = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            //console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/get/toggle", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCloseCustomers = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/closer/customers", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCloseDrivers = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/closer/drivers", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCloseVehicles = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/closer/drivers/vehicle", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getSelectedDriverInfo = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/get/driver/info", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getDriverToggle = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/get/toggle", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCost = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/tripcost", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.postNotification = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/postNotification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.bookingRequest = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/request", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getBookingList = function (param, page) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/booking/list?page=" + page, param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getPendingBookingList = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/pending/booking/list", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverRejectBooking = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/reject/booking", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverAcceptBooking = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/accept/booking", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.customerRejectBooking = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/cancel/booking", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.rideLaterbookingRequest = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/later", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.customerBookingDistance = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/distance	", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverBookingDistance = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/distance	", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getBookingInfo = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/booking/details	", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.RideCancelCharges = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/cancellation/charges", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.DriverpostNotification = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/postNotification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.feedback = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/ride/feedback", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCustInfo = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/customer/details", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.rideStart = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/ride/start", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.rideEnd = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/ride/finish", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCustomerBookingList = function (param, page) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/history?page=" + page, param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.addFavDriver = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/add/favdriver", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.removeFavDriver = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/delete/favdriver", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getBookingDetails = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/booking/details", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getParcelPackage = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/parcel/request", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.addCustomerFavLocation = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/add/favlocation", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.removeCustomerFavLocation = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/delete/favlocation", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCustomerFavLocation = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/favlocations", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getFavDrivers = function () {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/favdrivers", '', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getcurrentBooking = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/booking/details", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.payment = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/payment", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.walletTopUp = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/wallet/topup", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getWalletAmount = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/wallet/balance", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.walletPayment = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/pay/wallet", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.paymentByCash = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/payment/by/cash", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.CashMethodNotification = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);            
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/cashpayment/notification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.feedbacktoCustomer = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/ride/feedback", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverNotifications = function (param, page) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/notification?page=" + page, param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverReadNotifications = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/read/notification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getTransactions = function (param, page) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/transaction?page=" + page, param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getDriverTransactions = function (param, page) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/transaction?page=" + page, param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.driverNotificationSetting = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "driver/setting/notification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.customerNotificationSetting = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/setting/notification", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    /****************** Delivery API's *****************/
    DataProvider.prototype.getDeliveryVehicleTypes = function () {
        return this.ht.post(this.baseURL + "delivery/vehicle", '', '').map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getRideVehicleTypes = function () {
        return this.ht.post(this.baseURL + "ride/vehicle", '', '').map(function (res) { return res.json(); });
    };
    DataProvider.prototype.getCostandVehicle = function (param) {
        var _this = this;
        this.storage.get('token').then(function (data) {
            _this.token = data;
            // console.log("Token here"+this.token);
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.ht.post(this.baseURL + "customer/delivery/tripcost", param, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ })

},[287]);
//# sourceMappingURL=main.js.map