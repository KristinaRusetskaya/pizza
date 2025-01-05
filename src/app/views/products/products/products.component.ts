import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  public loading: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        tap(
          () => {
            this.loading = false;
          }
        )
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
           console.log(error);
           this.router.navigate(['/']).then()
          }
        }
      )
  }

  public addToCart(title: string): void {
    this.cartService.product = title;
    this.router.navigate(['/order'], {queryParams: {product: title}});
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
