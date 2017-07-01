import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, AlertController, LoadingController} from "ionic-angular";
import {SuperComponent} from "../../../assets/super-component";
import {Cdrcus} from "./cdrcus";
import {CdrcusService} from "../../../providers/erp/cdrcus-service";
import {UserService} from "../../../providers/efgp/user-service";
import {CdrcusDetailComponent} from "./cdrcus-detail.component";


@Component({
  templateUrl: 'cdrcus.html'
})


export class CdrcusComponent extends SuperComponent<Cdrcus,CdrcusService> implements OnInit {

  ngOnInit():void {
    this.thisPage = CdrcusComponent;
    this.nextPage = CdrcusDetailComponent;
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:CdrcusService, public userService:UserService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  public init():void {
    super.initNavParams();
    this.service.clearFilter();
    this.service.userno = this.userService.secuser.userno;
    this.initModel();
  }

  protected doSearchFilter(ev:any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.model = this.model.filter((e)=> {
        return (e.cusno.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
    if (this.model.length == 0) {
      if (val && val.trim() != '') {
        this.service.filter = ";cdrcusmanPK.cusno=" + val;
      } else {
        this.service.clearFilter();
      }
      this.initModel();
    }
  }

  public navigate(ev, entity) {
    this.navCtrl.push(CdrcusDetailComponent, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle
    });
  }

}
