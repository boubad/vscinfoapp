//annees.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {IntervalViewModel} from '../../viewmodel/intervalmodel';
import {Annee} from '../../data/domain/annee';
//
@autoinject
export class Annees extends IntervalViewModel<Annee> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Années';
    }// constructor
    protected create_item(): Annee {
        return new Annee({
			departementid: this.departementid
		});
    }
}// class Annees
