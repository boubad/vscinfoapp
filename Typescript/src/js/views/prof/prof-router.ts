//prof-router.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../../../typings/aurelia/aurelia-router.d.ts"/>
///
import * as mrouter from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import {BaseView} from '../../viewmodel/baseview';
import * as userinf from '../../viewmodel/userinfo';
//
const HOME_MODULE: string = '../welcome';
//
@autoinject
export class ProfRouter extends BaseView {
    public router: mrouter.Router;
    public heading: string = 'Devoirs';
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public configureRouter(config, router: mrouter.Router): any {
        config.map([
          { route: ['', 'welcome'], moduleId: HOME_MODULE, nav: true, title: 'Accueil' },
        //  { route: 'semestres-notes', moduleId: './notes-matieres', nav: true, title: 'Notes Semestre' },
          { route: 'etudevents-view', moduleId: './etudevents-view', nav: true, title: 'Liste Evts' },
          { route: 'groupeevents-view', moduleId: './groupeevents-view', nav:true,title:'Liste Devoirs'},
          { route: 'groupeevents', moduleId: './groupeevents', nav: true, title: 'Edition Devoirs' },
          { route: 'etud/:id/detail', moduleId: './etud-detail', nav: false },
          { route: 'groupeevents', moduleId: './groupeevents', nav: false },
          { route: 'grpevt/:id/detail', moduleId: './groupeevent-detail', nav: false },
          { route: 'etudevt/:id/detail', moduleId: './etudevent-detail', nav: false }
        ]);
        this.router = router;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.person;
        return (px !== null) && (px.id !== null);
    }// activate
} // class ProfRouter
