// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/passport-facebook/passport-facebook.d.ts
declare module 'passport-facebook' {

    import passport = require('passport');
    import express = require('express');

    interface Profile extends passport.Profile {
        gender: string;
        profileUrl: string;
        username: string;

        _raw: string;
        _json: any;
    }

    interface IStrategyOption {
        clientID: string;
        clientSecret: string;
        callbackURL: string;

        scopeSeparator?: string;
        enableProof?: boolean;
        profileFields?: string[];
    }

    class Strategy implements passport.Strategy {
        constructor(options: IStrategyOption,
                    verify: (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => void);
        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}