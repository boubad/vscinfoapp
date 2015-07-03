//baseconsultmodel.ts
//
import * as userinf  from './userinfo';
import {InfoRoot} from '../utils/inforoot';
import {RootConsultViewModel} from './rootconsultmodel';
import {IBaseItem} from 'infodata';
//
export class BaseConsultViewModel<T extends IBaseItem> extends RootConsultViewModel<T> {
    //
    private _item_model: T = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected is_refresh(): boolean {
        return true;
    }
    protected create_item(): T {
        return null;
    }
    protected get_start_key(): string {
        return this.modelItem.start_key();
    }
    protected get_end_key(): string {
        return this.modelItem.end_key();
    }
    //
    protected perform_activate(): any {
        if (this._item_model === null) {
            this._item_model = this.create_item();
        }
    }
    //
    public get canShowForm(): boolean {
        return this.is_refresh();
    }
    public set canShowForm(s: boolean) { }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_activate();
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            if (self.items.length < 1) {
                self.refreshAll();
            }
        });
    }// activate
    public get modelItem(): T {
        if (this._item_model === null) {
            this._item_model = this.create_item();
        }
        return this._item_model;
    }
    public refresh(): Promise<any> {
        this.clear_error();
        let model = this.modelItem;
        if (this.items.length > 0) {
            for (let elem of this.items) {
                let x = elem.url;
                if (x !== null) {
                    this.revokeUrl(x);
                    elem.url = null;
                }
            }// elem
        }
        this.items = [];
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let startKey = null;
        let endKey = null;
        let nbItems = this.allIds.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart >= 0) && (istart < nbItems)) {
            startKey = this.allIds[istart];
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend >= 0) && (iend < nbItems)) {
            endKey = this.allIds[iend];
        }
        if ((startKey === null) || (endKey === null)) {
            return Promise.resolve(true);
        }
        this.clear_error();
        var self = this;
        return this.dataService.get_items(model, startKey, endKey).then((rr: T[]) => {
            let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
            return self.retrieve_avatars(rx);
        }).then((xx: T[]) => {
            self.items = [];
            for (let xc of xx) {
                self.add_to_array(self.items, xc);
            }
            return true;
        });
    }// refresh
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let model = this.modelItem;
        let startKey = this.get_start_key();
        let endKey = this.get_end_key();
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.get_ids(startKey, endKey).then((ids) => {
            self.allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
            let nt = self.allIds.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            return self.refresh();
        });
    }// refreshAll
}// class BaseEditViewModel
