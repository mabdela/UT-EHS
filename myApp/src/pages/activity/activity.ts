import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ReportAccidentPage } from './subpages/reportaccident/reportaccident';
import { PastAccidentPage } from './subpages/pastaccident/pastaccident';
import { ChecklistPage } from './subpages/checklist/checklist';
import { LabPage } from './subpages/lab/lab';
import {NotificationPage} from './subpages/notification/notification';
import { RefresherPage } from './subpages/refresher/refresher';


@Component({
  templateUrl: 'activity.html'
})
export class ActivityPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ChecklistPage;
  activePage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Safety Checklist', component: ChecklistPage },
      { title: 'Notifications', component: NotificationPage },
      { title: 'Refresher Quiz', component: RefresherPage },
      { title: 'Lab Schedule', component: LabPage },
      { title: 'Past Accidents', component: PastAccidentPage },
      { title: 'Report Accident', component: ReportAccidentPage }
    ];

    this.activePage=this.pages[0];


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

  checkActive(page){
    return page==this.activePage;

  }
}
