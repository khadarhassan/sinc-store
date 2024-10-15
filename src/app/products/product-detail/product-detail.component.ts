import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../types';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  id = signal('');
  product = signal<Product | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id') || '');

    this.productsService
      .getProductById(this.id())
      .pipe(
        map((data) => {
          this.product.set(data);
        })
      )
      .subscribe();
  }

  addToCart() {}
}
