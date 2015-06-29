//pouchdatabase.ts
//
/// <reference path='../../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path="../../../infodata.d.ts"/>
//
import * as PouchDB from 'pouchdb';
//import {PouchDB} from 'pouchdb';
//
import {DATABASE_NAME} from '../../../utils/infoconstants';
import {IRootDatabaseManager} from 'infodata';
//
export class RootDatabase implements IRootDatabaseManager {
    //
    private _db: IPouchDB;
    private _url: string;
    //
    constructor(name?: string) {
        this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
    }
    //
    public get db(): Promise<IPouchDB> {
        if ((this._db !== undefined) && (this._db !== null)) {
            return Promise.resolve(this._db);
        }
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                let xx = new PouchDB(self._url, { auto_compaction: true }, (err: PouchError, xdb: any) => {
                    if ((err !== undefined) && (err !== null)) {
                        reject(new Error(err.reason));
                    } else {
                        self._db = ((xdb !== undefined) && (xdb !== null)) ? xdb : null;
                        if (self._db !== null) {
                            resolve(self._db);
                        } else {
                            reject(new Error('Null Database handle'));
                        }
                    }
                });
            } catch (e) {
                let ss = ((e !== undefined) && (e !== null)) ? JSON.stringify(e) : 'Error: ';
                console.log(ss);
                reject(new Error(ss));
            }
        });
    }// db
    //
    public check_ids(ids: string[]): Promise<string[]> {
        let oRet: string[] = [];
        if ((ids === undefined) || (ids === null)) {
            return Promise.resolve(oRet);
        }
        let xx: string[] = [];
        for (let x of ids) {
            if ((x !== undefined) && (x !== null) && (x.trim().length > 0)) {
                xx.push(x);
            }
        }// x
        if (xx.length < 1) {
            return Promise.resolve(oRet);
        }
        let self = this;
        return this.db.then((xdb: IPouchDB) => {
            return xdb.allDocs({ keys: xx });
        }).then((r) => {
            if ((r !== undefined) && (r !== null)) {
                for (let d of r.rows) {
                    oRet.push(d.id);
                }// d
            }// r
            return oRet;
        }).catch((e) => {
            return [];
        })
    }// check_ids
    //
    public maintains_doc(doc: any): Promise<PouchUpdateResponse> {
        if ((doc === undefined) || (doc === null)) {
            Promise.reject(new Error('Invalid argument'));
        }
        if ((doc._id === undefined) || (doc._id === null)) {
            Promise.reject(new Error('Invalid document _id'));
        }
        let xdb: IPouchDB = null;
        return this.db.then((dx: IPouchDB) => {
            xdb = dx;
            return xdb.get(doc._id, { attachments: true });
        }).then((pOld) => {
            doc._rev = pOld._rev;
            if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
                doc._attachments = pOld._attachments;
            }
            return xdb.put(doc);
        }, (ex: PouchError) => {
            if (ex.status == 404) {
                return xdb.put(doc);
            } else {
                Promise.reject(new Error(ex.reason));
            }
        }).then((rx) => {
            return rx;
        }, (err3: PouchError) => {
            if (err3.status == 409) {
                return { ok: true, id: doc._id, rev: doc._id };
            } else {
                Promise.reject(new Error(err3.reason));
            }
        });
    }// maintains_doc

    public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
        let oRet: Blob = null;
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            return Promise.resolve(oRet);
        }
        return this.db.then((xdb: IPouchDB) => {
            return xdb.getAttachment(docid, attachmentId);
        }).then((p) => {
            return p;
        }, (err: PouchError) => {
            if (err.status != 404) {
                Promise.reject(new Error(err.reason));
            }
            return null;
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
        let xdb: IPouchDB = null;
        let rev: string = null;
        return this.db.then((d: IPouchDB) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            rev = p._rev;
            return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
        }).then((rx) => {
            return rx;
        }, (err: PouchError) => {
            if (err.status == 409) {
                return { ok: true, id: docid, rev: rev };
            } else {
                Promise.reject(new Error(err.reason));
            }
        });
    }// maintains_attachment
    public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            Promise.reject(new Error('Invalid argument(s)'));
        }
        let xdb: IPouchDB = null;
        return this.db.then((d: IPouchDB) => {
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
        let oRet: string[] = [];
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            return Promise.resolve(oRet);
        }
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey
        };
        return this.db.then((xdb: IPouchDB) => {
            return xdb.allDocs(options).then((rr) => {
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
    public remove_all_items(startKey: string, endKey: string): Promise<any> {
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            Promise.reject(new Error('Invalid argument(s)'));
        }
        let rdb: IPouchDB = null;
        return this.db.then((xdb: IPouchDB) => {
            rdb = xdb;
            let options: PouchGetOptions = {
                startkey: startKey, endkey: endKey, include_docs: true
            };
            return rdb.allDocs(options);
        }).then((dd) => {
            let docs: any[] = [];
            for (let x of dd.rows) {
                let d = x.doc;
                docs.push({ _id: d.id, _rev: d._rev, _deleted: true });
            }// x
            if (docs.length > 0) {
                return rdb.bulkDocs(docs);
            } else {
                return [];
            }
        });
    }//remove_all_items
}// class PouchDatabase
