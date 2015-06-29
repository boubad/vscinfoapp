//matiere.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IMatiere,IDataService,IProfAffectation} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {MATIERE_TYPE, MATIERE_PREFIX} from '../../utils/infoconstants';
import {PROFAFFECTATION_BY_MATIERE} from '../services/pouchdb/databaseconstants';
//
export class Matiere extends DepSigleNameItem implements IMatiere {
    //
    private _uniteid: string = null;
    private _genre: string = null;
    private _mat_module: string = null;
    private _coef: number = null;
    private _ecs: number = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this.mat_module = oMap.mat_module;
            }
        }// oMap
    } // constructor
    public get uniteid(): string {
        return this._uniteid;
    }
    public set uniteid(s: string) {
        this._uniteid =InfoRoot.check_string(s);
    }
    public get genre(): string {
        return this._genre;
    }
    public set genre(s: string) {
        this._genre = InfoRoot.check_upper_string(s);
    }
    public get mat_module(): string {
        return this._mat_module;
    }
    public set mat_module(s: string) {
        this._mat_module = InfoRoot.check_upper_string(s);
    }
    public base_prefix(): string {
        return MATIERE_PREFIX;
    }
    public type(): string {
        return MATIERE_TYPE;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.uniteid !== null)) {
            s = s + '-' + this.uniteid;
        }
        return s;
    }
    public get ecs(): number {
        return this._ecs;
    }
    public set ecs(d: number) {
        let v = InfoRoot.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._ecs = v;
        } else {
            this._ecs = null;
        }
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(d: number) {
        let v = InfoRoot.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = null;
        }
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.uniteid !== null) {
            oMap.uniteid = this.uniteid;
        }
        if (this.genre !== null) {
            oMap.genre = this.genre;
        }
        if (this.mat_module !== null) {
            oMap.mat_module = this.mat_module;
        }
        if (this.coefficient !== null) {
            oMap.coefficient = this.coefficient;
        }
        if (this.ecs !== null) {
            oMap.ecs = this.ecs;
        }
    }// to_insert_map
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(PROFAFFECTATION_BY_MATIERE, id).then((aa_ids) => {
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
} // class Unite
