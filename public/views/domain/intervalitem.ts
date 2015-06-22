//intervalitem.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IIntervalItem} from 'infodata';
import {InfoRoot} from '../common/inforoot';
//
export class IntervalItem extends DepSigleNameItem implements IIntervalItem {
    private _start: Date = null;
    private _end: Date = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    } // constructor
    public get startDate(): Date {
        return this._start;
    }
    public set startDate(d: Date) {
        this._start = InfoRoot.check_date(d);
    }
    public get endDate(): Date {
        return this._end;
    }
    public set endDate(d: Date) {
        this._end = InfoRoot.check_date(d);
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.startDate !== null)) {
            s = s + '-' + this.startDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.startDate === null)
        || (this.endDate === null)) {
            return false;
        }
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.startDate !== null) {
            oMap.startDate = this.startDate;
        }
        if (this.endDate !== null) {
            oMap.endDate = this.endDate;
        }
    } // toInsertMap
    public sort_func(p1: IIntervalItem, p2: IIntervalItem): number {
        let d1 = p1.startDate;
        let d2 = p2.startDate;
        if ((d1 !== null) && (d2 !== null)) {
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if (t1 > t2) {
                return -1;
            } else if (t1 < t2) {
                return 1;
            } else {
                return 0;
            }
        } else if ((d1 === null) && (d2 !== null)) {
            return 1;
        } else if ((d1 !== null) && (d2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
}
