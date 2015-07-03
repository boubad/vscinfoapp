// groupeeventmodel.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {BaseEditViewModel} from '../../viewmodel/baseeditmodel';
import {GroupeEvent} from '../../data/domain/groupeevent';
import {EtudEvent} from '../../data/domain/etudevent';
import {EtudAffectation} from '../../data/domain/etudaffectation';
import {InfoRoot} from '../../utils/inforoot';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
//
@autoinject
export class Groupeevents extends BaseEditViewModel<GroupeEvent> {
    //
    private _profaffectations: IProfAffectation[] = [];
    private _current_affectation: IProfAffectation = null;
    private _zgenre: string = null;
    private _etud_affectations: IEtudAffectation[] = [];
    private _current_etudaffectations: IEtudAffectation[] = null;
    private _etudaffectation_model: IEtudAffectation = null;
    private _notes: IEtudEvent[] = [];
    private _evts: IEtudEvent[] = [];
    private _evt_model: IEtudEvent = null;
    private _etud_evt_genre: string = null;
    private _current_etudevts: IEtudEvent[] = [];
    private _all_notes: IEtudEvent[] = [];
    //
    private _startdate: string = null;
    private _enddate: string = null;
    //
    public evtMode: boolean = false;
    public noteMode: boolean = false;
    public editMode: boolean = true;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = "Devoirs";
    }
    public get isEditable(): boolean {
        return this.isProf;
    }
    public set isEditable(s:boolean){}
    public get canEdit(): boolean {
        return (this.currentProfAffectation !== null) &&
        (this.currentProfAffectation.personid == this.personid);
    }
    public set canEdit(s: boolean) { }
    public get startDate(): string {
        return this._startdate;
    }
    public get endDate(): string {
        return this._enddate;
    }
    public get etudEvents(): IEtudEvent[] {
        return this._evts;
    }
    public set etudEvents(s: IEtudEvent[]) {
        this._evts = ((s !== undefined) && (s !== null)) ? s : [];
    }
    protected get currentProfAffectation(): IProfAffectation {
        return this._current_affectation;
    }
    protected set currentProfAffectation(s: IProfAffectation) {
        this._current_affectation = (s !== undefined) ? s : null;
        let x = this.currentProfAffectation;
        if (x !== null) {
            this._startdate = InfoRoot.date_to_string(x.startDate);
            this._enddate = InfoRoot.date_to_string(x.endDate);
        }
    }
    protected get profaffectationid(): string {
        let x = this.currentProfAffectation;
        return (x !== null) ? x.id : null;
    }
    public get allNotes(): IEtudEvent[] {
        return this._all_notes;
    }
    public get currentEtudEvts(): IEtudEvent[] {
        return this._current_etudevts;
    }
    public set currentEtudEvts(s: IEtudEvent[]) {
        this._current_etudevts = (s !== undefined) ? s : null;
    }
    public get etudEvtGenre(): string {
        return this._etud_evt_genre;
    }
    public set etudEvtGenre(s: string) {
        this._etud_evt_genre = (s !== undefined) ? s : null;
    }
    public get canAddEtudEvt(): boolean {
        return (this.currentItem !== null) && (this.currentItem.id !== null) && (this.etudAffectations.length > 0) &&
            (this.etudEvtGenre !== null) && this.canEdit;
    }
    public get cannotAddEtudEvt(): boolean {
        return (!this.canAddEtudEvt);
    }
    public get canEvtMode(): boolean {
        return (this.currentItem !== null) && (this.currentItem.id !== null) && (this.etudAffectations.length > 0);
    }
    public get canNoteMode(): boolean {
        return (this.currentItem !== null) && (this.currentItem.id !== null) && (this.etudAffectations.length > 0);
    }
    public evt_mode(): void {
        this.evtMode = true;
        this.noteMode = false;
        this.editMode = false;
    }
    public note_mode(): void {
        this.evtMode = false;
        this.noteMode = true;
        this.editMode = false;
    }
    public edit_mode(): void {
        this.evtMode = false;
        this.noteMode = false;
        this.editMode = true;
    }
    public get isNotEvtMode(): boolean {
        return (!this.evtMode) && (this.etudAffectations.length > 0);
        //  return (!this.evtMode);
    }
    public get isNotNoteMode(): boolean {
        return (!this.noteMode) && (this.allNotes.length > 0);
        //return (!this.noteMode);
    }
    public get isNotEditMode(): boolean {
        return (!this.editMode);
    }
    protected get eventModel(): IEtudEvent {
        if (this._evt_model === null) {
            this._evt_model = new EtudEvent();
        }
        return this._evt_model;
    }
    protected get etudAffectationModel(): IEtudAffectation {
        if (this._etudaffectation_model === null) {
            this._etudaffectation_model = new EtudAffectation({
                semestreid: this.semestreid,
                groupeid: this.groupeid
            });
        }
        return this._etudaffectation_model;
    }
    public get etudAffectations(): IEtudAffectation[] {
        return this._etud_affectations;
    }
    public set etudAffectations(s: IEtudAffectation[]) {
        this._etud_affectations = ((s !== undefined) && (s !== null)) ? s : [];
    }
    public get currentEtudAffectations(): IEtudAffectation[] {
        return this._current_etudaffectations;
    }
    public set currentEtudAffectations(s: IEtudAffectation[]) {
        this._current_etudaffectations = ((s !== undefined) && (s !== null)) ? s : [];
    }
    public get allGenre(): string {
        return this._zgenre;
    }
    public set allGenre(s: string) {
        this._zgenre = ((s !== undefined) && (s !== null)) ? s : null;
    }
    public get genre(): string {
        return (this.currentItem !== null) ? this.currentItem.genre : EMPTY_STRING;
    }
    public set genre(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.genre = s;
        }
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : EMPTY_STRING;
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s;
        }
    }
    public get location(): string {
        return (this.currentItem !== null) ? this.currentItem.location : EMPTY_STRING;
    }
    public set location(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.location = s;
        }
    }
    public get eventDate(): string {
        return (this.currentItem !== null) ?
            InfoRoot.date_to_string(this.currentItem.eventDate) : null;
    }
    public set eventDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.eventDate = InfoRoot.string_to_date(s);
        }
    }
    public get coefficient(): string {
        return (this.currentItem !== null) ?
            InfoRoot.number_to_string(this.currentItem.coefficient) : EMPTY_STRING;
    }
    public set coefficient(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            let d = InfoRoot.string_to_number(s);
            if ((d !== null) && (d > 0)) {
                x.coefficient = d;
            } else {
                x.coefficient = null;
            }
        }
    }
    public get startTime(): string {
        return (this.currentItem !== null) ?
            InfoRoot.date_to_string(this.currentItem.startTime) : null;
    }
    public set startTime(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startTime = InfoRoot.string_to_date(s);
        }
    }
    public get endTime(): string {
        return (this.currentItem !== null) ?
            InfoRoot.date_to_string(this.currentItem.endTime) : null;
    }
    public set endTime(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endTime = InfoRoot.string_to_date(s);
        }
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this.modelItem.departementid = this.departementid;
        this.modelItem.anneeid = this.anneeid;
        this.modelItem.semestreid = this.semestreid;
        this.modelItem.uniteid = this.uniteid;
        this.modelItem.matiereid = this.matiereid;
        this.modelItem.groupeid = this.groupeid;
        return super.activate(params, config, instruction).then((r) => {
            return self.fill_affectations();
        }).then((rx) => {
            self.check_item();
        })
    }// activate
    protected is_refresh(): boolean {
        let x = this.modelItem;
        return (x !== null) && (x.semestreid !== null) &&
            (x.matiereid !== null) && (x.groupeid !== null) &&
            (x.personid !== null);
    }
    public get canShowForm(): boolean {
        return (this.groupeid !== null) && (this.matiereid !== null) &&
            (this.semestreid !== null) && (this.uniteid !== null) &&
            (this.anneeid) && (this.departementid !== null)
            && (this.currentProfAffectation !== null) &&
            (this.currentProfAffectation.id !== null);
    }
    public set canShowForm(s: boolean) { }
    protected create_item(): GroupeEvent {
        let pPers = this.person;
        let firstname = (pPers !== null) ? pPers.firstname : null;
        let lastname = (pPers !== null) ? pPers.lastname : null;
        let p = new GroupeEvent({
            profaffectationid: this.profaffectationid,
            annneid: this.anneeid,
            matiereid: this.matiereid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            genre: this.allGenre,
            personid: this.personid,
            departementid: this.departementid,
            lastname: lastname,
            firstname: firstname,
            departementSigle: (this.departement !== null) ? this.departement.sigle : null,
            uniteSigle: (this.unite !== null) ? this.unite.sigle : null,
            matiereSigle: (this.matiere !== null) ? this.matiere.sigle : null,
            groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
            anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
            semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null,
        });
        return p;
    }// create_item
    protected post_change_groupe(): Promise<any> {
        this.etudEvents = [];
        this.allNotes = [];
        this.modelItem.groupeid = this.groupeid;
        this.update_profaffectation();
        this.etudAffectationModel.groupeid = this.groupeid;
        let self = this;
        return this.fill_etudaffectations().then((r) => {
            return self.refreshAll();
        });
    }
    protected post_change_semestre(): Promise<any> {
        this.etudEvents = [];
        this.allNotes = [];
        this.modelItem.semestreid = this.semestreid;
        this.update_profaffectation();
        this.etudAffectationModel.semestreid = this.semestreid;
        return this.refreshAll();
    }
    protected post_change_matiere(): Promise<any> {
        this.etudEvents = [];
        this.allNotes = [];
        this.modelItem.matiereid = this.matiereid;
        this.update_profaffectation();
        let self = this;
        return this.fill_etudaffectations().then((r) => {
            return self.refreshAll();
        });
    }
    protected get profAffectations(): IProfAffectation[] {
        if (this._profaffectations === null) {
            this._profaffectations = [];
        }
        return this._profaffectations;
    }
    protected set profAffectations(s: IProfAffectation[]) {
        this._profaffectations = ((s !== undefined) && (s !== null)) ? s : [];
    }
    protected update_profaffectation(): void {
        this.currentProfAffectation = null;
        let semid = this.semestreid;
        let matid = this.matiereid;
        let grpid = this.groupeid;
        if ((semid === null) || (matid === null) || (grpid === null)) {
            return;
        }
        for (let a of this.profAffectations) {
            if ((a.semestreid == semid) && (a.matiereid == matid) &&
                (a.groupeid == grpid)) {
                this.currentProfAffectation = a;
                break;
            }
        }// a
    }
    protected fill_etudaffectations(): Promise<any> {
        for (let a of this.etudAffectations) {
            let x = a.url;
            if (x !== null) {
                this.revokeUrl(x);
                a.url = null;
            }
        }
        this.currentEtudAffectations = [];
        this.etudAffectations = [];
        let model = this.etudAffectationModel;
        if ((model.semestreid === null) || (model.groupeid === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        return this.dataService.get_all_items(model).then((aa: IEtudAffectation[]) => {
            let rr = ((aa !== undefined) && (aa !== null)) ? aa : [];
            return self.retrieve_avatars(rr);
        }).then((ff: IEtudAffectation[]) => {
            this.etudAffectations = ff;
            return true;
        });
    }// fill_etudaffectations
    protected fill_notes(): Promise<any> {
        this._notes = [];
        this._evts = [];
        this._all_notes = [];
        this.etudEvents = [];
        this.allNotes = [];
        let x = this.currentItem;
        let id = (x !== null) ? x.id : null;
        if (id === null) {
            return Promise.resolve(true);
        }
        let model = this.eventModel;
        model.groupeeventid = id;
        let self = this;
        return this.dataService.get_all_items(model).then((ee: IEtudEvent[]) => {
            if ((ee !== undefined) && (ee !== null)) {
                for (let x of ee) {
                    if (x.genre.toLowerCase() == 'note') {
                        self.add_to_array(self._notes, x);
                    } else {
                        self.add_to_array(self._evts, x);
                    }
                }// e
            }// ee
            self.compute_all_notes();
            return true;
        });
    }
    protected compute_all_notes(): void {
        let item = this.currentItem;
        let id = (item !== null) ? item.id : null;
        if (id === null) {
            return;
        }
        let evts = this.etudEvents;
        let affs = this.etudAffectations;
        let xNotes = (this._notes !== null) ? this._notes : [];
        let oRet: IEtudEvent[] = [];
        for (let a of affs) {
            let personid = a.personid;
            for (let y of evts) {
                if (y.personid == personid) {
                    y.url = a.url;
                    break;
                }
            }// y
            let bFound: boolean = false;
            for (let n of xNotes) {
                if (n.personid == personid) {
                    bFound = true;
                    n.uniteid = this.uniteid;
                    n.matiereid = this.matiereid;
                    n.url = a.url;
                    this.add_to_array(oRet, n);
                }
            }// n
            if (!bFound) {
                let x = new EtudEvent({
                    groupeeventid: id,
                    genre: 'note',
                    etudaffectationid: a.id,
                    groupeid: a.groupeid,
                    semestreid: a.semestreid,
                    personid: a.personid,
                    avatarid: a.avatarid,
                    eventDate: item.eventDate,
                    anneeid: this.anneeid,
                    departementid: this.departementid,
                    uniteid: this.uniteid,
                    matiereid: this.matiereid,
                    firstname: a.firstname,
                    lastname: a.lastname,
                    groupeEventName: this.name,
                    departementSigle: (this.departement !== null) ? this.departement.sigle : null,
                    uniteSigle: (this.unite !== null) ? this.unite.sigle : null,
                    matiereSigle: (this.matiere !== null) ? this.matiere.sigle : null,
                    groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
                    anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
                    semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null,
                });
                x.url = a.url;
                x.id = x.create_id();
                this.add_to_array(oRet, x);
            }
        }// a
        this._all_notes = oRet;
    }// compute_all_notes
    protected post_change_item(): Promise<any> {
        let self = this;
        return super.post_change_item().then((r) => {
            return self.fill_notes();
        });
    }// post_change_item
    protected fill_affectations(): Promise<any> {
        let userinfo = this.userInfo;
        this._current_affectation = null;
        this._profaffectations = null;
        let pPers = userinfo.person;
        if (pPers === null) {
            return Promise.resolve(true);
        }
        let ids = pPers.affectationids;
        if ((ids !== undefined) && (ids !== null) && (ids.length > 0)) {
            let self = this;
            return this.dataService.find_items_array(ids).then((aa: IProfAffectation[]) => {
                self.profAffectations = aa;
                self.update_profaffectation();
            });
        } else {
            return Promise.resolve(true);
        }
    }// fill_affecttaions
    public get canAdd(): boolean {
        return (!this.addMode) && (this.currentProfAffectation !== null) &&
            (this.matiereid !== null) && (this.semestreid !== null) &&
            (this.groupeid !== null) && (this.allGenre !== null) &&
            (this.personid !== null) && this.canEdit;
    }
    public set canAdd(s: boolean) { }
    public get canSaveNotes(): boolean {
        if (!this.canEdit) {
            return false;
        }
        if (this.allNotes.length < 1) {
            return false;
        }
        let bRet = false;
        for (let n of this.allNotes) {
            if (n.is_storeable() && n.selected) {
                bRet = true;
                break;
            }
        }
        return bRet;
    }
    public get cannotSaveNotes(): boolean {
        return (!this.canSaveNotes);
    }
    public get canSaveEtudEvents(): boolean {
        if (!this.canEdit) {
            return false;
        }
        let item = this.currentItem;
        let id = (item !== null) ? item.id : null;
        if ((id === null) || (this.etudEvtGenre === null) ||
            (this.etudAffectations.length < 1)) {
            return false;
        }
        let bRet = false;
        for (let x of this.etudAffectations) {
            if (x.selected) {
                bRet = true;
                break;
            }
        }
        return bRet;
    }
    public get cannotSaveEtudEvents(): boolean {
        return (!this.canSaveEtudEvents);
    }
    public get canRemoveEtudEvents(): boolean {
        let bRet = false;
        for (let x of this.etudEvents) {
            if (x.selected && (x.id !== null) && (x.rev !== null)) {
                bRet = true;
                break;
            }
        }
        return bRet;
    }
    public get cannotRemoveEtudEvents(): boolean {
        return (!this.canRemoveEtudEvents);
    }
    public removeEtudEvents(): any {
        let ee: IEtudEvent[] = [];
        for (let x of this.etudEvents) {
            if (x.selected && (x.id !== null) && (x.rev !== null)) {
                ee.push(x);
            }
        }// x
        if (ee.length < 1) {
            return Promise.resolve(true);
        }
        if (!this.confirm('Voulez-vous vraiment supprimer?')) {
            return Promise.resolve(true);
        }
        let self = this;
        this.clear_error();
        let pp: Promise<any>[] = [];
        let service = this.dataService;
        for (let xx of ee) {
            let p = service.remove_item(xx);
            pp.push(p);
        }// xx
        return Promise.all(pp).then((r) => {
            return self.fill_notes();
        }).catch((err) => {
            self.set_error(err);
        });
    }// removeZtudEvent
    public saveEtudEvents(): any {
        let item = this.currentItem;
        let xgenre = this.etudEvtGenre;
        let id = (item !== null) ? item.id : null;
        if ((xgenre === null) || (id === null)) {
            return;
        }
        let oRet: IEtudEvent[] = [];
        let affs = this.etudAffectations;
        for (let a of affs) {
            if (a.selected) {
                let x = new EtudEvent({
                    etudaffectationid: a.id,
                    groupeeventid: id,
                    genre: xgenre,
                    groupeid: a.groupeid,
                    semestreid: a.semestreid,
                    personid: a.personid,
                    avatarid: a.avatarid,
                    eventDate: item.eventDate,
                    anneeid: this.anneeid,
                    departementid: this.departementid,
                    uniteid: this.uniteid,
                    matiereid: this.matiereid,
                    firstname: a.firstname,
                    lastname: a.lastname,
                    groupeEventName: this.name,
                    departementSigle: (this.departement !== null) ? this.departement.sigle : null,
                    uniteSigle: (this.unite !== null) ? this.unite.sigle : null,
                    matiereSigle: (this.matiere !== null) ? this.matiere.sigle : null,
                    groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
                    anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
                    semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null
                });
                oRet.push(x);
            }// selected
        }// a
        if (oRet.length < 1) {
            return Promise.resolve(true);
        }
        let self = this;
        this.clear_error();
        this.dataService.maintains_items(oRet).then((r) => {
            for (let aa of oRet) {
                aa.selected = false;
            }
            self.fill_notes();
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveEtudEvents
    public saveNotes(): any {
        let oRet: IEtudEvent[] = [];
        for (let n of this.allNotes) {
            if (n.is_storeable() && n.selected) {
                oRet.push(n);
            }
        }// n
        if (oRet.length < 1) {
            return Promise.resolve(true);
        }
        let self = this;
        this.clear_error();
        return this.dataService.maintains_items(oRet).then((rr) => {
            self.fill_notes();
        }).catch((err) => {
            self.set_error(err)

        });
    }// saveNotes
    public remove(): any {
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
        if ((item.id === null) || (item.rev === null)) {
            return false;
        }
        if (!this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            return false;
        }
        let model = this.eventModel;
        model.groupeeventid = item.id;
        let service = this.dataService;
        let self = this;
        this.clear_error();
        return service.remove_all_items(model.start_key(), model.end_key()).then((r) => {
            return service.remove_item(item);
        }).then((er) => {
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// remove
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return (this.isConnected && this.isProf);
    }// activate
}// class Profgroupeevents
