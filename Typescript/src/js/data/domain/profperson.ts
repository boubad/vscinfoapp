// profperson.ts
//
import {UserPerson} from './userperson';
import {IEnseignantPerson,IEnseignant,IDataService} from 'infodata';
import {ENSEIGNANTPERSON_KEY, ROLE_PROF} from '../../utils/infoconstants';
import {ENSEIGNANT_BY_PERSON} from '../services/pouchdb/databaseconstants';
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
public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(ENSEIGNANT_BY_PERSON, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IEnseignant[]) => {
            let pp: Promise<any>[] = [];
            for (let y of aa) {
                pp.push(y.remove(service));
            }
            if (pp.length > 0) {
                return Promise.all(pp);
            } else {
                return [];
            }
        }).then((xx)=>{
            return service.remove_item(self);
        });
    }// remove
} // class EtudiantPerson
