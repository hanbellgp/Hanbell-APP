/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {ItemModel} from "../../pages/erp/itemmodel/itemmodel";
import {SuperService} from "../../assets/super-service";
import {Http} from "@angular/http";


@Injectable()
export class ItemModelService extends SuperService<ItemModel> {

  itemkind:string;

  constructor(public http:Http) {
    super(http);
  }


  protected resultsAPI(param?:any):string {
    let url = '';
    if (this.itemkind == undefined || this.itemkind == null) {
      url = '/shberp/itemmodel';
    } else {
      url = '/shberp/itemmodel/kind/' + this.itemkind;
    }
    if (this.filter && this.filter !== '') {
      url += this.filter;
    }
    url += '/' + this.offset + '/' + this.pageSize;
    return url + '?' + this.getTimestamp();
  }

}
