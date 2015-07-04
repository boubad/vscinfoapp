//inforoot.ts
//
import {InfoElement} from './infoelement';
import {IElementDesc} from 'infodata';
//
export class InfoRoot extends InfoElement {
    //
    constructor() {
        super();
    }
    //
    public static format_note(s: number): number {
        return (Math.floor(s * 100.0 + 0.5)) / 100.0;
    }
    //
    public static create_username(slast: string, sfirst: string): string {
        let sRet: string = null;
        if ((slast !== undefined) && (slast !== null)) {
            let us = slast.trim().toLowerCase();
            if (us.length > 5) {
                sRet = us.substr(0, 5).trim();
            } else {
                sRet = us;
            }
        }
        if ((sfirst !== undefined) && (sfirst !== null)) {
            let us = sfirst.trim().toLowerCase();
            if (us.length > 3) {
                sRet = sRet + us.substr(0, 3).trim();
            } else {
                sRet = sRet + us;
            }
        }
        if ((sRet !== null) && (sRet.length < 1)) {
            sRet = null;
        }
        return sRet;
    }// create_username
    //
    public static create_random_id(): string {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        return sn;
    } // create_random_id
    public static create_date_random_id(seed?: Date): string {
        let sn = InfoRoot.create_random_id();
        let d = ((seed !== undefined) && (seed !== null)) ? seed : new Date();
        let s = d.toISOString() + '-' + sn;
        return s;
    } // create_date_random_id
    public static check_value<T>(v: T): T {
        return (v !== undefined) ? v : null;
    }
    public static check_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    public static check_upper_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public static check_lower_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toLowerCase() : null;
    }
    public static check_array<T>(cont: T[]): T[] {
        return ((cont !== undefined) && (cont !== null)) ? cont : [];
    }
    public static sync_array<T extends IElementDesc>(cont: T[], id: string): T {
        let pSel: T = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_departements
    public static add_id_to_array(cont: string[], id: string): void {
        if ((cont === undefined) || (cont === null) ||
            (id === undefined) || (id === null)) {
            return;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(id);
        }
    }// add_id_to_array
    public static string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    public static date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            } catch (e) { }
        }
        return sRet;
    }
    public static number_to_string(n: number): string {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    public static string_to_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            } catch (e) { }
        }// s
        return dRet;
    }
    public static check_date(d: Date): Date {
        return InfoRoot.string_to_date(d);
    } // check_date
    public static check_number(s: any): number {
        return InfoRoot.string_to_number(s);
    }
}// class InfoRoot
