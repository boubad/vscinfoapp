//enseignant.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IEnseignant} from 'infodata';
import {InfoRoot} from '../common/inforoot';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ROLE_PROF}
          from '../common/infoconstants';
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
}// class Enseignant
