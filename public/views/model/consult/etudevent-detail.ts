//etudevent-detail.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {BaseBean} from '../basebean';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudEvent} from '../../domain/etudevent';
import {IGroupeEvent, IEtudEvent, IBaseItem, ISemestre,
IDepartement, IUnite, IMatiere, IAnnee, IGroupe} from 'infodata';
import {EMPTY_STRING} from '../../common/infoconstants';
import {InfoRoot} from '../../common/inforoot';
import {Departement} from '../../domain/departement';
import {Annee} from '../../domain/annee';
import {Semestre} from '../../domain/semestre';
import {Unite} from '../../domain/unite';
import {Matiere} from '../../domain/matiere';
import {Groupe} from '../../domain/groupe';
//
@autoinject
export class etudeventDetail extends BaseBean {
  //
  private _item: IEtudEvent = null;
  private _departement: IDepartement = null;
  private _annee: IAnnee = null;
  private _semestre: ISemestre = null;
  private _unite: IUnite = null;
  private _matiere: IMatiere = null;
  private _groupe: IGroupe = null;
  private _groupeevent: IGroupeEvent = null;
  private _canedit:boolean = false;
  //
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = "Détails Evènement";
  }
  public canActivate(params?: any, config?: any, instruction?: any): any {
    return this.isConnected;
  }// activate
  public activate(params?: any, config?: any, instruction?: any): any {
    let self = this;
    this._item = new EtudEvent();
    this._departement = new Departement();
    this._annee = new Annee();
    this._semestre = new Semestre();
    this._unite = new Unite();
    this._matiere = new Matiere();
    this._groupe = new Groupe();
    this._groupeevent = new GroupeEvent();
    this._canedit = false;
    let id: string = null;
    if (params.id !== undefined) {
      id = params.id;
    }
    let personid = this.userInfo.personid;
    this.clear_error();
    let service = this.dataService;
    return super.activate(params, config, instruction).then((r) => {
      return service.find_item_by_id(id, true);
    }).then((p: IEtudEvent) => {
      if ((p !== undefined) && (p !== null)) {
        self.currentItem = p;
      }
      return self.retrieve_one_avatar(self.currentItem);
    }).then((xx) => {
      let id1 = self.currentItem.groupeeventid;
      return service.find_item_by_id(id1);
    }).then((gvt: IGroupeEvent) => {
      self._groupeevent = ((gvt !== undefined) && (gvt !== null)) ? gvt : null;
      self._canedit = (self._groupeevent.personid == personid);
      let id2 = self.currentItem.groupeid;
      return service.find_item_by_id(id2);
    }).then((xg: IGroupe) => {
      self._groupe = ((xg !== undefined) && (xg !== null)) ? xg : null;
      let id3 = self.currentItem.matiereid;
      return service.find_item_by_id(id3);
    }).then((xm: IMatiere) => {
      self._matiere = ((xm !== undefined) && (xm !== null)) ? xm : null;
      let id4 = self.currentItem.uniteid;
      return service.find_item_by_id(id4);
    }).then((xu: IUnite) => {
      self._unite = ((xu !== undefined) && (xu !== null)) ? xu : null;
      let id5 = self.currentItem.anneeid;
      return service.find_item_by_id(id5);
    }).then((xa: IAnnee) => {
      self._annee = ((xa !== undefined) && (xa !== null)) ? xa : null;
      let id6 = self.currentItem.semestreid;
      return service.find_item_by_id(id6);
    }).then((xs: ISemestre) => {
      self._semestre = ((xs !== undefined) && (xs !== null)) ? xs : null;
      let id7 = self.currentItem.departementid;
      return service.find_item_by_id(id7);
    }).then((xd: IDepartement) => {
      self._departement = ((xd !== undefined) && (xd !== null)) ? xd : null;
      return true;
    })
  }// activate
  public deactivate(): any {
    if (this.currentItem.url !== null) {
      this.uiManager.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    return super.deactivate();
  }
  public get groupeeventid():string {
    return this.currentItem.groupeeventid;
  }
  public get currentItem(): IEtudEvent {
    return this._item;
  }
  public set currentItem(s: IEtudEvent) {
    this._item = ((s !== undefined) && (s !== null)) ? s : new EtudEvent();
  }
  public get hasUrl(): boolean {
    return (this.currentItem.url !== null);
  }// hasUrl
  public get fullname():string {
    return this.currentItem.fullname;
  }
  public set hasUrl(s: boolean) { }
  public get url(): string {
    return this.currentItem.url;
  }
  public get eventDate(): string {
    return InfoRoot.date_to_string(this.currentItem.eventDate);
  }
  public set eventDate(s: string) {
    this.currentItem.eventDate = InfoRoot.string_to_date(s);
  }
  public get minDate(): string {
    return InfoRoot.date_to_string(this._groupeevent.eventDate);
  }
  public get maxDate(): string {
    return InfoRoot.date_to_string(this._semestre.endDate);
  }
  public get genre(): string {
    return this.currentItem.genre;
  }
  public set genre(s: string) {
    this.currentItem.genre = s;
  }
  public get observations(): string {
    return this.currentItem.description;
  }
  public set observations(s: string) {
    this.currentItem.description = s;
  }
  public get note(): string {
    return InfoRoot.number_to_string(this.currentItem.note);
  }
  public set note(s: string) {
    this.currentItem.note = InfoRoot.string_to_number(s);
  }
  public get is_note(): boolean {
    return (this.currentItem.genre == 'note');
  }
  public set is_note(s: boolean) { }
  public get is_event(): boolean {
    return (this.currentItem.genre != 'note');
  }
  public set is_event(s: boolean) { }
  //
  public get canSave(): boolean {
    return this.currentItem.is_storeable();
  }
  public set canSave(s: boolean) { }
  public get cannotSave(): boolean {
    return (!this.canSave);
  }
  public set cannotSave(s: boolean) { }
  public save(): any {
    let item = this.currentItem;
    if (!item.is_storeable()) {
      return false;
    }
    var self = this;
    this.clear_error();
    return this.dataService.maintains_item(item).then((r) => {
      self.infoMessage = 'Elément modifié.';
      return true;
    }, (err) => {
        self.set_error(err);
        return false;
      });
  }// save
  public get canEdit():boolean {
    return this._canedit;
  }
  public set canEdit(s:boolean){}
  //
  public get groupeEventName(): string {
    return this._groupeevent.name;
  }
  public get departementName(): string {
    return this._departement.text;
  }
  public get anneeName(): string {
    return this._annee.text;
  }
  public get semestreName(): string {
    return this._semestre.text;
  }
  public get uniteName(): string {
    return this._unite.text;
  }
  public get matiereName(): string {
    return this._matiere.text;
  }
  public get groupeName(): string {
    return this._groupe.text;
  }
}// class Profgroupeevents
