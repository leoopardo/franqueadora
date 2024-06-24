import envs from "../../../config/envs";

export const amplifyConfig = {
  mandatorySignin: true,
  region: envs.COGNITO.FRANCHISE.AWS_REGION,
  userPoolId: envs.COGNITO.FRANCHISE.USER_POOL_ID,
  userPoolWebClientId: envs.COGNITO.FRANCHISE.CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  Storage: 'LocalStorage',
  oauth: {
    domain: envs.COGNITO.FRANCHISE.AUTH_URL,
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    responseType: 'token',
    redirectSignIn: 'https://franqueadora.localhost:5173/,https://franquia.localhost:5173/',
    redirectSignOut: 'https://franqueadora.localhost:5173/,https://franquia.localhost:5173/',
  }
};

export type CognitoUserModel = {
  username: string;
  password: string;
  attributes?: object;
};
