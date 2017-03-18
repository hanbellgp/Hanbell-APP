import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Cdrcus} from "../../pages/erp/cdrcus/cdrcus";
import {SuperService} from "../../assets/super-service";

/*
 Generated class for the CdrcusService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CdrcusService extends SuperService<Cdrcus> {

  userno:string;

  constructor(public http:Http) {
    super(http);
  }

  protected resultsAPI():string {
    let url = "/shberp/cdrcus/list/" + this.userno;
    if (this.filter && this.filter !== '') {
      url += this.filter;
    }
    url += '/' + this.offset + '/' + this.pageSize;
    return url + '?' + this.getTimestamp();
  }

}
