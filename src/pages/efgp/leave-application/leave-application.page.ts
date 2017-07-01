import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {SuperComponent} from "../../../assets/super-component";
import {LeaveApplication} from "./leave-application";
import {LeaveApplicationService} from "../../../providers/efgp/leave-application-service";
import {UserService} from "../../../providers/efgp/user-service";

/*
 Generated class for the LeaveApplication page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-leave-application',
  templateUrl: 'leave-application.html'
})
export class LeaveApplicationPage extends SuperComponent<LeaveApplication,LeaveApplicationService> implements OnInit {

  leaveApplication:LeaveApplication;

  ngOnInit():void {
    this.init();
  }

  constructor(public navCtrl:NavController, public navParams:NavParams, alertCtrl:AlertController, loadingCtrl:LoadingController, service:LeaveApplicationService, public userService:UserService) {
    super(navCtrl, navParams);
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.service = service;
    this.serviceCopy = this.service;
  }

  ionViewDidLoad() {
  }

  public init():void {
    this.initModel();
  }

  protected initModel():any {
    let d = new Date();
    this.leaveApplication = new LeaveApplication();
    this.leaveApplication.date1 = d.toISOString().substring(0, 10);
    this.leaveApplication.time1 = "08:00";
    this.leaveApplication.date2 = d.toISOString().substring(0, 10);
    this.leaveApplication.time2 = "17:10";
    this.leaveApplication.leaveDay = 1;
    this.leaveApplication.leaveHour = 0;
    this.leaveApplication.leaveMinute = 0;
  }

  public submit(event) {
    if (this.leaveApplication.formType == null || this.leaveApplication.formType == "") {
      this.showAlert("系统消息", "请输入请假性质");
      return;
    }
    if (this.leaveApplication.formKind == null || this.leaveApplication.formKind == "") {
      this.showAlert("系统消息", "请输入请假假别");
      return;
    }
    if (this.leaveApplication.workType == null || this.leaveApplication.workType == "") {
      this.showAlert("系统消息", "请输入工作班别");
      return;
    }
    let n:number = this.leaveApplication.leaveDay + this.leaveApplication.leaveHour + this.leaveApplication.leaveMinute;
    if (n == 0) {
      this.showAlert("系统消息", "请输入请假时间");
      return;
    }
    if (this.leaveApplication.reason == null || this.leaveApplication.reason == "") {
      this.showAlert("系统消息", "请输入请假原因");
      return;
    }
    this.createLoading();
    this.loading.present();
    this.leaveApplication.employee = this.userService.userno;
    this.service.setDescription(this.leaveApplication);
    //console.log(JSON.stringify(this.leaveApplication));
    this.service.post(this.leaveApplication).subscribe(data=> {
      this.responseMessage = data;
      this.loading.dismissAll();
      if (this.responseMessage.code == "200") {
        this.showConfirm("系统消息", "是否继续新增", ()=> {
            //继续新增
            this.showAlert("提交成功",this.responseMessage.msg);
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

  public date1Change(e) {
    this.leaveApplication.date2 = e.year.text + "-" + e.month.text + "-" + e.day.text;
  }

  public date2Change(e) {
    if (this.leaveApplication.date1 > this.leaveApplication.date2) {
      this.showAlert("系统消息", "截止日期不能小于开始日期");
      this.leaveApplication.date1 = e.year.text + "-" + e.month.text + "-" + e.day.text;
      return;
    }
    let d1 = new Date(this.leaveApplication.date1);
    let d2 = new Date(this.leaveApplication.date2);
    if (d1.getFullYear() != d2.getFullYear() || d1.getMonth() != d2.getMonth()) {
      this.showAlert("系统消息", "请填写请假天数");
      return;
    }
    if (d1.getDate() != d2.getDate()) {
      this.leaveApplication.leaveDay = d2.getDate() - d1.getDate() + 1;
    }
  }

}
