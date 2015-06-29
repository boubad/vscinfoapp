//enseignant.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IEnseignant,IProfAffectation,IDataService} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ROLE_PROF} from '../../utils/infoconstants';
import {PROFAFFECTATION_BY_ENSEIGNANT} from '../services/pouchdb/databaseconstants';
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ENSEIGNANT_TYPE;
    }
    public base_prefix(): string {
        return ENSEIGNANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
      super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.enseignantids === undefined) ||
             (pPers.enseignantids === null)) {
                pPers.enseignantids = [];
            }
            InfoRoot.add_id_to_array(pPers.enseignantids, this.id);
            if ((pPers.roles === undefined)|| (pPers.roles === null)){
              pPers.roles = [];
            }
            InfoRoot.add_id_to_array(pPers.roles,ROLE_PROF);
        }// pPers
    }// update_person
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(PROFAFFECTATION_BY_ENSEIGNANT, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IProfAffectation[]) => {
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
}// class Enseignant
