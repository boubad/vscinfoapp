//designdatabase.ts
import {RootDatabase} from './rootdatabase';
import * as mycrypto from '../../../utils/mycrypto';
import {IBaseItem, IDesignDatabaseManager} from 'infodata';

//
import {PERSON_KEY, SUPER_USERNAME, SUPER_LASTNAME, ETUDEVENT_TYPE, PERSON_PREFIX,
GROUPEEVENT_TYPE, SUPER_FIRSTNAME,
ROLE_SUPER, ROLE_ADMIN}  from '../../../utils/infoconstants';
//
export class DesignDatabase extends RootDatabase implements IDesignDatabaseManager {
    constructor(name?: string) {
        super(name);
    }// constructor
    //
    public check_admin(): Promise<any> {
        let username: string = SUPER_USERNAME;
        let id: string = PERSON_PREFIX + '-' + username.trim().toLowerCase();
        let xdb: any = null;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(id);
        }).then((pOld) => {
            return { ok: true, id: pOld._id, rev: pOld._rev };
        }, (ex) => {
            if (ex.status != 404) {
                Promise.reject(new Error('Admin user find error.'));
            }
            let cc = new mycrypto.MyCrypto();
            return xdb.put({
                _id: id,
                username: username,
                password: cc.md5(username),
                firstname: SUPER_FIRSTNAME,
                lastname: SUPER_LASTNAME,
                type: PERSON_KEY,
                roles: [ROLE_SUPER]
            });
        });
    }// check_admin
    //
    public maintains_design_doc(doc: any): Promise<PouchUpdateResponse> {
        if ((doc === undefined) || (doc === null)) {
            Promise.reject(new Error('Invalid argument'));
        }
        if ((doc._id === undefined) || (doc._id === null)) {
            Promise.reject(new Error('Invalid document _id'));
        }
        let xdb: IPouchDB = null;
        return this.db.then((dx: IPouchDB) => {
            xdb = dx;
            return xdb.get(doc._id);
        }).then((pOld) => {
            doc._rev = pOld._rev;
            return xdb.put(doc);
        }, (ex: PouchError) => {
            if (ex.status == 404) {
                return xdb.put(doc);
            } else {
                Promise.reject(new Error(ex.reason));
            }
        }).then((rx) => {
            return rx;
        }, (err2: PouchError) => {
            if (err2.status == 409) {
                return { ok: true, id: doc._id, rev: doc._id };
            } else {
                Promise.reject(new Error(err2.reason));
            }
        });
    }// maintains_design_doc
    //
    public create_person_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/persons',
            views: {
                by_names: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && ((doc.type == 'person') ||
                            (doc.type == 'etudperson') || (doc.type == 'profperson') ||
                            (doc.type == 'adminperson'))) {
                            if ((doc.lastname !== undefined) && (doc.firstname !== undefined)) {
                                emit([doc.lastname.toUpercase(), doc.firstname.toUppercase()]);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    }
    //
    public create_groupeevent_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/groupeevents',
            views: {
                by_profaffectation: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'groupeevent')) {
                            if ((doc.proaffectationid !== undefined) && (doc.profaffectationid !== null)) {
                                emit(doc.profaffectationid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } // create_groupeevent_design_docs()
    //
    public create_etudevents_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/etudevents',
            views: {
                by_etudaffectation: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudevent')) {
                            if (doc.etudaffectationid !== undefined) {
                                let id = doc.etudaffectationid;
                                let value = doc._rev;
                                emit(id, value);
                            }
                        }
                    }.toString()
                },
                by_groupeevent: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudevent')) {
                            if (doc.groupeeventid !== undefined) {
                                let id = doc.groupeeventid;
                                let value = doc._rev;
                                emit(id, value);
                            }
                        }
                    }.toString()
                },
                by_id: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudevent')) {
                            if (doc.personid !== undefined) {
                                let value = (doc.genre !== undefined) ? doc.genre : null;
                                emit(doc.personid, value);
                            }
                        }
                    }.toString()
                },
                by_semestre_notes: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudevent') &&
                            (doc.genre !== undefined) && (doc.genre == 'note') &&
                            (doc.semestreid !== undefined) && (doc.eventDate !== undefined)) {
                            emit([doc.semestreid, doc.eventDate]);
                        }
                    }.toString()
                },
                by_semestre_evts: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudevent') &&
                            (doc.genre !== undefined) && (doc.genre != 'note') &&
                            (doc.semestreid !== undefined) && (doc.eventDate !== undefined)) {
                            emit([doc.semestreid, doc.eventDate]);
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    }//create_etudevents_design_docs
    public create_profaffectation_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/profaffectations',
            views: {
                by_semestre: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.semestreid !== undefined) && (doc.semestreid !== null)) {
                                emit(doc.semestreid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_matiere: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.matiereid !== undefined) && (doc.matiereid !== null)) {
                                emit(doc.matiereid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_groupe: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.groupeid !== undefined) && (doc.groupeid !== null)) {
                                emit(doc.groupeid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_person: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.personid !== undefined) && (doc.personid !== null)) {
                                emit(doc.personid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_enseignant: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.enseignantid !== undefined) && (doc.enseignantid !== null)) {
                                emit(doc.enseignantid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_etudaffectation_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/etudaffectations',
            views: {
                by_semestre: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudaffectation')) {
                            if ((doc.semestreid !== undefined) && (doc.semestreid !== null)) {
                                emit(doc.semestreid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_groupe: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudaffectation')) {
                            if ((doc.groupeid !== undefined) && (doc.groupeid !== null)) {
                                emit(doc.groupeid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_person: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudaffectation')) {
                            if ((doc.personid !== undefined) && (doc.personid !== null)) {
                                emit(doc.personid, doc._rev);
                            }
                        }
                    }.toString()
                },
                by_etudiant: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                            if ((doc.etudiantid !== undefined) && (doc.etudiantid !== null)) {
                                emit(doc.etudiantid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_semestre_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/semestres',
            views: {
                by_annee: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'semestre')) {
                            if ((doc.anneeid !== undefined) && (doc.anneeid !== null)) {
                                emit(doc.anneeid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_matiere_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/matieres',
            views: {
                by_unite: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'matiere')) {
                            if ((doc.uniteid !== undefined) && (doc.uniteid !== null)) {
                                emit(doc.uniteid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_unite_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/unites',
            views: {
                by_departement: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'unite')) {
                            if ((doc.departementid !== undefined) && (doc.departementid !== null)) {
                                emit(doc.departementid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_annee_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/annees',
            views: {
                by_departement: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'annee')) {
                            if ((doc.departementid !== undefined) && (doc.departementid !== null)) {
                                emit(doc.departementid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_groupe_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/groupes',
            views: {
                by_departement: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'groupe')) {
                            if ((doc.departementid !== undefined) && (doc.departementid !== null)) {
                                emit(doc.departementid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_etudiant_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/etudiants',
            views: {
                by_person: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
                            if ((doc.personid !== undefined) && (doc.personid !== null)) {
                                emit(doc.personid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public create_enseignant_design_docs(): Promise<PouchUpdateResponse> {
        var ddoc = {
            _id: '_design/enseignants',
            views: {
                by_person: {
                    map: function(doc) {
                        if ((doc.type !== undefined) && (doc.type == 'enseignant')) {
                            if ((doc.personid !== undefined) && (doc.personid !== null)) {
                                emit(doc.personid, doc._rev);
                            }
                        }
                    }.toString()
                }
            }
        };
        return this.maintains_design_doc(ddoc);
    } //
    public check_design_docs(): Promise<boolean> {
        let pp = [];
        pp.push(this.create_person_design_docs());
        pp.push(this.create_etudevents_design_docs());
        pp.push(this.create_groupeevent_design_docs());
        pp.push(this.create_profaffectation_design_docs());
        pp.push(this.create_etudaffectation_design_docs());
        pp.push(this.create_semestre_design_docs());
        pp.push(this.create_matiere_design_docs());
        pp.push(this.create_unite_design_docs());
        pp.push(this.create_annee_design_docs());
        pp.push(this.create_groupe_design_docs());
        pp.push(this.create_etudiant_design_docs());
        pp.push(this.create_enseignant_design_docs());
        //
        return Promise.all(pp).then((r) => {
            return ((r !== undefined) && (r !== null));
        }).catch((err) => {
            let ss: string = ((err !== undefined) && (err !== null)) ? JSON.stringify(err) : 'Error';
            console.log(ss);
            return false;
        });
    }// check_design_docs
    public check_database(): Promise<any> {
        let self = this;
        return this.db.then((dw) => {
            let name: string = '_design/enseignants';
            return dw.get(name);
        }).then((rx) => {
            return true;
        }, (err: PouchError) => {
            if (err.status == 404) {
                return self.check_design_docs();
            } else {
                Promise.reject(new Error(err.reason));
            }
        }).then((bRet) => {
            return self.check_admin();
        }).catch((e) => {
            return false;
        });
    }// check_database
    public get_children_ids(viewName: string, keyVal: string): Promise<string[]> {
        let oRet: string[] = [];
        if ((viewName === undefined) || (viewName === null) ||
            (keyVal === undefined) || (keyVal === null)) {
            return Promise.resolve(oRet);
        }
        let options: PouchQueryOptions = {
            startkey: keyVal, endkey: keyVal
        };
        return this.db.then((xdb: IPouchDB) => {
            return xdb.query(viewName, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    if ((row.id !== undefined) && (row.id !== null)) {
                        oRet.push(row.id);
                    }
                }// row
            }// rows
            return oRet;
        });
    }// perforl_remove_children
}// class DesignDatabase
