// groupoeevents-viewl.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {BaseConsultViewModel} from '../../viewmodel/baseconsultmodel';
import {GroupeEvent} from '../../data/domain/groupeevent';
import {EtudEvent} from '../../data/domain/etudevent';
import {EtudAffectation} from '../../data/domain/etudaffectation';
import {InfoRoot} from '../../utils/inforoot';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
//
@autoinject
export class GroupeeventsView extends BaseConsultViewModel<GroupeEvent> {
  //
  //
  constructor(userinfo: userinf.UserInfo) {
    super(userinfo);
    this.title = "Devoirs";
  }// constructor
  protected is_refresh(): boolean {
    return (this.semestreid !== null);
  }
  protected create_item(): GroupeEvent {
    let p = new GroupeEvent({
      annneid: this.anneeid,
      matiereid: this.matiereid,
      semestreid: this.semestreid,
      groupeid: this.groupeid,
    });
    return p;
  }// create_item
  protected get_start_key(): string {
    if (this.semestreid === null){
      return null;
    }
    let s:string = this.modelItem.base_prefix();
    s = s + '-' + this.semestreid;
    if (this.matiereid !== null){
       s = s + '-' + this.matiereid;
       if (this.groupeid !== null){
         s = s + '-' + this.groupeid;
       }
    }// matiereid
    return s;
  }
  protected get_end_key(): string {
    return (this.get_start_key() + '\uffff');
  }
  public post_change_semestre(): Promise<any> {
    return this.refreshAll();
  }
  public post_change_matiere(): Promise<any> {
    return this.refreshAll();
  }
  public post_change_groupe(): Promise<any> {
    return this.refreshAll();
  }
}// class GroupeeventsView
