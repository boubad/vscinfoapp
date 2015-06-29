//depchild.ts
//
import {BaseItem} from './baseitem';
import {IDepartementChildItem} from 'infodata';
//
export class DepartementChildItem extends BaseItem
    implements IDepartementChildItem {
    public departementid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.departementid !== null)) {
            s = s + '-' + this.departementid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.departementid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.departementid !== null) {
            oMap.departementid = this.departementid;
        }
    } // toInsertMap
}
