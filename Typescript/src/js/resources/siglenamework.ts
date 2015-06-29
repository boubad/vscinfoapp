//work-bar.ts
//
import {BaseWork} from './basework';
import {ISigleNameItem} from 'infodata';
//
export class SiglenameWork extends BaseWork {
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'SiglenameWork';
	}
	public get sigle(): string {
		return (this.parent !== null) ? this.parent.sigle : null;
	}
	public set sigle(s: string) {
		if (this.parent !== null) {
			this.parent.sigle = s;
		}
	}
	public get name(): string {
		return (this.parent !== null) ? this.parent.name : null;
	}
	public set name(s: string) {
		if (this.parent !== null) {
			this.parent.name = s;
		}
	}


}// class SiglenameBar
