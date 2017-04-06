import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {OvertimeApplication} from "../../pages/efgp/overtime-application/overtime-application";

@Injectable()
export class OvertimeApplicationService extends SuperService<OvertimeApplication> {

  formTypeList = [{id: '1', desc: '平日加班'}, {id: '2', desc: '双休日加班'}, {id: '3', desc: '节日加班'}];

  constructor(public http:Http) {
    super(http);
  }

  protected postAPI(param?:any):string {
    return "/efgp/hkgl034/create";
  }

  public setDescription(t:OvertimeApplication):void {
    this.formTypeList.forEach((d)=> {
      if (d.id == t.formType) {
        t.formTypeDesc = d.desc;
      }
    });
  }

}
