import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../types';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
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
