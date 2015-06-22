//admin-router.ts
/// <reference path="../../../../typings/aurelia/aurelia-framework.d.ts"/>
/// <reference path="../../common/sessionstore"/>
///
import {Router} from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import {BaseBean} from '../basebean';
import {UserInfo} from '../userinfo';
//
//const DUMMY_MODULE = '../not-implemented';
const HOME_MODULE: string = '../home';
//
@autoinject
export class AdminRouter extends BaseBean {
  public heading: string = 'Administration';
  public router: Router;
  //
  constructor(userinfo: UserInfo) {
      super(userinfo);
      this.title = 'Administration';
  }// constructor
  //
  public configureRouter(config, router: Router) {
    config.map([
      { route: ['', 'home'], moduleId: HOME_MODULE, nav: true, title: 'Accueil' },
      { route: 'etudaffectations', moduleId: './etudaffectations', nav: true, title: 'Affectations étudiants' },
      { route: 'profaffectations', moduleId: './profaffectations', nav: true, title: 'Affectations enseignants' },
      { route: 'etudiants', moduleId: './etudiants', nav: true, title: 'Etudiants' },
      { route: 'enseignants', moduleId:'./enseignants', nav: true, title: 'Enseignants' },
      { route: 'semestres', moduleId : './semestres', nav: true, title: 'semestres' },
      { route: 'annees', moduleId:'./annees', nav: true, title: 'Années' },
      { route: 'matieres', moduleId: './matieres', nav: true, title: 'Matières' },
      { route: 'groupes', moduleId: './groupes', nav: true, title: 'Groupes' },
      { route: 'unites', moduleId: './unites', nav: true, title: 'Unités' },
      { route: 'administrators', moduleId:'./administrators', nav: true, title: 'Opérateurs' },
      { route: 'departements', moduleId: './departements', nav: true, title: 'Départements' }
    ]);

    this.router = router;
  }
  public canActivate(params?: any, config?: any, instruction?: any): any {
      let px = this.person;
      return (px !== null) && (px.id !== null) && px.is_admin;
  }// activate
}
