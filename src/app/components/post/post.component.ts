import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RelativeTimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post: Post = {};
}
