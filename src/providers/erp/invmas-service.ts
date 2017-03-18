/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {Invmas} from "../../pages/erp/invmas/invmas";


@Injectable()
export class InvmasService extends SuperService<Invmas> {


  constructor(public http:Http) {
    super(http);
  }


  protected resultsAPI(param?:any):string {
    return "/shberp/servitemmaster/" + '?' + this.getTimestamp();
  }

}
