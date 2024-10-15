import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../types';
import { ProductsService } from '../products.service';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductComponent implements OnInit {
  products = signal<Product[]>([]);
  initalProducts = signal<Product[]>([]);
  currentFilter = '';
  filterOptions = [
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing",
  ];

  categories = signal([
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing",
  ]);

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const filterQuery = this.route.snapshot.queryParamMap.get('filter');

    this.productService
      .getAllProducts()
      .pipe(
        map((data: Product[]) => {
          this.initalProducts.set(data);
          if (filterQuery && this.filterOptions.includes(filterQuery)) {
            this.products.set(
              data.filter((product) => product.category === filterQuery)
            );
            this.currentFilter = filterQuery;
          } else {
            this.products.set(data);
          }
        })
      )
      .subscribe();
  }

  filter(category: string) {
    this.currentFilter = category;
    this.products.set(
      this.initalProducts().filter((product) => product.category === category)
    );
  }

  resetFilter() {
    this.currentFilter = '';
    this.products.set(this.initalProducts());
  }
}
