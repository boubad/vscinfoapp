/// <reference path='../../typings/aurelia/aurelia-router.d.ts' />
//
import {Router} from 'aurelia-router';
//
import {SynchroView} from './views/common/synchro-view';
import {AdminRouter} from './views/admin/admin-router';
//
//
const HOME: string = './views/welcome';
const SYNCHRO: string = './views/common/synchro-view';
const ADMIN_PAGE: string = './views/admin/admin-router';
const PROFIL: string = './views/common/profil';
//
export class App {
    public router: Router;

    configureRouter(config, router: Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'welcome'], moduleId: HOME, nav: true, title: 'Accueil' },
            { route: 'profil', moduleId: PROFIL, nav: true, title: 'Profil' },
            { route: 'admin', moduleId: ADMIN_PAGE, nav: true, title: 'Admin' },
            { route: 'synchro', moduleId: SYNCHRO, nav: true, title: 'Sync' }
        ]);
        this.router = router;
    }
}
