//affectationmodel.ts
//
import * as userinf from './userinfo';
import {InfoRoot} from '../utils/inforoot';
import {BaseEditViewModel} from './baseeditmodel';
import {IAffectation, IDepartementPerson, IUIManager} from 'infodata';
//
export class AffectationViewModel<T extends IAffectation, P extends IDepartementPerson>
 extends BaseEditViewModel<T> {
    //
    public persons: P[] = [];
    public currentPersons: P[] = [];
    public currentAffectations: T[] = [];
    //
    private _person_model: P = null;
    protected _start: Date = null;
    protected _end: Date = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.fill_persons();
        })
    }// activate
    //
    protected create_person(): P {
        return null;
    }
    protected is_refresh(): boolean {
        return (this.semestreid !== null) && (this.groupeid !== null);
    }
    protected is_storeable(): boolean {
        if ((this._start === undefined) || (this._end === undefined)) {
            return false;
        }
        if ((this.currentPersons === undefined) || (this.departementid === undefined) ||
            (this.anneeid === undefined) || (this.semestreid === undefined) ||
            (this.groupeid === undefined)) {
            return false;
        }
        let bRet = (this.departementid !== null) && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null) &&
            (this._start !== null) && (this._end !== null);
        if (!bRet) {
            return false;
        }
        if (this.currentPersons === null) {
            return false;
        }
        if (this.currentPersons.length < 1) {
            return false;
        }
        let t1 = Date.parse(this._start.toString());
        let t2 = Date.parse(this._end.toString());
        return (!isNaN(t1)) && (!isNaN(t2)) && (t1 <= t2);
    }
    public get canSave(): boolean {
        return this.is_storeable();
    }
    public set canSave(b: boolean) { }
    protected retrieve_add_items(): T[] {
        return [];
    }// retrieve_add_items
    //
    public get allStartDate(): string {
        return ((this._start !== undefined) && (this._start !== null)) ?
            InfoRoot.date_to_string(this._start) : null;
    }
    public set allStartDate(s: string) {
        this._start = null;
        let d1 = this.semestreMinDate;
        let d2 = this.semestreMaxDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = InfoRoot.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._start = d;
            }
        }
    }
    public get allEndDate(): string {
        return ((this._end !== undefined) && (this._end !== null)) ?
            InfoRoot.date_to_string(this._end) : null;
    }
    public set allEndDate(s: string) {
        this._end = null;
        let d1 = this.semestreMinDate;
        let d2 = this.semestreMaxDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = InfoRoot.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._end = d;
            }
        }
    }
    //
    public get personModel(): P {
        if (this._person_model === null) {
            this._person_model = this.create_person();
        }
        return this._person_model;
    }

    protected post_change_groupe(): Promise<any> {
        let self = this;
        return super.post_change_groupe().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            return self.refreshAll();
        });
    }
    protected post_change_semestre(): Promise<any> {
        let self = this;
        return super.post_change_semestre().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            self._start = null;
            self._end = null;
            let sem = self.semestre;
            if (sem !== null) {
                self._start = sem.startDate;
                self._end = sem.endDate;
            }
            return self.refreshAll();
        });
    }
    protected fill_persons(): Promise<any> {
        this.currentPersons = [];
        let id = this.departementid;
        this.personModel.departementid = id;
        if (id === null) {
            this.persons = [];
            return Promise.resolve(true);
        } else {
            let self = this;
            return this.dataService.get_all_items(this.personModel).then((pp: P[]) => {
                self.persons = ((pp !== undefined) && (pp !== null)) ? pp : [];
                return true;
            })
        }
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            return self.fill_persons();
        }).then((x) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            return self.refreshAll();
        });
    }// post_change_departement
    public get canRemove(): boolean {
        return ((this.currentAffectations !== null) && (this.currentAffectations.length > 0));
    }// canRemove
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    public remove(): any {
        if (this.currentAffectations === null) {
            return false;
        }
        if (this.currentAffectations.length < 1) {
            return false;
        }
        if (!this.confirm('Voulez-vous vraiment supprimer?')) {
            return false;
        }
        this.clear_error();
        let pp: Promise<any>[] = [];
        let service = this.dataService;
        for (let x of this.currentAffectations) {
            let p = service.remove_item(x);
            pp.push(p);
        }
        let self = this;
        return Promise.all(pp).then((r) => {
            self.currentAffectations = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// remove
    public save(): any {
        if (!this.is_storeable()) {
            return false;
        }
        let oItems = this.retrieve_add_items();
        if (oItems === null) {
            return false;
        }
        if (oItems.length < 1) {
            return false;
        }
        let self = this;
        this.clear_error();
        return this.dataService.maintains_items(oItems).then((r) => {
            self.currentPersons = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// save
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if ((this.semestreid === null) || (this.groupeid === null)) {
            return Promise.resolve(false);
        }
        return super.refreshAll();
    }// refreshAll
}// class AffectationViewModel
