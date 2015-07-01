//baseeditmodel.ts
//
import * as userinf from './userinfo';
import {InfoRoot} from '../utils/inforoot';
import {FileDesc} from '../utils/filedesc';
import {BaseConsultViewModel} from './baseconsultmodel';
import {IBaseItem, IFileDesc, IUIManager, IInfoMessage} from 'infodata';
import {MESSAGE_LOGOUT} from '../utils/infoconstants';
//
export class BaseEditViewModel<T extends IBaseItem> extends BaseConsultViewModel<T> {
    private _add_mode: boolean = false;
    public fileDesc: IFileDesc = null;
    private _current_item: T = null;
    private _old_item: T = null;
    protected hasAvatars: boolean = false;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.fileDesc = new FileDesc();
    }// constructor
    //
    protected post_change_item(): Promise<any> {
        return Promise.resolve(true);
    }// post_change_item
    protected is_storeable(): boolean {
        return (this.currentItem !== null) && this.currentItem.is_storeable();
    }
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            if (self._current_item === null) {
                self._current_item = self.create_item();
            }
            if (self.fileDesc === null) {
                self.fileDesc = new FileDesc();
            } else {
                self.fileDesc.clear();
            }
        });
    }// activate
    public get currentItem(): T {
        return this._current_item;
    }
    public set currentItem(s: T) {
        this._current_item = ((s !== undefined) && (s !== null)) ? s : this.create_item();
        this.fileDesc.clear();
        let x = this.currentItem;
        let self = this;
        if ((x !== null) && (x.avatarid !== null) && (x.avatardocid() !== null) &&
            (x.url === null)) {
            this.retrieve_one_avatar(x).then((r) => {
                return self.post_change_item();
            });
        }
        this.post_change_item();
    }
    public check_item(): void {
        let old = this.currentItem;
        this.currentItem = this.create_item();
        this.currentItem = old;
    }
    //
    public get isEditable(): boolean {
        return this.isAdmin;
    }
    public get isReadOnly(): boolean {
        return (!this.isEditable);
    }
    public get avatarUrl(): string {
        return (this.currentItem != null) ? this.currentItem.url : null;
    }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public get canRemoveAvatar(): boolean {
        return this.isEditable && (this.currentItem !== null) && (this.currentItem.id !== null) &&
            (this.currentItem.rev !== null) && (this.currentItem.avatarid !== null);
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        return this.isEditable && (this.currentItem !== null) && (this.currentItem.rev !== null) &&
            (this.currentItem.id !== null) && this.fileDesc.is_storeable;
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return this.fileDesc.url;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public get isEditItem(): boolean {
        return (this.currentItem !== null) &&
            (this.currentItem.id !== null) && (this.currentItem.rev !== null);
    }
    public avatarFileChanged(event: any): any {
        this.fileDesc.changed(event);
    }// fileChanged
    public removeAvatar(): any {
        let p = this.currentItem;
        if (p === null) {
            return;
        }
        if ((p.id === null) || (p.rev === null)) {
            return;
        }
        let id = p.avatardocid();
        let avatarid = p.avatarid;
        if ((id === null) || (avatarid === null)) {
            return;
        }
        if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let service = this.dataService;
            this.clear_error();
            return service.remove_attachment(id, avatarid).then((r) => {
                if (p.url !== null) {
                    self.revokeUrl(p.url);
                    p.url = null;
                }
                p.avatarid = null;
                return service.maintains_item(p);
            }).then((x) => {
                self.fileDesc.clear();
                self.infoMessage = 'Avatar supprimÃ©.';
            }).catch((err) => {
                self.set_error(err);
            });
        }
    }
    public saveAvatar(): any {
        let f = this.fileDesc;
        let p = this.currentItem;
        if ((f === null) || (p === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
            return;
        }
        let id = p.avatardocid();
        if (id === null) {
            return;
        }
        let avatarid = f.name;
        let type = f.type;
        let data = f.data;
        if ((avatarid === null) || (type === null) || (data === null)) {
            return;
        }
        let service = this.dataService;
        this.clear_error();
        let self = this;
        return service.maintains_attachment(id, avatarid, data, type).then((r) => {
            p.avatarid = avatarid;
            return service.maintains_item(p);
        }).then((px) => {
            p.url = self.fileDesc.remove_url();
            self.fileDesc.clear();
            self.infoMessage = 'Avatar modifiÃ©.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveAvatar
    protected get oldItem(): T {
        return this._old_item;
    }
    protected set oldItem(s: T) {
        this._old_item = (s !== undefined) ? s : null;
    }
    protected get AddMode(): boolean {
        return this._add_mode;
    }
    protected set addMode(b: boolean) {
        this._add_mode = b;
    }
    public get canAdd(): boolean {
        return (!this.addMode) && this.isEditable;
    }
    public addNew(): any {
        this.oldItem = this.currentItem;
        this.currentItem = this.create_item();
        this.addMode = true;
    }
    public get canCancel(): boolean {
        return this.addMode;
    }
    public get cannotCancel(): boolean {
        return (!this.canCancel);
    }
    public cancel_add(): void {
        this.currentItem = this.oldItem;
        this.addMode = false;
    }
    public cancel(): void {
        this.cancel_add();
    }
    public get canRemove(): boolean {
        return this.isEditItem && this.isEditable;
    }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get canSave(): boolean {
        return this.is_storeable() && this.isEditable;
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    //
    public refresh(): Promise<any> {
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        let self = this;
        return super.refresh().then((r) => {
            let p = InfoRoot.sync_array(self.items, oldid);
            this.currentItem = p;
            return true;
        });
    }// refresh

    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._current_item = this.create_item();
    }
    public save(): any {
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
        if (!item.is_storeable()) {
            return false;
        }
        var self = this;
        this.clear_error();
        return this.dataService.maintains_item(item).then((r) => {
            if (item.rev !== null) {
                return self.refresh();
            } else {
                return self.refreshAll();
            }
        }, (err) => {
            self.set_error(err);
            return false;
        });
    }// save
    public remove(): any {
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
        if ((item.id === null) || (item.rev === null)) {
            return false;
        }
        if (this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            let self = this;
            this.clear_error();
            return item.remove(this.dataService).then((r) => {
                self.refreshAll();
            }, (err) => {
                self.set_error(err);
            });
        }
    }// remove
    public get description(): string {
        return (this.currentItem !== null) ? this.currentItem.description : null;
    }
    public set description(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.description = s;
        }
    }
}// class BaseEditViewModel
