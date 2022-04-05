import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Category } from 'src/models/category';
import { Product } from 'src/models/product';
import { SupplierDTO } from 'src/models/supplier';
import { AlertService } from 'src/services/client/alert/alert.service';
import { HttpService } from '../../../../services/admin/http/http.service';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['table-product.component.css']
})
export class TableProductComponent implements OnInit {

  private url: string = environment.NEW_API;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private alertSerivce: AlertService
  ) { }

  //INITIAL
  productData: Array<Product> = [];
  suppliers: Array<SupplierDTO> = [];
  categories: Array<Category> = [];
  private base64textString: string = "";
  fileUrl: File = null;
  fileName: any;
  imgSrc: any = "https://drive.google.com/uc?export=view&id=1paIUZyOqIW5ZllHXE0b6r-kZWJHQMQYR";
  display: string = "none";
  display2: string = 'none';

  //INITIAL

  //TRIGGER INITIAL
  currentProduct: any;
  currentImgSrc: any;
  //

  //FORMS
  addProductForm: FormGroup = this.fb.group({
    productId: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl('', [Validators.required, Validators.minLength(5)]),
    unit: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required]),
    descriptions: new FormControl('', [Validators.required]),
    status: new FormControl(true),
    categoryId: new FormControl('', [Validators.required]),
    supplies: new FormControl([], [Validators.required]),
  });

  adjustProductForm: FormGroup;
  //

  //PAGINATION
  totalRecords: Number;
  itemsPerPage: number = 10;
  page: Number = 1;
  //

  ngOnInit(): void {
    this.getProduct();
    this.getSupplier();
    this.getCategories();
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
  }

  onFileSelected(event) {
    if(event.target.files.length > 0)
    {
      const file = event.target.files[0];

      const fileReader = new FileReader();
        const decoy = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        this.imgSrc = fileReader.result;
      };
      decoy.readAsBinaryString(file);
      decoy.onload = this._handleReaderLoaded.bind(this);
      this.fileName = event.target.files[0].name;
    }
  }

  numberOnly(event): boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  private getSupplier() {
    this.httpService.get(this.url, "Suppliers").subscribe(data => {
      this.suppliers = data;
    });
  }

  private getProduct() {
    this.httpService.get(this.url, "Products").subscribe(data => {
      this.productData = data;
    });
  }

  private getCategories() {
    this.httpService.get(this.url, "Categories").subscribe(data => {
      this.categories = data;
    });
  }

  openModal() {
    this.display = 'block';
  }

  openModal2(product) {
    this.display2 = 'block';
    this.currentProduct = product;
    this.currentImgSrc = "https://drive.google.com/uc?export=view&id=" + product.images;

    this.adjustProductForm = this.fb.group({
      productId: new FormControl(product.productId),
      productName: new FormControl(product.productName, [Validators.required, Validators.minLength(10)]),
      price: new FormControl(product.price, [Validators.required, Validators.minLength(5)]),
      unit: new FormControl(product.unit, [Validators.required]),
      status: new FormControl(true),
      categoryId: new FormControl(product.categoryId, [Validators.required]),
      descriptions: new FormControl(product.descriptions, [Validators.required, Validators.minLength(10)]),
    });
  }

  closeModal() {
    this.display = 'none';
    this.addProductForm.reset();
    this.currentProduct = null;
  }

  closeModal2() {
    this.display2 = 'none';
  }

  submit(value) {
    if (confirm("Bạn chắc chắn muốn thêm sản phẩm này ?")) {
      // let formData = new FormData();
      // formData.append('productId', value.productId);
      // formData.append('productName', value.productName);
      // formData.append('price', value.price);
      // formData.append('unit', value.unit);
      // formData.append('images', null);
      // formData.append('descriptions', value.descriptions);
      // formData.append('status', value.status);
      // formData.append('categoryId', value.categoryId);
      // for (let i = 0; i < value.supplier.length; i++){
      //   formData.append('supplies', value.supplier[i]);
      // }
      // formData.append('Image', this.fileUrl , this.fileName);
      // formData.forEach((value, key) => {
      //   console.log(key + ": " + value);
      // });

      value.images = this.base64textString;
      console.log(value.descriptions);
      this.httpService.post(this.url, "Products", value).subscribe(
        data => {
          console.log(data);
          this.alertSerivce.Success("Đã thêm sản phẩm thành công !");
          this.closeModal();
          this.getProduct();
          this.getSupplier();
          this.getCategories();
        },
        (error: HttpErrorResponse) => {
          //console.log(error.message);
          console.log(error.headers);
          console.log(error.status);
          console.log(error.statusText);
          this.alertSerivce.Error("Đã xảy ra lỗi trong quá trình thêm sản phẩm !");
        }
      );
	  }
  }
  productBlockTrigger(product) {
    console.log(product.productId);
    if (confirm("Bạn có chắc chắn về quyết định của mình ?")) {
      if (product.status === true) {
        console.log(product.status);
        this.httpService.delete(this.url, "Products/UnBuy", product.productId).subscribe(
          data => {
            console.log(data);
            this.alertSerivce.Success("Khóa sản phẩm với mã là" + product.productId + " thành công !");
            this.getProduct();
            this.getSupplier();
            this.getCategories();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            this.alertSerivce.Error("Đã xảy ra lỗi với chức năng khóa");
          }
        );
      }
      else {
        console.log(product.status);
        this.httpService.delete(this.url, "Products/Buy", product.productId).subscribe(
          data => {
            console.log(data);
            this.alertSerivce.Success("Mở khóa sản phẩm với mã: " + product.productId + " thành công !");
            this.getProduct();
            this.getSupplier();
            this.getCategories();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
            this.alertSerivce.Error("Đã xảy ra lỗi với chức năng Mở khóa");
          }
        );
      }

    }
  }
  DeleteProduct(value){
    console.log(value);
    console.log(value.productId);
    this.httpService.delete(this.url, "Products",value.productId).subscribe(
      data => {
        console.log(data);
        this.alertSerivce.Success("Đã xóa sản phẩm thành công !");
        this.getProduct();
        this.getSupplier();
        this.getCategories();
      },
      (error: HttpErrorResponse) => {
        //console.log(error.message);
        console.log(error.headers);
        console.log(error.status);
        console.log(error.statusText);
        this.alertSerivce.Error("Đã xảy ra lỗi trong quá trình xóa sản phẩm !");
      }
    );
  }
  adjust(value) {
    if (confirm("Bạn có muốn thay đổi thông tin sản phẩm với những thông tin này ?")) {
      let formData = new FormData();
    }
  }

}
