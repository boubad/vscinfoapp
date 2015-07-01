//userelement.ts
/// <reference path="../../../typings/aurelia/aurelia-event-aggregator.d.ts"/>
//
import * as evtagg from 'aurelia-event-aggregator';
//
import {RootElement} from './rootelement';
import * as userinf from './userinfo';
//
import {IObjectStore, IDataService, IInfoMessage} from 'infodata';
//
export class UserElement extends RootElement {
    private _userinfo:userinf.UserInfo;
    constructor(userinfo: userinf.UserInfo) {
        super();
        this._userinfo = userinfo;
    }// constructor
    protected get_logger_name(): string {
        return 'UserElement';
    }
    //
    public get userInfo():userinf.UserInfo {
      return (this._userinfo !== undefined) ? this._userinfo : null;
    }
    public set userInfo(s:userinf.UserInfo){
      this._userinfo = (s !== undefined) ? s : null;
    }
    //
    protected get_event_aggregator(): evtagg.EventAggregator {
        return ((this.userInfo !== undefined) && (this.userInfo !== null)) ?
            this.userInfo.eventAggregator : null;
    }
    protected get_sessionstore(): IObjectStore {
        return ((this.userInfo !== undefined) && (this.userInfo !== null)) ?
            this.userInfo.sessionStore : null;
    }
    protected get_localstore(): IObjectStore {
        return ((this.userInfo !== undefined) && (this.userInfo !== null)) ?
            this.userInfo.localStore : null;
    }
    protected get_dataservice(): IDataService {
        return ((this.userInfo !== undefined) && (this.userInfo !== null)) ?
            this.userInfo.dataService : null;
    }
}// UserElement
