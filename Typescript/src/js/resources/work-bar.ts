//work-bar.ts
//
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {bindable} from 'aurelia-framework';
//
import * as userinf from '../viewmodel/userinfo';
import {BaseBar} from './base-bar';
import {IDepartement, IAnnee, ISemestre, IGroupe, IUnite, IMatiere} from 'infodata';
//
export class WorkBar extends BaseBar {
  //
  @bindable info: userinf.UserInfo = null;
  //
  constructor() {
    super();
  }
  public attached(): any {
      this.perform_attach();
  }
  public detached(): any {
      this.perform_detach();
  }
  protected get_logger_name(): string {
    return 'WorkBar';
  }
  protected get userInfo(): userinf.UserInfo {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info : null;
  }
  public get is_connected(): boolean {
    return (this.userInfo !== null) ? this.userInfo.is_connected : false;
  }
  public get is_notconnected(): boolean {
    return (!this.is_connected);
  }
  public get departements(): IDepartement[] {
    return (this.userInfo !== null) ? this.userInfo.departements : [];
  }
  public get hasDepartements(): boolean {
    return (this.departements !== undefined) &&
      (this.departements !== null) && (this.departements.length > 0);
  }
  public get departement(): IDepartement {
    return (this.userInfo !== null) ? this.userInfo.departement : null;
  }
  public set departement(s: IDepartement) {
    if (this.userInfo !== null) {
      this.userInfo.departement = s;
    }
  }
  //
  public get annees(): IAnnee[] {
    return (this.userInfo !== null) ? this.userInfo.annees : [];
  }
  public get hasAnnees(): boolean {
    return (this.annees !== undefined) &&
      (this.annees !== null) && (this.annees.length > 0);
  }
  public get annee(): IAnnee {
    return (this.userInfo !== null) ? this.userInfo.annee : null;
  }
  public set annee(s: IAnnee) {
    if (this.userInfo !== null) {
      this.userInfo.annee = s;
    }
  }
  //
  public get unites(): IUnite[] {
    return (this.userInfo !== null) ? this.userInfo.unites : [];
  }
  public get hasUnites(): boolean {
    return (this.unites !== undefined) &&
      (this.unites !== null) && (this.unites.length > 0);
  }
  public get unite(): IUnite {
    return this.info.unite;
  }
  public set unite(s: IUnite) {
    this.info.unite = s;
  }
  //
  public get semestres(): ISemestre[] {
    return (this.userInfo !== null) ? this.userInfo.semestres : [];
  }
  public get hasSemestres(): boolean {
    return (this.semestres !== undefined) && (this.semestres !== null) &&
      (this.semestres.length > 0);
  }
  public get semestre(): ISemestre {
    return (this.userInfo !== null) ? this.userInfo.semestre : null;
  }
  public set semestre(s: ISemestre) {
    if (this.userInfo !== null) {
      this.userInfo.semestre = s;
    }
  }
  //
  public get groupes(): IGroupe[] {
    return (this.userInfo !== null) ? this.userInfo.groupes : [];
  }
  public get hasGroupes(): boolean {
    return (this.groupes !== undefined) && (this.groupes !== null) &&
      (this.groupes.length > 0);
  }
  public get groupe(): IGroupe {
    return (this.userInfo !== null) ? this.userInfo.groupe : null;
  }
  public set groupe(s: IGroupe) {
    if (this.userInfo !== null) {
      this.userInfo.groupe = s;
    }
  }
  //
  public get matieres(): IMatiere[] {
    return (this.userInfo !== null) ? this.userInfo.matieres : [];
  }
  public get hasMatieres(): boolean {
    return (this.matieres !== undefined) && (this.matieres !== null) &&
      (this.matieres.length > 0);
  }
  public get matiere(): IMatiere {
    return (this.userInfo !== null) ? this.userInfo.matiere : null;
  }
  public set matiere(s: IMatiere) {
    if (this.userInfo !== null) {
      this.userInfo.matiere = s;
    }
  }
}// class ConnectBar
