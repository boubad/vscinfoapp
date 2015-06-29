//groupe.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IBaseItem,IDataService,IProfAffectation,IEtudAffectation,IGroupe} from 'infodata';
import {GROUPE_TYPE, GROUPE_PREFIX} from '../../utils/infoconstants';
import {PROFAFFECTATION_BY_GROUPE, ETUDAFFECTATION_BY_GROUPE} from '../services/pouchdb/databaseconstants';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return GROUPE_TYPE;
    }
    public base_prefix(): string {
        return GROUPE_PREFIX;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        let docs: IBaseItem[] = [];
        return service.get_children_ids(ETUDAFFECTATION_BY_GROUPE, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IEtudAffectation[]) => {
            for (let x of aa) {
                docs.push(x);
            }
            return service.get_children_ids(PROFAFFECTATION_BY_GROUPE, id);
        }).then((uu_ids) => {
            return service.find_items_array(uu_ids);
        }).then((uu: IProfAffectation[]) => {
            for (let x of uu) {
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
    }
} // class Groupe
