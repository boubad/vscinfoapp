//work-bar.ts
//
import {UserInfo} from './userinfo';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject,bindable} from 'aurelia-framework';
//
import {InfoMessage} from '../common/infomessage';
import {RootElement} from './rootelement';
import {MESSAGE_LOGIN,MESSAGE_LOGOUT} from '../common/infoconstants';
import {IDepartement,IAnnee,ISemestre,IGroupe,IUnite,IMatiere} from 'infodata';
//
export class WorkBar  extends RootElement {
  //
  @bindable info: UserInfo = null;
  //
  constructor() {
    super();
  }
  public attached():any {
    this.perform_attach();
  }
  public detached():any {
    this.perform_detach();
  }
  protected get_event_aggregator():EventAggregator {
    return (this.info !== null) ? this.info.eventAggregator : null;
  }
  public get is_connected(): boolean {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.is_connected : false;
  }
  public set is_connected(s: boolean) { }
  public get is_notconnected(): boolean {
    return (!this.is_connected);
  }
  public set is_notconnected(s: boolean) { }
  public get departements(): IDepartement[] {
    return this.info.departements;
  }
  public get departement(): IDepartement {
    return this.info.departement;
  }
  public set departement(s: IDepartement) {
    this.info.departement = s;
  }
  //
  public get annees(): IAnnee[] {
    return this.info.annees;
  }
  public get annee(): IAnnee {
    return this.info.annee;
  }
  public set annee(s: IAnnee) {
    this.info.annee = s;
  }
  public get unites(): IUnite[] {
    return this.info.unites;
  }
  public get unite(): IUnite {
    return this.info.unite;
  }
  public set unite(s: IUnite) {
    this.info.unite = s;
  }
  //
  public get semestres(): ISemestre[] {
    return this.info.semestres;
  }
  public get semestre(): ISemestre {
    return this.info.semestre;
  }
  public set semestre(s: ISemestre) {
    this.info.semestre = s;
  }
  public get groupes(): IGroupe[] {
    return this.info.groupes;
  }
  public get groupe(): IGroupe {
    return this.info.groupe;
  }
  public set groupe(s: IGroupe) {
    this.info.groupe = s;
  }
  //
  public get matieres(): IMatiere[] {
    return this.info.matieres;
  }
  public get matiere(): IMatiere {
    return this.info.matiere;
  }
  public set matiere(s: IMatiere) {
    this.info.matiere = s;
  }
}// class ConnectBar
