import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  temp:any;

  constructor(public http: Http) {
    this.http.get('http://utehs.herokuapp.com/getCodes').map(res => res.json()).subscribe(data => {

      this.temp=data;
      console.log(this.temp);
    });
  }
}
