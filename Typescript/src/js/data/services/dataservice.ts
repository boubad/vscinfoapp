//dataservice.ts
//
import {PouchDatabase} from './pouchdb/pouchdatabase';
import {PERSON_KEY, ETUDIANTPERSON_KEY} from '../../utils/infoconstants';
import {Person} from '../domain/person';
import {EtudAffectation} from '../domain/etudaffectation';
import {EtudEvent} from '../domain/etudevent';
import {GroupeEvent} from '../domain/groupeevent';
import {EtudiantPerson} from '../domain/etudperson';
import {ItemFactory} from '../domain/itemfactory';
import {Departement} from '../domain/departement';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Semestre} from '../domain/semestre';
import {Matiere} from '../domain/matiere';
import {LoginInfo} from './logininfo';
import {IBaseItem, IDepartement, IAnnee, IUnite, IGroupe, ISemestre, IMatiere,
IPerson, IWorkItem, IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IItemFactory, IDataService, ILoginInfo,
IAdministrator, IEnseignant, IEtudiant} from 'infodata';
//
export class DataService extends PouchDatabase implements IDataService {
    constructor() {
        super();
    }// constructor
    public get_all_departements(): Promise<IDepartement[]> {
        let model = new Departement();
        return this.get_all_items(model).then((rr: IDepartement[]) => {
            return rr;
        });
    }
    public get_unite_matieres(uniteid: string): Promise<IMatiere[]> {
        if ((uniteid === undefined) || (uniteid === null)) {
            return Promise.resolve([]);
        }
        let m = new Matiere({ uniteid: uniteid });
        return this.get_all_items(m).then((rr: IMatiere[]) => {
            return rr;
        });
    }// get_unite_matieres
    public get_annee_semestres(anneeid: string): Promise<ISemestre[]> {
        if ((anneeid === undefined) || (anneeid === null)) {
            return Promise.resolve([]);
        }
        let m = new Semestre({ anneeid: anneeid });
        return this.get_all_items(m).then((rr: ISemestre[]) => {
            return rr;
        });
    }// get_annee_semestres
    public get_departement_annees(depid: string): Promise<IAnnee[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Annee({ departementid: depid });
        return this.get_all_items(m).then((rr: IAnnee[]) => {
            return rr;
        });
    }// get_departement_annees
    public get_departement_unites(depid: string): Promise<IUnite[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Unite({ departementid: depid });
        return this.get_all_items(m).then((rr: IUnite[]) => {
            return rr;
        });
    }// get_departement_unites
    public get_departement_groupes(depid: string): Promise<IGroupe[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Groupe({ departementid: depid });
        return this.get_all_items(m).then((rr: IGroupe[]) => {
            return rr;
        });
    }// get_departement_groupes
    public get_person_departements(personid: string): Promise<IDepartement[]> {
        if ((personid === undefined) || (personid === null)) {
            return Promise.resolve([]);
        }
        let self = this;
        let cont: string[] = null;
        let xPers: IPerson = null;
        return this.find_item_by_id(personid).then((pPers: IPerson) => {
            if ((pPers === null) || (pPers === null)) {
                cont = [];
            } else {
                cont = pPers.departementids;
            }
            xPers = pPers;
            return self.find_items_array(cont);
        }).then((dd) => {
            if ((xPers !== null) && xPers.is_super) {
                let model = new Departement();
                return self.get_all_items(model);
            } else {
                return dd;
            }
        }).then((r: IDepartement[]) => {
            return r;
        }).catch((err) => {
            return [];
        });
    }// get_person_departements
    public find_person_by_username(username: string): Promise<IPerson> {
        let model = new Person({ username: username.trim().toLowerCase() });
        let id = model.create_id();
        let gen = this.itemFactory;
        return this.db.then((dx) => {
            return dx.get(id);
        }).then((pOld) => {
            if (pOld.type === undefined) {
                pOld.type = PERSON_KEY;
            }
            if (pOld.type === null) {
                pOld.type = PERSON_KEY;
            }
            return gen.create(pOld);
        }, (err) => {
            if (err.status == 404) {
                return null;
            } else {
                throw new Error(err.reason);
            }
        });
    }//find_person_by_username
    //
    public get_login_info(username: string): Promise<ILoginInfo> {
        if ((username === undefined) || (username === null)) {
            throw new Error('Invalid username');
        }
        let ss = username.trim().toLowerCase();
        if (ss.length < 1) {
            throw new Error('Invalid username');
        }
        let model = new Person({ username: ss });
        let id = model.create_id();
        let self = this;
        let oRet = new LoginInfo();
        let pPers: IPerson = null;
        let emptyArray: string[] = [];
        let isSuper: boolean = false;
        return this.find_item_by_id(id).then((px: IPerson) => {
            if (px !== null) {
                return self.check_person(px);
            } else {
                return pPers;
            }
        }).then((xPers: IPerson) => {
            if (xPers !== null) {
                pPers = xPers;
                isSuper = pPers.is_super;
                oRet.person = pPers;
                if (isSuper) {
                    return self.get_all_departements();
                } else {
                    return self.find_items_array(pPers.departementids);
                }
            } else {
                return [];
            }
        }).then((dd: IDepartement[]) => {
            if (pPers !== null) {
                oRet.departements = dd;
                let xa: string[] = (isSuper) ? emptyArray : pPers.anneeids;
                return self.find_items_array(xa);
            } else {
                return [];
            }
        }).then((aa: IAnnee[]) => {
            if (pPers !== null) {
                oRet.annees = aa;
                let xa: string[] = (isSuper) ? emptyArray : pPers.semestreids;
                return self.find_items_array(xa);
            } else {
                return [];
            }
        }).then((ss: ISemestre[]) => {
            if (pPers !== null) {
                oRet.semestres = ss;
                let xa: string[] = (isSuper) ? emptyArray : pPers.uniteids;
                return self.find_items_array(xa);
            } else {
                return [];
            }
        }).then((uu: IUnite[]) => {
            if (pPers !== null) {
                oRet.unites = uu;
                let xa: string[] = (isSuper) ? emptyArray : pPers.matiereids;
                return self.find_items_array(xa);
            } else {
                return [];
            }
        }).then((mm: IMatiere[]) => {
            if (pPers !== null) {
                oRet.matieres = mm;
                let xa: string[] = (isSuper) ? emptyArray : pPers.groupeids;
                return self.find_items_array(xa);
            } else {
                return [];
            }
        }).then((gg: IGroupe[]) => {
            if (pPers !== null) {
                oRet.groupes = gg;
                let xa: string = null;
                if ((pPers.administratorids !== undefined) && (pPers.administratorids !== null) &&
                    (pPers.administratorids.length > 0)) {
                    xa = pPers.administratorids[0];
                }
                return self.find_item_by_id(xa, true);
            } else {
                return null;
            }
        }).then((ff: IAdministrator) => {
            if (pPers !== null) {
                oRet.administrator = ff;
                let xa: string = null;
                if ((pPers.enseignantids !== undefined) && (pPers.enseignantids !== null) &&
                    (pPers.enseignantids.length > 0)) {
                    xa = pPers.enseignantids[0];
                }
                return self.find_item_by_id(xa, true);
            } else {
                return null;
            }
        }).then((fx: IEnseignant) => {
            if (pPers !== null) {
                oRet.enseignant = fx;
                let xa: string = null;
                if ((pPers.etudiantids !== undefined) && (pPers.etudiantids !== null) &&
                    (pPers.etudiantids.length > 0)) {
                    xa = pPers.etudiantids[0];
                }
                return self.find_item_by_id(xa, true);
            } else {
                return null;
            }
        }).then((ee: IEtudiant) => {
            if (pPers !== null) {
                oRet.etudiant = ee;
            }
            return oRet;
        });
    }// get_login_info
    public get_etudaffectations(semestreid: string, groupeid: string): Promise<IEtudAffectation[]> {
        if ((semestreid === undefined) || (semestreid === null) ||
            (groupeid === undefined) || (groupeid === null)) {
            return Promise.resolve([]);
        }
        let model = new EtudAffectation({ semestreid: semestreid, groupeid: groupeid });
        return this.get_all_items(model).then((rr: IEtudAffectation[]) => {
            return rr;
        });
    }//get_etudaffectations
    public get_groupeevent_evts(grpeventid: string, bNote?: boolean): Promise<IEtudEvent[]> {
        if ((grpeventid === undefined) || (grpeventid === null)) {
            Promise.resolve([]);
        }
        let model = new EtudEvent({ groupeeventid: grpeventid });
        let m = ((bNote !== undefined) && (bNote !== null)) ? bNote : false;
        return this.get_all_items(model).then((aa: IEtudEvent[]) => {
            let pp: IEtudEvent[] = ((aa !== undefined) && (aa !== null)) ? aa : [];
            let oRet: IEtudEvent[] = [];
            for (let x of pp) {
                if (m) {
                    if (x.genre == 'note') {
                        oRet.push(x);
                    }
                } else if (x.genre != 'note') {
                    oRet.push(x);
                }
            }// x
            return oRet;
        });
    }//get_groupeevent_evts
    public get_groupeevent_all_notes(grpeventid: string): Promise<IEtudEvent[]> {
        if ((grpeventid === undefined) || (grpeventid === null)) {
            Promise.resolve([]);
        }
        let self = this;
        let depid: string = null;
        let anneeid: string = null;
        let uniteid: string = null;
        let semestreid: string = null;
        let groupeid: string = null;
        let eventDate: Date = null;
        let allevts: IEtudEvent[] = [];
        let xgenre: string = 'note';
        return this.find_item_by_id(grpeventid).then((gvt: IGroupeEvent) => {
            if ((gvt === undefined) || (gvt === null)) {
                Promise.reject(new Error('Unknown groupeevent.'));
            }
            eventDate = gvt.eventDate;
            return self.find_item_by_id(gvt.profaffectationid);
        }).then((praff: IProfAffectation) => {
            if ((praff === undefined) || (praff === null)) {
                Promise.reject(new Error('Unkown profaffectation'));
            }
            groupeid = praff.groupeid;
            semestreid = praff.semestreid;
            anneeid = praff.anneeid;
            depid = praff.departementid;
            let model = new EtudAffectation({

                semestreid: semestreid,
                groupeid: groupeid, anneeid: anneeid,
                departementid: depid

            });
            return self.get_all_items(model);
        }).then((affs: IEtudAffectation[]) => {
            let cont = ((affs !== undefined) && (affs !== null)) ?
                affs : [];
            for (let xaf of affs) {
                let x = new EtudEvent({
                    departementid: depid,
                    anneeid: anneeid,
                    semestreid: semestreid,
                    groupeid: groupeid,
                    personid: xaf.personid,
                    etudiantid: xaf.etudiantid,
                    etudaffectationid: xaf.id,
                    firstname: xaf.firstname,
                    lastname: xaf.lastname,
                    groupeeventid: grpeventid,
                    eventDate: eventDate,
                    genre: xgenre
                });
                allevts.push(x);
            }// xaff
            return self.get_groupeevent_evts(grpeventid, true);
        }).then((pp: IEtudEvent[]) => {
            for (let y of allevts) {
                let xid = y.personid;
                for (let z of pp) {
                    if ((z.genre == xgenre) && (z.personid == xid)) {
                        y.id = z.id;
                        y.rev = z.rev;
                        y.status = z.status;
                        y.note = z.note;
                        y.attachments = z.attachments;
                        y.attachedDocs = z.attachedDocs;
                        break;
                    }
                }// z
            }// y
            return allevts;
        });
    }//check_groupeevent_events


}// class DataSevice
