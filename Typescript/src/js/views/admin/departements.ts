//departements.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {SigleNameViewModel} from '../../viewmodel/siglenamemodel';
import {Departement} from '../../data/domain/departement';
//
@autoinject
export class Departements extends SigleNameViewModel<Departement> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Départements';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    protected create_item(): Departement {
        return new Departement();
    }
    public get isEditable(): boolean {
      return this.isSuper;
    }
    public set isEditeable(s:boolean){}
    public canActivate(params?: any, config?: any, instruction?: any): any {
      return this.isConnected;
    }// activate
}// class DepartementModel
