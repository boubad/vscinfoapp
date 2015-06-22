//profaffectation.ts
//
import {Affectation} from './affectation';
import {IProfAffectation, IPerson} from 'infodata';;
import {InfoRoot} from '../common/inforoot';
import {PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX} from '../common/infoconstants';
//
export class ProfAffectation extends Affectation
    implements IProfAffectation {
    public enseignantid: string = null;
    public uniteid: string = null;
    public matiereid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantid !== undefined) {
                this.enseignantid = oMap.enseignantid;
            }
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
        } // oMap
    } // constructor
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
          if ((pPers.uniteids === undefined) || (pPers.uniteids === null)){
            pPers.uniteids = [];
          }
          InfoRoot.add_id_to_array(pPers.uniteids,this.uniteid);
          if ((pPers.matiereids === undefined) || (pPers.matiereids === null)){
            pPers.matiereids = [];
          }
          InfoRoot.add_id_to_array(pPers.matiereids,this.matiereid);
          if ((pPers.enseignantids === undefined) || (pPers.enseignantids === null)){
            pPers.enseignantids = [];
          }
          InfoRoot.add_id_to_array(pPers.enseignantids,this.enseignantid);
        }// pPers
    }// update_person
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
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            s = s + '-' + this.startDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.enseignantid !== null) &&
            (this.uniteid !== null) && (this.matiereid !== null) &&
            (this.genre !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.enseignantid !== null) {
            oMap.enseignantid = this.enseignantid;
        }
        if (this.uniteid !== null) {
            oMap.uniteid = this.uniteid;
        }
        if (this.matiereid !== null) {
            oMap.matiereid = this.matiereid;
        }
    } // toInsertMap
    public base_prefix(): string {
        return PROFAFFECTATION_PREFIX;
    }
    public type(): string {
        return PROFAFFECTATION_TYPE;
    }
}
