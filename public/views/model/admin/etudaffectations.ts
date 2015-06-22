//etudaffectations.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {AffectationViewModel} from './affectationmodel';
import {EtudAffectation} from '../../domain/etudaffectation';
import {Etudiant} from '../../domain/etudiant';
//
@autoinject
export class Etudaffectations extends AffectationViewModel<EtudAffectation, Etudiant> {
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Affectations Etudiants';
    }// constructor
    //
    protected create_person(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid });
        return p;
    }
    protected create_item(): EtudAffectation {
        let p = new EtudAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            startDate: this._start,
            endDate: this._end,
            departementSigle: (this.departement !== null) ? this.departement.sigle : null,
            groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
            anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
            semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null,
        });
        return p;
    }
    protected retrieve_add_items(): EtudAffectation[] {
        let oRet: EtudAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.etudiantid = p.id;
                if (a.id === null) {
                    a.id = a.create_id();
                }
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
}// class EtudAffViewModel
