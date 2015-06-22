//unites.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Unite} from '../../domain/unite';
//
@autoinject
export class Unites extends DepSigleNameViewModel<Unite> {
  constructor(userinfo: UserInfo) {
    super(userinfo);
    this.title = 'Unités';
  }// constructor
  protected create_item(): Unite {
    return new Unite({
      departementid: this.departementid
    });
  }
}// class DepartementModel
