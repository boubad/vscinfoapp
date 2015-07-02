//connect-bar.ts
//
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../../typings/aurelia/aurelia-event-aggregator.d.ts"/>
//
import * as evtagg from 'aurelia-event-aggregator';
import {autoinject, bindable} from 'aurelia-framework';
//
import {InfoMessage} from '../utils/infomessage';
import * as userinf from '../viewmodel/userinfo';
import {RootView} from '../viewmodel/rootview';
import {MESSAGE_LOGIN, MESSAGE_LOGOUT,ADMIN_ROUTE, PROF_ROUTE}
 from '../utils/infoconstants';
 import {IPerson} from 'infodata';
//
export class ConnectBar extends RootView {
    //
    @bindable info: userinf.UserInfo;
    public username: string = null;
    public password: string = null;
    //
    constructor() {
        super(null);
    }
    public bind(s: any) {
        this.userInfo = this.info;
    }
    public get imageUrl(): string {
        return (this.baseUrl !== null) ? this.baseUrl + 'images/login.jpg' : '../images/login.jpg';
    }
    public attached(): any {
        this.perform_attach();
        this.userInfo = this.info;
    }
    public detached(): any {
        this.perform_detach();
    }
    protected get_event_aggregator(): evtagg.EventAggregator {
        return (this.userInfo !== null) ? this.userInfo.eventAggregator : null;
    }
    public get is_connected(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_connected : false;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    public get fullname(): string {
        return (this.userInfo !== null) ? this.userInfo.fullname : null;
    }
    public get url(): string {
        return (this.userInfo !== null) ? this.userInfo.photoUrl : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get canConnect(): boolean {
        return (this.userInfo !== null) && (this.username !== null) && (this.password !== null) &&
            (this.username.trim().length > 0) && (this.password.trim().length > 0);
    }
    public get cannotConnect(): boolean {
        return (!this.canConnect);
    }
    public login(): any {
        if (this.canConnect) {
            let self = this;
            return this.userInfo.login(this.username, this.password).then((bRet) => {
                let pPers = self.userInfo.person;
                if ((pPers !== null) && (pPers.id !== null) && (pPers.avatarid !== null)
                    && (pPers.url === null)) {
                    return self.retrieve_one_avatar(pPers).then((pp:IPerson)=>{
                      if (pp !== null){
                        if (pp.is_admin) {
                          self.publish_navigation_message(ADMIN_ROUTE);
                        } else {
                          self.publish_navigation_message(PROF_ROUTE);
                        }
                      }// pp
                    });
                }
            });
        } else {
            return false;
        }
    }// login
    public logout(): void {
        if (this.userInfo !== null) {
            if (this.confirm('Voulez-vous vraiment quitter?')) {
                this.username = null;
                this.password = null;
                this.userInfo.logout();
                let msg = new InfoMessage();
                msg.type = MESSAGE_LOGOUT;
                msg.value = this.info.person;
                this.publish_message(msg);
            }
        }
    }
}// class ConnectBar
