import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseAction } from "../action.types";

// NGRX ENTITY PACKAGE
// entity format
// export interface CoursesState {
//   entities: { [key: number]: Course };
//   ids: number[];
// }

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  
});

export const initialCoursesState: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const { selectAll } = adapter.getSelectors();

export const courseReducers = createReducer(
  initialCoursesState,
  on(CourseAction.allCoursesLoaded, (state, action) => {
    
    return adapter.addMany(action.courses, {
      ...state,
      allCoursesLoaded: true,
    });
  }),
  on(CourseAction.courseUpdated, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
);
