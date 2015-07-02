//rootelement.ts
/// <reference path="../../../typings/aurelia/aurelia-event-aggregator.d.ts"/>
/// <reference path="../../../typings/aurelia/aurelia-logging.d.ts"/>
//
import * as evtagg from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';
//
import {InfoElement} from '../utils/infoelement';
//
import {IBaseItem, IDataService, IPerson, IUIManager,
IElementDesc, IObjectStore, ILoginInfo, IInfoMessage} from 'infodata';
import {UIManager} from '../utils/uimanager';
import {SessionStore} from '../utils/sessionstore';
import {LocalStore} from '../utils/localstore';
import {DataService} from '../data/services/dataservice';
import {InfoMessage} from '../utils/infomessage';
//
import {DEPARTEMENT_TYPE, ANNEE_TYPE, SEMESTRE_TYPE, UNITE_TYPE, MATIERE_TYPE, GROUPE_TYPE,
MESSAGE_DOMAIN, INFO_MESSAGE, INFO_MESSAGE_CHANNEL,
ERROR_MESSAGE, MESSAGE_LOGOUT} from '../utils/infoconstants';
//
export class RootElement extends InfoElement {
    private _uiManager: UIManager;
    private _sessionStore: IObjectStore;
    private _localStore: IObjectStore;
    private _dataService: IDataService;
    private _eventAggregator: evtagg.EventAggregator;
    private _logger: LogManager.Logger;
    private _dispose_func: () => any;
    protected _inMessage: boolean;
    //
    constructor() {
        super();
        this._dispose_func = null;
        this._inMessage = false;
    }// constructor
    protected get_logger_name(): string {
        return 'RootElement';
    }
    protected get_event_aggregator(): evtagg.EventAggregator {
        return null;
    }
    protected get_uimanager(): IUIManager {
        return new UIManager();
    }
    protected get_sessionstore(): IObjectStore {
        return new SessionStore();
    }
    protected get_localstore(): IObjectStore {
        return new LocalStore();
    }
    protected get_dataservice(): IDataService {
        return new DataService();
    }
    //
    public get uiManager(): IUIManager {
        if ((this._uiManager === undefined) || (this._uiManager === null)) {
            this._uiManager = this.get_uimanager();
            if ((this._uiManager === undefined) || (this._uiManager === null)) {
                this._uiManager = new UIManager();
            }
        }
        return this._uiManager;
    }
    public get sessionStore(): IObjectStore {
        if ((this._sessionStore === undefined) || (this._sessionStore === null)) {
            this._sessionStore = this.get_sessionstore();
            if ((this._sessionStore === undefined) || (this._sessionStore === null)) {
                this._sessionStore = new SessionStore();
            }
        }
        return this._sessionStore;
    }
    public get localStore(): IObjectStore {
        if ((this._localStore === undefined) || (this._localStore === null)) {
            this._localStore = this.get_localstore();
            if ((this._localStore === undefined) || (this._localStore === null)) {
                this._localStore = new LocalStore();
            }
        }
        return this._localStore;
    }
    public get eventAggregator(): evtagg.EventAggregator {
        if ((this._eventAggregator === undefined) || (this._eventAggregator === null)) {
            this._eventAggregator = this.get_event_aggregator();
            if (this._eventAggregator === undefined) {
                this._eventAggregator = null;
            }
        }
        return this._eventAggregator;
    }
    public get dataService(): IDataService {
        if ((this._dataService === undefined) || (this._dataService === null)) {
            this._dataService = this.get_dataservice();
            if ((this._dataService === undefined) || (this._dataService === null)) {
                this._dataService = new DataService();
            }
        }
        return this._dataService;
    }
    public get is_in_message(): boolean {
        if ((this._inMessage === undefined) || (this._inMessage === null)) {
            this._inMessage = false;
        }
        return this._inMessage;
    }
    protected perform_subscribe(): any {
      let self = this;
      if ((this.eventAggregator !== null) && ((this._dispose_func === undefined) || (this._dispose_func === null))) {
          this._dispose_func = this.eventAggregator.subscribe(INFO_MESSAGE_CHANNEL, (msg: IInfoMessage) => {
              if ((msg.source !== undefined) && (msg.source !== self)) {
                  if (!self.is_in_message) {
                      self._inMessage = true;
                      try {
                          self.message_received(msg);
                      } catch (e) {
                          let ss = ((e !== undefined) && (e !== null)) ? e.toString() : 'Error';
                          self.error(ss);
                      }
                      self._inMessage = false;
                  }
              }
          });
      }
    }// perform_subscribe
    protected perform_attach(): any {
        this.perform_subscribe();
    }// perform_attach
    protected perform_detach(): void {
        if ((this._dispose_func !== undefined) && (this._dispose_func !== null)) {
            this._dispose_func();
            this._dispose_func = null;
        }
    }
    protected confirm(s: string): boolean {
        return this.uiManager.confirm(s);
    }
    protected createUrl(blob: Blob): string {
        return this.uiManager.createUrl(blob);
    }
    protected revokeUrl(url: string): void {
        this.uiManager.revokeUrl(url);
    }
    //
    protected get logger(): LogManager.Logger {
        if ((this._logger === undefined) || (this._logger === null)) {
            this._logger = LogManager.getLogger(this.get_logger_name());
        }
        return this._logger;
    }
    protected info_log(s: string): void {
        this.logger.info(s);
    }
    protected debug(s: string): void {
        this.logger.debug(s);
    }
    protected warn(s: string): void {
        this.logger.warn(s);
    }
    protected error(s: string): void {
        this.logger.error(s);
    }
    protected publish_message(payload: IInfoMessage): any {
        if ((this.eventAggregator !== null) && (payload !== undefined) &&
            (payload !== null)) {
            payload.source = this;
            this.eventAggregator.publish(INFO_MESSAGE_CHANNEL, payload);
        }
    }// publish
    protected publish_string_message(mval: string): any {
        let p = new InfoMessage();
        p.type = MESSAGE_DOMAIN;
        p.categ = mval;
        p.value = mval;
        this.publish_message(p);
    }
    protected message_received(message: IInfoMessage): Promise<any> {
        if (message.type == MESSAGE_DOMAIN) {
            let s = message.categ;
            if ((s !== undefined) && (s !== null)) {
                if (s == DEPARTEMENT_TYPE) {
                    return this.post_change_departement();
                } else if (s == ANNEE_TYPE) {
                    return this.post_change_annee();
                } else if (s == GROUPE_TYPE) {
                    return this.post_change_groupe();
                } else if (s == UNITE_TYPE) {
                    return this.post_change_unite();
                } else if (s == SEMESTRE_TYPE) {
                    return this.post_change_semestre();
                } else if (s == MATIERE_TYPE) {
                    return this.post_change_matiere();
                }
            }
        } else if (message.type == MESSAGE_LOGOUT) {
            return this.perform_logout();
        }
        return Promise.resolve(true);
    }// message_received
    protected perform_logout(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_departement(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_annee(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_unite(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_groupe(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_semestre(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_matiere(): Promise<any> {
        return Promise.resolve(true);
    }
    protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null) || (this.dataService === null) || (this.uiManager === null)) {
            return Promise.resolve(item);
        }
        if (item.url !== null) {
            this.revokeUrl(item.url);
            item.url = null;
        }
        return item.check_avatar_url(this.dataService, this.uiManager);
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
    protected add_to_array(cont: IBaseItem[], item: IBaseItem): void {
        let bFound = false;
        for (let x of cont) {
            if (x.id == item.id) {
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            cont.push(item);
        }
    }// add_to_array
}// RootElement
