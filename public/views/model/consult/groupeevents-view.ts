// groupoeevents-viewl.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {BaseConsultViewModel} from '../baseconsultmodel';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudEvent} from '../../domain/etudevent';
import {EtudAffectation} from '../../domain/etudaffectation';
import {InfoRoot} from '../../common/inforoot';
import {EMPTY_STRING} from '../../common/infoconstants';
import {IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
//
@autoinject
export class GroupeeventsView extends BaseConsultViewModel<GroupeEvent> {
  //
  //
  constructor(userinfo: UserInfo) {
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
  public canActivate(params?: any, config?: any, instruction?: any): any {
    return this.isConnected && this.isProf;
  }// activate
}// class GroupeeventsView
