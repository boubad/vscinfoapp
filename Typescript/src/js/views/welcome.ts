//home.ts
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {BaseView} from '../viewmodel/baseview';
import * as userinf from '../viewmodel/userinfo';
//
@autoinject
export class home extends BaseView {
  //
  constructor(userinfo:userinf.UserInfo) {
    super(userinfo);
  }
  public get homeImageUrl():string {
	  return this.baseUrl + 'images/' + this.base_image;
  }
  protected get base_image():string{
    if (this.isSuper){
    return "oper.jpg";
    }
  	else if (this.isAdmin){
			return "admin.jpg";
  	} else if (this.isEtud){
			return "etudiant.jpg";
  	} else {
			return "home.jpg";
  	}
  }
  public activate(params?: any, config?: any, instruction?: any): any {
		let self = this;
		return super.activate(params,config,instruction).then((r)=>{
			return self.dataService.check_database();
		});
	}// activate
}// class Login
