import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {OvertimeApplication} from "./overtime-application";
import {UserService} from "../../../providers/efgp/user-service";
import {OvertimeApplicationService} from "../../../providers/efgp/overtime-application-service";
import {OvertimeApplicationDetail} from "./overtime-application-detail";

/*
 Generated class for the OvertimeApplication page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-overtime-application',
  templateUrl: 'overtime-application.html'
})
export class OvertimeApplicationPage extends SuperComponent<OvertimeApplication,OvertimeApplicationService> implements OnInit {

  overtimeApplication:OvertimeApplication;
  overtimeApplicationDetail:OvertimeApplicationDetail;

  ngOnInit():void {
    this.init();
  }

  constructor(public navCtrl:NavController, public navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:OvertimeApplicationService, public userService:UserService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OvertimeApplicationPage');
  }

  public init():void {
    this.initModel();
  }

  protected initModel():any {
    this.overtimeApplication = new OvertimeApplication();
    this.overtimeApplication.formType = "1";
    this.overtimeApplication.detailList = [];
    this.initDetailModel();
  }

  public initDetailModel():void {
    let d = new Date();
    this.overtimeApplicationDetail = new OvertimeApplicationDetail();
    this.overtimeApplicationDetail.lunch = false;
    this.overtimeApplicationDetail.dinner = false;
    this.overtimeApplicationDetail.date1 = d.toISOString().substring(0, 10);
    this.overtimeApplicationDetail.hour = 0.5;
  }

  public submitDetail(event) {
    console.log(this.overtimeApplication.detailList.length);
    if (this.overtimeApplicationDetail.content == null || this.overtimeApplicationDetail.content == "") {
      this.showAlert("系统消息", "请输入加班内容");
      return;
    }
    this.overtimeApplicationDetail.seq = this.overtimeApplication.detailList.length + 1;
    this.overtimeApplication.detailList.push(this.overtimeApplicationDetail);
    this.initDetailModel();
  }

  public submit(event) {
    if (this.overtimeApplication.formType == null || this.overtimeApplication.formType == "") {
      this.showAlert("系统消息", "请输入加班类别");
      return;
    }
    if (this.overtimeApplication.detailList == undefined || this.overtimeApplication.detailList == null || this.overtimeApplication.detailList.length == 0) {
      this.showAlert("系统消息", "请输入加班明细");
      return;
    }
    this.createLoading();
    this.loading.present();
    this.overtimeApplication.employee = this.userService.userno;
    this.service.setDescription(this.overtimeApplication);
    //console.log(JSON.stringify(this.overtimeApplication));
    this.service.post(this.overtimeApplication).subscribe(data=> {
      this.responseMessage = data;
      this.loading.dismissAll();
      if (this.responseMessage.code == "200") {
        this.showConfirm("系统消息", "是否继续新增", ()=> {
            //继续新增
            this.showAlert("提交成功", this.responseMessage.msg);
            this.initModel();
          },
          ()=> {
            this.showAlert("提交成功", this.responseMessage.msg);
            this.navGoBack();
          });
      }
    }, error=> {
      this.loading.dismissAll();
      this.errorMessage = <any>error;
      this.showAlert("系统出错", this.errorMessage);
    });
  }

  public hourChange(e) {

  }

}
