// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/2373d3f801616faa2bc452f3e71af741ba8b9f1e/passport-google-oauth/passport-google-oauth.d.ts
declare module 'passport-google-oauth' {

    import passport = require('passport');
    import express = require('express');

    interface Profile extends passport.Profile {
        gender: string;

        _raw: string;
        _json: any;
    }

    interface IOAuthStrategyOption {
        consumerKey: string;
        consumerSecret: string;
        callbackURL: string;

        reguestTokenURL?: string;
        accessTokenURL?: string;
        userAuthorizationURL?: string;
        sessionKey?: string;
    }

    interface VerifyOptions {
        message: string;
    }

    interface VerifyFunction {
        (error: any, user?: any, msg?: VerifyOptions): void;
    }

    class OAuthStrategy implements passport.Strategy {
        constructor(options: IOAuthStrategyOption,
                    verify: (accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction) => void);
        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }

    interface IOAuth2StrategyOption {
        clientID: string;
        clientSecret: string;
        callbackURL: string;

        authorizationURL?: string;
        tokenURL?: string;

        accessType?: string;
        approval_prompt?: string;
        prompt?: string;
        loginHint?: string;
        userID?: string;
        hostedDomain?: string;
        display?: string;
        requestVisibleActions?: string;
        openIDRealm?: string;
    }

    class OAuth2Strategy implements passport.Strategy {
        constructor(options: IOAuth2StrategyOption,
                    verify: (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => void);
        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}
