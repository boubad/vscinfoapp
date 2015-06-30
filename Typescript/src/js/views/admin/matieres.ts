//matieres.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {DepSigleNameViewModel} from '../../viewmodel/depsiglenamemodel';
import {Matiere} from '../../data/domain/matiere';
import {InfoRoot} from '../../utils/inforoot';
//import {IUIManager, IDepartement} from 'infodata';
//
@autoinject
export class Matieres extends DepSigleNameViewModel<Matiere> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Matières';
    }// constructor
	protected create_item(): Matiere {
		return new Matiere({
			departementid: this.departementid,
			uniteid: this.uniteid
		});
	}
	public post_change_unite(): Promise<any> {
		this.modelItem.uniteid = this.uniteid;
		this.currentItem = this.create_item();
		return this.refreshAll();
	}
	protected is_refresh(): boolean {
		return (this.uniteid !== null);
	}
	public get genre(): string {
		return (this.currentItem !== null) ? this.currentItem.genre : null;
	}
	public set genre(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.genre = s;
		}
	}
	public get mat_module(): string {
		return (this.currentItem !== null) ? this.currentItem.mat_module : null;
	}
	public set mat_module(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.mat_module = s;
		}
	}
	public get coefficient(): string {
		return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.coefficient) : null;
	}
	public set coefficient(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			let d = InfoRoot.string_to_number(s);
			x.coefficient = ((d !== null) && (d > 0)) ? d : null;
		}
	}
	public get ecs(): string {
		return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.ecs) : null;
	}
	public set ecs(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			let d = InfoRoot.string_to_number(s);
			x.ecs = ((d !== null) && (d > 0)) ? d : null;
		}
	}
}// class Matieres
