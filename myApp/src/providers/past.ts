import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Past {

  past:any;

  constructor(public http: Http) {

  }

  load(){

    if(this.past){
      return Promise.resolve(this.past);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/pastaccidents.json').map(res => res.json()).subscribe(past => {


        this.past = past.accidents;


        resolve(this.past);
      });


    });

  }

}
