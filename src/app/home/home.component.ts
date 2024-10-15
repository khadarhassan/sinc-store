import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../types';
import { ProductsService } from '../products.service';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products = signal<Product[]>([]);

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .pipe(
        map((data) => {
          this.products.set(data);
        })
      )
      .subscribe();
  }
}
