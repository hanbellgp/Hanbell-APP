import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {UserService} from "../../../providers/efgp/user-service";
import {Secuser} from "../../../assets/secuser";
import {Signin} from "../../signin/signin.component";
import {Home} from "../../home/home.component";

/*
 Generated class for the Secuser page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'secuser.html'
})
export class SecuserComponent extends SuperComponent<Secuser,UserService> {

  opwd:string;
  npwd:string;
  rpwd:string;

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:UserService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
  }

  init():void {
    this.currentUser = this.service.secuser;
    if (this.currentUser == undefined || this.currentUser == null) {
      this.showAlert("系统消息", "找不到当前账户信息");
      this.navCtrl.setRoot(Signin);
    }
  }

  submit(param?:any) {
    if (this.opwd !== this.service.opwd) {
      this.showAlert("系统消息", "原密码错误");
      return;
    }
    if (this.npwd == null || this.rpwd == null || this.npwd !== this.rpwd) {
      this.showAlert("系统消息", "新密码和确认密码不一致");
      return;
    }
    this.service.npwd = this.npwd;
    this.createLoading();
    this.loading.present();
    this.service.put(this.service.secuser).subscribe(data=> {
      this.responseMessage = data;
      this.loading.dismissAll();
      if (this.responseMessage.code === "200") {
        this.showConfirm("系统消息", "更新成功,返回主界面吗？",
          ()=> {
            this.navCtrl.setRoot(Home, {currentUser: this.currentUser});
          },
          ()=> {
          });
      } else {
        this.showAlert("系统消息", this.responseMessage.msg);
      }
    }, error=> {
      this.loading.dismissAll();
      this.errorMessage = <any>error;
      this.showAlert("系统消息", "更新失败:" + this.errorMessage);
    })
  }

}
