//baseconsultmodel.ts
//
import {UserInfo} from './userinfo';
import {InfoRoot} from '../common/inforoot';
import {WorkViewModel} from './workviewmodel';
import {IBaseItem,IInfoMessage} from 'infodata';
import {MESSAGE_LOGOUT} from '../common/infoconstants';
//
export class BaseConsultViewModel<T extends IBaseItem> extends WorkViewModel {
  //
  public items: T[] = [];
  //
  private _item_model: T = null;
  private _page_size: number = 16;
  private _current_page: number = 0;
  private _pages_count: number = 0;
  public allIds: string[] = [];
  //
  private _pageStatus: string = null;
  //
  constructor(userinfo: UserInfo) {
    super(userinfo);
  }// constructor
  //
  protected create_item(): T {
    return null;
  }
  protected get_start_key(): string {
    return this.modelItem.start_key();
  }
  protected get_end_key(): string {
    return this.modelItem.end_key();
  }
  public get canShowForm():boolean {
    return this.is_refresh();
  }
  public set canShowForm(s:boolean){}
  public activate(params?: any, config?: any, instruction?: any): any {
    if (this._item_model === null) {
      this._item_model = this.create_item();
    }
    let self = this;
    return super.activate(params, config, instruction).then((r) => {
      return self.refreshAll();
    });
  }// activate
  protected message_received(message:IInfoMessage) : Promise<boolean> {
    if (message.type == MESSAGE_LOGOUT){
      this.items = [];
      this.allIds = [];
      this._current_page = 0;
    }
    return Promise.resolve(true);
  }// message_received
  public get modelItem(): T {
    if (this._item_model === null) {
      this._item_model = this.create_item();
    }
    return this._item_model;
  }
  protected is_refresh(): boolean {
    return true;
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
      return  self.retrieve_avatars(rx);
    }).then((xx:T[])=>{
      self.items = [];
      for (let xc of xx){
        self.add_to_array(self.items,xc);
      }
      return true;
    });
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
  public get hasItems(): boolean {
    return (this.allIds.length > 0);
  }
  public set hasItems(s: boolean) { }
  public get hasPages(): boolean {
    return (this.pagesCount > 1);
  }
  public set hasPages(s: boolean) { }
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
  public set canPrevPage(s: boolean) { }
  public get canNextPage(): boolean {
    return ((this._current_page + 1) < this._pages_count);
  }
  public set canNextPage(s: boolean) { }
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
}// class BaseEditViewModel
