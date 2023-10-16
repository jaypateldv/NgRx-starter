import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";

export interface PostState extends EntityState<Post> {
    // posts: Post[];
    isPostLoading: boolean;
}

export const postsAdepter = createEntityAdapter<Post>();

export const initialState = postsAdepter.getInitialState();

// export const initialState: PostState = {
//     posts: [],
//     isPostLoading: false,
// };

