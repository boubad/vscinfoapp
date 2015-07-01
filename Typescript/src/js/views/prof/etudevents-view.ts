//etudevents-view.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {BaseConsultViewModel} from '../../viewmodel/baseconsultmodel';
import {EtudEvent} from '../../data/domain/etudevent';
import {EtudAffectation} from '../../data/domain/etudaffectation';
import {InfoRoot} from '../../utils/inforoot';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
//
@autoinject
export class EtudeventsView extends BaseConsultViewModel<EtudEvent> {
  //
  constructor(userinfo: userinf.UserInfo) {
    super(userinfo);
    this.title = "Evènements";
  }// constructor
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
