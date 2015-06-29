//affectation.ts
//
import {WorkItem} from './workitem';
import { IAffectation, IPerson } from 'infodata';
import {InfoRoot } from '../../utils/inforoot';
//
export class Affectation extends WorkItem
  implements IAffectation {
  private _start: Date = null;
  private _end: Date = null;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
    } // oMap
  } // constructor
  public get startDate(): Date {
    return this._start;
  }
  public set startDate(d: Date) {
    this._start = InfoRoot.check_date(d);
  }
  public get endDate(): Date {
    return this._end;
  }
  public set endDate(d: Date) {
    this._end = InfoRoot.check_date(d);
  }
  public to_map(oMap: any): void {
    super.to_map(oMap);
    if (this.startDate !== null) {
      oMap.startDate = this.startDate;
    }
    if (this.endDate !== null) {
      oMap.endDate = this.endDate;
    }
  } // toInsertMap
  public update_person(pPers: IPerson): void {
    if ((pPers !== undefined) && (pPers !== null)) {
      super.update_person(pPers);
      if (this.id !== null) {
              let cont: string[] = pPers.affectationids;
        if ((cont === undefined) || (cont === null)) {
          pPers.affectationids = [];
        }
        InfoRoot.add_id_to_array(pPers.affectationids, this.id);
      }
    }// pPers
  }// update_person
  public is_storeable(): boolean {
    if (!super.is_storeable()) {
      return false;
    }
    if ((this.startDate === null) || (this.endDate === null)) {
      return true;
    }
        let t1 = Date.parse(this.startDate.toString());
        let t2 = Date.parse(this.endDate.toString());
    if (isNaN(t1) || isNaN(t2)) {
      return false;
    }
    return (t1 <= t2);
  }// is_storeable
}
