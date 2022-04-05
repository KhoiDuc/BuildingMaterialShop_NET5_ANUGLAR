import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../services/client/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  private url: string = environment.NEW_API;
  products: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  )
  {
    this.getResult();
  }

  ngOnInit(): void {
    localStorage.setItem('breadcrumb', 'Kết quả tìm kiếm')
  }

  getResult() {
    this.activatedRoute.queryParams.subscribe(data => {
      let value: string = data.keyword;
      let type: string = data.type;
      if (value) {
        this.httpService.getUrl( this.url, 'Search?keyword=' + value.split('-').join(' ') + '&type=' + type ).subscribe(products => {
          if (products != "Không tìm thấy sản phẩm phù hợp.") {
            this.products = products;
            console.log(1);
          }
        });
      }
      else {
        this.httpService.getUrl( this.url, 'Search').subscribe(products => {
          this.products = products;
        });
      }
      
    });
  }

}
