//rootconsultmodel.ts
//
import * as userinf  from './userinfo';
import {InfoRoot} from '../utils/inforoot';
import {WorkViewModel} from './workviewmodel';
import {IElementDesc} from 'infodata';
//
export class RootConsultViewModel<T extends IElementDesc> extends WorkViewModel {
    //
    public items: T[] = [];
    //
    private _page_size: number = 16;
    private _current_page: number = 0;
    private _pages_count: number = 0;
    public allIds: string[] = [];
    //
    private _pageStatus: string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected is_refresh(): boolean {
        return true;
    }
    protected perform_activate(): any {
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
    public refresh(): Promise<any> {
        return Promise.resolve(true);
    }// refresh
    public get pageStatus(): string {
        return (this.pagesCount > 1) ?
            ('Page ' + this.currentPage + ' sur ' + this.pagesCount) : null;
    }
    protected prepare_refresh(): void {
        this.allIds = [];
        this._pages_count = 0;
        this._current_page = 0;
        this.items = [];
    }
    public refreshAll(): Promise<any> {
      return Promise.resolve(true);
    }// refreshAll
    public get hasItems(): boolean {
        return (this.allIds.length > 0);
    }
    public get hasPages(): boolean {
        return (this.pagesCount > 1);
    }
    public get pagesCount(): number {
        return this._pages_count;
    }
    public set pagesCount(s: number) {
        this._pages_count = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 0;
    }
    public get itemsPerPage(): number {
        return this._page_size;
    }
    public set itemsPerPage(s: number) {
        let n = InfoRoot.check_number(s);
        if ((n !== null) && (n > 0) && (n != this._page_size)) {
            this._page_size = n;
            this.refreshAll();
        }
    }
    public get currentPage(): number {
        return (this._current_page + 1);
    }
    public set currentPage(s: number) {
        let n = InfoRoot.check_number(s);
        if ((n !== null) && (n > 0)) {
            --n;
            if ((n >= 0) && (n != this._current_page)) {
                this._current_page = n;
                this.refresh();
            }
        }// n
    }// set currentPage
    public get canPrevPage(): boolean {
        return (this._current_page > 0);
    }
    public get canNextPage(): boolean {
        return ((this._current_page + 1) < this._pages_count);
    }
    public firstPage(): void {
        if (this.currentPage > 1) {
            this.currentPage = 1;
        }
    }
    public prevPage(): void {
        if (this.currentPage > 1) {
            let n = this.currentPage - 1;
            this.currentPage = n;
        }
    }
    public nextPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = n + 1;
        }
    }// nextPage
    public lastPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = this._pages_count;
        }
    }
}//
