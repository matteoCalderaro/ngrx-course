import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { AuthActions } from "./auth/action-types";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(user) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.pipe(
      // map((state) => {
      //   if (state["auth"].user) {
      //     return true;
      //   }
      // }),
      // select((state) => !!state["auth"].user),
      //SELECTOR FUNCTION
      select(isLoggedIn),
    );
    this.isLoggedOut$ = this.store.pipe(
      // map((state) => {
      //   if (!state["auth"].user) {
      //     return true;
      //   }
      // }),
      // select((state) => !state["auth"].user),
      //SELECTOR FUNCTION
      select(isLoggedOut),
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    // this.router.navigateByUrl("/");
  }
}
