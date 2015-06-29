// Type definitions for Pouch 0.1
// Project: http://pouchdb.com
// Definitions by: Bill Sears <https://github.com/MrBigDog2U/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
//
/// </// <reference path="../es6.d.ts"/>
interface IPouchDocument {
	_id:string;
	_rev?:string;
	_attachments?:any;
}// interface IPouchDocument
interface PouchError {
		status: number;
		error: string;
		reason: string;
}
interface IPouchAttachment {
		content_type: string;
		digest?: string;
		stub?: boolean;
		data?: any;
		length?: number;
		revpos?: number;
}
interface PouchInfoResponse {
		db_name: string;
		doc_count: number;
		update_seq: string;
		idb_attachement_format?: string;
		sqlite_plugin?: boolean;
		websql_encoding?: string;
}
interface PouchAjaxOptions {
		cache?: boolean;
		headers?: any[];
		timeout?: number;
		username?: string;
		password?: string;
}
interface PouchGetOptions {
		ajax?: PouchAjaxOptions
		attachments?: boolean;
		att_encoding_info?: boolean;
		atts_since?: any[];
		conflicts?: boolean;
		deleted_conflicts?: boolean;
		latest?: boolean;
		local_seq?: boolean;
		meta?: boolean;
		open_revs?: any;
		rev?: string;
		revs?: boolean;
		revs_info?: boolean;
		startkey?: any;
		endkey?: any;
		keys?: any;
		descending?: boolean;
		include_docs?: boolean;
		inclusive_end?: boolean;
		skip?: number;
		limit?: number;
}

interface PouchGetResponse {
		_id: string;
		_rev: string;
		_deleted?: boolean;
		_attachments?: any;
		_conflicts?: any[];
		_deleted_conflicts?: any[];
		_local_seq?: number;
		_revs_info?: any[];
		_revisions?: any[];
		type?: string;
		roles?: string[];
}

interface PouchAllDocsOptions {
		startkey?: string;
		endkey?: string;
		descending?: boolean;
		include_docs?: boolean;
		conflicts?: boolean;
		skip?: number;
		limit?: number;
		keys?: any[];
		inclusive_end?: boolean;
		attachments?: boolean;
}
interface PouchAllDocsItem {
		id: string;
		key: string;
		value: any;
		doc?: any;
}
interface PouchAllDocsResponse {
		offset?: number;
		total_rows: number;
		rows: PouchAllDocsItem[];
}



interface PouchBulkDocsRequest {
		docs: any[];
}

interface PouchUpdateOptions {
		new_edits?: boolean;
}

interface PouchUpdateResponse {
		ok: boolean;
		id: string;
		rev: string;
}


interface PouchFilter {
		map: (doc: any) => void;
		reduce?: (key: string,value: any) => any;
}

interface PouchQueryOptions {
		complete?: any;
		include_docs?: boolean;
		error?: (err: PouchError) => void;
		descending?: boolean;
		reduce?: boolean;
		startkey?: any;
		endkey?: any;
		inclusive_end?: boolean;
		skip?: number;
		limit?: number;
		keys?: any[];
		group?: boolean;
		group_level?: number;
		stale?: string;
}

interface PouchQueryResponse {
		rows: any[];
}
interface GQLOptions {
		select: string;
		where?: string;
		groupBy?: string;
		pivot?: string;
		label?: string;
}//   interfacaGQLOptions


interface PouchAttachmentOptions {
		decode?: boolean;
}

interface PouchCancellable {
		cancel: () => void;
}

interface PouchChangesOptions {
		onChange: (change: PouchChange) => void;
		complete?: (err: PouchError,res: PouchChanges) => void;
		seq?: number;
		since?: number;
		descending?: boolean;
		filter?: PouchFilter;
		continuous?: boolean;
		include_docs?: boolean;
		conflicts?: boolean;
}

interface PouchChange {
		changes: any;
		doc: PouchGetResponse;
		id: string;
		seq: number;
}

interface PouchChanges {
		results: PouchChange[];
}
interface IPouchFuncs {
		enable: (v: string) => void;
		disable: () => void;
}


interface PouchRevsDiffOptions {
}

interface PouchReplicateOptions {
		continuous?: boolean;
		onChange?: (any) => void;
		filter?: any;			// Can be either string or PouchFilter
		complete?: (err: PouchError,res: PouchChanges) => void;
}

interface PouchReplicateResponse {
		ok: boolean;
		start_time: Date;
		end_time: Date;
		docs_read: number;
		docs_written: number;
}
interface PouchReplicateObject {
	cancel : ()=> void;
}

interface PouchReplicate {
	/*
	from : (url:string, opts:PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	from : (url:string, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	to : (url:string, opts:PouchReplicateOptions, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	to : (url:string, callback: (err: PouchError, res: PouchReplicateResponse)=>void) => PouchCancellable;
	*/
		from(url: string,opts: PouchReplicateOptions,callback: (err: PouchError,res: PouchReplicateResponse) => void): PouchCancellable;
		from(url: string,callback: (err: PouchError,res: PouchReplicateResponse) => void): PouchCancellable;
		to(dbName: string,opts: PouchReplicateOptions,callback: (err: PouchError,res: PouchReplicateResponse) => void): PouchCancellable;
		to(dbName: string,callback: (err: PouchError,res: PouchReplicateResponse) => void): PouchCancellable;
}

interface PouchOptions {
		name?: string;
		auto_compaction?: boolean;
		adapter?: string;
		ajax?: PouchAjaxOptions;
}
interface PouchCreateIndexOptions {
	fields: string[];
    name?: string;
    ddoc?: string;
    type?: string;
}
interface PouchCreateIndexResponse {
	result: string;
}
interface PouchIndexDefinition {
	ddoc: string;
	name: string;
	type: string;
	fields: any;
}
interface PouchGetIndexResponse {
	indexes: PouchIndexDefinition[];
}
interface PouchFindOptions {
	selector: any;
	fiels?: string[];
	sort?: any[];
	limit?: number;
	skip?: number;
}
interface PouchFindResponse {
	docs: any[];
}
// Support AMD require
//declare module 'pouchdb' {
//   var PouchDB: PouchDB;
//}

//
// emit is the function that the PouchFilter.map function should call in order to add a particular item to
// a filter view.
//
declare function emit(key: any,value?: any): any;
// Support AMD require
interface IPouchDB {
	//
		new (name: string,opts: PouchOptions,callback: (err: PouchError,res: IPouchDB) => void): IPouchDB;
		new (name: string,callback: (err: PouchError,res: IPouchDB) => void): IPouchDB;
	    constructor(name: string,callback: (err: PouchError,res: IPouchDB) => void);
		destroy(name: string,callback: (err: PouchError) => void): void;
		plugin(p: any): void;
		replicate(source:any,dest:any,options?:any):any;
		debug: IPouchFuncs;
		//
		createIndex: (options: PouchCreateIndexOptions) => Promise<PouchCreateIndexResponse>;
		getIndexes: () => Promise<PouchGetIndexResponse>;
		deleteIndex: (index: PouchIndexDefinition) => Promise<any>;
		find: (request: PouchFindOptions) => Promise<PouchFindResponse>;
		//
		type: () => string;
		id: () => string;
		//close(callback: () => void): void;
		close: () => Promise<any>;
		//
		info: () => Promise<PouchInfoResponse>;
		//    get: (id: string, opts?: PouchGetOptions) => Promise<PouchGetResponse>;
		get: (id: string,opts?: PouchGetOptions) => Promise<PouchGetResponse>;
		allDocs: (opts?: PouchAllDocsOptions) => Promise<PouchAllDocsResponse>;
		bulkDocs: (req: any[],opts?: PouchUpdateOptions) => Promise<PouchUpdateResponse[]>;
		post: (doc: any,opts?: PouchUpdateOptions) => Promise<PouchUpdateResponse>;
		put: (doc: any,opts?: PouchUpdateOptions) => Promise<PouchUpdateResponse>;
		remove: (doc: any,opts?: PouchUpdateOptions) => Promise<PouchUpdateResponse>;
		gql: (q: GQLOptions,callback: (err: PouchError,res: any) => void) => void;
		query: (fun: string | PouchFilter,opts?: PouchQueryOptions) => Promise<PouchQueryResponse>;
		getAttachment: (docId: string,attachmentId: string,opts?: PouchAttachmentOptions) => Promise<any>;
		putAttachment: (docId: string,attachmentId: string,docRev: string,attachment: any,type: string) => Promise<PouchUpdateResponse>;
		removeAttachment: (docId: string,attachmentId: string,docRev: string) => Promise<PouchUpdateResponse>;
		changes: (opts?: PouchChangesOptions) => PouchCancellable;
		revsDiff: (req: any,opts?: PouchRevsDiffOptions) => Promise<any>;
}//
declare var PouchDB:IPouchDB;
declare module "pouchdb"{
  export = PouchDB;
}
