import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Secuser} from "../../assets/secuser";
import {UserService} from "../../providers/efgp/user-service";
import {Signin} from "../signin/signin.component";
import {SuperComponent} from "../../assets/super-component";
import {Page} from "../../assets/page";
import {PageService} from "../../providers/page-service";


@Component({
  templateUrl: 'home.html'
})

//这里要结合AppComponent加入MenuService
export class Home extends SuperComponent<Page,PageService> implements OnInit {

  ngOnInit() {
    this.init();
  }

  currentUser:Secuser;

  constructor(public navCtrl:NavController, public navParams:NavParams, public service:PageService, public userService:UserService) {
    super(navCtrl, navParams);
    this.service = service;
  }

  init() {
    if (this.navParams.get('currentUser') !== undefined && this.navParams.get('currentUser') !== null) {
      this.currentUser = this.navParams.get('currentUser');
    } else {
      this.currentUser = this.userService.secuser;
    }
    if (this.currentUser == undefined || this.currentUser == null) {
      this.showAlert("系统消息", "找不到当前账户信息");
      this.navCtrl.setRoot(Signin);
    }
    this.model = this.service.get();
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component, {navPage: page.navPage, navTitle: page.title + " | "});
  }

}
