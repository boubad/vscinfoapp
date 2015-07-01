// basedetail.ts
//
import * as userinf from '../../viewmodel/userinfo';
import {WorkViewModel} from '../../viewmodel/workviewmodel';
import {GroupeEvent} from '../../data/domain/groupeevent';
import {EtudEvent} from '../../data/domain/etudevent';
import {IGroupeEvent, IEtudEvent, IBaseItem, IDepartement, IAnnee,
ISemestre, IUnite, IMatiere, IGroupe} from 'infodata';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {InfoRoot} from '../../utils/inforoot';
//
export class BaseDetail extends WorkViewModel {
    //
    private _dep: IDepartement = null;
    private _annee: IAnnee = null;
    private _semestre: ISemestre = null;
    private _unite: IUnite = null;
    private _matiere: IMatiere = null;
    private _groupe: IGroupe = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }
    private clear_data(): void {
        this._dep = null;
        this._annee = null;
        this._semestre = null;
        this._unite = null;
        this._matiere = null;
        this._groupe = null;
    }
    protected initialize_groupeevent(p: IGroupeEvent): Promise<any> {
        this.clear_data();
        if ((p === undefined) || (p === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        let service = this.dataService;
        return service.find_item_by_id(p.departementid).then((dep: IDepartement) => {
            self._dep = dep;
            return service.find_item_by_id(p.uniteid);
        }).then((un: IUnite) => {
            self._unite = un;
            return service.find_item_by_id(p.anneeid);
        }).then((an: IAnnee) => {
            self._annee = an;
            return service.find_item_by_id(p.groupeid);
        }).then((g: IGroupe) => {
            self._groupe = g;
            return service.find_item_by_id(p.semestreid);
        }).then((sem: ISemestre) => {
            self._semestre = sem;
            return service.find_item_by_id(p.matiereid);
        }).then((mat: IMatiere) => {
            self._matiere = mat;
            return true;
        });
    }// initialize_groupeevent
    protected initialize_etudevent(p: IEtudEvent): Promise<any> {
        this.clear_data();
        if ((p === undefined) || (p === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        let service = this.dataService;
        return service.find_item_by_id(p.departementid).then((dep: IDepartement) => {
            self._dep = dep;
            return service.find_item_by_id(p.uniteid);
        }).then((un: IUnite) => {
            self._unite = un;
            return service.find_item_by_id(p.anneeid);
        }).then((an: IAnnee) => {
            self._annee = an;
            return service.find_item_by_id(p.groupeid);
        }).then((g: IGroupe) => {
            self._groupe = g;
            return service.find_item_by_id(p.semestreid);
        }).then((sem: ISemestre) => {
            self._semestre = sem;
            return service.find_item_by_id(p.matiereid);
        }).then((mat: IMatiere) => {
            self._matiere = mat;
            return true;
        });
    }// initialize_groupeevent
    
    public get maxDate(): string {
      return InfoRoot.date_to_string(this._semestre.endDate);
    }
    public get semestreName(): string {
        return (this._semestre !== null) ? this._semestre.text : null;
    }
    public set semestreName(s: string) { }
    public get departementName(): string {
        return (this._dep !== null) ? this._dep.text : null;
    }
    public set departementName(s: string) { }
    public get anneeName(): string {
        return (this._annee !== null) ? this._annee.text : null;
    }
    public set anneeName(s: string) { }
    public get groupeName(): string {
        return (this._groupe !== null) ? this._groupe.text : null;
    }
    public set groupeName(s: string) { }
    public get uniteName(): string {
        return (this._unite !== null) ? this._unite.text : null;
    }
    public set uniteName(s: string) { }
    public get matiereName(): string {
        return (this._matiere !== null) ? this._matiere.text : null;
    }
    public set matiereName(s: string) { }
}// class Profgroupeevents
