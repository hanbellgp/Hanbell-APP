import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {ItemMaster} from "./itemmaster";
import {ItemMasterService} from "../../../providers/erp/itemmaster-service";
import {CompanyComponent} from "../company/company.component";
import {InvbalComponent} from "../invbal/invbal.component";
import {PricingComponent} from "../pricing/pricing.component";
import {PricingGroupComponent} from "../pricinggroup/pricinggroup.component";

/*
 Generated class for the Itemmaster page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-itemmaster',
  templateUrl: 'itemmaster.html'
})
export class ItemMasterComponent extends SuperComponent<ItemMaster,ItemMasterService> implements OnInit {

  category:string;

  ngOnInit():void {
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:ItemMasterService) {
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
    if (this.navPage === InvbalComponent) {
      this.nextPage = CompanyComponent;
    }
    else if (this.navPage === PricingComponent) {
      this.nextPage = PricingGroupComponent;
    }
    this.category = this.navParams.get("category");
    this.service.queryString = this.category;
    this.initModel();
  }

  doSearchFilter(ev:any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.model = this.model.filter((e)=> {
        return ((e.itnbr.toLowerCase().indexOf(val.toLowerCase()) > -1) || (e.itdsc.toLowerCase().indexOf(val.toLowerCase()) > -1))
      })
    }
  }

  navigate(ev, entity) {
    this.navCtrl.push(this.nextPage, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle,
      itnbr: entity.itnbr,
      itdsc: entity.itdsc
    });
  }

}
