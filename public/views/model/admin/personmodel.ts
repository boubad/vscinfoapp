//personmodel.ts
//
import {UserInfo} from '../userinfo';
import {InfoRoot} from '../../common/inforoot';
import {BaseEditViewModel} from '../baseeditmodel';
import {EMPTY_STRING} from '../../common/infoconstants';
import {IPerson, IDepartementPerson, IUIManager} from 'infodata';
//
export class PersonViewModel<T extends IDepartementPerson, V extends IPerson>
    extends BaseEditViewModel<T> {
    //
    private _current_person: V = null;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        if (this._current_person === null) {
            this._current_person = this.create_person();
        }
        return super.activate(params, config, instruction);
    }// activate
    public post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.refreshAll();
        });
    }// post_change_departement
    public get currentPerson(): V {
        return this._current_person;
    }
    public set currentPerson(s: V) {
        this._current_person = ((s !== undefined) && (s !== null)) ?
         s : this.create_person();
    }
    //
    public reset_password(): any {
      let x:IPerson = this.currentPerson;
      let id = (x !== null) ? x.id : null;
      if ((id === null) || (x.rev === null)){
        return;
      }
      let self = this;
      let service = this.dataService;
      this.clear_error();
      return service.find_item_by_id(id,true).then((pPers:IPerson)=>{
        pPers.reset_password();
        return service.maintains_item(pPers);
      }).then((r)=>{
        self.infoMessage = 'Mot de passe modifié.';
      }).catch((err)=>{
        self.set_error(err);
      });
    }// reset_password
    //
    public saveAvatar(): any {
      let f = this.fileDesc;
      let p = this.currentPerson;
      if ((f === null) || (p === null)) {
        return;
      }
      if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
        return;
      }
      let id = p.id;
      if (id === null) {
        return;
      }
      let avatarid = f.name;
      let type = f.type;
      let data = f.data;
      if ((avatarid === null) || (type === null) || (data === null)) {
        return;
      }
      let service = this.dataService;
      this.clear_error();
      let self = this;
      return service.maintains_attachment(id, avatarid, data, type).then((r) => {
        p.avatarid = avatarid;
        return service.maintains_item(p);
      }).then((px) => {
        p.url = self.fileDesc.remove_url();
        self.fileDesc.clear();
        self.infoMessage = 'Avatar modifiÃ©.';
      }).catch((err) => {
        self.set_error(err);
      });
    }// saveAvatar
    //
    protected create_person(): V {
        return null;
    }
    protected post_change_item(): Promise<any> {
        this.currentPerson = null;
        let self = this;
        let p = this.currentItem;
        let personid = (p !== null) ? p.personid : null;
        return super.post_change_item().then((r) => {
            if (personid !== null) {
                return self.dataService.find_item_by_id(personid);
            } else {
                return null;
            }
        }).then((pPers: V) => {
            self.currentPerson = pPers;
        });
    }// post_change_item
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected is_storeable(): boolean {
        return (this.currentPerson !== null) &&
        this.currentPerson.is_storeable() && (this.departementid !== null);
    }
    public get username(): string {
        return this.currentPerson.username;
    }
    public set username(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.username = s;
        }
    }
    public get firstname(): string {
        return this.currentPerson.firstname;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get lastname(): string {
        return this.currentPerson.lastname;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
    }
    public get email(): string {
        return this.currentPerson.email;
    }
    public set email(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.email = s;
        }
    }
    public get phone(): string {
        return this.currentPerson.phone;
    }
    public set phone(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.phone = s;
        }
    }
    public save(): any {
        let pPers = this.currentPerson;
        if ((this.departementid === null) || (pPers === null)) {
            return;
        }
        if (!pPers.is_storeable()) {
            return;
        }
        let item = this.currentItem;
        if (item === null) {
            item = this.create_item();
            if (item === null) {
                return;
            }
        }
        if (pPers.password === null){
            pPers.reset_password();
        }
        item.update_person(pPers);
        var self = this;
        let bOld = (item.rev !== null);
        this.clear_error();
        let service = this.dataService;
        return service.maintains_item(pPers).then((px) => {
            return service.maintains_item(item);
        }).then((ox) => {
            if (bOld) {
                self.refresh();
            } else {
                self.refreshAll();
            }
        }).catch((err) => {
            self.set_error(err);
        });
    }// save
}// class PersonViewModel
