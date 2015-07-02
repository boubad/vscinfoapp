//etud-detail.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {BaseDetail} from './basedetail';
import {IEtudiantPerson,
IEtudEvent, IUIManager, IBaseItem} from 'infodata';
import {EtudiantPerson} from '../../data/domain/etudperson';
import {InfoRoot} from '../../utils/inforoot';
//
@autoinject
export class EtudDetail extends BaseDetail {
  //
  public currentPerson: IEtudiantPerson = null;
  public evts: IEtudEvent[] = [];
  public etudiantUrl: string = null;
  public birthDate: string = null;
  //
  constructor(userinfo: userinf.UserInfo) {
    super(userinfo);
    this.title = "Détails Etudiant";
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    let self = this;
    this.currentPerson = new EtudiantPerson();
    this.birthDate = null;
    this.evts = [];
    this.etudiantUrl = null;
    let service = this.dataService;
    let pPers: IEtudiantPerson = null;
    let xvts: IEtudEvent[] = [];
    let xBlob: Blob = null;
    return super.activate(params, config, instruction).then((r) => {
      let id = (params.id !== undefined) ? params.id : null;
      if (id !== null) {
        return service.find_item_by_id(id, true);
      } else {
        return Promise.resolve(pPers);
      }
    }).then((p: IEtudiantPerson) => {
      if (p !== null) {
        self.currentPerson = p;
        self.birthDate = InfoRoot.date_to_string(p.birthDate);
        return service.get_etudiant_events(p.id);
      } else {
        return Promise.resolve(xvts);
      }
    }).then((xx: IEtudEvent[]) => {
      self.evts = xx;
      let x = self.currentPerson;
      if ((x.id !== null) && (x.avatarid !== null)) {
        return service.find_attachment(x.id, x.avatarid);
      } else {
        return Promise.resolve(xBlob);
      }
    }).then((blob) => {
      if ((blob !== undefined) && (blob !== null)) {
        self.etudiantUrl = self.uiManager.createUrl(blob);
      }
    });
  }// activate
  public deactivate(): any {
    if (this.etudiantUrl !== null) {
      this.uiManager.revokeUrl(this.etudiantUrl);
      this.etudiantUrl = null;
    }
    return super.deactivate();
  }
  public get hasEtudiantUrl(): boolean {
    return (this.etudiantUrl !== null);
  }
  public set hasEtudiantUrl(s: boolean) { }
  public get fullname():string {
    return this.currentPerson.fullname;
  }
  public set fullname(s:string){}
  public get username(): string {
    return this.currentPerson.username;
  }
  public set username(s: string) {
  }
  public get firstname(): string {
    return this.currentPerson.firstname;
  }
  public set firstname(s: string) {
  }
  public get lastname(): string {
    return this.currentPerson.lastname;
  }
  public set lastname(s: string) {
  }
  public get email(): string {
    return this.currentPerson.email;
  }
  public set email(s: string) {
  }
  public get phone(): string {
    return this.currentPerson.phone;
  }
  public set phone(s: string) {
  }
  public get dossier(): string {
    return this.currentPerson.dossier;
  }
  public set dossier(s: string) {
  }
  public get sexe(): string {
    return this.currentPerson.sexe;
  }
  public set sexe(s: string) {
  }
  public get ville(): string {
    return this.currentPerson.ville;
  }
  public set ville(s: string) {
  }
  public get etablissement(): string {
    return this.currentPerson.etablissement;
  }
  public set etablissement(s: string) {
  }
  public get serieBac(): string {
    return this.currentPerson.serieBac;
  }
  public set serieBac(s: string) {
  }
  public get optionBac(): string {
    return this.currentPerson.optionBac;
  }
  public set optionBac(s: string) {
  }
  public get mentionBac(): string {
    return this.currentPerson.mentionBac;
  }
  public set mentionBac(s: string) {
  }
  public get etudesSuperieures(): string {
    return this.currentPerson.etudesSuperieures;
  }
  public set etudesSuperieures(s: string) {
  }
}// class EtudDetail
