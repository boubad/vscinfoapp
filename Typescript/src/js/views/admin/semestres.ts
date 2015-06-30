//annees.ts
//
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
//
import * as userinf from '../../viewmodel/userinfo';
import {IntervalViewModel} from '../../viewmodel/intervalmodel';
import {Semestre} from '../../data/domain/semestre';
import {InfoRoot} from '../../utils/inforoot';
//
@autoinject
export class Semestres extends IntervalViewModel<Semestre> {
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
        this.title = 'Semestres';
    }// constructor
    protected create_item(): Semestre {
        return new Semestre({
			departementid: this.departementid,
			anneeid: this.anneeid
		});
    }
	public post_change_annee(): Promise<any> {
		this.modelItem.anneeid = this.anneeid;
		this.currentItem = this.create_item();
		this.minDate = null;
		this.maxDate = null;
		let x = this.annee;
		if (x !== null) {
			this.minDate = InfoRoot.date_to_string(x.startDate);
			this.maxDate = InfoRoot.date_to_string(x.endDate);
		}
		return this.refreshAll();
	}
	protected is_refresh(): boolean {
		return (this.anneeid !== null);
	}
	protected is_storeable(): boolean {
		let pAn = this.annee;
		if ((pAn === null) || (!super.is_storeable())) {
			return false;
		}
		if (!pAn.is_storeable()) {
			return false;
		}
		let t01 = Date.parse(pAn.startDate.toString());
		let t02 = Date.parse(pAn.endDate.toString());
		let t1 = Date.parse(this.currentItem.startDate.toString());
		let t2 = Date.parse(this.currentItem.endDate.toString());
		return (t1 >= t01) && (t1 <= t02) && (t2 >= t01) && (t2 <= t02) &&
			(t1 <= t2);
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		let self = this;
		return super.activate(params, config, instruction).then((r) => {
			let userinfo = self.userInfo;
			if ((userinfo.anneeid === null) && (userinfo.annees.length > 0)) {
				let x = userinfo.annees[0];
				userinfo.anneeid = x.id;
				self.annee = x;
			}
			return true;
		});
	}// activate
}// class Semestres
