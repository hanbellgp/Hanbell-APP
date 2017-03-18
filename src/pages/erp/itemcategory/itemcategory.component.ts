import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {ItemCategory} from "./itemcategory";
import {ItemCategoryService} from "../../../providers/erp/itemcategory-service";
import {ItemMasterComponent} from "../itemmaster/itemmaster.component";

/*
 Generated class for the Itemcategory page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-itemcategory',
  templateUrl: 'itemcategory.html'
})
export class ItemCategoryComponent extends SuperComponent<ItemCategory,ItemCategoryService> implements OnInit {

  ngOnInit():void {
    this.thisPage = ItemCategoryComponent;
    this.init();
  }

  constructor(navCtrl:NavController, navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:ItemCategoryService) {
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
        return ((e.category.toLowerCase().indexOf(val.toLowerCase()) > -1) || (e.name.toLowerCase().indexOf(val.toLowerCase()) > -1))
      })
    }
  }

  public navigate(ev, entity) {
    this.navCtrl.push(ItemMasterComponent, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle,
      category: entity.category
    });
  }

}
