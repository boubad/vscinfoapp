//departements.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {Departement} from '../../domain/departement';
import {InfoRoot} from '../../common/inforoot';
import {IUIManager,IDepartement} from 'infodata';
//
@autoinject
export class Departements extends SigleNameViewModel<Departement> {
    constructor(userinfo: UserInfo) {
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
      return this.isConnected && this.isAdmin;
    }// activate
}// class DepartementModel
