import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {ItemKind} from "./itemkind";
import {ItemKindService} from "../../../providers/erp/itemkind-service";
import {ItemModelComponent} from "../itemmodel/itemmodel.componet";

/*
 Generated class for the Itemkind page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-itemkind',
  templateUrl: 'itemkind.html'
})
export class ItemKindComponent extends SuperComponent<ItemKind,ItemKindService> implements OnInit {

  ngOnInit():void {
    this.thisPage = ItemKindComponent;
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:ItemKindService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
  }

 protected doSearchFilter(ev:any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.model = this.model.filter((e)=> {
        return (e.kind.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }

  public navigate(ev, entity) {
    this.navCtrl.push(ItemModelComponent, {
      entity: entity, prePage: this.thisPage, nextPage: null, navPage: this.navPage, navTitle: this.navTitle
    });
  }

}
