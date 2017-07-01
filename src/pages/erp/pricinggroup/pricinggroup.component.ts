import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {PricingGroup} from "./pricinggroup";
import {PricingGroupService} from "../../../providers/erp/pricinggroup-service";
import {PricingComponent} from "../pricing/pricing.component";
import {UserService} from "../../../providers/efgp/user-service";

/*
 Generated class for the Pricinggroup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-pricinggroup',
  templateUrl: 'pricinggroup.html'
})
export class PricingGroupComponent extends SuperComponent<PricingGroup,PricingGroupService> implements OnInit {

  facno:string;
  itnbr:string;
  itdsc:string;
  itemdesc:string;

  ngOnInit():void {
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:PricingGroupService, public userService:UserService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
  }

  init():void {
    super.initNavParams();
    this.itnbr = this.navParams.get("itnbr");
    this.itdsc = this.navParams.get("itdsc");
    this.itemdesc = this.navParams.get("itemdesc");
    this.service.userno = this.userService.secuser.userno;
    this.createLoading();
    this.loading.present();
    this.service.findResults().subscribe(data=> {
      this.model = data;
      this.loading.dismissAll();
      if (this.model == undefined || this.model == null || this.model.length === 0) {
        this.showConfirm("系统消息", "找不到资料直接返回吗？",
          ()=> {
            this.navCtrl.pop();
          },
          ()=> {
          });
      }
    }, error=> {
      this.loading.dismissAll();
      this.errorMessage = <any>error;
      this.showAlert("系统出错", this.errorMessage);
    });
  }

  navigate(ev, entity) {
    this.navCtrl.push(PricingComponent, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle,
      facno: "C",
      itnbr: this.itnbr,
      itdsc: this.itdsc,
      itemdesc: this.itemdesc
    })
  }

}
