import { User } from './user';
import { Comment } from './comment';

export interface Post {
  id?: number;
  textcontent?: string;
  date?: Date;
  user?: User;
  comments?: Comment[];
  likes?: [{ userId: number }];
}
