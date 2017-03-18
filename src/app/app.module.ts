import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {Home} from '../pages/home/home.component';
import {Signin} from "../pages/signin/signin.component";
import {CompanyComponent} from "../pages/erp/company/company.component";
import {CompanyService} from "../providers/erp/company-service";
import {CdrcusComponent} from "../pages/erp/cdrcus/cdrcus.component";
import {CdrcusService} from "../providers/erp/cdrcus-service";
import {CdrcusDetailComponent} from "../pages/erp/cdrcus/cdrcus-detail.component";
import {ItemCategoryComponent} from "../pages/erp/itemcategory/itemcategory.component";
import {ItemCategoryService} from "../providers/erp/itemcategory-service";
import {ItemKindComponent} from "../pages/erp/itemkind/itemkind.component";
import {ItemKindService} from "../providers/erp/itemkind-service";
import {ItemModelComponent} from "../pages/erp/itemmodel/itemmodel.componet";
import {ItemModelService} from "../providers/erp/itemmodel-service";
import {InvbalComponent} from "../pages/erp/invbal/invbal.component";
import {InvbalService} from "../providers/erp/invbal-service";
import {InvmasComponent} from "../pages/erp/invmas/invmas.component";
import {InvmasService} from "../providers/erp/invmas-service";
import {SecuserComponent} from "../pages/erp/secuser/secuser.component";
import {SecuserService} from "../providers/erp/secuser-service";
import {ItemMasterComponent} from "../pages/erp/itemmaster/itemmaster.component";
import {ItemMasterService} from "../providers/erp/itemmaster-service";
import {PageService} from "../providers/page-service";
import {PricingGroupComponent} from "../pages/erp/pricinggroup/pricinggroup.component";
import {PricingComponent} from "../pages/erp/pricing/pricing.component";
import {PricingGroupService} from "../providers/erp/pricinggroup-service";
import {PricingService} from "../providers/erp/pricing-service";
import {LeaveApplicationPage} from "../pages/efgp/leave-application/leave-application.page";
import {LeaveApplicationService} from "../providers/efgp/leave-application-service";

@NgModule({
  declarations: [
    MyApp,
    Home,
    Signin,
    CompanyComponent,
    CdrcusComponent,
    CdrcusDetailComponent,
    InvbalComponent,
    ItemCategoryComponent,
    ItemKindComponent,
    ItemMasterComponent,
    ItemModelComponent,
    InvmasComponent,
    PricingComponent,
    PricingGroupComponent,
    SecuserComponent,
    LeaveApplicationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Signin,
    CompanyComponent,
    CdrcusComponent,
    CdrcusDetailComponent,
    InvbalComponent,
    ItemCategoryComponent,
    ItemKindComponent,
    ItemMasterComponent,
    ItemModelComponent,
    InvmasComponent,
    PricingComponent,
    PricingGroupComponent,
    SecuserComponent,
    LeaveApplicationPage
  ],
  providers: [
    CompanyService,
    CdrcusService,
    InvbalService,
    ItemCategoryService,
    ItemKindService,
    ItemMasterService,
    ItemModelService,
    InvmasService,
    PageService,
    PricingGroupService,
    PricingService,
    SecuserService,
    LeaveApplicationService
  ]
})
export class AppModule {
}
