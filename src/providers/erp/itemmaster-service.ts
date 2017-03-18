/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {ItemMaster} from "../../pages/erp/itemmaster/itemmaster";


@Injectable()
export class ItemMasterService extends SuperService<ItemMaster> {

  queryString:string;

  constructor(public http:Http) {
    super(http);
  }


  protected resultsAPI(param?:any):string {
    let url =  "/shberp/servitemmaster/list/" + this.queryString ;
    url += '/' + this.offset + '/' + this.pageSize;
    return url + '?' + this.getTimestamp();
  }

}
