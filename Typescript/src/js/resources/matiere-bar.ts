//matiere-bar.ts
//
import {SiglenameBar} from './siglename-bar';
import {InfoRoot} from '../utils/inforoot';
//
export class MatiereBar extends SiglenameBar {
	//
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'MatiereBar';
	}
	public get genre(): string {
		return (this.parent !== null) ? this.parent.genre : null;
	}
	public set genre(s: string) {
		if (this.parent !== null) {
			this.parent.genre = s;
		}
	}
	public get mat_module(): string {
		return (this.parent !== null) ? this.parent.mat_module : null;
	}
	public set mat_module(s: string) {
		if (this.parent !== null) {
			this.parent.mat_module = s;
		}
	}
	public get coefficient(): string {
		return (this.parent !== null) ? this.parent.coefficient : null;
	}
	public set coefficient(s: string) {
		if (this.parent !== null) {
			this.parent.coefficient = s;
		}
	}
	public get ecs(): string {
		return (this.parent !== null) ? this.parent.ecs : null;
	}
	public set ecs(s: string) {
		if (this.parent !== null) {
			this.parent.ecs = s;
		}
	}
}// class SiglenameBar
