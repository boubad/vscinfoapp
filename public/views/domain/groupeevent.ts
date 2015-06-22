//groupeevent.ts
//
import {InfoEvent} from './infoevent';
import { IGroupeEvent, IPerson, IDataService} from 'infodata';
import {InfoRoot } from '../common/inforoot';
import { GROUPEEVENT_TYPE, GROUPEEVENT_PREFIX } from '../common/infoconstants';
import {EtudEvent} from './etudevent';
//
export class GroupeEvent extends InfoEvent
    implements IGroupeEvent {
    public profaffectationid: string = null;
    public name: string = null;
    public location: string = null;
    public _t1: Date = null;
    public _t2: Date = null;
    public _coef: number = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this.profaffectationid = oMap.profaffectationid;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this.location = oMap.location;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
        } // oMap
    } // constructor
    public get startTime(): Date {
        return this._t1;
    }
    public set startTime(d: Date) {
        this._t1 = InfoRoot.check_date(d);
    }
    public get endTime(): Date {
        return this._t2;
    }
    public set endTime(d: Date) {
        this._t2 = InfoRoot.check_date(d);
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(s: number) {
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d > 0)) {
            this._coef = d;
        } else {
            this._coef = null;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.profaffectationid !== null) {
            oMap.profaffectationid = this.profaffectationid;
        }
        if (this.name !== null) {
            oMap.name = this.name;
        }
        if (this.location !== null) {
            oMap.location = this.location;
        }
        if (this.coefficient !== null) {
            oMap.coefficient = this.coefficient;
        }
        if (this.startTime !== null) {
            oMap.startTime = this.startTime;
        }
        if (this.endTime !== null) {
            oMap.endTime = this.endTime;
        }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.eventids === undefined) || (pPers.eventids === null)) {
                pPers.eventids = [];
            }
            InfoRoot.add_id_to_array(pPers.eventids, this.id);
            if ((pPers.affectationids === undefined) || (pPers.affectationids === null)) {
                pPers.affectationids = [];
            }
            InfoRoot.add_id_to_array(pPers.affectationids, this.profaffectationid);
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.profaffectationid !== null) &&
             (this.eventDate !== null) &&
            (this.name !== null) && (this.genre !== null);
        if (!bRet) {
            return false;
        }
        if ((this.startTime === null) || (this.endTime === null)) {
            return true;
        }
        let t1 = Date.parse(this.startTime.toString());
        let t2 = Date.parse(this.endTime.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public sort_func(p1: IGroupeEvent, p2: IGroupeEvent): number {
        let d1 = p1.eventDate;
        let d2 = p2.eventDate;
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
    public toString(): string {
        return this.name;
    }

    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        if ((s !== null) && (this.eventDate !== null)) {
            s = s + '-' + this.eventDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public type(): string {
        return GROUPEEVENT_TYPE;
    }
    public base_prefix(): string {
        return GROUPEEVENT_PREFIX;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let model = new EtudEvent({ groupeeventid: this.id });
        let self = this;
        return service.remove_all_items(model.start_key(), model.end_key()).then((r) => {
            return service.remove_item(self);
        });
    }// save
}// class GroupeEvent
