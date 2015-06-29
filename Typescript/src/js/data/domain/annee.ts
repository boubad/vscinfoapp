//annee.ts
//
import { IntervalItem} from "./intervalitem";
import {IAnnee, ISemestre, IDataService} from 'infodata';
import {ANNEE_TYPE, ANNEE_PREFIX} from '../../utils/infoconstants';
import {SEMESTRE_BY_ANNEE} from '../services/pouchdb/databaseconstants';
//
export class Annee extends IntervalItem implements IAnnee {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return ANNEE_TYPE;
    }
    public base_prefix(): string {
        return ANNEE_PREFIX;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(SEMESTRE_BY_ANNEE, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: ISemestre[]) => {
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
} // class Annee
