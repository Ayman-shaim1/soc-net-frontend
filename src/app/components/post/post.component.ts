import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RelativeTimePipe, RouterModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post: any = {};
  @Output() postDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleLike: EventEmitter<number> = new EventEmitter<number>();

  user: any = null;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
  toggleLikePost() {
    this.postService.toggleLikePost(this.post.id).subscribe(() => {
      this.toggleLike.emit(this.post.id);
    });
  }

  // Method to check if the user has liked the post
  isLiked(): boolean {
    return this.post.likes?.findIndex((l:any) => l.userId === this.user.id) !== -1;
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this post ?')) {
      this.postService.deletePost(this.post.id).subscribe(() => {
        this.postDeleted.emit(this.post.id); // Émettre l'ID du post supprimé au parent
      });
    }
  }
}
