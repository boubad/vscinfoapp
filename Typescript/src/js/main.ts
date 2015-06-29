/// <reference path='../../typings/aurelia/aurelia-framework.d.ts' />
//
import {Aurelia} from 'aurelia-framework';

export function configure(aurelia:Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./js/resources/index');
  aurelia.start().then(a => a.setRoot('./js/app'));
}
