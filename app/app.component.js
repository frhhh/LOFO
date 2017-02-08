"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var post_service_1 = require('./post.service');
require('./markerclusterer.js');
var posts_1 = require('./posts');
var AppComponent = (function () {
    function AppComponent(postService) {
        var _this = this;
        this.postService = postService;
        // title: string = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
        this.str = 'abc';
        this.lost = true;
        this.tags = [
            'Phone',
            'Key',
            'Wallet',
            'Bag',
            'Cloth'
        ];
        this.markers = [];
        this.backpackUrl = 'app/backpack_icon.png';
        this.walletUrl = 'app/wallet_icon.png';
        this.keyUrl = 'app/key_icon.png';
        this.cellphoneUrl = 'app/cellphone_icon.png';
        this.clothUrl = 'app/cloth_icon.png';
        // markers: marker[] = [
        //     {
        //         name: 'Wallet_0',
        //         lat: 40.427704,
        //         lng: -86.916937,
        //         draggable: false,
        //         iconUrl: 'app/icon_wallet.png'
        //     },
        // ];
        this.mapItem = 'All';
        this.mapLostOrFound = 'All';
        this.mapExpired = 'All';
        //-------------for datepicler-----------------
        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            height: '34px',
            width: '200px',
        };
        //-------------for datepicler-----------------
        this._opened = false;
        this._closeOnClickOutside = true;
        this.postService.getOngoingPosts().then(function (posts) { return _this.posts = posts; });
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log(this.posts);
    };
    AppComponent.prototype.onClick = function () {
        console.log(this.tag);
        this.post = new posts_1.Posts();
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tag;
        this.post.photo = this.photoUrl;
        this.post.contact = this.phone;
        this.post.locationX = this.newMarker.lat;
        this.post.locationY = this.newMarker.lng;
        this.post.createTime = new Date();
        this.post.modifiedTime = new Date();
        this.post.lost = this.lost;
        console.log(this.post);
        this.postService.createPost(this.post);
        var newPostIcon;
        if (this.post.tag == 0) {
            newPostIcon = 'app/icon_phone.png';
        }
        else if (this.post.tag == 1) {
            newPostIcon = 'app/icon_key.png';
        }
        else if (this.post.tag == 2) {
            newPostIcon = 'app/icon_wallet.png';
        }
        else if (this.post.tag == 3) {
            newPostIcon = 'app/icon_backpack.png';
        }
        else if (this.post.tag == 4) {
            newPostIcon = 'app/icon_cloth.png';
        }
        var newMarker = {
            name: 'New Post',
            lat: this.newMarker.lat,
            lng: this.newMarker.lng,
            iconUrl: newPostIcon,
            draggable: false,
        };
        this.markers.push(newMarker);
        this.newMarker = null;
        this.fullname = null;
        this.title = null;
        this.description = null;
        this.phone = null;
        this.tag = -1;
        //console.log(this.postService.createPost(post));
    };
    AppComponent.prototype.clickedMarker = function (marker, index) {
        console.log("clicked marker: " + marker.name + " at index " + index + " length is " + this.markers.length);
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.width != '0%') {
            sidebar.style.width = '0%';
        }
        else {
            sidebar.style.width = '20%';
        }
    };
    AppComponent.prototype.mapClicked = function ($event) {
        console.log(this.posts);
        console.log('Map clicked');
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        console.log(this.markers);
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            item: 'none',
            draggable: false,
        };
        this.newMarker = newMarker;
    };
    AppComponent.prototype.markerDragEnd = function (marker, $event) {
        console.log('dragEnd', marker, $event);
    };
    AppComponent.prototype.newPostOnMap = function () {
        console.log('hello');
        var newMarker = this.markers[this.markers.length - 1];
        console.log(newMarker.lat);
        console.log(newMarker.lng);
    };
    AppComponent.prototype.cluster = function ($maker, $event) {
        console.log('zoomed');
    };
    AppComponent.prototype.cancelPost = function ($event) {
        console.log("cancel");
        this.newMarker = null;
    };
    AppComponent.prototype.onDateRangeChanged = function (event) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    };
    AppComponent.prototype._toggleSidebar = function () {
        this._opened = !this._opened;
    };
    AppComponent.prototype.setLost = function () {
        console.log("lost");
        this.lost = true;
    };
    AppComponent.prototype.setFound = function () {
        console.log("found");
        this.lost = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '/app/app.component.html',
            styleUrls: ['/app/app.component.css'],
            providers: [post_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map