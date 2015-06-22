//etudevents-view.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {BaseConsultViewModel} from '../baseconsultmodel';
import {EtudEvent} from '../../domain/etudevent';
import {EtudAffectation} from '../../domain/etudaffectation';
import {InfoRoot} from '../../common/inforoot';
import {EMPTY_STRING} from '../../common/infoconstants';
import {IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
//
@autoinject
export class EtudeventsView extends BaseConsultViewModel<EtudEvent> {
  //
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = "Evènements";
  }// constructor
  public canActivate(params?: any, config?: any, instruction?: any): any {
    return this.isConnected && this.isProf;
  }// activate
  protected is_refresh(): boolean {
    return (this.semestreid !== null);
  }
  protected create_item(): EtudEvent {
    let p = new EtudEvent({
      annneid: this.anneeid,
      matiereid: this.matiereid,
      semestreid: this.semestreid,
      groupeid: this.groupeid
    });
    return p;
  }// create_item
  public post_change_semestre(): Promise<any> {
    return this.refreshAll();
  }
  public refreshAll(): Promise<any> {
    this.prepare_refresh();
    if (!this.is_refresh()) {
      return Promise.resolve(true);
    }
    let nc = this.itemsPerPage;
    let self = this;
    return this.dataService.get_semestre_evts_ids(this.semestreid).then((ids) => {
      self.allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
      let nt = self.allIds.length;
      let np = Math.floor(nt / nc);
      if ((np * nc) < nt) {
        ++np;
        self.pagesCount = np;
      }
      return self.refresh();
    });
  }// refreshAll
}// class GroupeeventsView
