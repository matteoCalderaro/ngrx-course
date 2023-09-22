import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { CourseAction } from "./action.types";
import { filter, finalize, first, tap } from "rxjs/operators";
import { areCoursesLoaded } from "./courses.selectors";

let loading = false;
export const CoursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<any> => {
  const store = inject(Store);
  return store.pipe(
    select(areCoursesLoaded),
    tap((areLoaded) => {
      if (!areLoaded) {
        loading = true;
        store.dispatch(CourseAction.loadAllCourses());
      }
    }),
    filter((coursesLoaded) => coursesLoaded),
    //first(),
    finalize(() => (loading = false)),
  );
};
