//pouchdatabase.ts
import {DesignDatabase} from './designdatabase';
//
import {Person} from '../../domain/person';

import {EtudAffectation} from '../../domain/etudaffectation';
import {EtudEvent} from '../../domain/etudevent';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudiantPerson} from '../../domain/etudperson';
import {ItemFactory} from '../../domain/itemfactory';
//
import {PERSON_KEY, SUPER_USERNAME, SUPER_LASTNAME, ETUDEVENT_TYPE,
  GROUPEEVENT_TYPE, SUPER_FIRSTNAME,ROLE_SUPER, ROLE_ADMIN}
   from '../../../utils/infoconstants';
import {IBaseItem, IItemFactory, IPerson, IWorkItem,
IProfAffectation, IEtudAffectation, IGroupeEvent, IEtudEvent,
IDatabaseManager} from 'infodata';
import {ETUDEVENTS_BY_PERSON, ETUDEVENTS_BY_SEMESTRE_EVTS,
ETUDEVENTS_BY_SEMESTRE_NOTES} from './databaseconstants';
//
export class PouchDatabase extends DesignDatabase implements IDatabaseManager {
    //
    private _gen: IItemFactory = null;
    //
    constructor(name?: string) {
        super(name);
        this._gen = new ItemFactory();
    }
    //
    public get itemFactory(): IItemFactory {
        return this._gen;
    }
    //
    public check_item(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            Promise.reject(new Error('Item is null'));
        }
        let id = item.id;
        if (id === null) {
            id = item.create_id();
            if (id === null) {
                Promise.reject(new Error('Item has null id'));
            }
            item.id = id;
        }
        if (!item.is_storeable()) {
            Promise.reject(new Error('Item is not storeable'));
        }
        let options: PouchGetOptions = { attachments: true };
        let xdb: IPouchDB = null;
        let generator = this.itemFactory;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(id, options);
        }).then((pOld) => {
            return { ok: true, id: pOld._id, rev: pOld._rev };
        }, (ex: PouchError) => {
            if (ex.status != 404) {
                Promise.reject(new Error(ex.reason));
            }
            let oMap: any = {};
            item.to_map(oMap);
            return xdb.put(oMap);
        }).then((oz) => {
            return xdb.get(id, options);
        }).then((rz) => {
            return generator.create(rz);
        });
    }// check_item
    //
    public check_person(px: IPerson): Promise<IPerson> {
        let pPers: IPerson = null;
        if ((px === undefined) || (px === null)) {
            return Promise.resolve(pPers);
        }
        if (px.id === null) {
            return Promise.resolve(pPers);
        }
        let self = this;
        let deps: string[] = [];
        let annees: string[] = [];
        let semestres: string[] = [];
        let unites: string[] = [];
        let matieres: string[] = [];
        let groupes: string[] = [];
        let affectations: string[] = [];
        let events: string[] = [];
        let bChanged: boolean = false;
        return this.find_item_by_id(px.id, true).then((pz: IPerson) => {
            if ((pz === undefined) || (pz === null)) {
                Promise.reject(new Error('Person not found.'));
            }
            pPers = pz;
            deps = pPers.departementids;
            annees = pPers.anneeids;
            semestres = pPers.semestreids;
            unites = pPers.uniteids;
            matieres = pPers.matiereids;
            groupes = pPers.groupeids;
            affectations = pPers.affectationids;
            events = pPers.eventids;
            //
            let pp: Promise<string[]>[] = [];
            pp.push(self.check_ids(deps));
            pp.push(self.check_ids(annees));
            pp.push(self.check_ids(semestres));
            pp.push(self.check_ids(unites));
            pp.push(self.check_ids(matieres));
            pp.push(self.check_ids(groupes));
            pp.push(self.check_ids(affectations));
            pp.push(self.check_ids(events));
            return Promise.all(pp);
        }).then((rr) => {
            if (rr.length != 8) {
                Promise.reject(new Error('Fetch Error.'));
            }
            pPers.departementids = rr[0];
            if (pPers.departementids.length != deps.length) {
                bChanged = true;
            }
            pPers.anneeids = rr[1];
            if (pPers.anneeids.length != annees.length) {
                bChanged = true;
            }
            pPers.semestreids = rr[2];
            if (pPers.semestreids.length != semestres.length) {
                bChanged = true;
            }
            pPers.uniteids = rr[3];
            if (pPers.uniteids.length != unites.length) {
                bChanged = true;
            }
            pPers.matiereids = rr[4];
            if (pPers.matiereids.length != matieres.length) {
                bChanged = true;
            }
            pPers.groupeids = rr[5];
            if (pPers.groupeids.length != groupes.length) {
                bChanged = true;
            }
            pPers.affectationids = rr[6];
            if (pPers.affectationids.length != affectations.length) {
                bChanged = true;
            }
            pPers.eventids = rr[7];
            if (pPers.eventids.length != events.length) {
                bChanged = true;
            }
            if (bChanged) {
                return self.maintains_item(pPers);
            } else {
                return pPers;
            }
        });
    }// check_person

    public find_item_by_id(id: string, bAttach?: boolean): Promise<IBaseItem> {
        let vRet: IBaseItem = null;
        if ((id === undefined) || (id === null)) {
            return Promise.resolve(vRet);
        }
        let options: PouchGetOptions = {};
        if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
            options.attachments = true;
        }
        let gen = this.itemFactory;
        return this.db.then((dx) => {
            return dx.get(id, options);
        }).then((pOld) => {
            return gen.create(pOld);
        }, (err) => {
            if (err.status == 404) {
                return vRet;
            } else {
                Promise.reject(new Error(err.reason));
            }
        });
    }//find_item_by_id
    public find_items_array(ids: string[]): Promise<IBaseItem[]> {
        if ((ids === undefined) || (ids === null)) {
            return Promise.resolve([]);
        }
        if (ids.length < 1) {
            return Promise.resolve([]);
        }
        let generator = this.itemFactory;
        let options: PouchAllDocsOptions = { keys: ids, include_docs: true };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let bOk = true;
                            if ((r.value !== undefined) && (r.value !== null)) {
                                let val = r.value;
                                if ((val.deleted !== undefined) && (val.deleted !== null)) {
                                    bOk = false;
                                }
                                if ((val.error !== undefined) && (val.error !== null)) {
                                    bOk = false;
                                }
                            }
                            if ((r.doc === undefined) || (r.doc === null)) {
                                bOk = false;
                            }
                            if (bOk) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }
                        }// r
                    }// data
                }// rr
                return oRet;
            });
        });
    }//get_items_array
    public get_items(item: IBaseItem, startKey?: any, endKey?: any): Promise<IBaseItem[]> {
        if ((item === undefined) || (item === null)) {
            Promise.reject(new Error('Invalid argument.'));
        }
        let options: PouchGetOptions = { include_docs: true };
        if ((startKey !== undefined) && (startKey !== null)) {
            options.startkey = startKey;
        } else {
            options.startkey = item.start_key();
        }
        if ((endKey !== undefined) && (endKey !== null)) {
            options.endkey = endKey;
        } else {
            options.endkey = item.end_key();
        }
        let generator = this.itemFactory;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            if ((r.doc !== undefined) && (r.doc !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_items
    public get_all_items(item: IBaseItem): Promise<IBaseItem[]> {
        if ((item === undefined) || (item === null)) {
            Promise.reject(new Error('Invalid argument.'));
        }
        let options: PouchGetOptions = {
            include_docs: true, startkey: item.start_key(), endkey: item.end_key()
        };
        let generator = this.itemFactory;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            if ((r.doc !== undefined) && (r.doc !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_all_items
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
        let rdb: any = null;
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
    protected internal_maintains_one_item(xdb: IPouchDB, item: IBaseItem): Promise<IBaseItem> {
        let oMap: any = {};
        item.to_map(oMap);
        if ((item.id === undefined) || (item.id === null)) {
            oMap._id = item.create_id();
            if ((oMap._id === undefined) || (oMap._id === null)) {
                Promise.reject(new Error("Invalid id"));
            }
        }
        let id = oMap._id;
        let generator = this.itemFactory;
        return xdb.get(id, { attachments: true }).then((p) => {
            oMap._rev = p._rev;
            if ((p._attachments !== undefined) && (p._attachments !== null)) {
                oMap._attachments = p._attachments;
            }
            return xdb.put(oMap);
        }, (err: PouchError) => {
            if (err.status != 404) {
                Promise.reject(new Error(err.reason));
            }
            return xdb.put(oMap);
        }).then((z) => {
            return xdb.get(id, { attachments: true });
        }, (e2: PouchError) => {
            if (e2.status != 409) {
                Promise.reject(new Error(e2.reason));
            }
            return xdb.get(id, { attachments: true });
        }).then((pk) => {
            return generator.create(pk);
        });
    }// maintains_one_item
    public maintains_item(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            Promise.reject(new Error('Invalid argument.'));
        }
        if (!item.is_storeable()) {
            Promise.reject(new Error('Not storeable item.'));
        }
        let generator = this.itemFactory;
        let xdb: IPouchDB = null;
        let oMap: any = {};
        let id: string = null;
        return this.db.then((rdb) => {
            xdb = rdb;
            item.to_map(oMap);
            if ((item.id === undefined) || (item.id === null)) {
                oMap._id = item.create_id();
                if ((oMap._id === undefined) || (oMap._id === null)) {
                    Promise.reject(new Error("Invalid id"));
                }
            }
            id = oMap._id;
            return xdb.get(id, { attachments: true });
        }).then((p) => {
            oMap._rev = p._rev;
            if ((p._attachments !== undefined) && (p._attachments !== null)) {
                oMap._attachments = p._attachments;
            }
            return xdb.put(oMap);
        }, (err: PouchError) => {
            if (err.status != 404) {
                throw new Error(err.reason);
            }
            return xdb.put(oMap);
        }).then((z) => {
            return xdb.get(id, { attachments: true });
        }, (e2: PouchError) => {
            if (e2.status != 409) {
                Promise.reject(new Error(e2.reason));
            }
            return xdb.get(id, { attachments: true });
        }).then((pk) => {
            return generator.create(pk);
        });
    }// maintains_one_item
    public maintains_items(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            Promise.reject(new Error('Invalid argument(s)'));
        }
        let self = this;
        return this.db.then((xdb) => {
            let pp = [];
            for (let item of items) {
                var p = self.internal_maintains_one_item(xdb, item);
                pp.push(p);
            }// item
            return Promise.all(pp);
        });
    }// maintains_items
    public remove_item(item: IBaseItem): Promise<PouchUpdateResponse> {
        if ((item === undefined) || (item === null)) {
            Promise.reject(new Error('Invalid argument(s)'));
        }
        let id = item.id;
        if (id === null) {
            Promise.reject(new Error('Invalid argument(s)'));
        }
        let xdb: IPouchDB = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(id);
        }).then((p) => {
            return xdb.remove(p);
        });
    }// remove_one_item
    public get_etudiant_events(personid: string): Promise<IBaseItem[]> {
        if ((personid === undefined) || (personid === null)) {
            return Promise.resolve([]);
        }
        let self = this;
        let gen = this.itemFactory;
        let startKey = personid;
        let endKey = personid;
        let options: PouchQueryOptions = {
            startkey: startKey, endkey: endKey,
            include_docs: true
        };
        let viewname = ETUDEVENTS_BY_PERSON;
        let oRet: IBaseItem[] = [];
        return this.db.then((xdb) => {
            return xdb.query(viewname, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    let x = gen.create(row.doc);
                    if (x !== null) {
                        oRet.push(x);
                    }
                }// row
            }// rows
            if (oRet.length > 1) {
                let x = oRet[0];
                let pf = x.sort_func;
                oRet.sort(pf);
            }
            return oRet;
        });
    }// get_etudiant_events
    public get_semestre_evts_ids(semestreid: string): Promise<string[]> {
        if ((semestreid === undefined) || (semestreid === null)) {
            return Promise.resolve([]);
        }
        let self = this;
        let startKey = [semestreid];
        let endKey = [semestreid, {}];
        let options: PouchQueryOptions = {
            startkey: startKey, endkey: endKey
        };
        let viewname = ETUDEVENTS_BY_SEMESTRE_EVTS;
        let oRet: string[] = [];
        return this.db.then((xdb) => {
            return xdb.query(viewname, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    oRet.push(row.id);
                }// row
            }// rows
            return oRet;
        });
    }// get_semestre_events_ids
    public get_semestre_notes_ids(semestreid: string): Promise<string[]> {
        if ((semestreid === undefined) || (semestreid === null)) {
            return Promise.resolve([]);
        }
        let self = this;
        let startKey = [semestreid];
        let endKey = [semestreid, {}];
        let options: PouchQueryOptions = {
            startkey: startKey, endkey: endKey
        };
        let viewname = ETUDEVENTS_BY_SEMESTRE_NOTES;
        let oRet: string[] = [];
        return this.db.then((xdb) => {
            return xdb.query(viewname, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    oRet.push(row.id);
                }// row
            }// rows
            return oRet;
        });
    }// get_semestre_notes_ids
}// class PouchDatabase
//
