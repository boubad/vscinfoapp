//etudaffectation.ts
//
import {Affectation} from './affectation';
import {IPerson, IEtudAffectation,IDataService,IEtudEvent} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX} from '../../utils/infoconstants';
import {ETUDEVENTS_BY_ETUDAFFECTATION} from '../services/pouchdb/databaseconstants';
//
export class EtudAffectation extends Affectation
    implements IEtudAffectation {
    public etudiantid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
    } // constructor
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.etudiantid !== null);
    }
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
          if ((pPers.etudiantids === undefined) || (pPers.etudiantids === null)){
            pPers.etudiantids = [];
          }
          InfoRoot.add_id_to_array(pPers.etudiantids,this.etudiantid);
        }// pPers
    }// update_person
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.etudiantid !== null) {
            oMap.etudiantid = this.etudiantid;
        }
    } // toInsertMap
    public base_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public type(): string {
        return ETUDAFFECTATION_TYPE;
    }
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(ETUDEVENTS_BY_ETUDAFFECTATION, id).then((aa_ids) => {
            return service.find_items_array(aa_ids);
        }).then((aa: IEtudEvent[]) => {
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
}
