//administrator.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IAdministrator} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX,ROLE_ADMIN} from '../../utils/infoconstants';
//
export class Administrator extends DepartementPerson implements IAdministrator {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public base_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
     public update_person(pPers: IPerson): void {
       super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.roles === undefined)|| (pPers.roles === null)){
              pPers.roles = [];
            }
            InfoRoot.add_id_to_array(pPers.roles,ROLE_ADMIN);
            if ((pPers.administratorids === undefined) ||
            (pPers.administratorids === null)){
                pPers.administratorids = [];
            }
            InfoRoot.add_id_to_array(pPers.administratorids, this.id);
        }// pPers
    }// update_person
}// class Enseignant
