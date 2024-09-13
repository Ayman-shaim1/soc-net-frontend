import { Component } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { PostdetailsPageComponent } from '../postdetails-page/postdetails-page.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

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
          const post = response;
          post.likes = [];
          post.comments = [];
          post.user = this.authService.getUser();
          this.posts = [post, ...this.posts];
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
      this.textContent = '';
    }
  }

  onDeletePost(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  onToggleLike(id: number) {
    // this.posts = this.posts.map((post) => {
    //   if (post.id !== id) {
    //     const findlikeIndex = post.likes.findIndex(
    //       (l: any) => l.userId == this.authService.getUser().id
    //     );
    //     if (findlikeIndex == -1) {
    //       post.likes.push({ userId: this.authService.getUser().id });
    //     } else {
    //       post.likes = post.likes.filter(
    //         (l: any) => l.userId != this.authService.getUser().id
    //       );
    //     }
    //   }
    //   return post;
    // });
    // console.log(this.posts);

    let nposts = [];
    for (let post of this.posts) {
      if (post.id == id) {
        let likes = post.likes;
        const findlikeIndex = likes.findIndex(
          (l: any) =>
            Number(l.userId) === Number(this.authService.getUser().id)
        );

        if (findlikeIndex === -1)
          likes.push({ userId: Number(this.authService.getUser().id) });
        else
          likes = likes.filter(
            (l: any) =>
              String(l.userId) !== String(this.authService.getUser().id)
          );
        nposts.push({ ...post, likes });
      } else {
        nposts.push(post);
      }
    }
    this.posts = nposts;
  }
}
