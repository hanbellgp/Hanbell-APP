import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {InvbalService} from "../../../providers/erp/invbal-service";
import {Invbal} from "./invbal";

/*
 Generated class for the Invbal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-invbal',
  templateUrl: 'invbal.html'
})
export class InvbalComponent extends SuperComponent<Invbal,InvbalService> implements OnInit {

  facno:string;
  itnbr:string;
  itdsc:string;

  ngOnInit():void {
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:InvbalService) {
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
    this.facno = this.navParams.get("facno");
    this.itnbr = this.navParams.get("itnbr");
    this.itdsc = this.navParams.get("itdsc");
    this.service.facno = this.facno;
    this.service.itnbr = this.itnbr;
    this.initModel();
  }

}
