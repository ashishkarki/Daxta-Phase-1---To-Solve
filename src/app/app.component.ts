import { flatten } from '@angular/compiler'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { AppService } from './app-service.service'

export enum OperationType {
  Addition = 'Add',
  Multiplication = 'Multiply',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  NestedArray$: BehaviorSubject<any[]>
  ReductionOperator$: BehaviorSubject<string>
  Calculated$: Observable<number>

  CalculatedSubject$: BehaviorSubject<number>
  subscription: Subscription

  constructor(private _svc: AppService) {
    this.ReductionOperator$ = new BehaviorSubject<string>('Add')
    this.NestedArray$ = new BehaviorSubject<any>(_svc.GetNestedArray())

    // new code added here
    this.CalculatedSubject$ = new BehaviorSubject<number>(0)
    this.Calculated$ = this.CalculatedSubject$.asObservable()
    this.subscription = new Subscription()
  }

  ngOnInit() {
    this.performOperation()
  }

  performOperation() {
    this.subscription = combineLatest(
      this.ReductionOperator$,
      this.NestedArray$
    ).subscribe(([operator, arr]) => {
      const flattenedArr = flatten(arr)

      let result = 0
      if (operator === OperationType.Addition) {
        result = flattenedArr.reduce((a, b) => a + b, 0)
      } else if (operator === OperationType.Multiplication) {
        result = flattenedArr.reduce((a, b) => a * b, 1)
      }

      this.CalculatedSubject$.next(result)
    })
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }

  emitNewArray() {
    //Do not alter
    this.NestedArray$.next(this._svc.GetNestedArray())
  }
  toggleOperator() {
    //Do not alter
    if (this.ReductionOperator$.value === 'Add') {
      this.ReductionOperator$.next('Multiply')
    } else {
      this.ReductionOperator$.next('Add')
    }
  }
}
