//personmodel.ts
//
import * as userinf from './userinfo';
import {InfoRoot} from '../utils/inforoot';
import {BaseEditViewModel} from './baseeditmodel';
import {EMPTY_STRING} from '../utils/infoconstants';
import {CSVImporter} from '../utils/importcsv';
import {IPerson, IDepartementPerson, IUIManager} from 'infodata';
interface MyEvent extends EventTarget {
    target: { files: any, result: any };
}
//
//
export class PersonViewModel<T extends IDepartementPerson, V extends IPerson>
    extends BaseEditViewModel<T> {
    //
    private _current_person: V = null;
    private _importer: CSVImporter;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get canImport(): boolean {
        return (this.departementid !== null);
    }
    public importFileChanged(event: MyEvent): any {
        let self = this;
        let files = event.target.files;
        if ((files !== undefined) && (files !== null) && (files.length > 0)) {
            let file = files[0];
            if ((this._importer === undefined) || (this._importer === null)) {
                this._importer = new CSVImporter();
            }
            let stype = this.currentPerson.type();
            this._importer.transform_file(file, stype).then((dd: V[]) => {
                self.import_persons(dd);
            }).catch((err) => {
                self.set_error(err);
            });
        }// files
    }// fileChanged
    protected import_persons(dd: V[]): Promise<boolean> {
        let depid = this.departementid;
        if ((dd === undefined) || (dd === null) || (depid === null)) {
            return Promise.resolve(false);
        }
        let pp: V[] = [];
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
        return service.check_items(pp).then((zz: IPerson[]) => {
            let ppp: T[] = [];
            for (let z of zz) {
                let p: T = self.create_item();
                p.departementid = depid;
                p.personid = z.id;
                p.firstname = z.firstname;
                p.lastname = z.lastname;
                ppp.push(p);
            }// z
            if (ppp.length > 0) {
                return service.check_items(ppp);
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
    //
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            return self.refreshAll();
        });
    }
    protected perform_activate(): any {
        super.perform_activate();
        if (this._current_person === null) {
            this._current_person = this.create_person();
        }
        let userinfo = this.userInfo;
        if (userinfo !== null) {
            if ((userinfo.departementid === null) && (userinfo.departements.length > 0)) {
                let x = userinfo.departements[0];
                userinfo.departementid = x.id;
                this.departement = x;
            }
        }
    }
    public get currentPerson(): V {
        return this._current_person;
    }
    public set currentPerson(s: V) {
        this._current_person = ((s !== undefined) && (s !== null)) ?
            s : this.create_person();
    }
    //
    public reset_password(): any {
        let x: IPerson = this.currentPerson;
        let id = (x !== null) ? x.id : null;
        if ((id === null) || (x.rev === null)) {
            return;
        }
        let self = this;
        let service = this.dataService;
        this.clear_error();
        return service.find_item_by_id(id, true).then((pPers: IPerson) => {
            pPers.reset_password();
            return service.maintains_item(pPers);
        }).then((r) => {
            self.infoMessage = 'Mot de passe modifié.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// reset_password
    //
    public saveAvatar(): any {
        let f = this.fileDesc;
        let p = this.currentPerson;
        let pp = this.currentItem;
        if ((f === null) || (p === null) || (pp === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
            return;
        }
        let id = p.id;
        if (id === null) {
            return;
        }
        let avatarid = f.name;
        let type = f.type;
        let data = f.data;
        if ((avatarid === null) || (type === null) || (data === null)) {
            return;
        }
        let service = this.dataService;
        this.clear_error();
        let self = this;
        return service.maintains_attachment(id, avatarid, data, type).then((r) => {
            p.avatarid = avatarid;
            pp.avatarid = avatarid;
            return service.maintains_item(p);
        }).then((xx) => {
            return service.maintains_item(pp);
        }).then((px) => {
            p.url = self.fileDesc.remove_url();
            pp.url = p.url;
            self.fileDesc.clear();
            self.infoMessage = 'Avatar modifiÃ©.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveAvatar
    //
    public removeAvatar(): any {
        let p = this.currentPerson;
        let pp = this.currentItem;
        if ((p === null) || (pp === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null)) {
            return;
        }
        if ((pp.id === null) || (pp.rev === null)) {
            return;
        }
        let id = p.id;
        let avatarid = p.avatarid;
        if ((id === null) || (avatarid === null)) {
            return;
        }
        if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let service = this.dataService;
            this.clear_error();
            return service.remove_attachment(id, avatarid).then((r) => {
                if (p.url !== null) {
                    self.revokeUrl(p.url);
                    p.url = null;
                }
                p.avatarid = null;
                return service.maintains_item(p);
            }).then((xx) => {
                pp.avatarid = null;
                return service.maintains_item(pp);
            }).then((x) => {
                self.fileDesc.clear();
                self.infoMessage = 'Avatar supprimÃ©.';
            }).catch((err) => {
                self.set_error(err);
            });
        }
    }

    //
    protected create_person(): V {
        return null;
    }
    protected post_change_item(): Promise<any> {
        this.currentPerson = null;
        let self = this;
        let p = this.currentItem;
        let personid = (p !== null) ? p.personid : null;
        return super.post_change_item().then((r) => {
            if (personid !== null) {
                return self.dataService.find_item_by_id(personid);
            } else {
                return null;
            }
        }).then((pPers: V) => {
            self.currentPerson = pPers;
        });
    }// post_change_item
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected is_storeable(): boolean {
        return (this.currentPerson !== null) &&
            this.currentPerson.is_storeable() && (this.departementid !== null);
    }
    public get username(): string {
        return this.currentPerson.username;
    }
    public set username(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.username = s;
        }
    }
    public get firstname(): string {
        return this.currentPerson.firstname;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get lastname(): string {
        return this.currentPerson.lastname;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
    }
    public get email(): string {
        return this.currentPerson.email;
    }
    public set email(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.email = s;
        }
    }
    public get phone(): string {
        return this.currentPerson.phone;
    }
    public set phone(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.phone = s;
        }
    }
    public save(): any {
        let pPers = this.currentPerson;
        if ((this.departementid === null) || (pPers === null)) {
            return;
        }
        if (!pPers.is_storeable()) {
            return;
        }
        let item = this.currentItem;
        if (item === null) {
            item = this.create_item();
            if (item === null) {
                return;
            }
        }
        if (pPers.password === null) {
            pPers.reset_password();
        }
        item.update_person(pPers);
        var self = this;
        let bOld = (item.rev !== null);
        this.clear_error();
        let service = this.dataService;
        return service.maintains_item(pPers).then((px) => {
            return service.maintains_item(item);
        }).then((ox) => {
            if (bOld) {
                self.refresh();
            } else {
                self.refreshAll();
            }
        }).catch((err) => {
            self.set_error(err);
        });
    }// save
}// class PersonViewModel
