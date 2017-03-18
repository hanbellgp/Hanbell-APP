/**
 * Created by kevindong on 2016/10/7.
 */
import {NavController, NavParams, AlertController, MenuController, LoadingController, Loading} from "ionic-angular";
import {Secuser} from "./secuser";
import {ResponseMessage} from "./response-message";
import {SuperService} from "./super-service";
import {Home} from "../pages/home/home.component";


export abstract class SuperComponent<T,S> {

  public currentUser:Secuser;
  public currentEntity:T;
  public model:T[];
  public service:S;
  public serviceCopy:SuperService<T>;

  public responseMessage:ResponseMessage;
  public errorMessage:any;

  public thisPage:any;
  public prePage:any;
  public nextPage:any;
  public navPage:any;
  public navTitle:string = '';

  public infinite:boolean = true;

  protected loading:Loading;

  protected alertCtrl:AlertController;
  protected loadingCtrl:LoadingController;
  protected menuCtrl:MenuController;

  constructor(public navCtrl:NavController, public navParams:NavParams) {
  }

  public init():void {
    this.initNavParams();
    this.serviceCopy.clearFilter();
    this.initModel();
  }

  protected createLoading():void {
    if (this.loadingCtrl != undefined && this.loadingCtrl != null) {
      this.loading = this.loadingCtrl.create({content: "Please wait..."});
    }
  }

  protected doInfinite(infiniteScroll) {
    this.serviceCopy.nextPage();
    this.serviceCopy.findResults().subscribe(data=> {
      infiniteScroll.complete();
      if (data.length === 0) {
        this.infinite = false;
        this.showAlert("系统消息", "已无更多资料");
      } else {
        data.forEach((d)=> {
          this.model.push(d);
        });
      }
    }, error=> {
      infiniteScroll.complete();
      this.errorMessage = <any>error;
      this.showAlert("系统出错", this.errorMessage);
    });
  }

  protected doSearchClear(ev:any) {
    this.init();
  }

  protected initModel() {
    this.createLoading();
    this.loading.present();
    this.serviceCopy.resetPage();
    this.serviceCopy.findResults().subscribe(data=> {
      this.model = data;
      this.loading.dismiss();
      if (this.model == undefined || this.model == null || this.model.length === 0) {
        this.showConfirm("系统消息", "找不到资料直接返回吗？",
          ()=> {
            this.navGoBack();
          },
          ()=> {
          });
      }
    }, error=> {
      this.errorMessage = <any>error;
      this.loading.dismiss();
      this.showAlert("系统出错", this.errorMessage);
    });
  }

  protected initNavParams():void {
    this.prePage = this.navParams.get("prePage");
    this.nextPage = this.navParams.get("nextPage");
    this.navPage = this.navParams.get("navPage");
    this.navTitle = this.navParams.get("navTitle");
  }

  public navigate(ev, entity) {
    this.navCtrl.push(this.nextPage, {
      entity: entity,
      prePage: this.thisPage,
      nextPage: this.nextPage,
      navPage: this.navPage,
      navTitle: this.navTitle
    });
  }

  protected  navGoBack():void {
    if (this.navCtrl.length() > 1) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(Home);
    }
  }

  public showAlert(title:string, msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }

  public showConfirm(title:string, msg:string, y:any, n:any) {
    let alert = this.alertCtrl.create({
      subTitle: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            n();
          }
        },
        {
          text: '确定',
          handler: () => {
            y();
          }
        }
      ]
    });
    alert.present();
  }


}
