/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {Company} from "../../pages/erp/company/company";


@Injectable()
export class CompanyService extends SuperService<Company> {


  constructor(public http:Http) {
    super(http);
  }


  protected resultsAPI(param?:any):string {
    return "/shberp/company" + '?' + this.getTimestamp();
  }

}
