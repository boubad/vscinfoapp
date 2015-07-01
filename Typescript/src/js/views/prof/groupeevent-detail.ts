// groupeevent-detail.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {BaseDetail} from './basedetail';
import {GroupeEvent} from '../../data/domain/groupeevent';
import {EtudEvent} from '../../data/domain/etudevent';
import {IGroupeEvent, IEtudEvent, IBaseItem,IDepartement,IAnnee,
ISemestre,IUnite,IMatiere,IGroupe} from 'infodata';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {InfoRoot} from '../../utils/inforoot';
//
@autoinject
export class GroupeeventDetail extends BaseDetail {
  //
  public notes: IEtudEvent[] = [];
  public evts: IEtudEvent[] = [];
  private _evt_model: IEtudEvent = null;
  public currentItem: IGroupeEvent = null;
  //
  constructor(userinfo: userinf.UserInfo) {
    super(userinfo);
    this.title = "Détails Devoirs";
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    let self = this;
    if (this._evt_model === null) {
      this._evt_model = new EtudEvent();
    }
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.uiManager.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    if (this.currentItem === null) {
      this.currentItem = new GroupeEvent();
    }
    this.notes = [];
    this.evts = [];
    let id: string = null;
    if (params.id !== undefined) {
      id = params.id;
    }
    return super.activate(params, config, instruction).then((r) => {
      return self.dataService.find_item_by_id(id, true);
    }).then((p: IGroupeEvent) => {
      if (p !== null) {
        self.currentItem = p;
      }
      return self.retrieve_one_avatar(self.currentItem);
    }).then((xx) => {
      return self.fill_notes();
    }).then((x)=>{
      return self.initialize_groupeevent(self.currentItem);
    })
  }// activate
  public deactivate(): any {
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.uiManager.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    return super.deactivate();
  }
  public get hasUrl(): boolean {
    return (this.currentItem.url !== null);
  }// hasUrl
  public set hasUrl(s: boolean) { }
  public get url(): string {
    return this.currentItem.url;
  }
  protected fill_notes(): Promise<any> {
    this.notes = [];
    this.evts = [];
    let x = this.currentItem;
    let id = (x !== null) ? x.id : null;
    if (id === null) {
      return Promise.resolve(true);
    }
    let model = this._evt_model;
    model.groupeeventid = id;
    let self = this;
    return this.dataService.get_all_items(model).then(( xx: IEtudEvent[]) => {
      let rx = ((xx !== undefined) && (xx !== null)) ? xx : [];
      return self.retrieve_avatars(rx);
    }).then((ee: IEtudEvent[]) => {
      if ((ee !== undefined) && (ee !== null)) {
        for (let x of ee) {
          if (x.genre.toLowerCase() == 'note') {
            self.add_to_array(self.notes, x);
          } else {
            self.add_to_array(self.evts, x);
          }
        }// e
      }// ee
      return true;
    });
  }
  public get genre(): string {
    return (this.currentItem !== null) ? this.currentItem.genre : EMPTY_STRING;
  }
  public set genre(s: string) {
  }
  public get name(): string {
    return (this.currentItem !== null) ? this.currentItem.name : EMPTY_STRING;
  }
  public set name(s: string) {
  }
  public get location(): string {
    return (this.currentItem !== null) ? this.currentItem.location : EMPTY_STRING;
  }
  public set location(s: string) {
  }
  public get eventDate(): string {
    return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.eventDate) : null;
  }
  public set eventDate(s: string) {
  }
  public get coefficient(): string {
    return (this.currentItem !== null) ?
      InfoRoot.number_to_string(this.currentItem.coefficient) : EMPTY_STRING;
  }
  public set coefficient(s: string) {
  }
  public get startTime(): string {
    return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.startTime) : null;
  }
  public set startTime(s: string) {
  }
  public get endTime(): string {
    return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.endTime) : null;
  }
  public set endTime(s: string) {
  }
}// class Profgroupeevents
