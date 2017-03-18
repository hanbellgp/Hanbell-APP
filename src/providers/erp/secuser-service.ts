import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SuperService} from "../../assets/super-service";
import {Secuser} from "../../assets/secuser";

/*
 Generated class for the SecuserService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SecuserService extends SuperService<Secuser> {

  userno:string;
  opwd:string;
  npwd:string;
  secuser:Secuser;

  constructor(public http:Http) {
    super(http);
  }

  protected singleAPI():string {
    //return "/shberp/secuser/single/" + this.userno + "/" + this.opwd + '?' + this.getTimestamp();
    return "/shberp/secuser/LDAP/single/" + this.userno + "/" + this.opwd + '?' + this.getTimestamp();
  }

  protected putAPI(p:Secuser):string {
    return "/shberp/secuser/" + p.userno + "/" + this.opwd + "/" + this.npwd + '?' + this.getTimestamp();
  }

}
