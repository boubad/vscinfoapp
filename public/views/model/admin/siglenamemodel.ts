//siglenamemodel.ts
//
import {UserInfo} from '../userinfo';
import {BaseEditViewModel} from '../baseeditmodel';
import {ISigleNameItem,IUIManager} from 'infodata';
//
export class SigleNameViewModel<T extends ISigleNameItem> extends BaseEditViewModel<T> {
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get sigle(): string {
        return (this.currentItem !== null) ? this.currentItem.sigle : null;
    }
    public set sigle(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.sigle = s;
        }
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : null;
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s;
        }
    }

}// class BaseEditViewModel
