import {OnInit, Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular/index";
import {Cdrcus} from "./cdrcus";


@Component(
  {
    templateUrl: 'cdrcus-detail.html'
  }
)

export class CdrcusDetailComponent implements OnInit {

  currentEntity: Cdrcus;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit() {
    this.currentEntity = this.navParams.get('entity');
  }

}
