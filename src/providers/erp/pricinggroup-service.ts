import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {PricingGroup} from "../../pages/erp/pricinggroup/pricinggroup";

/*
 Generated class for the SecuserService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PricingGroupService extends SuperService<PricingGroup> {

  userno:string;

  constructor(public http:Http) {
    super(http);
  }

  protected resultsAPI(param?:any):string {
    return "/shberp/pricinggroup/list/" + this.userno + '?' + this.getTimestamp();
  }

}
