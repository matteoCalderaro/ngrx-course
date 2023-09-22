import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesHttpService } from "./services/courses-http.service";
import { CourseAction } from "./action.types";
import { concatMap, map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { allCoursesLoaded } from "./course.actions";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courses: CoursesHttpService,
    private store: Store,
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseAction.loadAllCourses),
      concatMap((action) => this.courses.findAllCourses()),
      map((courses) => allCoursesLoaded({ courses })),
    ),
  );
  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseAction.courseUpdated),
        concatMap((action) =>
          this.courses.saveCourse(action.update.id, action.update.changes),
        ),
      ),
    { dispatch: false },
  );
}
