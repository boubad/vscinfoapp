//etudiant.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IEtudiant} from 'infodata';
import {InfoRoot} from '../common/inforoot';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD} from '../common/infoconstants';
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
}// class Etudiant
