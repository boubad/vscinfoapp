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
    protected _minDate: Date;
    protected _maxDate: Date;
    //
    public minDateString: string = null;
    public maxDateString: string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get semestreMinDate(): Date {
        return (this._minDate !== undefined) ? this._minDate : null;
    }
    public get semestreMaxDate(): Date {
        return (this._maxDate !== undefined) ? this._maxDate : null;
    }
    //
    public get departements(): IDepartement[] {
        return (this.userInfo !== null) ? this.userInfo.departements : [];
    }
    public get departement(): IDepartement {
        return (this.userInfo !== null) ? this.userInfo.departement : null;
    }
    public set departement(s: IDepartement) {
        if (this.userInfo !== null) {
            this.userInfo.departement = s;
        }
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    public get hasDepartements():boolean {
      return (this.departements.length > 0);
    }
    //
    public get annees(): IAnnee[] {
        return (this.userInfo !== null) ? this.userInfo.annees : [];
    }
    public get annee(): IAnnee {
        return (this.userInfo !== null) ? this.userInfo.annee : null;
    }
    public set annee(s: IAnnee) {
        if (this.userInfo !== null) {
            this.userInfo.annee = s;
        }
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    public get hasAnnees():boolean {
      return (this.annees.length > 0);
    }
    //
    public get unites(): IUnite[] {
        return (this.userInfo !== null) ? this.userInfo.unites : [];
    }
    public get unite(): IUnite {
        return (this.userInfo !== null) ? this.userInfo.unite : null;
    }
    public set unite(s: IUnite) {
        if (this.userInfo !== null) {
            this.userInfo.unite = s;
        }
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    public get hasUnites():boolean {
      return (this.unites.length > 0);
    }
    //
    public get semestres(): ISemestre[] {
        return (this.userInfo !== null) ? this.userInfo.semestres : [];
    }
    public get semestre(): ISemestre {
        return (this.userInfo !== null) ? this.userInfo.semestre : null;
    }
    public set semestre(s: ISemestre) {
        if (this.userInfo !== null) {
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
        }
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
    public get hasSemestres():boolean {
      return (this.departements.length > 0);
    }
    //
    public get groupes(): IGroupe[] {
        return (this.userInfo !== null) ? this.userInfo.groupes : [];
    }
    public get groupe(): IGroupe {
        return (this.userInfo !== null) ? this.userInfo.groupe : null;
    }
    public set groupe(s: IGroupe) {
			if (this.userInfo !== null){
				this.userInfo.groupe = s;
			}
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    public get hasGroupes():boolean {
      return (this.groupes.length > 0);
    }
    //
    public get matieres(): IMatiere[] {
        return (this.userInfo !== null) ? this.userInfo.matieres : [];
    }
    public get matiere(): IMatiere {
        return (this.userInfo !== null) ? this.userInfo.matiere : null;
    }
    public set matiere(s: IMatiere) {
				if (this.userInfo !== null){
					this.userInfo.matiere = s;
				}
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
    }
    public get hasMatieres():boolean {
      return (this.matieres.length > 0);
    }
    //
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
