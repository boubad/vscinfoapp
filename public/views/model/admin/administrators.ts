//administratormodel.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personmodel';
import {Administrator} from '../../domain/administrator';
import {AdministratorPerson} from '../../domain/adminperson';
//
@autoinject
export class Administrators extends PersonViewModel<Administrator, AdministratorPerson> {
    constructor(userinfo: UserInfo) {
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
