//etudiant.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IEtudiant,IEtudAffectation,IDataService} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD} from '../../utils/infoconstants';
import {ETUDAFFECTATION_BY_ETUDIANT} from '../services/pouchdb/databaseconstants';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ETUDIANT_TYPE;
    }
    public base_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
      super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if ((pPers.etudiantids === undefined) || (pPers.etudiantids === null)){
              pPers.etudiantids = [];
            }
            InfoRoot.add_id_to_array(pPers.etudiantids,this.id);
            if ((pPers.roles === undefined)|| (pPers.roles === null)){
              pPers.roles = [];
            }
            InfoRoot.add_id_to_array(pPers.roles,ROLE_ETUD);
        }// pPers
    }// update_person
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(ETUDAFFECTATION_BY_ETUDIANT, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IEtudAffectation[]) => {
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
}// class Etudiant
