import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from './subpages/page1/page1';
import { Page2 } from './subpages/page2/page2';


@Component({
  templateUrl: 'activity.html'
})
export class ActivityPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  activePage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];
<<<<<<< HEAD
    this.activePage=this.pages[0];
=======
>>>>>>> 1026eb2cfa0a4cff04679267c6b2edd67c3ed163

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage=page;
  }
<<<<<<< HEAD

  checkActive(page){
    return page==this.activePage;

  }
=======
>>>>>>> 1026eb2cfa0a4cff04679267c6b2edd67c3ed163
}
