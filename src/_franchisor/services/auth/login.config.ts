import envs from "../../../config/envs";

export const amplifyConfig = {
  mandatorySignin: true,
  region: envs.COGNITO.FRANCHISOR.AWS_REGION,
  userPoolId: envs.COGNITO.FRANCHISOR.USER_POOL_ID,
  userPoolWebClientId: envs.COGNITO.FRANCHISOR.CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  Storage: 'LocalStorage',
  oauth: {
    domain: envs.COGNITO.FRANCHISOR.AUTH_URL,
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    responseType: 'token'
  }
};

export type CognitoUserModel = {
  username: string;
  password: string;
  attributes?: object;
};
