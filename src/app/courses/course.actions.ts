import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
  "[Courses Resolver] Load all courses",
);

export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<{ courses: Course[] }>(),
);

export const courseUpdated = createAction(
  "[Edit Course Dialog] Course Updated",
  // special type of the prop (payload) from ngrx utility library
  props<{ update: Update<Course> }>(),
);
