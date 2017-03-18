/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {ItemKind} from "../../pages/erp/itemkind/itemkind";


@Injectable()
export class ItemKindService extends SuperService<ItemKind> {


  constructor(public http:Http) {
    super(http);
  }


  protected resultsAPI(param?:any):string {
    let url ="/shberp/itemkind" ;
    url += '/' + this.offset + '/' + this.pageSize;
    return url + '?' + this.getTimestamp();
  }

}
