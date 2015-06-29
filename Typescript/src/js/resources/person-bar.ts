//person-bar.ts
//
import {BaseWork} from './basework';
//
export class PersonBar extends BaseWork {
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'PersonBar';
	}
	public reset_password(): any {
		if (this.parent !== null) {
			this.parent.reset_password();
		}
	}
	public get username(): string {
		return (this.parent !== null) ? this.parent.username : null;
	}
	public set username(s: string) {
		if (this.parent !== null) {
			this.parent.username = s;
		}
	}
	public get lastname(): string {
		return (this.parent !== null) ? this.parent.lastname : null;
	}
	public set lastname(s: string) {
		if (this.parent !== null) {
			this.parent.lastname = s;
		}
	}

	public get firstname(): string {
		return (this.parent !== null) ? this.parent.firstname : null;
	}
	public set firstname(s: string) {
		if (this.parent !== null) {
			this.parent.firstname = s;
		}
	}
	public get email(): string {
		return (this.parent !== null) ? this.parent.email : null;
	}
	public set email(s: string) {
		if (this.parent !== null) {
			this.parent.email = s;
		}
	}
	public get phone(): string {
		return (this.parent !== null) ? this.parent.phone : null;
	}
	public set phone(s: string) {
		if (this.parent !== null) {
			this.parent.phone = s;
		}
	}
}// class SiglenameBar
