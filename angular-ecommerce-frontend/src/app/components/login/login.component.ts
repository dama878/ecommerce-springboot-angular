import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';
import { config } from 'rxjs';
const DEFAULT_ORIGINAL_URI = "http://localhost:4200";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  
  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo3.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      features: {
        registration: true,
      },
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
        
      },
      idps: [
        
        { type: 'GITHUB', id: '0oa9jn53qq33CAgRp5d7' },
      ],
      idpDisplay: 'SECONDARY'
    });
   }
   

  ngOnInit(): void {
    // const originalUri = this.oktaAuth.getOriginalUri();
    // if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
    //   this.oktaAuth.setOriginalUri('/');
    // }

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget',scopes: myAppConfig.oidc.scopes}, // this name should be same as div tag id in login.component.html
      
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
    
  }

  ngOnDestroy(): void {
    this.oktaSignin.remove();
  }

}
