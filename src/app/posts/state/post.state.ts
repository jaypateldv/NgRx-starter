import { Post } from "src/app/shared/component/header/interfaces/post.interface";

export interface PostState {
    posts: Post[];
}

export const initialState: PostState = {
    posts: [
        { id: "1", title: "test post 1", description: "Sample description 1" },
        { id: "2", title: "test post 2", description: "Sample description 2" },
        { id: "3", title: "test post 3 test", description: "Sample description 2" },
        { id: "4", title: "test post 4 sample", description: "Sample description 2" },
        { id: "5", title: "test post jay 5", description: "Sample description 2" },
    ],
};
