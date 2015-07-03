// infodata.d.ts
//
/// <reference path='../../typings/es6.d.ts' />
//
declare module 'infodata' {
    //
    export interface IInfoElement {

    }// interface IInfoElement
    //
    export interface IAttachedDoc extends IInfoElement {
        id?: string;
        name?: string;
        mime_type?: string;
        data?: Blob;
        description?: string;
        keywords?: string[];
        text?: string;
        //
        is_storeable?: () => boolean;
    } // interface IAttachedDoc
    //
    export interface IElementDesc extends IInfoElement {
        id: string;
        text: string;
        rev?: string;
        avatarid?: string;
        url?: string;
        selected?: boolean;
        description?: string;
        //
        is_storeable: () => boolean;
        to_map: (oMap: any) => void;
        toString: () => string;
        sort_func: (p1: IElementDesc, p2: IElementDesc) => number;
    }// interface IElementDesc
    //
    export interface IBaseItem extends IElementDesc {
        type: () => string;
        base_prefix: () => string;
        start_key: () => string;
        end_key: () => string;
        create_id: () => string;
        //
        attachedDocs?: IAttachedDoc[];
        attachments?: any;
        avatardocid?: () => string;
        //
        save: (service: IDataService) => Promise<IBaseItem>;
        remove: (service: IDataService) => Promise<any>;
        save_ifnotexists: (service: IDataService) => Promise<IBaseItem>;
        check_avatar_url: (service: IDataService, man: IUIManager) => Promise<IBaseItem>;
    }// interface IBaseItem
    export interface IPerson extends IBaseItem {
        username: string;
        password: string;
        firstname: string;
        lastname: string;
        email?: string;
        phone?: string;
        roles: string[];
        //
        departementids?: string[];
        anneeids?: string[];
        semestreids?: string[];
        uniteids?: string[];
        matiereids?: string[];
        groupeids?: string[];
        //
        reset_password: () => void;
        change_password: (ct: string) => void;
        check_password: (ct: string) => boolean;
        has_role: (r: string) => boolean;
        is_super: boolean;
        is_admin: boolean;
        is_prof: boolean;
        is_etud: boolean;
        //
        fullname: string;
        //
        affectationids?: string[];
        eventids?: string[];
        administratorids?: string[];
        enseignantids?: string[];
        etudiantids?: string[];
        //
    } // interface IPerson
    export interface IUserPerson extends IPerson {
        affectationids: string[];
        eventids: string[];
    }
    export interface IEtudiantPerson extends IUserPerson {
        etudiantids: string[];
        dossier?: string;
        sexe?: string;
        birthDate?: Date;
        ville?: string;
        etablissement?: string;
        serieBac?: string;
        optionBac?: string;
        mentionBac?: string;
        etudesSuperieures?: string;
        //
        isMale?: boolean;
        isFeminin?: boolean;
    }// interface IEtudiantPerson
    export interface IAdministratorPerson extends IPerson {
        administratorids: string[];
    }
    export interface IEnseignantPerson extends IUserPerson {
        enseignantids: string[];
    }
    export interface ISigleNameItem extends IBaseItem {
        sigle: string;
        name?: string;
    }//interface ISigleNameItem
    export interface IDepartement extends ISigleNameItem {

    }// interface IDepartement
    export interface IDepSigleNameItem extends ISigleNameItem {
        departementid: string;
    }// interface IDepSigleNameItem
    export interface IDepartementChildItem extends IBaseItem {
        departementid: string;
    } // IDepartementChildItem
    export interface IDepartementPerson extends IDepartementChildItem {
        personid: string;
        firstname: string;
        lastname: string;
        fullname: string;
        update_person: (pPers: IPerson) => void;
        remove_person: (pPers: IPerson) => void;
    } // interface IDepartementPerson
    export interface IEnseignant extends IDepartementPerson {

    }// interface IEnseignant
    export interface IAdministrator extends IDepartementPerson {

    }// interface IAdministrator
    export interface IEtudiant extends IDepartementPerson {

    }// interface IEtudiant
    export interface IGroupe extends IDepSigleNameItem {

    }// interface IGroupe
    export interface IUnite extends IDepSigleNameItem {

    }// interface IUnite
    export interface IMatiere extends IDepSigleNameItem {
        uniteid: string;
        genre?: string;
        mat_module?: string;
        coefficient?: number;
        ecs?: number;
    } // interface IMatiere
    export interface IIntervalItem extends IDepSigleNameItem {
        startDate: Date;
        endDate: Date;
    } // interface IIntervalItem
    export interface IAnnee extends IIntervalItem {

    }// interface IAnnee
    export interface ISemestre extends IIntervalItem {
        anneeid: string;
    } // interface ISemestre
    export interface IWorkItem extends IDepartementPerson {
        anneeid: string;
        semestreid: string;
        groupeid: string;
        eventDate?: Date;
        status?: string;
        genre?: string;
        matiereSigle?: string;
        semestreSigle?: string;
        anneeSigle?: string;
        uniteSigle?: string;
        departementSigle?: string;
        groupeSigle?: string;
    } // interface IWorkItem
    export interface IAffectation extends IWorkItem {
        startDate?: Date;
        endDate?: Date;
    }// IAffectationItem
    export interface IInfoEvent extends IWorkItem {
        uniteid: string;
        matiereid: string;
    }
    export interface IProfAffectation extends IAffectation {
        enseignantid: string;
        uniteid: string;
        matiereid: string;
    }// IProfAffectationItem
    export interface IEtudAffectation extends IAffectation {
        etudiantid: string;
    }
    export interface IGroupeEvent extends IInfoEvent {
        profaffectationid: string;
        name: string;
        location?: string;
        startTime?: Date;
        endTime?: Date;
        coefficient?: number;
    } // IGroupeEvent
    export interface IEtudEvent extends IInfoEvent {
        etudaffectationid: string;
        groupeeventid: string;
        note: number;
        groupeEventName?: string;
        coefficient?:number;
        etudiantid?:string;
    }
    export interface IItemFactory extends IInfoElement {
        create: (oMap: any) => IBaseItem;
    }// interface IItemFcatory
    //
    export interface IObjectStore extends IInfoElement {
        get_value: (key: string) => string;
        store_value: (key: string, value: string) => any;
        remove_value: (key: string) => any;
        clear: () => any;
        is_session: boolean;
    }// interface IObjectStore
    //
    export interface IUIManager extends IInfoElement {
        createUrl: (blob: Blob) => string;
        revokeUrl: (url: string) => void;
        confirm: (s: string) => boolean;
    }
    //
    export interface ILoginInfo extends IInfoElement {
        person: IPerson;
        departements: IDepartement[];
        annees: IAnnee[];
        semestres: ISemestre[];
        unites: IUnite[];
        matieres: IMatiere[];
        groupes: IGroupe[];
        administrator: IAdministrator;
        enseignant: IEnseignant;
        etudiant: IEtudiant;
        //
        is_super: boolean;
        is_admin: boolean;
        is_prof: boolean;
        is_etud: boolean;
        //
        clear: () => void;
        login: (username: string, service: IDataService) => Promise<ILoginInfo>;
    }// interface ILoginInfo
    //
    export interface IRootDatabaseManager extends IInfoElement {
        check_ids: (ids: string[]) => Promise<string[]>;
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
        attachmentData: Blob, attachmentType: string) => Promise<any>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
        get_ids: (startkey: string, endKey: string) => Promise<string[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<any>;
    }
    //
    export interface IDesignDatabaseManager extends IRootDatabaseManager {
        isOnline: () => Promise<boolean>;
        check_admin: () => Promise<any>;
        check_design_docs: () => Promise<boolean>;
        check_database: () => Promise<any>
        check_ids: (ids: string[]) => Promise<string[]>;
        get_children_ids: (viewName: string, keyVal: string) => Promise<string[]>;
    }
    //
    export interface IDatabaseManager extends IDesignDatabaseManager {
        find_item_by_id: (id: string, bAttach?: boolean) => Promise<IBaseItem>;
        check_item: (item: IBaseItem) => Promise<IBaseItem>;
        check_items: (items: IBaseItem[]) => Promise<IBaseItem[]>;
        find_items_array: (ids: string[]) => Promise<IBaseItem[]>;
        maintains_item: (item: IBaseItem) => Promise<IBaseItem>;
        maintains_items: (items: IBaseItem[]) => Promise<IBaseItem[]>;
        remove_item: (item: IBaseItem) => Promise<any>;
        get_all_items: (item: IBaseItem) => Promise<IBaseItem[]>;
        get_items: (item: IBaseItem, startKey?: string, endKey?: string) => Promise<IBaseItem[]>;
        get_etudiant_events: (personid: string) => Promise<IBaseItem[]>;
        get_semestre_evts_ids: (semestreid: string) => Promise<string[]>;
        get_semestre_notes_ids: (semestreid: string) => Promise<string[]>;
        check_person: (pPers: IPerson) => Promise<IPerson>;
        get_persons_by_lastnamefirstname: (last: string, first: string) => Promise<IBaseItem[]>;
        get_semestre_matiere_notes: (semestreid: string, matiereid) => Promise<IBaseItem[]>;
    }// IDatabaseManager
    export interface IDataService extends IDatabaseManager {
        get_login_info: (username: string) => Promise<ILoginInfo>;
        get_all_departements: () => Promise<IDepartement[]>;
        get_annee_semestres: (anneeid: string) => Promise<ISemestre[]>;
        get_unite_matieres: (uniteid: string) => Promise<IMatiere[]>;
        get_departement_annees: (depid: string) => Promise<IAnnee[]>;
        get_departement_unites: (depid: string) => Promise<IUnite[]>;
        get_departement_groupes: (depid: string) => Promise<IGroupe[]>;
        get_person_departements: (personid: string) => Promise<IDepartement[]>;
        find_person_by_username: (username: string) => Promise<IPerson>;
        get_etudaffectations: (semestreid: string, groupeid: string) => Promise<IEtudAffectation[]>;
        get_groupeevent_evts: (grpeventid: string, bNote?: boolean) => Promise<IEtudEvent[]>;
        get_groupeevent_all_notes: (grpeventid: string) => Promise<IEtudEvent[]>;
    }
    export interface IFileDesc extends IInfoElement {
        name: string;
        type: string;
        data: Blob;
        url: string;
        //
        is_storeable: boolean;
        clear: () => void;
        changed: (evt: any) => any;
        remove_url: () => string;
    }// interface IFileDesc
    //
    export interface IInfoMessage extends IInfoElement {
        type: string;
        categ?: string;
        value?: any;
        info?: string;
        source?: any;
        error?: string;
        tag?: string;
    }// interface IInfoMessage
    export interface ITransformArray extends IInfoElement {
        transform_map: (oMap: any) => IBaseItem;
        transform_file: (file: File, stype: string) => Promise<IBaseItem[]>;
    }
    export interface IDisplayEtudiant extends IElementDesc {
       personid:string;
       etudiantid:string;
       uniteid:string;
       matiereid:string;
       groupeid:string;
       firstname:string;
       lastname:string;
       has_url:boolean;
       coefficient:number;
       coefficientString:string;
       note:number;
       noteString:string;
       absencesCount:number;
       retardsCount:number;
       miscCount:number;
       notesCount:number;
    }// interface IDisplayEtudiant
}// module infodata
