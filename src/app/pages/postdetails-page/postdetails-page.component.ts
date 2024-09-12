import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postdetails-page',
  standalone: true,
  imports: [],
  templateUrl: './postdetails-page.component.html',
  styleUrl: './postdetails-page.component.css',
})
export class PostdetailsPageComponent {
  id: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }
}
