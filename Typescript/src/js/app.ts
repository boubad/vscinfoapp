/// <reference path="../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path='../../typings/aurelia/aurelia-router.d.ts' />
//
import {autoinject} from 'aurelia-framework';
import * as aurouter from 'aurelia-router';
import * as userinf from './viewmodel/userinfo';

//
import {RootView} from './viewmodel/rootview';
//
const HOME_ROUTE:string = 'welcome';
const HOME: string = './views/welcome';
const SYNCHRO: string = './views/common/synchro-view';
const ADMIN_PAGE: string = './views/admin/admin-router';
const PROFIL: string = './views/common/profil';
const DEVOIRS: string = "./views/prof/prof-router";
//
@autoinject
export class App extends RootView {
    public router:aurouter.Router;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public configureRouter(config, router: aurouter.Router): any {
        config.title = 'InfoApp';
        config.map([
            { route: ['', HOME_ROUTE], moduleId: HOME, nav: true, title: 'Accueil' },
            { route: 'profil', moduleId: PROFIL, nav: true, title: 'Profil' },
            { route: 'prof', moduleId: DEVOIRS, nav: true, title: 'Devoirs' },
            { route: 'admin', moduleId: ADMIN_PAGE, nav: true, title: 'Admin' },
            { route: 'synchro', moduleId: SYNCHRO, nav: true, title: 'Sync' },
            { route: 'etud/:id/detail', moduleId: './views/prof/etud-detail', nav: false },
            { route: 'groupeevents', moduleId: './views/prof/groupeevents', nav: false },
            { route: 'grpevt/:id/detail', moduleId: './views/prof/groupeevent-detail', nav: false },
            { route: 'etudevt/:id/detail', moduleId: './views/prof/etudevent-detail', nav: false }
        ]);
        this.router = router;
    }
    protected perform_logout(): Promise<any> {
        if ((this.router !== undefined) && (this.router !== null)){
           this.router.navigate(HOME_ROUTE,{});
        }
        return Promise.resolve(true);
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_attach();
        return Promise.resolve(true);
    }// activate
    public deactivate(): any {
        this.perform_detach();
    }
}
