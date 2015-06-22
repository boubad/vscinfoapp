//prof-router.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../../../typings/aurelia/aurelia-router.d.ts"/>
///
import {Router} from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import {BaseBean} from '../basebean';
import {UserInfo} from '../userinfo';
////
const DUMMY_MODULE:string = '../not-implemented';
const HOME_MODULE: string = '../home';
//
@autoinject
export class ProfRouter extends BaseBean {
    public router: Router = null;
    public heading: string = 'Devoirs';
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public configureRouter(config, router: Router): any {
        config.map([
          { route: ['', 'home'], moduleId: HOME_MODULE, nav: true, title: 'Accueil' },
          { route: 'etudevents-view', moduleId: './etudevents-view', nav: true, title: 'Evts' },
          { route: 'groupeevents-view', moduleId: './groupeevents-view', nav:true,title:'Liste'},
          { route: 'groupeevents', moduleId: './groupeevents', nav: true, title: 'Devoirs' }
        ]);
        this.router = router;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
      return this.isConnected && this.isProf;
    }// activate
} // class ProfRouter
