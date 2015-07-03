//administrators.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {PersonViewModel} from '../../viewmodel/personmodel';
import {Etudiant} from '../../data/domain/etudiant';
import {EtudiantPerson} from '../../data/domain/etudperson';
import {InfoRoot} from '../../utils/inforoot';
import {CSVImporter} from '../../utils/importcsv';
import {ETUDIANTPERSON_TYPE, ROLE_ETUD} from '../../utils/infoconstants';
import {IEtudiantPerson, IEtudiant} from 'infodata';
//
@autoinject
export class Etudiants extends PersonViewModel<Etudiant, EtudiantPerson> {
    //
    private _date: string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Etudiant';
    }// constructor

    protected create_person(): EtudiantPerson {
        let p = new EtudiantPerson();
        return p;
    }
    protected create_item(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid });
        return p;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return this.isConnected && this.isSuper;
    }// activate
    protected post_change_item(): Promise<any> {
        let self = this;
        return super.post_change_item().then((r) => {
            let pPers = this.currentPerson;
            if (pPers !== null) {
                self._date = InfoRoot.date_to_string(pPers.birthDate);
            } else {
                self._date = null;
            }
            return true;
        });
    }// post_change_item
    public get dossier(): string {
        return this.currentPerson.dossier;
    }
    public set dossier(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.dossier = s;
        }
    }
    public get sexe(): string {
        return this.currentPerson.sexe;
    }
    public set sexe(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.sexe = s;
        }
    }
    public get birthDate(): string {
        return this._date;
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthDate = InfoRoot.string_to_date(s);
            this._date = InfoRoot.date_to_string(x.birthDate);
        }
    }
    public get ville(): string {
        return this.currentPerson.ville;
    }
    public set ville(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.ville = s;
        }
    }
    public get etablissement(): string {
        return this.currentPerson.etablissement;
    }
    public set etablissement(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etablissement = s;
        }
    }
    public get serieBac(): string {
        return this.currentPerson.serieBac;
    }
    public set serieBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.serieBac = s;
        }
    }
    public get optionBac(): string {
        return this.currentPerson.optionBac;
    }
    public set optionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.optionBac = s;
        }
    }
    public get mentionBac(): string {
        return this.currentPerson.mentionBac;
    }
    public set mentionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
        return this.currentPerson.etudesSuperieures;
    }
    public set etudesSuperieures(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etudesSuperieures = s;
        }
    }
}// class Etudiants
