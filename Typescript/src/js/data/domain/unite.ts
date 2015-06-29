//unite.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IUnite, IMatiere, IDataService} from 'infodata';
import {UNITE_TYPE, UNITE_PREFIX} from '../../utils/infoconstants';
import {MATIERE_BY_UNITE} from '../services/pouchdb/databaseconstants';
//
export class Unite extends DepSigleNameItem implements IUnite {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return UNITE_TYPE;
    }
    public base_prefix(): string {
        return UNITE_PREFIX;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(MATIERE_BY_UNITE, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IMatiere[]) => {
            let pp: Promise<any>[] = [];
            for (let y of aa) {
                pp.push(y.remove(service));
            }
            if (pp.length > 0) {
                return Promise.all(pp);
            } else {
                return [];
            }
        }).then((xx) => {
            return service.remove_item(self);
        });
    }// remove
} // class Unite
