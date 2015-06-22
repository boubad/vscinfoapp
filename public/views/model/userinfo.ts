//userinfo.ts
//
import {InfoElement} from '../infoelement';
import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//

import {SessionStore} from '../common/sessionstore';
import {LocalStore} from '../common/localstore';
import {Person} from '../domain/person';
import {LoginInfo} from '../common/logininfo';
import {EtudiantPerson} from '../domain/etudperson';
import {IPerson, IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe, IDataService} from 'infodata';
import {InfoRoot} from '../common/inforoot';
import {DATABASE_NAME,
PERSON_KEY, DEPARTEMENTID_KEY, ANNEEID_KEY, SEMESTREID_KEY, UNITEID_KEY, MATIEREID_KEY,
GROUPEID_KEY, ETUDIANTID_KEY, ENSEIGNANTID_KEY,
ETUDIANTPERSON_KEY,ENSEIGNANTPERSON_KEY,ADMINISTRATORPERSON_KEY} from '../common/infoconstants';
import {DataService} from '../services/dataservice';
import {IObjectStore, ILoginInfo} from 'infodata';
import {UIManager} from '../common/uimanager';
import {AdministratorPerson} from '../domain/adminperson';
import {EnseignantPerson} from '../domain/profperson';
//
@autoinject
export class UserInfo extends InfoElement {
    public eventAggregator:EventAggregator = null;
    public store: SessionStore;
    public loginInfo: LoginInfo;
    public dataService:DataService;
    public localStore:LocalStore;
    //
    private _pers: IPerson = null;
    private _service: DataService = null;
    //
    public departements: IDepartement[] = [];
    public annees: IAnnee[] = [];
    public semestres: ISemestre[] = [];
    public unites: IUnite[] = [];
    public matieres: IMatiere[] = [];
    public groupes: IGroupe[] = [];
    //
    private _allannees: IAnnee[] = [];
    private _allsemestres: ISemestre[] = [];
    private _allunites: IUnite[] = [];
    private _allmatieres: IMatiere[] = [];
    private _allgroupes: IGroupe[] = [];
    //
    private _departement: IDepartement = null;
    private _annee: IAnnee = null;
    private _unite: IUnite = null;
    private _semestre: ISemestre = null;
    private _matiere: IMatiere = null;
    private _groupe: IGroupe = null;
    //
    constructor(eventAggregator:EventAggregator) {
      super();
        this.eventAggregator = eventAggregator;
        this.store = new SessionStore();
        this.localStore = new LocalStore();
        this.loginInfo = new LoginInfo();
        this.dataService = new DataService();
    }// constructor
    //
    public get sessionStore():IObjectStore{
      return this.store;
    }
    //
    public departement_changed(): void {
    }// departement_changed
    public annee_changed(): void {
    }// annee_changed
    public unite_changed(): void {
    }// unite_changed
    public groupe_changed(): void {
    }// groupe_changed
    public semestre_changed(): void {
    }// semestre_changed
    public matiere_changed(): void {
    }// matiere_changed
    //
    public get departementid(): string {
        return this.store.get_value(DEPARTEMENTID_KEY);
    }
    public set departementid(s: string) {
        let id = InfoRoot.check_string(s);
        this.store.remove_value(ANNEEID_KEY);
        this.store.remove_value(UNITEID_KEY);
        this.store.remove_value(GROUPEID_KEY);
        this.store.store_value(DEPARTEMENTID_KEY, id);
        this.post_update_departement();
        this.departement_changed();
    }
    public change_departementid(s: string): Promise<any> {
        let id = InfoRoot.check_string(s);
        this.store.remove_value(ANNEEID_KEY);
        this.store.remove_value(UNITEID_KEY);
        this.store.remove_value(GROUPEID_KEY);
        this.store.store_value(DEPARTEMENTID_KEY, id);
        return this.post_update_departement();
    }// change_departementid
    public get departement(): IDepartement {
        return this._departement;
    }
    public set departement(s: IDepartement) {
        this._departement = (s !== undefined) ? s : null;
        let id = (this.departement !== null) ? this.departement.id : null;
        this._unite = null;
        this._annee = null;
        this._groupe = null;
        this.change_departementid(id);
    }
    public get anneeid(): string {
        return this.store.get_value(ANNEEID_KEY);
    }
    public set anneeid(s: string) {
        let id = InfoRoot.check_string(s);
        this.store.store_value(ANNEEID_KEY, id);
        this.store.remove_value(SEMESTREID_KEY);
        this.post_update_annee();
        this.annee_changed();
    }
    public change_anneeid(s: string): Promise<any> {
        let id = InfoRoot.check_string(s);
        this.store.store_value(ANNEEID_KEY, id);
        this.store.remove_value(SEMESTREID_KEY);
        return this.post_update_annee();
    }
    public get uniteid(): string {
        return this.store.get_value(UNITEID_KEY);
    }
    public set uniteid(s: string) {
        let id = InfoRoot.check_string(s);
        this.matieres = [];
        this.store.remove_value(MATIEREID_KEY);
        this.store.store_value(UNITEID_KEY, id);
        this.post_update_unite();
        this.unite_changed();
    }
    public change_uniteid(s: string): Promise<any> {
        let id = InfoRoot.check_string(s);
        this.matieres = [];
        this.store.remove_value(MATIEREID_KEY);
        this.store.store_value(UNITEID_KEY, id);
        return this.post_update_unite();
    }
    public get semestreid(): string {
        return this.store.get_value(SEMESTREID_KEY);
    }
    public set semestreid(s: string) {
        this.store.store_value(SEMESTREID_KEY, s);
        this.semestre_changed();
    }
    public get matiereid(): string {
        return this.store.get_value(MATIEREID_KEY);
    }
    public set matiereid(s: string) {
        this.store.store_value(MATIEREID_KEY, s);
        this.matiere_changed();
    }
    public get groupeid(): string {
        return this.store.get_value(GROUPEID_KEY);
    }
    public set groupeid(s: string) {
        let id = InfoRoot.check_string(s);
        this.store.store_value(GROUPEID_KEY, id);
        this.groupe_changed();
    }
    public get enseignantid(): string {
        return this.store.get_value(ENSEIGNANTID_KEY);
    }
    public set enseignantid(s: string) {
        let id = InfoRoot.check_string(s);
        this.store.store_value(ENSEIGNANTID_KEY, id);
    }
    public get etudiantid(): string {
        return this.store.get_value(ETUDIANTID_KEY);
    }
    public set etudiantid(s: string) {
        let id = InfoRoot.check_string(s);
        this.store.store_value(ETUDIANTID_KEY, id);
    }
    public get annee(): IAnnee {
        return this._annee;
    }
    public set annee(s: IAnnee) {
        this._annee = (s !== undefined) ? s : null;
        let id = (this.annee !== null) ? this.annee.id : null;
        this._semestre = null;
        this.change_anneeid(id);
    }
    public get unite(): IUnite {
        return this._unite;
    }
    public set unite(s: IUnite) {
        this._unite = (s !== undefined) ? s : null;
        let id = (this.unite !== null) ? this.unite.id : null;
        this._matiere = null;
        this.change_uniteid(id);
    }
    //
    public get semestre(): ISemestre {
        return this._semestre;
    }
    public set semestre(s: ISemestre) {
        this._semestre = (s !== undefined) ? s : null;
        let id = (this.semestre !== null) ? this.semestre.id : null;
        this.semestreid = id;
    }
    public get groupe(): IGroupe {
        return this._groupe;
    }
    public set groupe(s: IGroupe) {
        this._groupe = (s !== undefined) ? s : null;
        let id = (this.groupe !== null) ? this.groupe.id : null;
        this.groupeid = id;
    }
    //
    public get matiere(): IMatiere {
        return this._matiere;
    }
    public set matiere(s: IMatiere) {
        this._matiere = (s !== undefined) ? s : null;
        let id = (this.matiere !== null) ? this.matiere.id : null;
        this.matiereid = id;
    }
    //
    public check_person(): Promise<any> {
        if ((this._pers !== null) && (this._pers.id !== null)) {
            return Promise.resolve(true);
        }
        this._pers = null;
        let sval = this.store.get_value(PERSON_KEY);
        if (sval === null) {
            return Promise.resolve(true);
        }
        let pPers: IPerson = null;
        try {
            let oMap: any = JSON.parse(sval);
            if ((oMap !== undefined) && (oMap !== null) && (oMap.type !== undefined) &&
                (oMap.type !== null)) {
                let stype = oMap.type.trim().toLowerCase();
                if (stype == PERSON_KEY) {
                    pPers = new Person(oMap);
                } else if (stype == ETUDIANTPERSON_KEY) {
                    pPers = new EtudiantPerson(oMap);
                }else if (stype == ENSEIGNANTPERSON_KEY) {
                    pPers = new EnseignantPerson(oMap);
                }else if (stype == ADMINISTRATORPERSON_KEY) {
                    pPers = new AdministratorPerson(oMap);
                }
            }// type
        } catch (e) { }
        return this.change_person(pPers);
    }// check_person
    public get person(): IPerson {
        return this._pers;
    }// get person
    public set person(pPers: IPerson) {
        this.change_person(pPers);
    }// set person
    public login(username: string, spass: string): Promise<boolean> {
        this.loginInfo.clear();
        this.clear_data();
        let self = this;
        return this.loginInfo.login(username, this.dataService).then((x: ILoginInfo) => {
            let pPers: IPerson = null;
            let bOk = ((x !== undefined) && (x !== null) && (x.person !== null));
            if (bOk) {
                pPers = x.person;
                if (!pPers.check_password(spass)) {
                    bOk = false;
                } else {
                    self.departements = x.departements;
                    self._allannees = x.annees;
                    self._allunites = x.unites;
                    self._allgroupes = x.groupes;
                    self._allmatieres = x.matieres;
                    self._allsemestres = x.semestres;
                    try {
                        let oMap: any = {};
                        pPers.to_map(oMap);
                        let sval = JSON.stringify(oMap);
                        self.store.store_value(PERSON_KEY, sval);
                        self._pers = pPers;
                    } catch (e) { }
                }// ok
            }
            if (!bOk) {
                self.loginInfo.clear();
            }
            return bOk;
        }).catch((err) => {
            return false;
        });
    }// login
    public logout(): void {
        this.loginInfo.clear();
        this.clear_data();
        this.store.clear();
    }// logout
    public change_person(pPers: IPerson): Promise<any> {
        this.clear_data();
        if ((pPers === undefined) || (pPers === null)) {
            return Promise.resolve(true);
        }
        if (pPers.id === null) {
            return Promise.resolve(true);
        }
        pPers.url = null;
        let self = this;
        let service = this.dataService;
        try {
            let oMap: any = {};
            pPers.to_map(oMap);
            let sval = JSON.stringify(oMap);
            this.store.store_value(PERSON_KEY, sval);
            this._pers = pPers;
        } catch (e) { }
        if (!pPers.is_super) {
            return service.find_items_array(pPers.departementids).then((dd: IDepartement[]) => {
                self.departements = InfoRoot.check_array(dd);
                return service.find_items_array(pPers.anneeids);
            }).then((aa: IAnnee[]) => {
                self._allannees = InfoRoot.check_array(aa);
                return service.find_items_array(pPers.uniteids);
            }).then((uu: IUnite[]) => {
                self._allunites = InfoRoot.check_array(uu);
                return service.find_items_array(pPers.groupeids);
            }).then((gg: IGroupe[]) => {
                self._allgroupes = InfoRoot.check_array(gg);
                return service.find_items_array(pPers.matiereids);
            }).then((mm: IMatiere[]) => {
                self._allmatieres = InfoRoot.check_array(mm);
                return service.find_items_array(pPers.semestreids);
            }).then((ss: ISemestre[]) => {
                self._allsemestres = InfoRoot.check_array(ss);
                return true;
            });
        } else {
            return service.get_all_departements().then((dd: IDepartement[]) => {
                self.departements = InfoRoot.check_array(dd);
                return true;
            });
        }
    }// change_person
    public get is_super(): boolean {
        return (this.person !== null) ? this.person.is_super : false;
    }
    public set is_super(b: boolean) { }
    public get is_admin(): boolean {
        return (this.person !== null) ? this.person.is_admin : false;
    }
    public set is_admin(b: boolean) { }
    public get is_prof(): boolean {
        return (this.person !== null) ? this.person.is_prof : false;
    }
    public set is_prof(b: boolean) { }
    public get is_etud(): boolean {
        return (this.person !== null) ? this.person.is_etud : false;
    }
    public set is_etud(b: boolean) { }
    public get url(): string {
        return (this.person !== null) ? this.person.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public set has_url(s: boolean) { }
    public get personid(): string {
        return (this.person !== null) ? this.person.id : null;
    }
    public get fullname(): string {
        return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected(): boolean {
        return (this.personid !== null);
    }
    public set is_connected(s: boolean) { }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    public set is_notconnected(s: boolean) { }
    //
    private clear_data(): void {
        this._pers = null;
        this.departements = [];
        this.annees = [];
        this.semestres = [];
        this.unites = [];
        this.matieres = [];
        this.groupes = [];
        this._allannees = [];
        this._allgroupes = [];
        this._allmatieres = [];
        this._allsemestres = [];
        this._allunites = [];
        this.store.remove_value(ANNEEID_KEY);
        this.store.remove_value(UNITEID_KEY);
        this.store.remove_value(MATIEREID_KEY);
        this.store.remove_value(SEMESTREID_KEY);
        this.store.remove_value(GROUPEID_KEY);
        this.store.remove_value(DEPARTEMENTID_KEY);
        this.store.remove_value(PERSON_KEY);
    }// clear_data
    private post_update_departement(): Promise<any> {
        this.annees = [];
        this.groupes = [];
        this.unites = [];
        let depid = this.departementid;
        if (depid === null) {
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(true);
        }
        if (pPers.is_admin) {
            let self = this;
            let service = this.dataService;
            return service.get_departement_annees(depid).then((dd) => {
                self.annees = InfoRoot.check_array(dd);
                return service.get_departement_groupes(depid);
            }).then((gg) => {
                self.groupes = gg;
                return service.get_departement_unites(depid);
            }).then((uu) => {
                self.unites = uu;
                return true;
            });
        } else {
            if (this._allannees !== null) {
                for (let x of this._allannees) {
                    if (x.departementid == depid) {
                        this.annees.push(x);
                    }
                }//x
            }
            if (this._allunites !== null) {
                for (let x of this._allunites) {
                    if (x.departementid == depid) {
                        this.unites.push(x);
                    }
                }//x
            }
            if (this._allgroupes !== null) {
                for (let x of this._allgroupes) {
                    if (x.departementid == depid) {
                        this.groupes.push(x);
                    }
                }//x
            }
            return Promise.resolve(true);
        }
    }// post_update_departement
    private post_update_annee(): Promise<any> {
        this.semestres = [];
        let anneeid = this.anneeid;
        if (anneeid === null) {
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_annee_semestres(anneeid).then((dd) => {
                self.semestres = InfoRoot.check_array(dd);
                return true;
            });
        } else if (this._allsemestres !== null) {
            for (let x of this._allsemestres) {
                if (x.anneeid == anneeid) {
                    this.semestres.push(x);
                }
            }//x
            return Promise.resolve(true);
        }
    }// post_change_annee
    private post_update_unite(): Promise<any> {
        this.matieres = [];
        let uniteid = this.uniteid;
        if (uniteid === null) {
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_unite_matieres(uniteid).then((dd) => {
                self.matieres = InfoRoot.check_array(dd);
                return true;
            });
        } else if (this._allmatieres !== null) {
            for (let x of this._allmatieres) {
                if (x.uniteid == uniteid) {
                    this.matieres.push(x);
                }
            }//x
            return Promise.resolve(true);
        }
    }// post_change_unite
}// class UserInfo
