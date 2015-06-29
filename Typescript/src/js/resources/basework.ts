//basework.ts
//
import {BaseBar} from './base-bar';
//
export class BaseWork extends BaseBar {
	constructor() {
		super();
	}
	protected get_logger_name(): string {
		return 'BaseWork';
	}
	//
	public get isSuper(): boolean {
		return (this.parent !== null) ? this.parent.isSuper : false;
	}
	public get isAdmin(): boolean {
		return (this.parent !== null) ? this.parent.isAdmin : false;
	}
	public get isProf(): boolean {
		return (this.parent !== null) ? this.parent.isProf : false;
	}
	public get isEtud(): boolean {
		return (this.parent !== null) ? this.parent.isEtud : false;
	}
	public get hasErrorMessage(): boolean {
		return (this.errorMessage !== null);
	}
	public get hasInfoMessage(): boolean {
		return (this.infoMessage !== null);
	}
	public get isConnected(): boolean {
		return (this.parent !== null) ? this.parent.isConnected : false;
	}
	public get infoMessage(): string {
		return (this.parent !== null) ? this.parent.infoMessage : null;
	}
	public get errorMessage(): string {
		return (this.parent !== null) ? this.parent.errorMessage : null;
	}
	public get hasItems(): boolean {
		return (this.parent !== null) ? this.parent.hasItems : false;
	}
	public get hasPages(): boolean {
		return (this.parent !== null) ? this.parent.hasPages : false;
	}
	public get canPrevPage(): boolean {
		return (this.parent !== null) ? this.parent.canPrevPage : false;
	}
	public get canNextPage(): boolean {
		return (this.parent !== null) ? this.parent.canNextPage : false;
	}
	public firstPage(): any {
		if (this.parent !== null) {
			this.parent.firstPage();
		}
	}
	public prevPage(): any {
		if (this.parent !== null) {
			this.parent.prevPage();
		}
	}
	public nextPage(): any {
		if (this.parent !== null) {
			this.parent.nextPage();
		}
	}
	public lastPage(): any {
		if (this.parent !== null) {
			this.parent.lastPage();
		}
	}
	public get pageStatus(): string {
		return (this.parent !== null) ? this.parent.pageStatus : null;
	}
	public get currentItem(): any {
		return (this.parent !== null) ? this.parent.currentItem : null;
	}
	public set currentItem(s: any) {
		if (this.parent !== null) {
			this.parent.currentItem = s;
		}
	}
	public get items(): any[] {
		return (this.parent !== null) ? this.parent.items : [];
	}
	public refreshAll(): any {
		if (this.parent !== null) {
			this.parent.refreshAll();
		}
	}
	public get description(): string {
		return (this.currentItem !== null) ? this.currentItem.description : null;
	}
	public set description(s: string) {
		if (this.currentItem !== null) {
			this.currentItem.description = s;
		}
	}
	public get isEditItem(): boolean {
		return (this.parent !== null) ? this.parent.isEditItem : false;
	}
	public get isEditable(): boolean {
		return (this.parent !== null) ? this.parent.isEditable : false;
	}
	public get avatarUrl(): string {
		return (this.parent !== null) ? this.parent.avatarUrl : null;
	}
	public get hasAvatarUrl(): boolean {
		return (this.avatarUrl !== null);
	}
	public get canRemoveAvatar(): boolean {
		return (this.parent !== null) ? this.parent.canRemoveAvatar : false;
	}
	public removeAvatar(): any {
		if (this.parent !== null) {
			this.parent.removeAvatar();
		}
	}
	public avatarFileChanged(event: any): any {
		if (this.parent !== null) {
			this.parent.avatarFileChanged(event);
		}
	}
	public get workingUrl(): string {
		return (this.parent !== null) ? this.parent.workingUrl : null;
	}
	public get hasWorkingUrl(): boolean {
		return (this.workingUrl !== null);
	}
	public get canSaveAvatar(): boolean {
		return (this.parent !== null) ? this.parent.canSaveAvatar : false;
	}
	public saveAvatar(): any {
		if (this.parent !== null) {
			this.parent.saveAvatar();
		}
	}
	public get isReadOnly(): boolean {
		return (this.parent !== null) ? this.parent.isReadOnly : true;
	}
	public get cannotAdd(): boolean {
		return (this.parent !== null) ? this.parent.cannotAdd : true;
	}
	public get cannotCancel(): boolean {
		return (this.parent !== null) ? this.parent.cannotCancel : true;
	}
	public get cannotSave(): boolean {
		return (this.parent !== null) ? this.parent.cannotSave : true;
	}
	public get cannotRemove(): boolean {
		return (this.parent !== null) ? this.parent.cannotRemove : true;
	}
	public addNew(): any {
		if (this.parent !== null) {
			this.parent.addNew();
		}
	}
	public cancel(): any {
		if (this.parent !== null) {
			this.parent.cancel();
		}
	}
	public save(): any {
		if (this.parent !== null) {
			this.parent.save();
		}
	}
	public remove(): any {
		if (this.parent !== null) {
			this.parent.remove();
		}
	}
}// class BaseWork
