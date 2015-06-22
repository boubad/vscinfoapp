//connect-bar.ts
//
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../../typings/aurelia/aurelia-event-aggregator.d.ts"/>
//
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject,bindable} from 'aurelia-framework';
//
import {InfoMessage} from '../common/infomessage';
import {UserInfo} from './userinfo';
import {RootElement} from './rootelement';
import {MESSAGE_LOGIN,MESSAGE_LOGOUT} from '../common/infoconstants';
//
export class ConnectBar  extends RootElement {
  //
  @bindable info: UserInfo = null;
  public username: string = null;
  public password: string = null;
  //
  constructor() {
    super();
  }
  public get imageUrl():string {
    return (this.baseUrl !== null) ? this.baseUrl + 'images/login.jpg' : '../images/login.jpg';
  }
  public attached():any {
    this.perform_attach();
  }
  public detached():any {
    this.perform_detach();
  }
  protected get_event_aggregator():EventAggregator {
    return (this.info !== null) ? this.info.eventAggregator : null;
  }
  public get is_connected(): boolean {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.is_connected : false;
  }
  public set is_connected(s: boolean) { }
  public get is_notconnected(): boolean {
    return (!this.is_connected);
  }
  public set is_notconnected(s: boolean) { }
  public get fullname(): string {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.fullname : null;
  }
  public get has_url(): boolean {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.has_url : false;
  }
  public set has_url(s: boolean) { }
  public get url(): string {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.url : null;
  }
  public get canConnect(): boolean {
    return (this.info !== undefined) &&
    (this.info !== null) && (this.username !== null) && (this.password !== null) &&
      (this.username.trim().length > 0) && (this.password.trim().length > 0);
  }
  public get cannotConnect(): boolean {
    return (!this.canConnect);
  }
  public login(): any {
    if (this.canConnect) {
      let self = this;
      return this.info.login(this.username, this.password).then((bRet)=>{
          let pPers = this.info.person;
          if ((pPers !== null) && (pPers.id !== null) && (pPers.avatarid !== null)
              && (pPers.url === null)) {
              return this.retrieve_one_avatar(pPers);
          }
      });
    } else {
      return false;
    }
  }// login
  public logout(): void {
    if (this.info !== null) {
      if (this.confirm('Voulez-vous vraiment quitter?')) {
        this.username = null;
        this.password = null;
        this.info.logout();
        let msg = new InfoMessage();
        msg.type = MESSAGE_LOGOUT;
        msg.value = this.info.person;
        this.publish_message(msg);
      }
    }
  }
}// class ConnectBar
