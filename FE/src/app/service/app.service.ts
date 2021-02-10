import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private data: any = [];

  private dataGathered = new Subject<any>();
  private calcData = new Subject<any>();
  private isLoading = new Subject<any>();
  private isResponseData = new Subject<any>();
  private isGenerate = new Subject<any>();
  private urlLink: any;

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000'

  getDataGatheredListener() {
    return this.dataGathered.asObservable();
  }

  calcDataGatheredListener(){
    return this.data;
  }

  isLoadingListener() {
    return this.isLoading.asObservable();
  }

  isResponseDataListener(){
    return this.isResponseData.asObservable();
  }

  isGenerateListener(){
    return this.isGenerate.asObservable()
  }

  getData(link: string) {
    console.log("Service: " + link);
    const req: any = { link: link }
    this.isLoading.next(true)

    this.http.post('http://localhost:3000', req)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.isGenerate.next(true)
          this.dataGathered.next(responseData)
          this.calcData.next(responseData)
          this.isLoading.next(false);
          this.data.push(responseData)
          this.isResponseData.next(responseData)
        }, (error) => {
          this.dataGathered.next({
            errorMessage: "Failed to generate your websites carbon footprint report. Please check the web page URL that you've provided."
          })
          this.isLoading.next(false);
        }
      )
  }
}
