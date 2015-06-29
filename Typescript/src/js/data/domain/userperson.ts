// userperson.ts
//
import {Person} from './person';
import {IUserPerson} from 'infodata';
//
export class UserPerson extends Person implements IUserPerson {
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.affectationids !== undefined) {
        this.affectationids = oMap.affectationids;
      }
      if (oMap.eventids !== undefined) {
        this.eventids = oMap.eventids;
      }
    } // oMap
  } // constructor
  public to_map(oMap: any): void {
    super.to_map(oMap);
    if ((this.affectationids !== undefined) && (this.affectationids !== null) &&
      (this.affectationids.length > 0)) {
      oMap.affectationids = this.affectationids;
    }
    if ((this.eventids !== undefined) && (this.eventids !== null) &&
      (this.eventids.length > 0)) {
      oMap.eventids = this.eventids;
    }
  } // to_map

} // class EtudiantPerson
