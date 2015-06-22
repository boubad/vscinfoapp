//annee.ts
//
import { IntervalItem} from "./intervalitem";
import {IAnnee} from 'infodata';
import {ANNEE_TYPE, ANNEE_PREFIX} from '../common/infoconstants';
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
} // class Annee
