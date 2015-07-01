//admin-router.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../../../typings/aurelia/aurelia-router.d.ts"/>

///
import {Router} from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import * as mrouter from 'aurelia-router';
import {BaseView} from '../../viewmodel/baseview';
import * as userinf from '../../viewmodel/userinfo';
//
const HOME: string = '../welcome';
const DEPARTEMENTS: string = './departements';
const GROUPES: string = './groupes';
const UNITES: string = './unites';
const ANNEES: string = './annees';
const SEMESTRES: string = './semestres';
const MATIERES: string = './matieres';
const OPERATORS: string = './administrators';
const ENSEIGNANTS: string = './enseignants';
const ETUDIANTS: string = './etudiants';
const PROFAFFECTATIONS:string = './profaffectations';
const ETUDAFFECTATIONS:string = './etudaffectations';
//
@autoinject
export class AdminRouter extends BaseView {
    public heading: string = 'Administration';
    public router: mrouter.Router;
    //
    constructor(userinfo: userinf.UserInfo) {
        super(userinfo);
    }// constructor
    //
    public configureRouter(config, router: mrouter.Router) {
        config.map([
            { route: ['', 'welcome'], moduleId: HOME, nav: true, title: 'Accueil' },
            { route: 'etudaff', moduleId: ETUDAFFECTATIONS, nav: true, title: 'Aff. Etuds.' },
            { route: 'profaff', moduleId: PROFAFFECTATIONS, nav: true, title: 'Aff. Enseign.' },
            { route: 'semestres', moduleId: SEMESTRES, nav: true, title: 'Semestres' },
            { route: 'annees', moduleId: ANNEES, nav: true, title: 'Années' },
            { route: 'etuds', moduleId: ETUDIANTS, nav: true, title: 'Etudiants' },
            { route: 'profs', moduleId: ENSEIGNANTS, nav: true, title: 'Enseignants' },
            { route: 'groupes', moduleId: GROUPES, nav: true, title: 'Groupes' },
            { route: 'matieres', moduleId: MATIERES, nav: true, title: 'Matières' },
            { route: 'unites', moduleId: UNITES, nav: true, title: 'Unités' },
            { route: 'opers', moduleId: OPERATORS, nav: true, title: 'Opérators' },
            { route: 'departements', moduleId: DEPARTEMENTS, nav: true, title: 'Départements' }
        ]);
        this.router = router;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.person;
        return (px !== null) && (px.id !== null);
    }// activate
}
