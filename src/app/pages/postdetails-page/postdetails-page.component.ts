import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-postdetails-page',
  standalone: true,
  imports: [RelativeTimePipe, FormsModule],
  templateUrl: './postdetails-page.component.html',
  styleUrl: './postdetails-page.component.css',
})
export class PostdetailsPageComponent {
  id: string = '';
  post: any;
  comment: string = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.postService.getPostById(this.id).subscribe(
      (response) => {
        this.post = response;
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
  addcomment() {
    console.log(this.comment);
  }
}
