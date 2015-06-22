//synchroview.ts
//
import {BaseBean} from './basebean';
import {autoinject} from 'aurelia-framework';
import {SYNC_IN, SYNC_OUT, SYNC_DATABASE,
DATABASE_NAME, REMOTE_DATABASE_NAME, REMOTESERVERSLIST_KEY,
SYNC_CHANNEL, SYNC_ERROR, SYNC_PAUSED, SYNC_CHANGED,
SYNC_COMPLETED, SYNC_DENIED, SYNC_STARTED, SYNC_RESUMED} from '../common/infoconstants';

import {UserInfo} from './userinfo';
import {SynchroManager} from './syncmanager';
import {IInfoMessage} from 'infodata';
//
@autoinject
export class SynchroView extends BaseBean {
  //
  public manager: SynchroManager = null;
  //
  public outputString_In: string = null;
  public outputString_Out: string = null;
  public status_In: string = null;
  public status_Out: string = null;
  public candidateServer: string = null;
  //
  private _currentIn: number = 0;
  private _currentOut: number = 0;
  private is_busy_update: boolean = false;
  //
  constructor(userinfo: UserInfo, manager: SynchroManager) {
    super(userinfo);
    this.manager = manager;
    this.title = 'Synchro';
  }// constructor
  public get hasApplicationCache():boolean{
    return ((window !== undefined) && (window !== null) &&
      (window.applicationCache !== undefined) && (window.applicationCache !== null));
    }// hasApplicationCache
    public set hasApplicationCache(s:boolean){}
    public get canUpdateCache():boolean {
    return this.hasApplicationCache && (!this.is_busy_update) && (!this.manager.is_busy_export) &&
      (!this.manager.is_busy_import);
      }// canUpdateCavhe
      public set canUpdateCache(s:boolean){}
  public updateCache():void{
    if ((window !== undefined) && (window !== null) &&
      (window.applicationCache !== undefined) && (window.applicationCache !== null)){
    this.is_busy_update = true;
    window.applicationCache.update();
    this.is_busy_update = false;
    this.userInfo.logout();
    }
    }// updateCache
  public canActivate(params?: any, config?: any, instruction?: any): any {
      let px = this.person;
      return (px !== null) && (px.id !== null);
  }// activate
  //
  protected display_string(s: string, direction: string): void {
    if (direction == SYNC_IN) {
      this.status_In = s;
    } else {
      this.status_Out = s;
    }
  }
  protected display_info(info: any, direction: string): void {
    let val: string = ((info !== undefined) && (info !== null)) ? JSON.stringify(info) : '';
    if (direction == SYNC_IN) {
      this.outputString_In = val;
    } else {
      this.outputString_Out = val;
    }
  }
  protected process_sync_message(direction: string, type: string, info: any, error: any) {
    if (type == SYNC_STARTED) {
      this.display_string('REPLICATION STARTED...', direction);
      if (direction == SYNC_IN) {
      this._currentIn = 0;
      } else if (direction == SYNC_OUT) {
      this._currentOut = 0;
      }
    } else if (type == SYNC_PAUSED) {
      if (error !== null) {
        this.display_string('PAUSE: Error ' + JSON.stringify(error), direction);
      } else {
        this.display_string('PAUSE...', direction);
      }
      this.manager.terminate_replication(direction);
    } else if (type == SYNC_ERROR) {
      if (error !== null) {
        this.display_string('ERROR: ' + JSON.stringify(error), direction);
      } else {
        this.display_string('ERROR...', direction);
      }
    } else if (type == SYNC_COMPLETED) {
      this.display_string('COMPLETED!', direction);
      this.display_info(info, direction);
    }else if (type == SYNC_CHANGED) {
    let ss: string = "changed... ";
      if (direction == SYNC_IN){
      this._currentIn++;
      ss = ss + this._currentIn + " ...";
      } else if (direction == SYNC_OUT){
      this._currentOut++;
      ss = ss + this._currentOut + " ...";
      }
      this.display_string(ss, direction);
      this.display_info(info, direction);
    }
  }// process_sync_message
  protected message_received(message:IInfoMessage) : Promise<boolean> {
    let direction = message.categ;
    let type = message.type;
    let info = message.value;
    let error = message.error;
    this. process_sync_message(direction, type, info, error);
    return Promise.resolve(true);
  }// message_received
  public get servers():string[]{
    return this.manager.servers;
  }
  public get currentServer(): string {
    return this.manager.currentServer;
  }
  public set currentServer(s: string) {
    this.manager.currentServer = s;
  }
  public clear_import(): void {
    this.outputString_In = null;
    this.status_In = null;
  }
  public clear_export(): void {
    this.outputString_Out = null;
    this.status_Out = null;
  }
  //
  public get canImport(): boolean {
    return this.manager.canImport;
  }
  public set canImport(s: boolean) { }
  public get cannotImport(): boolean {
    return (!this.canImport);
  }
  public set cannotImport(s: boolean) { }
  public import_from(): void {
    this.status_In = null;
    this.manager.import_from();
  }
  public cancel_import(): void {
    this.manager.cancel_import();
  }
  public cancel_export(): void {
    this.manager.cancel_export();
  }
  public get canCancelImport(): boolean {
    return this.manager.is_busy_import;
  }
  public set canCancelImport(s: boolean) { }
  public get cannotCancelImport(): boolean {
    return (!this.canCancelImport);
  }
  public set cannotCancelImport(s: boolean) { }
  //
  public get canExport(): boolean {
    return this.manager.canExport;
  }
  public set canExport(s: boolean) { }
  public get cannotExport(): boolean {
    return (!this.canExport);
  }
  public set cannotExport(s: boolean) { }
  public export_to(): void {
    this.status_Out = null;
    this.manager.export_to();
  }
  public get canCancelExport(): boolean {
    return this.manager.is_busy_export;
  }
  public set canCancelExport(s: boolean) { }
  public get cannotCancelExport(): boolean {
    return (!this.canCancelExport);
  }
  public set cannotCancelExport(s: boolean) { }
  //
  public get canRemoveServer(): boolean {
    return (this.currentServer !== null) && (this.currentServer.trim().length > 0);
  }
  public set canRemoveServer(s: boolean) { }
  public get cannotRemoveServer(): boolean {
    return (!this.canRemoveServer);
  }
  public set cannotRemoveServer(s: boolean) { }
  public removeServer(): void {
    this.manager.remove_server(this.currentServer);
  }// removeServer
  //
  public get canAddServer(): boolean {
    return (this.candidateServer !== null) && (this.candidateServer.trim().length > 0);
  }
  public set cannAddServer(s: boolean) { }
  public get cannotAddServer(): boolean {
    return (!this.canAddServer);
  }
  public set cannotAddServer(s: boolean) { }
  public addServer(): void {
    this.manager.add_server(this.candidateServer);
    this.candidateServer = null;
  }// addServer
  //
}// class SynchroView
