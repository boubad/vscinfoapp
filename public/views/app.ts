// app.ts
/// <reference path='../../typings/aurelia/aurelia-framework.d.ts' />
/// <reference path='../../typings/aurelia/aurelia-router.d.ts' />
///
import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
//import {InfoUserInfo} from './model/infouserinfo';
//
const HOME_MODULE: string = './model/home';
const PROFIL_MODULE: string = './model/profil';
const ADMIN_MODULE: string = './model/admin/admin-router';
const CONSULT_MODULE: string = './model/consult/consult-router';
const SYNCHRO_MODULE: string = './model/synchro-view';
//
import {UserInfo} from './model/userinfo';
//const PROFIL_MODULE: string = './model/common/profil';
//const ADMIN_MODULE: string = './model/admin/admin-router';
//const PROF_MODULE: string = './model/prof/prof-router';
//const SYNCHRO_MODULE: string = './model/common/synchro-view';
//
@autoinject
export class App {
    public router: Router = null;
    public userInfo: UserInfo = null;
    //public userInfo: InfoUserInfo = null;
    //
    constructor(userinfo: UserInfo) {
        this.userInfo = userinfo;
    }
    //
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'home'], moduleId: HOME_MODULE, nav: true, title: 'Accueil' },
            { route: 'profil', moduleId: PROFIL_MODULE, nav: true, title: 'Profil' },
            { route: 'consult', moduleId: CONSULT_MODULE, nav: true, title: 'Consultation' },
            { route: 'admin', moduleId: ADMIN_MODULE, nav: true, title: 'Admin' },
            { route: 'synchro', moduleId: SYNCHRO_MODULE, nav: true, title: 'Sync' },
            { route: 'etud/:id/detail', moduleId: './model/consult/etud-detail', nav: false },
            { route: 'groupeevents', moduleId: './model/consult/groupeevents', nav: false },
            { route: 'grpevt/:id/detail', moduleId: './model/consult/groupeevent-detail', nav: false },
            { route: 'etudevt/:id/detail', moduleId: './model/consult/etudevent-detail', nav: false }
        ]);
        this.router = router;
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        if (this.userInfo !== null) {
            return this.userInfo.dataService.check_database();
        } else {
            return Promise.resolve(true);
        }
    }// activate
}
