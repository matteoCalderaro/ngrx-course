import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedIn, isLoggedOut } from "./auth.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuards {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  canActivate() {
    return this.store.pipe(
      select(isLoggedIn),
      tap((isLogged) => {
        if (!isLogged) {
          this.router.navigateByUrl("/");
        }
      }),
    );
  }
}
