import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";

export interface PostState extends EntityState<Post> {
    // posts: Post[];
    isPostLoading: boolean;
    count: number;
}

export const postsAdepter = createEntityAdapter<Post>({
    selectId: (post: Post) => post.id!, // id(field should belong to post data) is a primary key that is considered by ngrx/entity
    // you can give any other name to id also.
    // default it will use 'id' as a primary key
    sortComparer: sort,
});

export const initialState = postsAdepter.getInitialState({
    isPostLoading: false,
    count: 0,
});

// export const initialState: PostState = {
//     posts: [],
//     isPostLoading: false,
// };

function sort(a: Post, b: Post): number {
    return a.title.localeCompare(b.title);
}
