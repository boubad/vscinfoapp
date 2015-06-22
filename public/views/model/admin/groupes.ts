//groupes.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Groupe} from '../../domain/groupe';
//
@autoinject
export class Groupes extends DepSigleNameViewModel<Groupe> {
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = 'Groupes';
  }// constructor
  protected create_item(): Groupe {
    return new Groupe({
      departementid: this.departementid
    });
  }
}// class DepartementModel
