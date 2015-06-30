//userelement.ts
/// <reference path="../../../typings/aurelia/aurelia-event-aggregator.d.ts"/>
//
import * as evtagg from 'aurelia-event-aggregator';
//
import {RootElement} from './rootelement';
import * as userinf from './userinfo';
import {DEPARTEMENT_TYPE, ANNEE_TYPE, SEMESTRE_TYPE, UNITE_TYPE, MATIERE_TYPE, GROUPE_TYPE,
MESSAGE_DOMAIN} from '../utils/infoconstants';
//
import {IObjectStore, IDataService, IInfoMessage} from 'infodata';
//
export class UserElement extends RootElement {
    //
    public _userInfo: userinf.UserInfo;
    //
    constructor(userinfo: userinf.UserInfo) {
        super();
        this._userInfo = userinfo;
    }// constructor
    protected get_logger_name(): string {
        return 'UserElement';
    }
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
    public get userInfo(): userinf.UserInfo {
        return (this._userInfo !== undefined) ? this._userInfo : null;
    }
    public set userInfo(s: userinf.UserInfo) {
        this._userInfo = (s !== undefined) ? s : null;
    }
    protected message_received(message: IInfoMessage): Promise<boolean> {
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
        }
        return Promise.resolve(true);
    }// message_received
    public post_change_departement(): Promise<any> {
        return Promise.resolve(true);
    }
    public post_change_annee(): Promise<any> {
        return Promise.resolve(true);
    }
    public post_change_unite(): Promise<any> {
        return Promise.resolve(true);
    }
    public post_change_groupe(): Promise<any> {
        return Promise.resolve(true);
    }
    public post_change_semestre(): Promise<any> {
        return Promise.resolve(true);
    }
    public post_change_matiere(): Promise<any> {
        return Promise.resolve(true);
    }
}// UserElement
