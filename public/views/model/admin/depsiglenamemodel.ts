//depsiglenamemodel.ts
//
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepSigleNameItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepSigleNameItem>
extends SigleNameViewModel<T> {
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    public post_change_departement(): Promise<any> {
        this.modelItem.departementid = this.departementid;
        this.currentItem = this.create_item();
        return this.refreshAll();
    }
}// class BaseEditViewModel
