//home.ts
/// <reference path="../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import {BaseBean} from './basebean';
import {UserInfo} from './userinfo';
//
@autoinject
export class home extends BaseBean {
  //
  constructor(userinfo: UserInfo) {
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
}// class Login
