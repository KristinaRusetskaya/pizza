import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  product: ProductType = {
    id: 0,
    image: '',
    title: '',
    description: '',
    datetime: ''
  }
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
          next: (data: ProductType) => {
            this.product = data;
          },
          error: (error) => {
            this.router.navigate(['/']).then();
          }
        })
      }
    });
  }
}
