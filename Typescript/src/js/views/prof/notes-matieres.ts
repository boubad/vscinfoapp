//notes-matieresl.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
//
import {autoinject} from 'aurelia-framework';
import * as userinf  from '../../viewmodel/userinfo';
import {InfoRoot} from '../../utils/inforoot';
import {RootConsultViewModel} from '../../viewmodel/rootconsultmodel';
import {IDisplayEtudiant, IEtudEvent} from 'infodata';
//
@autoinject
export class NotesMatieres extends RootConsultViewModel<IDisplayEtudiant> {
    //
    private _all_data: IDisplayEtudiant[] = [];
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected is_refresh(): boolean {
        return (this.semestreid !== null) && (this.matiereid !== null);
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_activate();
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            if (self.items.length < 1) {
                self.refreshAll();
            }
        });
    }// activate
    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._all_data = [];
    }
    private transform_data(pp: IEtudEvent[]): Promise<IDisplayEtudiant[]> {
        let oRet: IDisplayEtudiant[] = [];
        return Promise.resolve(oRet);
    }// transformData
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.get_semestre_matiere_notes(this.semestreid, this.matiereid).then((pp: IEtudEvent[]) => {
            return self.transform_data(pp);
        }).then((zz: IDisplayEtudiant[]) => {
            self._all_data = zz;
            let nt = self._all_data.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            return self.refresh();
        });
    }// refreshAll
    public refresh(): Promise<any> {
        this.clear_error();
        this.items = [];
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nbItems = this._all_data.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart < 0) && (istart >= nbItems)) {
            return Promise.resolve(true);
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend < 0) && (iend >= nbItems)) {
            return Promise.resolve(true);
        }

    }// refresh

}// class BaseEditViewModel
