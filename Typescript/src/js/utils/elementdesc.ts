//elementdesc.ts
//
import {InfoElement} from './infoelement';
import {IElementDesc,IDataService,IUIManager} from 'infodata';
import {InfoRoot}  from './inforoot';
//
//
export class ElementDesc extends InfoElement implements IElementDesc {
    //
    public id: string = null;
    public rev: string = null;
    public avatarid: string = null;
    public url: string = null;
    public selected: boolean = false;
    public description: string = null;
    //
    constructor(oMap?: any) {
        super();
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.id !== undefined) {
                this.id = oMap.id;
            }
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap.rev !== undefined) {
                this.rev = oMap.rev;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
            if (oMap.url !== undefined) {
                this.url = oMap.url;
            }
        }// oMap
    }// constructor
    public avatardocid(): string {
        return this.id;
    }
    public check_avatar_url(service:IDataService,man:IUIManager): Promise<ElementDesc> {
      if (this.url !== null){
        return Promise.resolve(this);
      }
      let id = this.avatardocid();
      let ava = this.avatarid;
      if ((id === null) || (ava === null)){
        return Promise.resolve(this);
      }
      let self = this;
      return service.find_attachment(id,ava).then((blob)=>{
        if ((blob !== undefined) && (blob !== null)){
          self.url = man.createUrl(blob);
        }
        return self;
      });
    }// check_avatarÃ¨url
    public get text(): string {
        return this.toString();
    }
    public to_map(oMap: any): void {
        if (this.id !== null) {
            oMap._id = this.id;
        }
        if (this.rev !== null) {
            oMap._rev = this.rev;
        }
        if (this.description !== null) {
            oMap.description = this.description;
        }
        if (this.avatarid !== null) {
            oMap.avatarid = this.avatarid;
        }
        if (this.url !== null){
            oMap.url = this.url;
        }
    }// toMap
    public is_storeable(): boolean {
        return true;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public set has_url(b: boolean) { }
    public sort_func(p1: IElementDesc, p2: IElementDesc): number {
        let s1 = p1.text;
        let s2 = p2.text;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    }// sort_func
    public toString(): string {
        return this.id;
    }
}// class ElementDesc
