//etudiant-bar
//
import {PersonBar} from './person-bar';
//
export class EtudiantBar extends PersonBar {
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'EtudiantBar';
	}
	public get sexe(): string {
		return (this.parent !== null) ? this.parent.sexe : null;
	}
	public set sexe(s: string) {
		if (this.parent) {
			this.parent.sexe = s;
		}
	}
	public get birthDate(): string {
		return (this.parent !== null) ? this.parent.birthDate : null;
	}
	public set birthDate(s: string) {
		if (this.parent) {
			this.parent.birthDate = s;
		}
	}
	public get dossier(): string {
		return (this.parent !== null) ? this.parent.dossier : null;
	}
	public set dossier(s: string) {
		if (this.parent) {
			this.parent.dossier = s;
		}
	}
	public get etablissement(): string {
		return (this.parent !== null) ? this.parent.etablissement : null;
	}
	public set etablissement(s: string) {
		if (this.parent) {
			this.parent.etablissement = s;
		}
	}
	public get ville(): string {
		return (this.parent !== null) ? this.parent.ville : null;
	}
	public set ville(s: string) {
		if (this.parent) {
			this.parent.ville = s;
		}
	}
	public get serieBac(): string {
		return (this.parent !== null) ? this.parent.serieBac : null;
	}
	public set serieBac(s: string) {
		if (this.parent) {
			this.parent.serieBac = s;
		}
	}
	public get optionBac(): string {
		return (this.parent !== null) ? this.parent.optionBac : null;
	}
	public set optionBac(s: string) {
		if (this.parent) {
			this.parent.optionBac = s;
		}
	}
	public get mentionBac(): string {
		return (this.parent !== null) ? this.parent.mentionBac : null;
	}
	public set mentionBac(s: string) {
		if (this.parent) {
			this.parent.mentionBac = s;
		}
	}
	public get etudesSuperieures(): string {
		return (this.parent !== null) ? this.parent.etudesSuperieures : null;
	}
	public set etudesSuperieures(s: string) {
		if (this.parent) {
			this.parent.etudesSuperieures = s;
		}
	}
}// class EtudiantBar
