import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {PricingService} from "../../../providers/erp/pricing-service";
import {Pricing} from "./pricing";
import {PricingGroup} from "../pricinggroup/pricinggroup";

/*
 Generated class for the Pricing page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html'
})
export class PricingComponent extends SuperComponent<Pricing,PricingService> implements OnInit {

  pg:PricingGroup;

  ngOnInit():void {
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:PricingService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
    this.currentEntity = new Pricing();
  }

  ionViewDidLoad() {
  }

  init():void {
    super.initNavParams();
    this.pg = this.navParams.get("entity");
    if (this.pg == undefined || this.pg == null) {
      this.showAlert("系统消息", "找不到价格权限群组");
      return;
    }
    this.service.pg = this.pg;
    this.service.itnbr = this.navParams.get("itnbr");
    this.service.itdsc = this.navParams.get("itdsc");
    this.service.itemdesc = this.navParams.get("itemdesc");
    this.createLoading();
    this.loading.present();
    this.service.findSingle().subscribe(data=> {
        this.loading.dismissAll();
        if (data == undefined || data == null) {
          this.showConfirm("系统消息", "找不到资料直接返回吗？",
            ()=> {
              this.navCtrl.pop();
            },
            ()=> {
            });
        }
        this.currentEntity.pricingPK = data.pricingPK;
        this.currentEntity.itemdesc = data.itemdesc;
        if (data.price01 !== undefined && data.price01 != null) {
          this.currentEntity.price01 = data.price01;
        } else {
          this.currentEntity.price01 = 0.00;
        }
        if (data.price02 !== undefined && data.price02 != null) {
          this.currentEntity.price02 = data.price02;
        } else {
          this.currentEntity.price02 = 0.00;
        }
        if (data.price03 !== undefined && data.price03 != null) {
          this.currentEntity.price03 = data.price03;
        } else {
          this.currentEntity.price03 = 0.00;
        }
        if (data.price04 !== undefined && data.price04 != null) {
          this.currentEntity.price04 = data.price04;
        } else {
          this.currentEntity.price04 = 0.00;
        }
        if (data.price05 !== undefined && data.price05 != null) {
          this.currentEntity.price05 = data.price05;
        } else {
          this.currentEntity.price05 = 0.00;
        }
        if (data.price06 !== undefined && data.price06 != null) {
          this.currentEntity.price06 = data.price06;
        } else {
          this.currentEntity.price06 = 0.00;
        }
        if (data.price07 !== undefined && data.price07 != null) {
          this.currentEntity.price07 = data.price07;
        } else {
          this.currentEntity.price07 = 0.00;
        }
        if (data.price08 !== undefined && data.price08 != null) {
          this.currentEntity.price08 = data.price08;
        } else {
          this.currentEntity.price08 = 0.00;
        }
        if (data.price09 !== undefined && data.price09 != null) {
          this.currentEntity.price09 = data.price09;
        } else {
          this.currentEntity.price09 = 0.00;
        }
      }, error=> {
        this.loading.dismissAll();
        this.errorMessage = <any>error;
        this.showAlert("系统出错", this.errorMessage);
      }
    );

  }

}
