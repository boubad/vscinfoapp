//enseignants.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {PersonViewModel} from '../../viewmodel/personmodel';
import {Enseignant} from '../../data/domain/enseignant';
import {EnseignantPerson} from '../../data/domain/profperson';
//
@autoinject
export class Enseignants extends PersonViewModel<Enseignant, EnseignantPerson> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Enseignants';
    }// constructor
    protected create_person(): EnseignantPerson {
        let p = new EnseignantPerson();
        return p;
    }
    protected create_item(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
      return this.isConnected && this.isAdmin;
    }// activate
}// class AdministratorsEnseignants
