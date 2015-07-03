// displayetudiant.ts
//
import {ElementDesc} from './elementdesc';
import {IDisplayEtudiant, IEtudEvent} from 'infodata';
import {InfoRoot} from './inforoot';
//
export class DisplayEtudiant extends ElementDesc implements IDisplayEtudiant {
    //
    public personid: string = null;
    public etudiantid: string = null;
    public uniteid: string = null;
    public matiereid: string = null;
    public groupeid: string = null;
    public firstname: string = null;
    public lastname: string = null;
    public coefficient: number = null;
    public note: number = null;
    //
    public absencesCount: number = 0;
    public retardsCount: number = 0;
    public miscCount: number = 0;
    //
    private _count: number = 0;
    private _sumcoefs: number = 0;
    private _sumdata: number = 0;
    //
    constructor() {
        super();
    }
    public fillEvent(p: IEtudEvent): void {
        if (this.personid == null) {
            this.personid = p.personid;
            this.etudiantid = p.etudiantid;
            this.uniteid = p.uniteid;
            this.matiereid = p.matiereid;
            this.groupeid = p.groupeid;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.coefficient = null;
            this.note = null;
            this.absencesCount = 0;
            this.retardsCount = 0;
            this.miscCount = 0;
            this._count = 0;
            this._sumdata = 0;
            this._sumcoefs = 0;
        }
    }// fillEvent
    public get notesCount(): number {
        return this._count;
    }
    public get has_url(): boolean {
        return ((this.url !== undefined) && (this.url !== null));
    }
    public get coefficientString(): string {
        return InfoRoot.number_to_string(this.coefficient);
    }
    public get noteString(): string {
        return InfoRoot.number_to_string(this.note);
    }
    public add_event(p: IEtudEvent): void {
        if ((p !== undefined) && (p !== null) && (p.genre !== undefined) && (p.genre !== null)) {
            if (p.genre == 'note') {
                this.add_note(p.note, p.coefficient);
            } else {
                this.add_event_misc(p.genre);
            }
        }
    }
    private add_event_misc(sGenre: string): void {

    }// sGenre
    private add_note(val: number, coef?: number): void {
        if ((val !== undefined) && (val !== null) && (val >= 0)) {
            let c: number = ((coef !== undefined) && (coef !== null) && (coef > 0)) ? coef : 1.0;
            this._count = this._count + 1;
            this._sumdata = this._sumdata + (val * c);
            this._sumcoefs = this._sumcoefs + c;
            this.note = this._sumdata / this._sumcoefs;
        }// val
    }//add_note
}// class DisplayEtudiant
//
export class DisplayEtudiantsArray {
    private _data: Map<string, DisplayEtudiant> = new Map<string, DisplayEtudiant>();
    //
    public constructor() {
    }
    public add_event(p: IEtudEvent): void {
        if ((p !== undefined) && (p !== null) && (p.personid !== null)) {
            let id: string = p.personid;
            if (this._data.has(id)) {
                let v: DisplayEtudiant = this._data.get(id);
                v.add_event(p);
            } else {
                let v: DisplayEtudiant = new DisplayEtudiant();
                v.fillEvent(p);
                v.add_event(p);
                this._data.set(id, v);
            }
        }
    }// add_event
}//
