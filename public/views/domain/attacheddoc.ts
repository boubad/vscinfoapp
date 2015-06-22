//attacheddoc.ts
//
import {InfoElement} from '../infoelement';
import {IAttachedDoc} from 'infodata';
import {InfoRoot} from '../common/inforoot';
//
export class AttachedDoc extends InfoElement implements IAttachedDoc {
    //
    public id: string = null;
    public name: string = null;
    public mime_type: string = null;
    public data: any = null;
    public description: string = null;
    public keywords: string[] = null;
    //
    constructor(oMap?: any) {
        super();
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.id !== undefined) {
                this.id = oMap.id;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.mime_type !== undefined) {
                this.mime_type = oMap.mime_type;
            }
            if (oMap.data !== undefined) {
                this.data = oMap.data;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
            if (oMap.keywords !== undefined) {
                this.keywords = oMap.keywords;
            }
        }
    }// constructor
    //
    public is_storeable(): boolean {
        return (this.id !== null) && (this.mime_type !== null) && (this.data !== null);
    }// is_storeable
    public toString(): string {
        return (this.name !== null) ? this.name : this.id;
    }
    public get text(): string {
        return this.toString();
    }
}// class AttachedDoc
