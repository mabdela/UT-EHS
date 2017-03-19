import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Codes {

  constructor(public http: Http, public authService: Auth) {

  }

  getCodes(){

    console.log("inside getCodes()");

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://utehs.herokuapp.com/api/codes', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }


}
