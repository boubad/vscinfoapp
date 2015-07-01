//rootview.ts
//
import { UserElement} from './userelement';
import {IBaseItem} from 'infodata';
import * as userinf from './userinfo';
//
export class RootView extends UserElement {
    //
    public title: string = null;
    public errorMessage: string = null;
    public infoMessage: string = null;
    public baseUrl: string = null;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected get_logger_name(): string {
        return 'RootView';
    }
    //
    protected perform_attach(): any {
        let origin = window.location.origin;
        let pathname = window.location.pathname;
        this.baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
        super.perform_attach();
    }// perform_attach
    protected clear_error(): void {
        this.errorMessage = null;
        this.infoMessage = null;
    }
    public get hasErrorMessage(): boolean {
        return ((this.errorMessage !== null) && (this.errorMessage.trim().length > 0));
    }
    public get hasInfoMessage(): boolean {
        return ((this.infoMessage !== null) && (this.infoMessage.trim().length > 0));
    }
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
}// class RootView
