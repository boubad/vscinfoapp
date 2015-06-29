//departement.ts
//
import {SigleNameItem} from "./siglenameitem";
import {DEPARTEMENT_TYPE, DEPARTEMENT_PREFIX} from '../../utils/infoconstants';
import {ANNEE_BY_DEPARTEMENT, UNITE_BY_DEPARTEMENT, GROUPE_BY_DEPARTEMENT}
from '../services/pouchdb/databaseconstants';
import {IDepartement, IDataService, IAnnee, IUnite, IGroupe, IBaseItem} from 'infodata';
//
export class Departement extends SigleNameItem implements IDepartement {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return DEPARTEMENT_TYPE;
    }
    public base_prefix(): string {
        return DEPARTEMENT_PREFIX;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        let docs: IBaseItem[] = [];
        return service.get_children_ids(ANNEE_BY_DEPARTEMENT, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IAnnee[]) => {
            for (let x of aa) {
                docs.push(x);
            }
            return service.get_children_ids(UNITE_BY_DEPARTEMENT, id);
        }).then((uu_ids) => {
            return service.find_items_array(uu_ids);
        }).then((uu: IUnite[]) => {
            for (let x of uu) {
                docs.push(x);
            }
            return service.get_children_ids(GROUPE_BY_DEPARTEMENT, id);
        }).then((gg_ids) => {
            return service.find_items_array(gg_ids);
        }).then((gg: IUnite[]) => {
            for (let x of gg) {
                docs.push(x);
            }
            let pp: Promise<any>[] = [];
            for (let y of docs) {
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
}// class IDepartement
