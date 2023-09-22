import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import {
  selectAdvancedCourses,
  selectAllCourses,
  selectBeginnerCourses,
  selectCoursesState,
  selectPromoTotal,
} from "../courses.selectors";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  // private subject = new BehaviorSubject<boolean>(true);
  // loading$: Observable<boolean> = this.subject.asObservable();

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) {
    //this.subject.next(false);
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    // this.store
    //   .pipe(select(selectBeginnerCourses))
    //   .subscribe((state) => console.log(state));
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
