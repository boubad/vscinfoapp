//semestre.ts
//
import { IntervalItem} from "./intervalitem";
import {IBaseItem,
ISemestre, IDataService, IProfAffectation, IEtudAffectation} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {SEMESTRE_TYPE, SEMESTRE_PREFIX} from '../../utils/infoconstants';
import {PROFAFFECTATION_BY_SEMESTRE, ETUDAFFECTATION_BY_SEMESTRE} from '../services/pouchdb/databaseconstants';
//
export class Semestre extends IntervalItem implements ISemestre {
    public _anneeid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this.anneeid = oMap.anneeid;
            }
        } // oMap
    } // constructor
    public get anneeid(): string {
        return this._anneeid;
    }
    public set anneeid(s: string) {
        this._anneeid = InfoRoot.check_string(s);
    }
    public base_prefix(): string {
        return SEMESTRE_PREFIX;
    }
    public type(): string {
        return SEMESTRE_TYPE;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.anneeid !== null)) {
            s = s + '-' + this.anneeid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null);
    }
    public to_map(oMap?: any): void {
        super.to_map(oMap);
        if (this.anneeid !== null) {
            oMap.anneeid = this.anneeid;
        }
    } // to_insert_map
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        let docs: IBaseItem[] = [];
        return service.get_children_ids(ETUDAFFECTATION_BY_SEMESTRE, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IEtudAffectation[]) => {
            for (let x of aa) {
                docs.push(x);
            }
            return service.get_children_ids(PROFAFFECTATION_BY_SEMESTRE, id);
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
    }// remove
} // class Semestre
