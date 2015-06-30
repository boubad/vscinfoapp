//groupes.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {DepSigleNameViewModel} from '../../viewmodel/depsiglenamemodel';
import {Groupe} from '../../data/domain/groupe';
//
@autoinject
export class Groupes extends DepSigleNameViewModel<Groupe> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Groupes';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    protected create_item(): Groupe {
        return new Groupe({
			departementid: this.departementid
		});
    }
}// class DepartementModel
