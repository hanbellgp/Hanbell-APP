import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {PricingGroup} from "../../pages/erp/pricinggroup/pricinggroup";
import {Pricing} from "../../pages/erp/pricing/pricing";

/*
 Generated class for the UserService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PricingService extends SuperService<Pricing> {

  itnbr:string;
  itdsc:string;
  itemdesc:string;
  pg:PricingGroup;

  constructor(public http:Http) {
    super(http);
  }

  protected singleAPI(param?:any):string {
    let url = "/shberp/pricing/" + this.itnbr + ";pricingtype=" + this.pg.pricingtype;
    if (this.itemdesc != undefined && this.itemdesc != null && this.itemdesc != "") {
      url = url + ";itemdesc=" + this.itemdesc;
    }
    return url + "?" + this.getTimestamp();
  }


}
