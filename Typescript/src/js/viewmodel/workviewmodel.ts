//workviewmodel.ts
//
import * as userinf from './userinfo';
import {BaseView} from './baseview';
import {IDepartement, IAnnee, IUnite, ISemestre,
IMatiere, IGroupe, IUIManager, IPerson} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
//
export class WorkViewModel extends BaseView {
	//
	protected _minDate: Date = null;
	protected _maxDate: Date = null;
	//
	public minDateString: string = null;
	public maxDateString: string = null;
	//
	constructor(userinfo: userinf.UserInfo) {
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
		return this.userInfo.departement;
	}
	public set departement(s: IDepartement) {
		this.userInfo.departement = s;
		this.post_change_departement();
	}
	public get departementid(): string {
		return this.userInfo.departementid;
	}
	//
	public get annees(): IAnnee[] {
		return this.userInfo.annees;
	}
	public get annee(): IAnnee {
		return this.userInfo.annee;
	}
	public set annee(s: IAnnee) {
		this.userInfo.annee = s;
		this.post_change_annee();
	}
	public get anneeid(): string {
		return this.userInfo.anneeid;
	}
	//
	public get unites(): IUnite[] {
		return this.userInfo.unites;
	}
	public get unite(): IUnite {
		return this.userInfo.unite;
	}
	public set unite(s: IUnite) {
		this.userInfo.unite = s;
		this.post_change_unite();
	}
	public get uniteid(): string {
		return this.userInfo.uniteid;
	}
	//
	public get semestres(): ISemestre[] {
		return this.userInfo.semestres;
	}
	public get semestre(): ISemestre {
		return this.userInfo.semestre;
	}
	public set semestre(s: ISemestre) {
		this.userInfo.semestre = s;
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
		this.post_change_semestre();
	}
	public get semestreid(): string {
		return this.userInfo.semestreid;
	}
	//
	public get groupes(): IGroupe[] {
		return this.userInfo.groupes;
	}
	public get groupe(): IGroupe {
		return this.userInfo.groupe;
	}
	public set groupe(s: IGroupe) {
		this.userInfo.groupe = s;
		this.post_change_groupe();
	}
	public get groupeid(): string {
		return this.userInfo.groupeid;
	}
	//
	public get matieres(): IMatiere[] {
		return this.userInfo.matieres;
	}
	public get matiere(): IMatiere {
		return this.userInfo.matiere;
	}
	public set matiere(s: IMatiere) {
		this.userInfo.matiere = s;
		this.post_change_matiere();
	}
	public get matiereid(): string {
		return this.userInfo.matiereid;
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
      return this.isConnected;
    }// activate
	public activate(params?: any, config?: any, instruction?: any): any {
		let self = this;
		return super.activate(params, config, instruction).then((r) => {
			let userinfo = self.userInfo;
			if ((userinfo.departementid === null) && (userinfo.departements.length > 0)) {
				let x = userinfo.departements[0];
				userinfo.departementid = x.id;
				self.departement = x;
			}
			return true;
		});
	}// activate
}// class BaseEditViewModel
