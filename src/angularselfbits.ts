import {NgModule, ModuleWithProviders} from '@angular/core';
import { Injectable } from '@angular/core';


import { SelfbitsAppConfig } from './utils/interfaces';

import { HttpModule } from '@angular/http';
import {SELFBITS_CONFIG} from "./utils/tokens";
import {SelfbitsAuth} from "./services/auth";
import {SelfbitsDatabase} from "./services/database";
import {SelfbitsFile} from "./services/file";
import {SelfbitsUser} from "./services/user";
import {SelfbitsDevice} from "./services/device";
import {SelfbitsPush} from "./services/push";

@Injectable()
export class SelfbitsAngular {
	constructor(
		public auth : SelfbitsAuth,
		public database : SelfbitsDatabase,
		public file : SelfbitsFile,
		public user : SelfbitsUser,
		public device: SelfbitsDevice,
		public push : SelfbitsPush
	){}
}

// RC4 Provider loader
export const SELFBITS_PROVIDERS:any[] = [
	SelfbitsAngular,
	SelfbitsAuth,
	SelfbitsDatabase,
	SelfbitsFile,
	SelfbitsUser,
	SelfbitsDevice,
	SelfbitsPush
];

export const SelfbitsSetup = (appConfig: SelfbitsAppConfig): any => {
		return [
			{ provide: SELFBITS_CONFIG, useValue: appConfig }
		]
};



// RC5+ using ngModule to load providers
@NgModule({
	providers:SELFBITS_PROVIDERS,
	imports:[ HttpModule ]
})

export class SelfbitsAngularModule{
	static initializeApp(config:SelfbitsAppConfig):ModuleWithProviders{
		return {
			ngModule:SelfbitsAngularModule,
			providers:[
				{ provide: SELFBITS_CONFIG, useValue: config }
			]
		}
	}
}
