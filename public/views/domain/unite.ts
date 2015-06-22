//unite.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IUnite} from 'infodata';
import {UNITE_TYPE, UNITE_PREFIX} from '../common/infoconstants';
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
} // class Unite
