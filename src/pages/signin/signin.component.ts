import {Component} from '@angular/core';
import {NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import {Home} from "../home/home.component";
import {SecuserService} from "../../providers/erp/secuser-service";
import {Secuser} from "../../assets/secuser";
import {SuperComponent} from "../../assets/super-component";

/*
 Generated class for the Signin page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'signin.html'
})

export class Signin extends SuperComponent<Secuser,SecuserService> {

  userId:string;
  pwd:string;
  errorMessage:any;

  constructor(navCtrl:NavController, navParams:NavParams, menuCtrl:MenuController, alertCtrl:AlertController, service:SecuserService) {
    super(navCtrl, navParams);
    this.model = new Array<Secuser>();
    this.alertCtrl = alertCtrl;
    this.menuCtrl = menuCtrl;
    this.service = service;
  }

  init():void {
  }

  ionViewDidLoad() {
    console.log('Hello Signin Page');
  }

  navigate(ev, entity?:any) {

  }

  submit(param?:any) {
    this.service.userno = this.userId;
    this.service.opwd = this.pwd;
    this.service.findSingle().subscribe(data=> {
        this.currentUser = data;
        this.service.secuser = this.currentUser;
        this.navCtrl.setRoot(Home, {currentUser: this.currentUser});
      }, error=> {
        this.errorMessage = <any>error;
        this.showAlert("认证失败", "用户名或密码错误");
      }
    );
  }


}
