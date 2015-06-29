//person.ts
//
import {BaseItem} from './baseitem';
import {MyCrypto} from '../../utils/mycrypto';
import {IPerson} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
import {PERSON_KEY, PERSON_PREFIX} from '../../utils/infoconstants';
//
//
var cc = new MyCrypto();
//
export class Person extends BaseItem implements IPerson {
    //
    private _username: string = null;
    private _firstname: string = null;
    private _lastname: string = null;
    //
    public email: string = null;
    public phone: string = null;
    public password: string = null;
    //
    public roles: string[] = [];
    public departementids: string[] = [];
    public anneeids: string[] = [];
    public semestreids: string[] = [];
    public matiereids: string[] = [];
    public uniteids: string[] = [];
    public groupeids: string[] = [];
    public affectationids: string[] = [];
    public eventids: string[] = [];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.username !== undefined) {
                this.username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this.password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this.email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this.phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this.departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this.roles = oMap.roles;
            } //
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    //
    public get username():string {
        return this._username;
    }
    public set username(s:string){
        this._username = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
    }
     public get lastname():string {
        return this._lastname;
    }
    public set lastname(s:string){
        this._lastname = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
     public get firstname():string {
        return this._firstname;
    }
    public set firstname(s:string){
        let ss = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
        if (ss !== null){
            if (ss.length > 0) {
                this._firstname = ss.substr(0,1).toUpperCase() + ss.substr(1).toLocaleLowerCase();
            } else {
                this._firstname = ss.toUpperCase();
            }
        } else {
            this._firstname = null;
        }
    }
    //
    public base_prefix(): string {
        return PERSON_PREFIX;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.username !== null)) {
            s = s + '-' + this.username.trim().toLowerCase();
        }
        return s;
    }// create_id
    //
    public reset_password(): void {
        if (this.username !== null) {
            this.password = cc.md5(this.username);
        } else {
            this.password = null;
        }
    }
    public change_password(ct: string): void {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = cc.md5(ct);
            }
            this.password = v;
        }
    }
    public check_password(ct: string): boolean {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = cc.md5(ct);
        return (this.password == v);
    } // check_password
    //
    public type(): string {
        return PERSON_KEY;
    }
    //
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
        (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.username !== null) {
            oMap.username = this.username;
        }
        if ((this.password !== undefined) && (this.password !== null)) {
            oMap.password = this.password;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.email !== null) {
            oMap.email = this.email;
        }
        if (this.phone !== null) {
            oMap.phone = this.phone;
        }
        if ((this.roles !== undefined) && (this.roles !== null) &&
            (this.roles.length > 0)) {
            oMap.roles = this.roles;
        }
        if ((this.departementids !== undefined) && (this.departementids !== null)
            && (this.departementids.length > 0)) {
            oMap.departementids = this.departementids;
        }
        if ((this.uniteids !== undefined) && (this.uniteids !== null) &&
            (this.uniteids.length > 0)) {
            oMap.uniteids = this.uniteids;
        }
        if ((this.matiereids !== undefined) && (this.matiereids !== null) &&
            (this.matiereids.length > 0)) {
            oMap.matiereids = this.matiereids;
        }
        if ((this.anneeids !== undefined) && (this.anneeids !== null) &&
            (this.anneeids.length > 0)) {
            oMap.anneeids = this.anneeids;
        }
        if ((this.semestreids !== undefined) && (this.semestreids !== null) &&
            (this.semestreids.length > 0)) {
            oMap.semestreids = this.semestreids;
        }
        if ((this.groupeids !== undefined) && (this.groupeids !== null) &&
            (this.groupeids.length > 0)) {
            oMap.groupeids = this.groupeids;
        }


    } // to_insert_map
    public toString(): string {
        return this.fullname;
    }
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.username !== null) && (this.firstname !== null) &&
            (this.lastname !== null) && (this.roles !== undefined) &&
            (this.roles !== null) && (this.roles.length > 0);
    }
    public has_role(r: string): boolean {
        if ((this.roles === undefined) || (this.roles === null)){
            return false;
        }
        let bRet = false;
        if ((r !== undefined) && (r !== null) && (this.roles.length > 0)) {
            let ss = r.trim().toLowerCase();
            for (let r of this.roles) {
                let x = r.trim().toLowerCase();
                if (ss == x) {
                    bRet = true;
                    break;
                }
            }
        }
        return bRet;
    } // hasrole_
    public get is_admin(): boolean {
        return (this.has_role('super') || this.has_role('admin'));
    }
    public get is_super(): boolean {
        return this.has_role('super');
    }
    public get is_prof(): boolean {
        return this.has_role('prof');
    }
    public get is_etud(): boolean {
        return this.has_role('etud');
    }
    public sort_func(p1: IPerson, p2: IPerson): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
} // class Person
