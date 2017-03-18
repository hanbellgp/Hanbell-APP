import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Company} from "./company";
import {CompanyService} from "../../../providers/erp/company-service";
import {SuperComponent} from "../../../assets/super-component";

/*
 Generated class for the Itemcompany page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-itemcompany',
  templateUrl: 'company.html'
})
export class CompanyComponent extends SuperComponent<Company,CompanyService> implements OnInit {

  itnbr:string;
  itdsc:string;

  ngOnInit():void {
    this.thisPage = CompanyComponent;
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:CompanyService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
  }

  public init():void {
    super.initNavParams();
    this.itnbr = this.navParams.get("itnbr");
    this.itdsc = this.navParams.get("itdsc");
    this.initModel();
  }

  public navigate(ev, entity) {
    this.navCtrl.push(this.navPage, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle,
      facno: entity.facno,
      itnbr: this.itnbr,
      itdsc: this.itdsc
    })
  }

}
