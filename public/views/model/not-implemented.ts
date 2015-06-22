//not-implemented.ts
//
import {BaseBean} from './basebean';
import {autoinject} from 'aurelia-framework';
//

import {UserInfo} from './userinfo';
//
@autoinject
export class NotImplemented extends BaseBean {
    //
    public heading:string = 'Info App. Not (yet) implemented!';

    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'NotImplemented';
    }
}// NotImplemented
