//dep-siglename-bar.ts
//
import {SiglenameBar} from './siglename-bar';
//
export class DepSiglenameBar extends SiglenameBar {
	//
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'DepSiglenameBar';
	}

}// class SiglenameBar
