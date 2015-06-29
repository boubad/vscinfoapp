//baseview.ts
//
/// <reference path="../../../typings/aurelia/aurelia-logging.d.ts"/>
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import * as evtagg from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';
//
import {RootView} from './rootview';
import * as userinf from './userinfo';
//
import {INFO_MESSAGE,INFO_MESSAGE_CHANNEL, ERROR_MESSAGE} from '../utils/infoconstants';
//
import {IBaseItem, IDataService, IPerson, IUIManager,
IElementDesc, IObjectStore, ILoginInfo, IInfoMessage} from 'infodata';
import {UIManager} from '../utils/uimanager';
import {SessionStore} from '../utils/sessionstore';
import {LocalStore} from '../utils/localstore';
import {DataService} from '../data/services/dataservice';
import {InfoMessage} from '../utils/infomessage';
//
export class BaseView extends RootView {
	constructor(userinfo: userinf.UserInfo) {
		super(userinfo);
	}// constructor
	//
	protected get_logger_name(): string {
		return 'BaseView';
	}
	//
	public get photoUrl():string {
        return ((this.userInfo !== undefined) && (this.userInfo !== null)) ?
		 this.userInfo.photoUrl : null;
    }
    public get hasPhotoUrl():boolean {
        return (this.photoUrl !== null);
    }
	//
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
	public get isNotConnected(): boolean {
		return (!this.isConnected);
	}
	public get personid(): string {
		return this.userInfo.personid;
	}
	public get isSuper(): boolean {
		return this.userInfo.is_super;
	}
	public get isAdmin(): boolean {
		return this.userInfo.is_admin;
	}
	public get isProf(): boolean {
		return this.userInfo.is_prof;
	}
	public get isEtud(): boolean {
		return this.userInfo.is_etud;
	}
	//
}// class BaseView
