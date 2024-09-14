import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-postdetails-page',
  standalone: true,
  imports: [RelativeTimePipe, FormsModule, RouterModule, RelativeTimePipe],
  templateUrl: './postdetails-page.component.html',
  styleUrl: './postdetails-page.component.css',
})
export class PostdetailsPageComponent {
  id: string = '';
  post: any;
  comment: string = '';
  user: any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.user = this.authService.getUser();
    this.postService.getPostById(this.id).subscribe(
      (response) => {
        this.post = response;
        console.log(this.post.comments);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
  addcomment() {
    if (this.comment !== '') {
      this.postService.addComment(this.comment, this.post.id).subscribe(
        (response) => {
          console.log('add comment successfully inserted :', response);
          this.post.comments = [
            { ...response, user: this.authService.getUser() },
            ...this.post.comments,
          ];
          this.comment = '';
        },
        (error) => {
          console.log('error while inserteding comment :', error);
        }
      );
    }
  }

  removeComment(commentId: any) {
    this.postService.removeComment(this.post.id, commentId).subscribe(
      (response) => {
        console.log('remove comment successfully inserted :', response);
        this.post.comments = this.post.comments.filter(
          (c: any) => c.id !== commentId
        );
      },
      (error) => {
        console.log('error while removing comment :', error);
      }
    );
  }
}
