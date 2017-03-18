import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {LeaveApplication} from "../../pages/efgp/leave-application/leave-application";


/**
 * Created by C0160 on 2017/1/25.
 */
@Injectable()
export class LeaveApplicationService extends SuperService<LeaveApplication> {

  formTypeList = [{id: '1', desc: '普通工作日'}, {id: '2', desc: '长假日前后'}];
  formKindList = [{id: '1', desc: '年假'}, {id: '2', desc: '事假'}, {id: '3', desc: '病假'}, {id: '4', desc: '婚假'}];
  workTypeList = [{id: '1', desc: '常日班'}, {id: '2', desc: '加工早班'}, {id: '3', desc: '加工晚班'}];

  constructor(public http:Http) {
    super(http);
  }

  protected postAPI(param?:any):string {
    return "/efgp/hkgl004/create";
  }

  public setDescription(t:LeaveApplication):void {
    this.formTypeList.forEach((d)=> {
      if (d.id == t.formType) {
        t.formTypeDesc = d.desc;
      }
    });
    this.formKindList.forEach((d)=> {
      if (d.id == t.formKind) {
        t.formKindDesc = d.desc;
      }
    });
    this.workTypeList.forEach((d)=> {
      if (d.id == t.workType) {
        t.formTypeDesc = d.desc;
      }
    });
  }

}
