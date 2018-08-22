import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import { map } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  //private baseURL: string = "https://dialogflow.googleapis.com/";
  private token: string = environment.dialogflow.token;

  constructor(private http: Http) {}

  public getResponse(query: string){
    let data = {
      query : query,
      //lang: 'en',
      lang: 'es',
      sessionId: '12345'
    }
    return this.http.post(`${this.baseURL}`, data, {headers: this.getHeaders()}).pipe(
      map(res => {
        return res.json()
      })
    )
    /*return this.http
        .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
        .map(res => {
          return res.json()
      })*/
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
