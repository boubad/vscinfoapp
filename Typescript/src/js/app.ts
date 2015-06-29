/// <reference path='../../typings/aurelia/aurelia-router.d.ts' />
//
import {Router} from 'aurelia-router';
//
const HOME ='./welcome';
//
export class App {
	public router:Router;

  configureRouter(config, router:Router){
    config.title = 'InfoApp';
    config.map([
      { route: ['','home'],  moduleId: HOME,      nav: true, title:'Accueil' }
    ]);

    this.router = router;
  }
}
