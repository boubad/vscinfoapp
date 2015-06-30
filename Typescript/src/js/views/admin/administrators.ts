//administrators.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {PersonViewModel} from '../../viewmodel/personmodel';
import {Administrator} from '../../data/domain/administrator';
import {AdministratorPerson} from '../../data/domain/adminperson';
//
@autoinject
export class Administrators extends PersonViewModel<Administrator, AdministratorPerson> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Opérateurs';
    }// constructor
    protected create_person(): AdministratorPerson {
        let p = new AdministratorPerson();
        return p;
    }
    protected create_item(): Administrator {
        let p = new Administrator({ departementid: this.departementid });
        return p;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
      return this.isConnected && this.isSuper;
    }// activate
}// class Administrators
