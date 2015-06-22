//annees.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {IntervalViewModel} from './intervalmodel';
import {Annee} from '../../domain/annee';
//
@autoinject
export class Annees extends IntervalViewModel<Annee> {
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = 'Années';
  }// constructor
  protected create_item(): Annee {
    return new Annee({
      departementid: this.departementid
    });
  }
}// class Annees
