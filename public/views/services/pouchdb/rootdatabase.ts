//pouchdatabase.ts
//
import {InfoElement} from '../../infoelement';
import * as PouchDB from 'pouchdb';
//
import {DATABASE_NAME} from '../../common/infoconstants';
//
export class RootDatabase extends InfoElement {
  //
  private _db: any = null;
  private _url: string;
  //
  constructor(name?: string) {
    super();
    this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
  }
  //
  public get name():string {
    return this._url;
  }
  //
  protected get db(): Promise<any> {
    if (this._db !== null) {
      return Promise.resolve(this._db);
    }
    let self = this;
    return new Promise((resolve: (r: any) => Promise<any>,
      reject) => {
      try {
        let xx = new PouchDB(self._url, (err: PouchError, xdb: any) => {
          if ((err !== undefined) && (err !== null)) {
            reject(err.reason);
          } else {
            self._db = xdb;
            resolve(self._db);
          }
        });
      } catch (e) {
        let ss = ((e !== undefined) && (e !== null)) ? e.toString(): '';
        console.log('ERROR: ' + ss);
        reject(new Error(ss));
      }

    });
  }// db
  //
  public createIndex(fieldName: string): Promise<boolean> {
    return Promise.resolve(true);
    }// createIndex
  //
  public maintains_design_doc(doc: any): Promise<PouchUpdateResponse> {
    if ((doc === undefined) || (doc === null)) {
      Promise.reject(new Error('Invalid argument'));
    }
    if ((doc._id === undefined) || (doc._id === null)) {
      Promise.reject(new Error('Invalid document _id'));
    }
    let xdb = null;
    return this.db.then((dx) => {
      xdb = dx;
      return xdb.get(doc._id);
    }).then((pOld) => {
      doc._rev = pOld._rev;
      return xdb.put(doc);
    }, (ex) => {
      if (ex.status == 404) {
        return xdb.put(doc);
      } else {
        Promise.reject(new Error(ex.reason));
      }
    }).then((rx) => {
      return rx;
    }, (err2) => {
      if (err2.status == 409) {
        return { ok: true, id: doc._id, rev: doc._id };
      } else {
        throw new Error(err2.reason);
      }
    });
  }// maintains_design_doc
  //
  public maintains_doc(doc: any): Promise<PouchUpdateResponse> {
    if ((doc === undefined) || (doc === null)) {
      Promise.reject(new Error('Invalid argument'));
    }
    if ((doc._id === undefined) || (doc._id === null)) {
      Promise.reject(new Error('Invalid document _id'));
    }
    let xdb = null;
    return this.db.then((dx) => {
      xdb = dx;
      return xdb.get(doc._id, { attachments: true });
    }).then((pOld) => {
      doc._rev = pOld._rev;
      if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
        doc._attachments = pOld._attachments;
      }
      return xdb.put(doc);
    }, (ex) => {
      if (ex.status == 404) {
        return xdb.put(doc);
      } else {
        Promise.reject(new Error(ex.reason));
      }
    });
  }// maintains_doc

  public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
    if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
      (attachmentId === null)) {
      Promise.reject(new Error('Invalid argument(s)'));
    }
    return this.db.then((xdb) => {
      return xdb.getAttachment(docid, attachmentId);
    }).then((p) => {
      return p;
    }, (err) => {
      if (err.status == 404) {
        return null;
      } else {
        Promise.reject(new Error(err.reason));
      }
    });
  }// find_attachment
  public maintains_attachment(docid: string, attachmentId: string,
    attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
    if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
      (attachmentId === null) || (attachmentData === undefined) ||
      (attachmentData === null) || (attachmentType === undefined) ||
      (attachmentType === null)) {
      Promise.reject(new Error('Invalid argument(s)'));
    }
    let xdb = null;
    return this.db.then((d) => {
      xdb = d;
      return xdb.get(docid);
    }).then((p) => {
      return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
    });
  }// maintains_attachment
  public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
    if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
      (attachmentId === null)) {
        Promise.reject(new Error('Invalid argument(s)'));
    }
    let xdb = null;
    return this.db.then((d) => {
      xdb = d;
      return xdb.get(docid);
    }).then((p) => {
      return xdb.removeAttachment(p._id, attachmentId, p._rev);
    });
  }// maintains_attachment
  public isOnline(): Promise<boolean> {
    let self = this;
    return this.db.then((xdb) => {
      return ((xdb !== undefined) && (xdb !== null));
    });
  }// isOnline

  public get_ids(startKey: string, endKey: string): Promise<string[]> {
    if ((startKey === undefined) || (startKey === null) ||
      (endKey === undefined) || (endKey === null)) {
        Promise.reject(new Error('Invalid argument(s)'));
    }
    let options: PouchGetOptions = {
      startkey: startKey, endkey: endKey
    };
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
        let oRet: string[] = [];
        if ((rr !== undefined) && (rr !== null) && (rr.rows !== undefined) &&
          (rr.rows !== null)) {
          for (let r of rr.rows) {
            if (r.id !== undefined) {
              let id = r.id;
              oRet.push(id);
            }
          }// r
        }
        return oRet;
      });
    });
  }//get_ids
  public check_ids(ids:string[]) : Promise<string[]>{
    let oRet:string[] = [];
    if ((ids === undefined) || (ids === null)){
      return Promise.resolve(oRet);
    }
    let oAr:string[] = [];
    for (let x of ids){
      if ((x !== undefined) && (x !== null) && (x.trim().length > 0)){
        oAr.push(x);
      }
    }// x
    if (oAr.length < 1){
      return Promise.resolve(oRet);
    }
    let self = this;
    return this.db.then((xdb)=>{
      return xdb.allDocs({keys:oAr}).then((r)=>{
        if ((r !== undefined) && (r !== null) && (r.rows !== undefined) &&
        (r.rows !== null)){
          for (let p of r.rows){
             let xid = p.id;
             oRet.push(xid);
          }// p
        }
        return oRet;
      });
    });
  }// check_ids
  public remove_all_items(startKey: string, endKey: string): Promise<any> {
    if ((startKey === undefined) || (startKey === null) ||
      (endKey === undefined) || (endKey === null)) {
        Promise.reject(new Error('Invalid argument(s)'));
    }
    let self = this;
    let docs: any[] = [];
    let options: PouchGetOptions = {
      startkey: startKey, endkey: endKey, include_docs: true
    };
    let rdb = null;
    return this.db.then((xdb) => {
      rdb = xdb;
      return rdb.allDocs(options);
    }).then((dd) => {
      for (let x of dd.rows) {
        let d = x.doc;
        docs.push(d);
      }// x
      if (docs.length > 0) {
        return rdb.bulkDocs(docs);
      } else {
        return [];
      }
    });
  }//remove_all_items
}// class PouchDatabase
