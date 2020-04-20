// import { AdalConfig, AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import { AdalConfig, AuthenticationContext, withAdalLogin } from 'react-adal';

export const adalConfig: AdalConfig = {
  cacheLocation: 'localStorage',
  clientId: '1fffdff0-ce04-465e-84f3-c5a16b2b0209',
  endpoints: {
    api: '1fffdff0-ce04-465e-84f3-c5a16b2b0209',
  },
  postLogoutRedirectUri: window.location.origin,
  tenant: 'common',
  navigateToLoginRequestUrl: false,
  redirectUri: process.env.API_URL ? process.env.API_URL : 'http://localhost:8080'
};

export const authContext = new AuthenticationContext(adalConfig);

// export const adalApiFetch = (fetch, url, options) =>
//   adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
