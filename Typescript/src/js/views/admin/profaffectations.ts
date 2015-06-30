//profaffectations.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {AffectationViewModel} from '../../viewmodel/affectationmodel';
import {ProfAffectation} from '../../data/domain/profaffectation';
import {Enseignant} from '../../data/domain/enseignant';
//
@autoinject
export class Profaffectations extends AffectationViewModel<ProfAffectation, Enseignant> {
    //
    private _genre: string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Affectations enseignants';
    }// constructor
    //
    protected create_person(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null)
            && (this.matiereid !== null) && (this.genre !== null);
    }
    public get canSave(): boolean {
       return this.is_storeable();
  }
  public set canSave(b: boolean) { }
    protected create_item(): ProfAffectation {
        let p = new ProfAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            genre: this.genre,
            startDate: this._start,
            endDate: this._end,
            departementSigle: (this.departement !== null) ? this.departement.sigle : null,
            uniteSigle: (this.unite !== null) ? this.unite.sigle : null,
            matiereSigle: (this.matiere !== null) ? this.matiere.sigle : null,
            groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
            anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
            semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null
        });
        return p;
    }
    protected retrieve_add_items(): ProfAffectation[] {
        let oRet: ProfAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.enseignantid = p.id;
                if (a.id === null) {
                    a.id = a.create_id();
                }
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
    public post_change_matiere(): Promise<any> {
        this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return super.is_refresh() && (this.modelItem.matiereid !== null) &&
            (this.modelItem.genre !== null);
    }
    //
    public get genre(): string {
        return this._genre;
    }
    public set genre(s: string) {
        this._genre = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
        this.modelItem.genre = this.genre;
        this.refreshAll();
    }
    //
}// class ProfAffectationModel
