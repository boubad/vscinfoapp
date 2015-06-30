/// <reference path='../../typings/aurelia/aurelia-router.d.ts' />
//
import {Router} from 'aurelia-router';
//
import {SynchroView} from './views/common/synchro-view';
import {AdminRouter} from './views/admin/admin-router';
//
//
const HOME:string ='./views/welcome';
const SYNCHRO:string =  './views/common/synchro-view';
const ADMIN:string = './views/admin/admin-router';
//
export class App {
	public router:Router;

  configureRouter(config, router:Router){
    config.title = 'InfoApp';
    config.map([
				{ route: ['','home'],  moduleId: HOME, nav: true, title:'Accueil' },
				{ route: 'admin',  moduleId: ADMIN, nav: true, title:'Admin' },
			  { route: 'synchro',  moduleId: SYNCHRO, nav: true, title:'Sync' }
    ]);
    this.router = router;
  }
}
