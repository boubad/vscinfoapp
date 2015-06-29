//logininfo.ts
//
import {InfoElement} from '../../utils/infoelement';
import {ILoginInfo, IPerson, IDepartement, IAnnee, ISemestre,
IUnite, IMatiere, IProfAffectation, IEtudAffectation,
IGroupe, IGroupeEvent, IEtudEvent, IAdministrator,
IEnseignant, IEtudiant, IDataService} from 'infodata';
import {InfoRoot}  from '../../utils/inforoot';
//
//
export class LoginInfo extends InfoElement implements ILoginInfo {
	//
	private _person: IPerson = null;
    private _departements: IDepartement[] = null;
    private _annees: IAnnee[] = null;
    private _semestres: ISemestre[] = null;
    private _unites: IUnite[] = null;
    private _matieres: IMatiere[] = null;
    private _groupes: IGroupe[] = null;
    private _administrator: IAdministrator = null;
    private _enseignant: IEnseignant = null;
    private _etudiant: IEtudiant = null;
	//
	constructor() {
		super();
	}
	//
	public clear(): void {
		this._person = null;
		this._departements = null;
		this._annees = null;
		this._semestres = null;
		this._unites = null;
		this._matieres = null;
		this._groupes = null;
		this._administrator = null;
		this._enseignant = null;
		this._etudiant = null;
	}// clear
    public login(username: string, service: IDataService): Promise<ILoginInfo> {
    	if ((username === undefined) || (username === null) ||
    		(service === undefined) || (service === null)){
			Promise.reject(new Error('Invalid parameters.'));
    	}
		let self = this;
		return service.get_login_info(username).then((p:ILoginInfo) => {
			self.clear();
			self.person = p.person;
			self.departements = p.departements;
			self.annees = p.annees;
			self.semestres = p.semestres;
			self.unites = p.unites;
			self.matieres = p.matieres;
			self.groupes = p.groupes;
			self.administrator = p.administrator;
			self.enseignant = p.enseignant;
			self.etudiant = p.etudiant;
			return self;
			});
	}// login
	//
	public get person(): IPerson {
		return (this._person !== undefined) ? this._person : null;
	}
	public set person(p: IPerson) {
		this._person = p;
	}
	//
	public get administrator(): IAdministrator {
		return (this._administrator !== undefined) ? this._administrator : null;
	}
	public set administrator(s: IAdministrator) {
		this._administrator = (s !== undefined) ? s : null;
	}
	public get enseignant(): IEnseignant {
		return (this._enseignant !== undefined) ? this._enseignant : null;
	}
	public set enseignant(s: IEnseignant) {
		this._enseignant = (s !== undefined) ? s : null;
	}
	public get etudiant(): IEtudiant {
		return (this._etudiant !== undefined) ? this._etudiant : null;
	}
	public set etudiant(s: IEtudiant) {
		this._etudiant = (s !== undefined) ? s : null;
	}
	//
	public get departements(): IDepartement[] {
		return ((this._departements !== undefined) && (this._departements !== null)) ?
			this._departements : [];
	}
	public set departements(s: IDepartement[]) {
		this._departements = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get annees(): IAnnee[] {
		return ((this._annees !== undefined) && (this._annees !== null)) ?
			this._annees : [];
	}
	public set annees(s: IAnnee[]) {
		this._annees = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get semestres(): ISemestre[] {
		return ((this._semestres !== undefined) && (this._semestres !== null)) ?
			this._semestres : [];
	}
	public set semestres(s: ISemestre[]) {
		this._semestres = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ?
			this._groupes : [];
	}
	public set groupes(s: IGroupe[]) {
		this._groupes = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get unites(): IUnite[] {
		return ((this._unites !== undefined) && (this._unites !== null)) ?
			this._unites : [];
	}
	public set unites(s: IUnite[]) {
		this._unites = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get matieres(): IMatiere[] {
		return ((this._matieres !== undefined) && (this._matieres !== null)) ?
			this._matieres : [];
	}
	public set matieres(s: IMatiere[]) {
		this._matieres = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
	}
	//
	public get is_super(): boolean {
		return (this.person !== null) ? this.person.is_super : false;
	}
	public get is_admin(): boolean {
		return (this.person !== null) ? this.person.is_admin : false;
	}
	public get is_prof(): boolean {
		return (this.person !== null) ? this.person.is_prof : false;
	}
	public get is_etud(): boolean {
		return (this.person !== null) ? this.person.is_etud : false;
	}
}// class LoginInfo
