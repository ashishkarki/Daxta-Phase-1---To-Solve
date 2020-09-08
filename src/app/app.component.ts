import { flatten } from '@angular/compiler'
import { Component } from '@angular/core'
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs'
import { AppService, NestedArray } from './app-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  NestedArray$: BehaviorSubject<any[]>
  ReductionOperator$: BehaviorSubject<string>
  Calculated$: Observable<number>

  CalculatedSubject$: BehaviorSubject<number>

  constructor(private _svc: AppService) {
    this.ReductionOperator$ = new BehaviorSubject<string>('Add')
    this.NestedArray$ = new BehaviorSubject<any>(_svc.GetNestedArray())
    //TODO: Define Calculated$ Here
    this.CalculatedSubject$ = new BehaviorSubject<number>(0)
    this.Calculated$ = this.CalculatedSubject$.asObservable()
  }

  ngOnInit() {
    combineLatest(this.ReductionOperator$, this.NestedArray$).subscribe(
      ([operator, arr]) => {
        const flattenedArr = flatten(arr)

        let result = 0
        if (operator === 'Add') {
          result = flattenedArr.reduce((a, b) => a + b, 0)
        } else if (operator === 'Multiply') {
          result = flattenedArr.reduce((a, b) => a * b, 1)
        }

        this.CalculatedSubject$.next(result)
      }
    )
  }

  emitNewArray(e) {
    //Do not alter
    this.NestedArray$.next(this._svc.GetNestedArray())
  }
  toggleOperator(e) {
    //Do not alter
    let nextOperator: string = ''
    if (this.ReductionOperator$.value === 'Add') {
      this.ReductionOperator$.next('Multiply')
    } else {
      this.ReductionOperator$.next('Add')
    }
  }
}
