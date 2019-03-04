import { SalteAuth } from '@salte-io/salte-auth/dist/salte-auth.es6.min.js';

import config from '@salte-ci/src/sci-config.js';

const auth = new SalteAuth({
    providerUrl: config.idp.providerUrl,
    responseType: 'id_token token',
    redirectUrl: location.origin,
    clientId: config.idp.clientId,
    scope: 'openid',
  
    // queryParams: {
    //   audience: config.idp.audience
    // },
  
    endpoints: [
      /^http:\/\/localhost:8080\/(?!socket.io\/)/
    ],
  
    provider: 'auth0'
});

const AuthMixin = function(superClass) {
    return class extends auth.mixin(superClass) {
        set user(user) {
            const oldUser = this._user;
            this._user = user;
            this.groups = this.user && this.user['http://salte.io/groups'] || [];
      
            this.requestUpdate('user', oldUser);
        }

        get user() {
            return this._user;
        }
    }
};

export { auth, AuthMixin };
export default AuthMixin;