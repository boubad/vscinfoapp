//depperson.ts
//
import {DepartementChildItem} from './depchild';
import {IPerson, IDepartementPerson, IDataService, IBaseItem,IUIManager} from 'infodata';
import {InfoRoot} from '../../utils/inforoot';
//
export class DepartementPerson extends DepartementChildItem
    implements IDepartementPerson {
    public personid: string = null;
    public firstname: string = null;
    public lastname: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        } // oMap
    } // constructor
    //
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    public avatardocid(): string {
        return this.personid;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        return s;
    } // create_id
    public update_person(pPers: IPerson): void {
        if (this.id === null) {
            this.id = this.create_id();
        }
        if ((pPers !== undefined) && (pPers !== null)) {
            if (pPers.id === null) {
                pPers.id = pPers.create_id();
            }
            if (pPers.password === null){
                pPers.reset_password();
            }
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            if ((pPers.departementids === undefined)|| (pPers.departementids == null)){
              pPers.departementids = [];
            }
          InfoRoot.add_id_to_array(pPers.departementids, this.departementid);
        }// pPers
    }// update_person
    public remove_person(pPers: IPerson) :void {
      // do nothing here
    }// remove_person
    public check_avatar_url(service:IDataService,man:IUIManager): Promise<IBaseItem> {
      if (this.url !== null){
        return Promise.resolve(this);
      }
      let id = this.personid;
      if (id === null){
        return Promise.resolve(this);
      }
      let self = this;
      let avatarid:string = null;
      let xblob:Blob = null;
      return service.find_item_by_id(id).then((p:IPerson)=>{
         if ((p !== undefined) && (p !== null)){
           avatarid = p.avatarid;
         }
         if (avatarid !== null){
           return service.find_attachment(id,avatarid);
         } else {
           return Promise.resolve(xblob);
         }
      }).then((blob:Blob)=>{
        if ((blob !== undefined) && (blob !== null)){
          self.url = man.createUrl(blob);
        }
        return self;
      });
    }// check_avatarÃ¨url
    public save(service: IDataService): Promise<IBaseItem> {
        if (this.id === null) {
            this.id = this.create_id();
        }
        let id = this.id;
        if ((id === null) || (this.personid === null)) {
            Promise.reject(new Error('Item not storeable error (personid)'));
        }
        let self = this;
        return service.find_item_by_id(this.personid, true).then((pPers: IPerson) => {
            self.update_person(pPers);
            if (pPers !== null) {
                return service.maintains_item(pPers);
            } else {
                return pPers;
            }
        }).then((x) => {
            return service.maintains_item(self);
        });
    }// save
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
    }
    public toString(): string {
        return this.fullname;
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.personid !== null) {
            oMap.personid = this.personid;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
    } // toInsertMap
    public sort_func(p1: IDepartementPerson, p2: IDepartementPerson): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
}
