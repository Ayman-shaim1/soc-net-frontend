import { User } from './user';

export interface Comment {
    id?: number;
    textContent?: string;
    date?: Date;
    user?: User;
}
