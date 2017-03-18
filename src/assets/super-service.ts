/**
 * Created by kevindong on 16/10/2.
 */
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {ResponseMessage} from "./response-message";
import {Observable}  from 'rxjs/Observable';
//Statics
import 'rxjs/add/observable/throw';
//Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

export class SuperService<T> {

  protected baseUrl:string = 'http://222.69.95.246:8480/Hanbell-JRS/api';
  //protected baseUrl:string = 'http://172.16.10.118:8480/Hanbell-JRS/api';
  //protected baseUrl:string = 'http://172.16.80.11:8480/Hanbell-JRS/api';
  protected headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
  protected options = new RequestOptions({headers: this.headers});

  public newEntity:T;

  public offset:number = 0;
  public pageSize:number = 15;
  public filter:string = '';
  public responseMessage:ResponseMessage;

  constructor(public http:Http) {

  }

  clearFilter():void {
    this.filter = '';
  }

  findSingle():Observable<T> {
    let url = this.baseUrl + this.singleAPI();
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findResults():Observable<T[]> {
    let url = this.baseUrl + this.resultsAPI();
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  post(t:T):Observable<ResponseMessage> {
    let url = this.baseUrl + this.postAPI();
    return this.http.post(url, t, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(t:T):Observable<ResponseMessage> {
    let url = this.baseUrl + this.putAPI(t);
    return this.http.put(url, t, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  nextPage():void {
    this.offset += this.pageSize;
  }

  prevPage():void {
    this.offset -= this.pageSize;
    if (this.offset < 0) {
      this.offset = 0;
    }
  }

  resetPage():void {
    this.offset = 0;
    this.pageSize = 15;
  }

  protected singleAPI(param?:any):string {
    return "";
  }

  protected resultsAPI(param?:any):string {
    return "";
  }

  protected postAPI(param?:any):string {
    return "";
  }

  protected putAPI(param?:any):string {
    return "";
  }

  protected deleteAPI(param?:any):string {
    return "";
  }

  protected  getTimestamp():string {
    return 'timestamp=' + Math.floor(Date.now() / 1000).toString();
  }

  protected extractData(res:Response) {
    return res.json() || {};
  }

  protected handleError(error:Response | any) {
    return Observable.throw(error.message || error);
  }

}
