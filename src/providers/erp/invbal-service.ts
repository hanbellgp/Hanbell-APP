/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {Invbal} from "../../pages/erp/invbal/invbal";


@Injectable()
export class InvbalService extends SuperService<Invbal> {

  facno:string;
  itnbr:string;


  constructor(public http:Http) {
    super(http);
  }

  protected resultsAPI(param?:any):string {
    return "/shberp/invbal/list/" + this.itnbr + ';facno=' + this.facno + '/false' + '?' + this.getTimestamp();
  }

}
