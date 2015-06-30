//index.ts
/// <reference path='../../../typings/aurelia/aurelia-framework.d.ts' />
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
		aurelia.globalizeResources(['./nav-bar','./connect-bar',
		'./elements-bar','./siglename-bar','./dep-siglename-bar','./work-bar',
		'./person-bar','./matiere-bar','./interval-bar','./etudiant-bar']);
}
