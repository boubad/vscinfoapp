//semestres.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {IntervalViewModel} from './intervalmodel';
import {Semestre} from '../../domain/semestre';
import {InfoRoot} from '../../common/inforoot';
//
@autoinject
export class Semestres extends IntervalViewModel<Semestre> {
  //
  public anneeStartDate: string = null;
  public anneeEndDate: string = null;
  //
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = 'Semestres';
  }// constructor
  protected create_item(): Semestre {
    return new Semestre({
      departementid: this.departementid,
      anneeid: this.anneeid
    });
  }
  public post_change_annee(): Promise<any> {
    this.modelItem.anneeid = this.anneeid;
    this.currentItem = this.create_item();
    this.anneeStartDate = null;
    this.anneeEndDate = null;
    let x = this.annee;
    if (x !== null) {
      this.anneeStartDate = InfoRoot.date_to_string(x.startDate);
      this.anneeEndDate = InfoRoot.date_to_string(x.endDate);
    }
    return this.refreshAll();
  }
  protected is_refresh(): boolean {
    return (this.anneeid !== null);
  }
  protected is_storeable(): boolean {
    let pAn = this.annee;
    if ((pAn === null) || (!super.is_storeable())) {
      return false;
    }
    if (!pAn.is_storeable()) {
      return false;
    }
    let t01 = Date.parse(pAn.startDate.toString());
    let t02 = Date.parse(pAn.endDate.toString());
    let t1 = Date.parse(this.currentItem.startDate.toString());
    let t2 = Date.parse(this.currentItem.endDate.toString());
    return (t1 >= t01) && (t1 <= t02) && (t2 >= t01) && (t2 <= t02) &&
      (t1 <= t2);
  }
}// class Semestres
