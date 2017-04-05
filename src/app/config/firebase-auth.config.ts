import {AuthProviders, AuthMethods} from 'angularfire2';

// Firebase auth config
export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};