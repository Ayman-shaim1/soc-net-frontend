import { Component } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { PostdetailsPageComponent } from '../postdetails-page/postdetails-page.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PostComponent, PostdetailsPageComponent, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  textContent: String = '';
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((response) => {
      this.posts = response.$values;
    });
  }

  addPost() {
    if (this.textContent != '') {
      const postData = {
        textcontent: this.textContent,
      };

      this.postService.createPost(postData).subscribe(
        (response) => {
          console.log('Post created successfully!', response);
          this.posts = [response, ...this.posts];
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
      this.textContent = '';
    }
  }
}
