//depsiglenamemodel.ts
//
import * as userinf from './userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepSigleNameItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepSigleNameItem>
extends SigleNameViewModel<T> {
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    public post_change_departement(): Promise<any> {
        this.modelItem.departementid = this.departementid;
        return this.refreshAll();
    }
     public get isEditable(): boolean {
      return this.isAdmin;
    }
    public activate(params?: any, config?: any, instruction?: any): any {
		let self = this;
		return super.activate(params, config, instruction).then((r) => {
			let userinfo = self.userInfo;
			if ((userinfo.departementid === null) && (userinfo.departements.length > 0)) {
				let x = userinfo.departements[0];
				userinfo.departementid = x.id;
				self.departement = x;
			}
			return true;
		});
	}// activate
}// class BaseEditViewModel
