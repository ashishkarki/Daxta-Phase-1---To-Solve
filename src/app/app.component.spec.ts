import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { AppComponent, OperationType } from './app.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  // I am creating a new describe block as I don't want to overwrite existing tests
  describe("Ashish Karki's tests: ", () => {
    let fixture: ComponentFixture<AppComponent>
    let app: AppComponent

    beforeEach(async(() => {
      fixture = TestBed.createComponent(AppComponent)
      app = fixture.componentInstance
      fixture.detectChanges()
    }))

    it('performOperation() should calculate correct value for Addition', () => {
      // Setup
      app.ReductionOperator$.next('Add')
      app.NestedArray$.next([1, [2, 3], 4])

      // Act
      app.performOperation()

      // expect
      app.Calculated$.subscribe(calcValue => {
        expect(calcValue).toBe(10)
      })
      expect(app.subscription).not.toBeNull()
    })

    it('performOperation() should calculate correct value for Multiplication', () => {
      app.ReductionOperator$.next('Multiply')
      app.NestedArray$.next([1, [2, 3], 4])

      app.performOperation()

      app.Calculated$.subscribe(calcValue => {
        expect(calcValue).toBe(24)
      })
      expect(app.subscription).not.toBeNull()
    })
  })
})
