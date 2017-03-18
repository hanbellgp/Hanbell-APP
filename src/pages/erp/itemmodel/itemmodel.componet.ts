import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {ItemModel} from "./itemmodel";
import {ItemModelService} from "../../../providers/erp/itemmodel-service";
import {CompanyComponent} from "../company/company.component";
import {PricingComponent} from "../pricing/pricing.component";
import {InvbalComponent} from "../invbal/invbal.component";
import {PricingGroupComponent} from "../pricinggroup/pricinggroup.component";

/*
 Generated class for the Itemmodel page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-itemmodel',
  templateUrl: 'itemmodel.html'
})
export class ItemModelComponent extends SuperComponent<ItemModel,ItemModelService> implements OnInit {

  ngOnInit():void {
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:ItemModelService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
  }

  init():void {
    this.initNavParams();
    if (this.navPage === InvbalComponent) {
      this.nextPage = CompanyComponent;
    }
    else if (this.navPage === PricingComponent) {
      this.nextPage = PricingGroupComponent;
    }
    this.service.itemkind = this.navParams.get('entity').kind;
    this.service.clearFilter();
    this.initModel();
  }

  protected doSearchFilter(ev:any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.model = this.model.filter((e)=> {
        return ((e.model.toLowerCase().indexOf(val.toLowerCase()) > -1) || (e.itemno.toLowerCase().indexOf(val.toLowerCase()) > -1))
      })
    }
    if (this.model.length == 0) {
      if (val && val.trim() != '') {
        this.service.filter = ";itnbr=" + val;
      } else {
        this.service.clearFilter();
      }
      this.initModel();
    }
  }

  navigate(ev, entity) {
    if (this.navPage == undefined || this.navPage == null) {
      this.showAlert("系统消息", "访问目标不存在");
      return;
    }
    this.navCtrl.push(this.nextPage, {
      entity: entity,
      navPage: this.navPage,
      navTitle: this.navTitle,
      itnbr: entity.itemno,
      itdsc: entity.model,
      itemdesc: entity.model
    });
  }

}
