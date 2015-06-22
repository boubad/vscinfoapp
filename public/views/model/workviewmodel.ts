//workviewmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseBean} from './basebean';
import {IDepartement, IAnnee, IUnite, ISemestre,
IMatiere, IGroupe, IUIManager, IPerson} from 'infodata';
import {InfoRoot} from '../common/inforoot';
//
export class WorkViewModel extends BaseBean {
  //
  private _departement: IDepartement = null;
  private _annee: IAnnee = null;
  private _unite: IUnite = null;
  private _semestre: ISemestre = null;
  private _matiere: IMatiere = null;
  private _groupe: IGroupe = null;
  protected _minDate: Date = null;
  protected _maxDate: Date = null;
  //
  public minDateString: string = null;
  public maxDateString: string = null;
  //
  constructor(userinfo: UserInfo) {
    super(userinfo);
  }// constructor
  //
  public get semestreMinDate(): Date {
    return this._minDate;
  }
  public get semestreMaxDate(): Date {
    return this._maxDate;
  }
  //
  public canActivate(params?: any, config?: any, instruction?: any): any {
    return this.isConnected;
  }// activate
  public post_change_departement(): Promise<any> {
    return Promise.resolve(true);
  }
  public post_change_unite(): Promise<any> {
    return Promise.resolve(true);
  }
  public post_change_annee(): Promise<any> {
    return Promise.resolve(true);
  }
  public post_change_groupe(): Promise<any> {
    return Promise.resolve(true);
  }
  public post_change_semestre(): Promise<any> {
    return Promise.resolve(true);
  }
  public post_change_matiere(): Promise<any> {
    return Promise.resolve(true);
  }
  //
  public get departements(): IDepartement[] {
    return this.userInfo.departements;
  }
  public get departement(): IDepartement {
    return this._departement;
  }
  public set departement(s: IDepartement) {
    this._departement = (s !== undefined) ? s : null;
    let id = (this.departement !== null) ? this.departement.id : null;
    this._unite = null;
    this._annee = null;
    this._groupe = null;
    if (this.userInfo.departementid != id) {
      this.userInfo.departementid = id;
      this.post_change_departement();
    }
  }
  public get departementid(): string {
    return this.userInfo.departementid;
  }
  //
  public get annees(): IAnnee[] {
    return this.userInfo.annees;
  }
  public get annee(): IAnnee {
    return this._annee;
  }
  public set annee(s: IAnnee) {
    this._annee = (s !== undefined) ? s : null;
    let id = (this.annee !== null) ? this.annee.id : null;
    this._semestre = null;
    if (this.userInfo.anneeid != id) {
      this.userInfo.anneeid = id;
      this.post_change_annee();
    }
  }
  public get anneeid(): string {
    return this.userInfo.anneeid;
  }
  //
  public get unites(): IUnite[] {
    return this.userInfo.unites;
  }
  public get unite(): IUnite {
    return this._unite;
  }
  public set unite(s: IUnite) {
    this._unite = (s !== undefined) ? s : null;
    let id = (this.unite !== null) ? this.unite.id : null;
    this._matiere = null;
    if (this.userInfo.uniteid != id) {
      this.userInfo.uniteid = id;
      this.post_change_unite();
    }
  }
  public get uniteid(): string {
    return this.userInfo.uniteid;
  }
  //
  public get semestres(): ISemestre[] {
    return this.userInfo.semestres;
  }
  public get semestre(): ISemestre {
    return this._semestre;
  }
  public set semestre(s: ISemestre) {
    this._semestre = (s !== undefined) ? s : null;
    let id = (this.semestre !== null) ? this.semestre.id : null;
    this._minDate = null;
    this._maxDate = null;
    this.minDateString = null;
    this.maxDateString = null;
    let sem = this.semestre;
    if (sem !== null) {
      this._minDate = sem.startDate;
      this._maxDate = sem.endDate;
      if (this._minDate !== null) {
        this.minDateString = InfoRoot.date_to_string(this._minDate);
      }
      if (this._maxDate !== null) {
        this.maxDateString = InfoRoot.date_to_string(this._maxDate);
      }
    }
    if (this.userInfo.semestreid != id) {
      this.userInfo.semestreid = id;
      this.post_change_semestre();
    }
  }
  public get semestreid(): string {
    return this.userInfo.semestreid;
  }
  //
  public get groupes(): IGroupe[] {
    return this.userInfo.groupes;
  }
  public get groupe(): IGroupe {
    return this._groupe;
  }
  public set groupe(s: IGroupe) {
    this._groupe = (s !== undefined) ? s : null;
    let id = (this.groupe !== null) ? this.groupe.id : null;
    if (this.userInfo.groupeid != id) {
      this.userInfo.groupeid = id;
      this.post_change_groupe();
    }
  }
  public get groupeid(): string {
    return this.userInfo.groupeid;
  }
  //
  public get matieres(): IMatiere[] {
    return this.userInfo.matieres;
  }
  public get matiere(): IMatiere {
    return this._matiere;
  }
  public set matiere(s: IMatiere) {
    this._matiere = (s !== undefined) ? s : null;
    let id = (this.matiere !== null) ? this.matiere.id : null;
    if (this.userInfo.matiereid !== id) {
      this.userInfo.matiereid = id;
      this.post_change_matiere();
    }
  }
  public get matiereid(): string {
    return this.userInfo.matiereid;
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    let self = this;
    let userinfo = this.userInfo;
    return super.activate(params, config, instruction).then((r) => {
      if ((userinfo.departementid === null) && (userinfo.departements.length > 0)) {
        let x = userinfo.departements[0];
        userinfo.departementid = x.id;
        self.departement = x;
      } else {
        self.departement = InfoRoot.sync_array(userinfo.departements, userinfo.departementid);
        self.groupe = InfoRoot.sync_array(userinfo.groupes, userinfo.groupeid);
        self.annee = InfoRoot.sync_array(userinfo.annees, userinfo.anneeid);
        self.unite = InfoRoot.sync_array(userinfo.unites, userinfo.uniteid);
        self.semestre = InfoRoot.sync_array(userinfo.semestres, userinfo.semestreid);
        self.matiere = InfoRoot.sync_array(userinfo.matieres, userinfo.matiereid);
      }
      return true;
    });
  }// activate
}// class BaseEditViewModel
