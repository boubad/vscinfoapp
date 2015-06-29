//base-bar.ts
//
import {RootElement} from '../viewmodel/rootelement';
//
export class BaseBar extends RootElement {
	private _parent: any;
	constructor() {
		super();
	}
	protected get parent(): any {
		return (this._parent !== undefined) ? this._parent : null;
	}
	protected set parent(s: any) {
		this._parent = (s !== undefined) ? s : null;
	}
	protected get_logger_name(): string {
		return 'BaseBar';
	}
	public bind(s:any){
		this.parent = s;
	}
	public attached(): any {
		this.perform_attach();
	}
	public detached(): any {
		this.perform_detach();
	}
}// class BaseBar
