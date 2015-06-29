//index.ts
/// <reference path='../../../typings/aurelia/aurelia-framework.d.ts' />
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
		aurelia.globalizeResources(['./nav-bar']);
}