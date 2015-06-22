//
import {InfoElement} from '../infoelement';
import {EventAggregator} from 'aurelia-event-aggregator';
//
import * as LogManager from 'aurelia-logging';
import {INFO_MESSAGE,
INFO_MESSAGE_CHANNEL, ERROR_MESSAGE} from '../common/infoconstants';
//
import {IBaseItem, IDataService, IPerson, IUIManager,
  IElementDesc,IObjectStore,ILoginInfo,IInfoMessage} from 'infodata';
import {UIManager} from '../common/uimanager';
import {SessionStore} from '../common/sessionstore';
import {LocalStore} from '../common/localstore';
import {DataService} from '../services/dataservice';
import {UserInfo} from './userinfo';
import {InfoMessage} from '../common/infomessage';

//
export class RootElement extends InfoElement {
  //
  private _uiManager:UIManager = null;
  private _sessionStore: IObjectStore = null;
  private _localStore: IObjectStore = null;
  private _dataService: IDataService = null;
  private _eventAggregator:EventAggregator = null;
  //
  public title: string = null;
  public errorMessage: string = null;
  public infoMessage: string = null;
  //
  private _logger: LogManager.Logger = null;
  private _dispose_func: () => any = null;
  protected _inMessage:boolean = false;
  public baseUrl:string = null;
  //
  constructor(){
    super();
  }// constructor
  public get uiManager():IUIManager {
    if (this._uiManager === null){
      this._uiManager = new UIManager();
    }
    return this._uiManager;
  }
  public get sessionStore():IObjectStore {
    if (this._sessionStore === null){
       this._sessionStore = new SessionStore();
    }
    return this._sessionStore;
  }
  public get localStore():IObjectStore {
    if (this._localStore === null){
       this._localStore = new LocalStore();
    }
    return this._sessionStore;
  }
  protected get_event_aggregator():EventAggregator {
    return null;
  }
  public get eventAggregator():EventAggregator {
    if (this._eventAggregator === null){
      this._eventAggregator = this.get_event_aggregator();
  }
  return this._eventAggregator;
  }
  protected get_dataservice(): IDataService {
     return new DataService();
  }
  public get dataService():IDataService {
    if (this._dataService === null){
      this._dataService = this.get_dataservice();
    }
    return this._dataService;
  }
  protected perform_attach(): any {
    let origin = window.location.origin;
    let pathname = window.location.pathname;
    this.baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
    let self = this;
    if ((this.eventAggregator !== null) && (this._dispose_func === null)) {
      this._dispose_func = this.eventAggregator.subscribe(INFO_MESSAGE_CHANNEL, (msg: IInfoMessage) => {
        if ((msg.source !== undefined) && (msg.source !== self)) {
           self._inMessage = true;
           self.message_received(msg);
           self._inMessage = false;
        }
      });
    }
  }// perform_attach
  protected perform_detach(): void {
    if (this._dispose_func !== null) {
      this._dispose_func();
      this._dispose_func = null;
    }
  }
  protected confirm(s: string): boolean {
   return this.uiManager.confirm(s);
 }
 protected createUrl(blob:Blob):string {
   return this.uiManager.createUrl(blob);
 }
 protected revokeUrl(url: string): void {
   this.uiManager.revokeUrl(url);
 }
 //
 protected get_logger_name(): string {
   return 'BaseBean';
 }
 protected get logger(): LogManager.Logger {
   if (this._logger === null) {
     this._logger = LogManager.getLogger(this.get_logger_name());
   }
   return this._logger;
 }
 protected debug(s: string): void {
   this.logger.debug(s);
 }
 protected publish_message(payload: IInfoMessage): any {
   if ((this.eventAggregator !== null) && (payload !== undefined) &&
     (payload !== null)) {
       payload.source = this;
     this.eventAggregator.publish(INFO_MESSAGE_CHANNEL,payload);
   }
 }// publish
 protected message_received(message:IInfoMessage) : Promise<boolean> {
   return Promise.resolve(true);
 }// message_received
 protected clear_error(): void {
    this.errorMessage = null;
    this.infoMessage = null;
  }
  public retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
    if ((item === null) || (this.dataService === null) || (this.uiManager === null)) {
      return Promise.resolve(item);
    }
    if (item.url !== null) {
      this.revokeUrl(item.url);
      item.url = null;
    }
    return item.check_avatar_url(this.dataService,this.uiManager);
  }// rerieve_one_avatar
  public retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
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
  public set_error(err: any): void {
   if ((err !== undefined) && (err !== null)) {
     if ((err.message !== undefined) && (err.message !== null)) {
       this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
     } else if ((err.msg !== undefined) && (err.msg !== null)) {
       this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
     } else if ((err.reason !== undefined) && (err.reason !== null)) {
       this.errorMessage = err.reason;
     } else {
       this.errorMessage = JSON.stringify(err);
     }
   } else {
     this.errorMessage = 'Erreur inconnue...';
   }
 } // set_error
}// baseBean
