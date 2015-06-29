//infoevent.ts
import {WorkItem} from './workitem';
import { IInfoEvent, IPerson, IDataService} from 'infodata';
import {InfoRoot } from '../../utils/inforoot';
//
export class InfoEvent extends WorkItem
    implements IInfoEvent {
    public uniteid: string = null;
    public matiereid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.uniteid !== null) {
            oMap.uniteid = this.uniteid;
        }
        if (this.matiereid !== null) {
            oMap.matiereid = this.matiereid;
        }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            InfoRoot.add_id_to_array(pPers.uniteids, this.uniteid);
            if ((pPers.matiereids === undefined) || (pPers.matiereids === null)) {
                pPers.matiereids = [];
            }
            InfoRoot.add_id_to_array(pPers.matiereids, this.matiereid);
            if ((pPers.affectationids === undefined) || (pPers.affectationids === null)) {
                pPers.affectationids = [];
            }
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.matiereid !== null) && (this.uniteid !== null);
    }
}// class GroupeEvent
