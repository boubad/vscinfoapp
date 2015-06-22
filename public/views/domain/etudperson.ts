// etudperson.ts
//
import {UserPerson} from './userperson';
import {IEtudiantPerson} from 'infodata';
import {InfoRoot} from '../common/inforoot';
import {ETUDIANTPERSON_KEY, ROLE_ETUD} from '../common/infoconstants';
//
export class EtudiantPerson extends UserPerson implements IEtudiantPerson {
  public etudiantids: string[] = [];
  public dossier: string = null;
  public sexe: string = null;
  private _date: Date = null;
  public ville: string = null;
  public etablissement: string = null;
  public serieBac: string = null;
  public optionBac: string = null;
  public mentionBac: string = null;
  public etudesSuperieures: string = null;
  //
  constructor(oMap?: any) {
    super(oMap);
    this.roles = [ROLE_ETUD];
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.etudiantids !== undefined) {
        this.etudiantids = oMap.etudiantids;
      }
      if (oMap.dossier !== undefined) {
        this.dossier = oMap.dossier;
      }
      if (oMap.sexe !== undefined) {
        this.sexe = oMap.sexe;
      }
      if (oMap.birthDate !== undefined) {
        this.birthDate = oMap.birthDate;
      }
      if (oMap.etablissement !== undefined) {
        this.etablissement = oMap.etablissement;
      }
      if (oMap.ville !== undefined) {
        this.ville = oMap.ville;
      }
      if (oMap.serieBac !== undefined) {
        this.serieBac = oMap.serieBac;
      }
      if (oMap.optionBac !== undefined) {
        this.optionBac = oMap.optionBac;
      }
      if (oMap.mentionBac != undefined) {
        this.mentionBac = oMap.mentionBac;
      }
      if (oMap.etudesSuperieures !== undefined) {
        this.etudesSuperieures = oMap.etudesSuperieures;
      }
    } // oMap
  } // constructor
  public type(): string {
    return ETUDIANTPERSON_KEY;
  }
  //
  public get birthDate(): Date {
    return this._date;
  }
  public set birthDate(s: Date) {
    this._date = InfoRoot.check_date(s);
  }
  //
  public get isMale(): boolean {
    return (this.sexe !== null) && (this.sexe.indexOf('M') == 0);
  }
  public set isMale(b: boolean) {
    if ((b !== undefined) && (b !== null)) {
      this.sexe = (b) ? 'M' : 'F';
    }
  }
  public get isFeminin(): boolean {
    return (this.sexe !== null) && (this.sexe.indexOf('F') == 0);
  }
  public set isFeminin(b: boolean) {
    if ((b !== undefined) && (b !== null)) {
      this.sexe = (b) ? 'F' : 'M';
    }
  }
  //
  public to_map(oMap: any): void {
    super.to_map(oMap);
    if ((this.etudiantids !== undefined) && (this.etudiantids !== null) &&
      (this.etudiantids.length > 0)) {
      oMap.etudiantids = this.etudiantids;
    }
    if (this.dossier !== null) {
      oMap.dossier = this.dossier;
    }
    if (oMap.sexe !== null) {
      oMap.sexe = this.sexe;
    }
    if (oMap.birthDate !== null) {
      oMap.birthDate = this.birthDate;
    }
    if (oMap.ville !== null) {
      oMap.ville = this.ville;
    }
    if (oMap.etablissement !== null) {
      oMap.etablissement = this.etablissement;
    }
    if (this.serieBac !== null) {
      oMap.serieBac = this.serieBac;
    }
    if (this.optionBac !== null) {
      oMap.optionBac = this.optionBac;
    }
    if (this.mentionBac !== null) {
      oMap.mentionBac = this.mentionBac;
    }
    if (this.etudesSuperieures !== null) {
      oMap.etudesSuperieures = this.etudesSuperieures;
    }
  } // to_insert_map
} // class EtudiantPerson
