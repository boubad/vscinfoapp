//etudevent.ts
//
import {InfoEvent} from './infoevent';
import { IEtudEvent, IPerson, IDataService, IGroupeEvent } from 'infodata';
import {InfoRoot } from '../common/inforoot';
import { ETUDEVENT_TYPE, ETUDEVENT_PREFIX } from '../common/infoconstants';
//
export class EtudEvent extends InfoEvent
    implements IEtudEvent {
    public groupeeventid: string = null;
    private _note: number = null;
    public groupeEventName: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
            if (oMap.groupeEventName !== undefined) {
                this.groupeEventName = oMap.groupeEventName;
            }
        } // oMap
    } // constructor
    public get note(): number {
        return this._note;
    }
    public set note(s: number) {
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d >= 0)) {
            this._note = d;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.groupeeventid !== null) {
            oMap.groupeeventid = this.groupeeventid;
        }
        if (this.note !== null) {
            oMap.note = this.note;
        }
        if (this.groupeEventName !== null) {
            oMap.groupeEventName = this.groupeEventName;
        }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.eventids === undefined) || (pPers.eventids === null)) {
                pPers.eventids = [];
            }
            InfoRoot.add_id_to_array(pPers.eventids, this.id);
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
            (this.genre !== null);
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + '-' + this.groupeeventid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        return s;
    } // create_id
    public type(): string {
        return ETUDEVENT_TYPE;
    }
    public base_prefix(): string {
        return ETUDEVENT_PREFIX;
    }

}// class EtudEvent
