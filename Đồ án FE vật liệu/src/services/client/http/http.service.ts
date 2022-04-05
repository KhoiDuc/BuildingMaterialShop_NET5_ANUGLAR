import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  

  handleError<T>(): any {
    return (error: any): Observable<any> => {
      console.error(error);
      if (error.name === 'TimeoutError') {
        return of({
          error_code: 'time_out',
          error_message:
            'Kết nối mạng không ổn định, vui lòng kiểm tra lại đường truyền.',
          success: false,
        });
      }

      return of(null);
    };
  }


  getUrl(url: string, type: string) {
    let str = url + type;
    return this.http.get<any[]>(str, this.httpOptions).pipe(timeout(60000), catchError(this.handleError()));
  }

  search_post(url: string, type: string, data: string) {
    let str = url + type;
    return this.http.post<any>(str, data);
  }

  post(url: string, type: string, data) {
    let str = url + type;
    return this.http.post<any>(str, data);
  }

  fetchPosts() {
    
  }
}
