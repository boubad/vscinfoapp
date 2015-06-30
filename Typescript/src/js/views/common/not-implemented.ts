//not-implemented.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {BaseView} from '../../viewmodel/baseview';
import * as userinf from '../../viewmodel/userinfo';
//
@autoinject
export class NotImplemented extends BaseView {
    //
    public heading: string = 'Info App. Not (yet) implemented!';

    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'NotImplemented';
    }
}// NotImplemented
