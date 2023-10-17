import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { first, map, mergeMap, Observable, of, tap } from "rxjs";
import { PostEntityService } from "../Auth/services/post-entity.service";

@Injectable({ providedIn: "root" })
export class PostsResolver implements Resolve<boolean> {
    constructor(private postEntityService: PostEntityService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.postEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.postEntityService.getAll();
                }
            }),
            first()
        );
    }
}
