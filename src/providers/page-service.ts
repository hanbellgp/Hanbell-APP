/**
 * Created by C0160 on 2016/12/28.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SuperService} from "../assets/super-service";
import {Page} from "../assets/page";
import {CdrcusComponent} from "../pages/erp/cdrcus/cdrcus.component";
import {ItemKindComponent} from "../pages/erp/itemkind/itemkind.component";
import {ItemCategoryComponent} from "../pages/erp/itemcategory/itemcategory.component";
import {InvbalComponent} from "../pages/erp/invbal/invbal.component";
import {PricingComponent} from "../pages/erp/pricing/pricing.component";
import {LeaveApplicationPage} from "../pages/efgp/leave-application/leave-application.page";
import {OvertimeApplicationPage} from "../pages/efgp/overtime-application/overtime-application.page";


@Injectable()
export class PageService extends SuperService<Page> {


  constructor(public http:Http) {
    super(http);
  }

  get():Page[] {

    let pages:Page[] = new Array<Page>();
    pages.push(new Page('客户查询', CdrcusComponent, './assets/img/customer.png', null));
    pages.push(new Page('整机库存', ItemKindComponent, './assets/img/prod-stock.png', InvbalComponent));
    pages.push(new Page('整机报价', ItemKindComponent, './assets/img/prod-pricing.png', PricingComponent));
    pages.push(new Page('零件库存', ItemCategoryComponent, './assets/img/parts-stock.png', InvbalComponent));
    pages.push(new Page('零件报价', ItemCategoryComponent, './assets/img/parts-pricing.png', PricingComponent));
    pages.push(new Page('请假申请', LeaveApplicationPage, './assets/img/leave-apply.png', null));
    pages.push(new Page('加班申请', OvertimeApplicationPage, './assets/img/overwork.png', null));
    return pages;

  }


}
