//enseignants.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personmodel';
import {Enseignant} from '../../domain/enseignant';
import {EnseignantPerson} from '../../domain/profperson';
//
@autoinject
export class Enseignants extends PersonViewModel<Enseignant, EnseignantPerson> {
    constructor(userinfo: UserInfo) {
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
}// class Enseignants
