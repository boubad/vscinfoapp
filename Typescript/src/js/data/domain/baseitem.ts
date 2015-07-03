//baseitem.ts
//
import {InfoRoot} from '../../utils/inforoot';
import {ElementDesc} from '../../utils/elementdesc';
import {IBaseItem, IAttachedDoc, IDataService,IDesignDatabaseManager,
    IUIManager} from 'infodata';
//
export class BaseItem extends ElementDesc implements IBaseItem {
    //
    public attachments: any = null;
    public attachedDocs: IAttachedDoc[] = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this.attachments = oMap._attachments;
            }
            if ((oMap.attachedDocs !== undefined) && (oMap.attachedDocs !== null)) {
                this.attachedDocs = oMap.attachedDocs;
            }
        }// oMap
    }// constructor
    //
    public save(service: IDataService): Promise<IBaseItem> {
        if (this.id === null) {
            this.id = this.create_id();
        }
        if (!this.is_storeable()) {
            Promise.reject(new Error('Item not storeable error'));
        }
        return service.maintains_item(this);
    }// save
    public remove(service: IDataService): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        return service.remove_item(this);
    }// save
    public save_ifnotexists(service:IDataService) : Promise<IBaseItem>{
      if (this.id === null) {
          this.id = this.create_id();
      }
      if (!this.is_storeable()) {
          Promise.reject(new Error('Item not storeable error'));
      }
      let self = this;
      return service.find_item_by_id(this.id,true).then((px:IBaseItem)=>{
        if (px === null){
          return self.save(service);
        } else {
          return px;
        }
      }).then((rx:IBaseItem)=>{
        return rx;
      });
    }// save_ifnot_exists
    //
    public is_storeable(): boolean {
        return (this.type() !== null) && (this.base_prefix() !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.type = this.type();
        if ((this.attachments !== undefined) && (this.attachments !== null)) {
            oMap._attachments = this.attachments;
        }
        if ((this.attachedDocs !== undefined) &&
            (this.attachedDocs !== null) && (this.attachedDocs.length > 0)) {
            oMap.attachedDocs = this.attachedDocs;
        }
    }// toMap
    //
    public type(): string {
        return null;
    }
    public base_prefix(): string {
        return null;
    }
    public start_key(): string {
        return this.base_prefix();
    }
    public end_key(): string {
        let s = this.start_key();
        if (s !== null) {
            s = s + '\uffff';
        }
        return s;
    }
    public create_id(): string {
        return null;
    }
    //
  
}// class IBaseItem
