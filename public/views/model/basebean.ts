//basebean.ts
//
/// <reference path="../../../typings/aurelia/aurelia-logging.d.ts"/>
//
import {EventAggregator} from 'aurelia-event-aggregator';
//
import {RootElement} from './rootelement';
//
import * as LogManager from 'aurelia-logging';
//
import {INFO_MESSAGE,
INFO_MESSAGE_CHANNEL, ERROR_MESSAGE} from '../common/infoconstants';
//
import {IBaseItem, IDataService, IPerson, IUIManager,
IElementDesc, IObjectStore, ILoginInfo, IInfoMessage} from 'infodata';
import {UIManager} from '../common/uimanager';
import {SessionStore} from '../common/sessionstore';
import {UserInfo} from './userinfo';
import {InfoMessage} from '../common/infomessage';
//
export class BaseBean extends RootElement {
  //
  public userInfo: UserInfo = null;
  //
  constructor(userinfo: UserInfo) {
    super();
    this.userInfo = userinfo;
  }// constructor
  protected get_dataservice(): IDataService {
    return this.userInfo.dataService;
  }
  protected get_event_aggregator(): EventAggregator {
    return this.userInfo.eventAggregator;
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    this.perform_attach();
    return Promise.resolve(true);
  }// activate
  public deactivate(): any {
    this.perform_detach();
  }
  //
  public get person(): IPerson {
    return this.userInfo.person;
  }
  public get isConnected(): boolean {
    return (this.person !== null) && (this.person.id !== null);
  }// isConnected
  public set isConnected(s: boolean) {
  }
  public get isNotConnected(): boolean {
    return (!this.isConnected);
  }
  public set isNotConnected(s: boolean) {
  }
  public get personid(): string {
    return this.userInfo.personid;
  }
  public get fullname(): string {
    return this.userInfo.fullname;
  }
  public get photoUrl(): string {
    return this.userInfo.url;
  }
  public get hasPhoto(): boolean {
    return (this.photoUrl !== null);
  }
  public set hasPhoto(s: boolean) { }
  public get isSuper(): boolean {
    return this.userInfo.is_super;
  }
  public set isSuper(b: boolean) { }
  public get isAdmin(): boolean {
    return this.userInfo.is_admin;
  }
  public set isAdmin(b: boolean) { }
  public get isProf(): boolean {
    return this.userInfo.is_prof;
  }
  public set isProf(b: boolean) { }
  public get isEtud(): boolean {
    return this.userInfo.is_etud;
  }
  public set isEtud(b: boolean) { }
  //
}// baseBean
