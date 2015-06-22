// profperson.ts
//
import {UserPerson} from './userperson';
import {IEnseignantPerson} from 'infodata';
import {ENSEIGNANTPERSON_KEY, ROLE_PROF} from '../common/infoconstants';
//
export class EnseignantPerson extends UserPerson implements IEnseignantPerson {
  public enseignantids: string[] = [];
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
        if (oMap.enseignantids !== undefined){
            this.enseignantids = oMap.enseignantids;
        }
    } // oMap
    this.roles = [ROLE_PROF];
  } // constructor
  public type(): string {
    return ENSEIGNANTPERSON_KEY;
  }
  public to_map(oMap: any): void {
      super.to_map(oMap);
      if ((this.enseignantids !== undefined) && (this.enseignantids !== null) &&
          (this.enseignantids.length > 0)) {
          oMap.enseignantids = this.enseignantids;
      }
  } // to_map

} // class EtudiantPerson
