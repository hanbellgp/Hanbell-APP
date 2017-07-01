import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, NavParams} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Home} from "../pages/home/home.component";
import {Signin} from "../pages/signin/signin.component";
import {UserService} from "../providers/efgp/user-service";
import {Page} from "../assets/page";
import {PageService} from "../providers/page-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav:Nav;
  pageService:PageService;
  userService:UserService;

  homePage:Page;
  signinPage:Page;
  pages:Page[];
  errorMessage:any;
  rootPage:any = Signin;

  constructor(public platform:Platform, pageService:PageService, userService:UserService) {

    this.pageService = pageService;
    this.userService = userService;
    this.homePage = new Page('Home', Home, '', null);
    this.signinPage = new Page('注销', Signin, '', null);
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.pages = this.pageService.get();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {navPage: page.navPage, navTitle: page.title + " | "});
  }
}
