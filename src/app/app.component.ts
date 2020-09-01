import { Component } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { AppService, NestedArray } from "./app-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  NestedArray$: BehaviorSubject<any[]>;
  ReductionOperator$: BehaviorSubject<string>;
  Calculated$: Observable<number>;

  constructor(private _svc: AppService) {
    this.ReductionOperator$ = new BehaviorSubject<string>("Add");
    this.NestedArray$ = new BehaviorSubject<any>(_svc.GetNestedArray());
    //TODO: Define Calculated$
    this.Calculated$ = of(0);
  }

  emitNewArray(e) {
    this.NestedArray$.next(this._svc.GetNestedArray());
  }
  toggleOperator(e) {
    let nextOperator: string = "";
    if (this.ReductionOperator$.value === "Add") {
      this.ReductionOperator$.next("Multiply");
    } else {
      this.ReductionOperator$.next("Add");
    }
  }
}
