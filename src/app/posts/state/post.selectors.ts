import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postsAdepter, PostState } from "./post.state";
export const POST_STATE_NAME = "posts";
const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME);
export const postSelectors = postsAdepter.getSelectors();

export const getPosts = createSelector(getPostsState, postSelectors.selectAll);
// export const getPosts = createSelector(getPostsState, (state) => {
//     return state.posts;
// });

export const getPostEntities = createSelector(
    getPostsState,
    postSelectors.selectEntities
);

export const getPostById = createSelector(
    getPostEntities,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts ? posts[route.params["id"]] : null;
    }
);
export const getPostById1 = createSelector(
    getPosts,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts
            ? posts.find((post) => post.id === route.params["id"])
            : null;
    }
);

export const getPostLoader = createSelector(
    getPostsState,
    (state: PostState) => {
        return state.isPostLoading;
    }
);
