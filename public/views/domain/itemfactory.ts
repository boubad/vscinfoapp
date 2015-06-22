//itemfactory.ts
//
import {InfoElement} from '../infoelement';
import {BaseItem} from './baseitem';
import {Person} from './person';
import {Departement} from './departement';
import {Groupe} from './groupe';
import {Unite} from './unite';
import {Annee} from './annee';
import {Semestre} from './semestre';
import {Matiere} from './matiere';
import {EtudiantPerson} from './etudperson';
import {AdministratorPerson} from './adminperson';
import {EnseignantPerson} from './profperson';
import {Etudiant} from './etudiant';
import {Enseignant} from './enseignant';
import {ProfAffectation} from './profaffectation';
import {EtudAffectation} from './etudaffectation';
import {GroupeEvent} from './groupeevent';
import {EtudEvent} from './etudevent';
import {Administrator} from './administrator';
import {PERSON_KEY, ETUDIANTPERSON_KEY, DEPARTEMENT_TYPE, GROUPE_TYPE,
UNITE_TYPE, ANNEE_TYPE, SEMESTRE_TYPE, MATIERE_TYPE, ETUDIANT_TYPE, ENSEIGNANT_TYPE,
PROFAFFECTATION_TYPE, ETUDAFFECTATION_TYPE, GROUPEEVENT_TYPE,
ETUDEVENT_TYPE, ADMINISTRATOR_TYPE, ADMINISTRATORPERSON_KEY,
ENSEIGNANTPERSON_KEY} from '../common/infoconstants';
import {IBaseItem, IItemFactory} from 'infodata';
//
export class ItemFactory extends InfoElement implements IItemFactory {
  constructor() {
    super();
  }
  public create(oMap: any): IBaseItem {
    if ((oMap === undefined) || (oMap === null)) {
      return null;
    }
    if ((oMap.type === undefined) || (oMap.type === null)) {
      return null;
    }
    let t = oMap.type.trim().toLowerCase();
    if (t == PERSON_KEY) {
      return new Person(oMap);
    } else if (t == DEPARTEMENT_TYPE) {
      return new Departement(oMap);
    } else if (t == ANNEE_TYPE) {
      return new Annee(oMap);
    } else if (t == UNITE_TYPE) {
      return new Unite(oMap);
    } else if (t == GROUPE_TYPE) {
      return new Groupe(oMap);
    } else if (t == SEMESTRE_TYPE) {
      return new Semestre(oMap);
    } else if (t == MATIERE_TYPE) {
      return new Matiere(oMap);
    } else if (t == ETUDIANTPERSON_KEY) {
      return new EtudiantPerson(oMap);
    } else if (t == ETUDIANT_TYPE) {
      return new Etudiant(oMap);
    } else if (t == ENSEIGNANT_TYPE) {
      return new Enseignant(oMap);
    } else if (t == PROFAFFECTATION_TYPE) {
      return new ProfAffectation(oMap);
    } else if (t == ETUDAFFECTATION_TYPE) {
      return new EtudAffectation(oMap);
    } else if (t == GROUPEEVENT_TYPE) {
      return new GroupeEvent(oMap);
    } else if (t == ETUDEVENT_TYPE) {
      return new EtudEvent(oMap);
    } else if (t == ADMINISTRATOR_TYPE) {
      return new Administrator(oMap);
    } else if (t == ADMINISTRATORPERSON_KEY) {
      return new AdministratorPerson(oMap);
    } else if (t == ENSEIGNANTPERSON_KEY) {
      return new EnseignantPerson(oMap);
    }
    return null;
  }// create

}// class ItemGenerator
