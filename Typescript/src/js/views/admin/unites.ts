//groupes.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {DepSigleNameViewModel} from '../../viewmodel/depsiglenamemodel';
import {Unite} from '../../data/domain/unite';
//
@autoinject
export class Unites extends DepSigleNameViewModel<Unite> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Unités';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    protected create_item(): Unite {
        return new Unite({
			departementid: this.departementid
		});
    }
}// class Unites
