//work-bar.ts
//
import {SiglenameWork} from './siglenamework';
//
export class SiglenameBar extends SiglenameWork {
	//
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'SiglenameBar';
	}

}// class SiglenameBar
