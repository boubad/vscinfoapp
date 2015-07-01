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
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            return self.refreshAll();
        });
    }
    protected perform_activate(): any {
        super.perform_activate();
        let userinfo = this.userInfo;
        if (userinfo !== null) {
            if ((userinfo.departementid === null) && (userinfo.departements.length > 0)) {
                let x = userinfo.departements[0];
                userinfo.departementid = x.id;
                this.departement = x;
            }
        }
    }
}// class BaseEditViewModel
