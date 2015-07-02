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
interface MyEvent extends EventTarget {
    target: { files: any, result: any };
}
//
@autoinject
export class Etudiants extends PersonViewModel<Etudiant, EtudiantPerson> {
    //
    private _date: string = null;
    private _importer: CSVImporter = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Etudiant';
    }// constructor
    public get canImport(): boolean {
        return (this.departementid !== null);
    }
    private import_etudiants(dd: IEtudiantPerson[]): Promise<boolean> {
        let depid = this.departementid;
        if ((dd === undefined) || (dd === null) || (depid === null)) {
            return Promise.resolve(false);
        }
        let pp: IEtudiantPerson[] = [];
        for (let x of dd) {
            if ((x !== undefined) && (x !== null)) {
                if ((x.username === undefined) || (x.username === null)) {
                    x.username = InfoRoot.create_username(x.lastname, x.firstname);
                }
                if (x.id === null) {
                    x.id = x.create_id();
                }
                if ((x.departementids === undefined) || (x.departementids === null)) {
                    x.departementids = [];
                }
                InfoRoot.add_id_to_array(x.departementids, depid);
                if ((x.roles === undefined) || (x.roles === null)) {
                    x.roles = [ROLE_ETUD];
                }
                if (x.is_storeable()) {
                    pp.push(x);
                }
            }
        }// x
        if (pp.length < 1) {
            return Promise.resolve(false);
        }
        let service = this.dataService;
        let self = this;
        return service.maintains_items(pp).then((zz: IEtudiantPerson[]) => {
            let ppp: IEtudiant[] = [];
            for (let z of zz) {
                let p = new Etudiant({
                    departementid: depid, personid: z.id,
                    firstname: z.firstname, lastname: z.lastname
                });
                ppp.push(p);
            }// z
            if (ppp.length > 0) {
                return service.maintains_items(ppp);
            } else {
                return [];
            }
        }).then((w) => {
            self.refreshAll();
            return true;
        }).catch((err) => {
            self.set_error(err);
            return false;
        })
    }// import_etudiants
    public importFileChanged(event: MyEvent): any {
        let self = this;
        let files = event.target.files;
        if ((files !== undefined) && (files !== null) && (files.length > 0)) {
            let file = files[0];
            if ((this._importer === undefined) || (this._importer === null)) {
                this._importer = new CSVImporter();
            }
            this._importer.transform_file(file, ETUDIANTPERSON_TYPE).then((dd: IEtudiantPerson[]) => {
                self.import_etudiants(dd);
            }).catch((err) => {
                self.set_error(err);
            });
        }// files
    }// fileChanged
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
