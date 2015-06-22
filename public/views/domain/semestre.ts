//semestre.ts
//
import { IntervalItem} from "./intervalitem";
import {ISemestre} from 'infodata';
import {InfoRoot} from '../common/inforoot';
import {SEMESTRE_TYPE, SEMESTRE_PREFIX} from '../common/infoconstants';
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
} // class Semestre
