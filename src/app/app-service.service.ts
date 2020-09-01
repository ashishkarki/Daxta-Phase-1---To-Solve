import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

export type NestedArray = (number | NestedArray)[];

@Injectable({
  providedIn: "root",
})
export class AppService {
  constructor() {}
  /**
   *
   * @param length - number for length of array
   * @param nestProbability - 0 - 1 Probability that a given element will create a nested array instead of a simple number
   *
   * @returns randomly nested array with diminishing probability of nesting
   */

  private _createNestedArray(length: number, nestProbability: number): NestedArray {
    let ResultArray = [];
    if (nestProbability > 1 || nestProbability < 0) {
      throwError("Probability is out of bounds");
    }
    for (let i = 0; i < length; i++) {
      let ElementArrayFlag: boolean = Math.random() < nestProbability;
      if (ElementArrayFlag) {
        ResultArray.push(this._createNestedArray(3, nestProbability / 2));
      } else {
        ResultArray.push(Math.floor(Math.random() * 100) % 35);
      }
    }
    //console.log(ResultArray);
    return ResultArray;
  }

  /**
   * Notional data generator for type NestedArray.
   *
   */
  GetNestedArray(): NestedArray {
    return this._createNestedArray(2, 0.6);
  }
}
