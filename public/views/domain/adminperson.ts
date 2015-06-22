// adminperson.ts
//
import {Person} from './person';
import {IAdministratorPerson} from 'infodata';
import {ADMINISTRATORPERSON_KEY, ROLE_ADMIN} from '../common/infoconstants';
//
export class AdministratorPerson extends Person implements IAdministratorPerson {
  public administratorids: string[] = [];
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
        if (oMap.administratorids !== undefined){
            this.administratorids = oMap.administratorids;
        }
    } // oMap
    this.roles = [ROLE_ADMIN];
  } // constructor
  public type(): string {
    return ADMINISTRATORPERSON_KEY;
  }
  public to_map(oMap: any): void {
      super.to_map(oMap);
      if ((this.administratorids !== undefined) && (this.administratorids !== null) &&
          (this.administratorids.length > 0)) {
          oMap.administratorids = this.administratorids;
      }
  } // to_insert_map
} // class EtudiantPerson
