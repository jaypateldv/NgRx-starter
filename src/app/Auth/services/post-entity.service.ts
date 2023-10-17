import { Injectable } from "@angular/core";
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Post } from "src/app/shared/component/header/interfaces/post.interface";

@Injectable({
    providedIn: "root",
})
export class PostEntityService extends EntityCollectionServiceBase<Post> {
    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory
    ) {
        super("Post", serviceElementsFactory);
    }
}
