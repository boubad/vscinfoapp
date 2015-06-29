//interval-bar.ts
//
import {SiglenameWork} from './siglenamework';
//
export class IntervalBar extends SiglenameWork {
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'IntervalWork';
	}
	public get startDate(): string {
		return (this.parent !== null) ? this.parent.startDate : null;
	}
	public set startDate(s: string) {
		if (this.parent !== null) {
			this.parent.startDate = s;
		}
	}
	public get endDate(): string {
		return (this.parent !== null) ? this.parent.endDate : null;
	}
	public set endDate(s: string) {
		if (this.parent !== null) {
			this.parent.endDate = s;
		}
	}
	public get minDate():string {
		return (this.parent !== null) ? this.parent.minDate : null;
	}
	public get maxDate():string {
		return (this.parent !== null) ? this.parent.maxDate : null;
	}
}// class IntervalBar
