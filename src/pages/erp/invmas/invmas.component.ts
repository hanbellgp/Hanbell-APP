import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {Invmas} from "./invmas";
import {InvmasService} from "../../../providers/erp/invmas-service";
import {InvbalComponent} from "../../erp/invbal/invbal.component";

/*
 Generated class for the Invmas page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-invmas',
  templateUrl: 'invmas.html'
})
export class InvmasComponent extends SuperComponent<Invmas,InvmasService> implements OnInit {

  ngOnInit():void {
    this.init();
  }

  constructor(public navCtrl:NavController, public navParams:NavParams, alertCtrl:AlertController, service:InvmasService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.service = service;
  }

  ionViewDidLoad() {
  }

  init():void {
    super.initNavParams();
    this.service.findResults().subscribe(data=> {
      this.model = data;
      if (this.model.length === 0) {
        this.showConfirm("系统消息", "找不到资料直接返回吗？",
          ()=> {
            this.navCtrl.pop();
          },
          ()=> {
          });
      }
    }, error=> {
      this.errorMessage = <any>error;
      this.showAlert("系统出错", this.errorMessage);
    });
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
    this.navCtrl.push(InvbalComponent, {
      entity: entity, prePage: this.thisPage, nextPage: this.nextPage, navPage: null, navTitle: ''
    });
  }

}
