/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {ItemCategory} from "../../pages/erp/itemcategory/itemcategory";


@Injectable()
export class ItemCategoryService extends SuperService<ItemCategory> {


  constructor(public http:Http) {
    super(http);
  }

  protected resultsAPI(param?:any):string {
    let url = "/shberp/itemcategory";
    url += '/' + this.offset + '/' + this.pageSize;
    return url + '?' + this.getTimestamp();
  }

}
