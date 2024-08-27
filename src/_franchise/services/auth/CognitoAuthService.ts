import { Amplify, Auth } from "aws-amplify";
import { STORAGE_KEYS } from "../../constants/storage_keys";
import { CognitoUserModel, amplifyConfig } from "./login.config";

export type FirstAccessData = {
  user: unknown;
  newPassword: string;
};

export type RecoveryPasswordSubmitData = {
  username: string;
  code: string;
  new_password: string;
};

class CognitoAuthService {
  configure() {
    const config = this.createConfig();
    Amplify.configure(config);
    Auth.configure({
      storage: localStorage.getItem(STORAGE_KEYS.local.remmemberMe)
        ? localStorage
        : sessionStorage,
    });
  }

  getAuthToken() {
    return (
      localStorage.getItem("franchise_AuthToken") || sessionStorage.getItem("franchise_AuthToken")
    );
  }

  createConfig() {
    const updatedAwsConfig = {
      ...amplifyConfig,
      oauth: {
        ...amplifyConfig.oauth,
        redirectSignIn: "https://franqueadora.localhost:5173/,https://franquia.localhost:5173/",
        redirectSignOut: "https://franqueadora.localhost:5173/,https://franquia.localhost:5173/",
      },
    };
    return updatedAwsConfig;
  }

  signUp(userData: CognitoUserModel) {
    return Auth.signUp(userData);
  }

  signIn(username: string, password: string) {
    return Auth.signIn({ username, password });
  }

  async forgotPassword(username: string) {
    return await Auth.forgotPassword(username);
  }

  async forgotPasswordSubmit(
    recoveryPasswordSubmitData: RecoveryPasswordSubmitData
  ) {
    return await Auth.forgotPasswordSubmit(
      recoveryPasswordSubmitData.username,
      recoveryPasswordSubmitData.code,
      recoveryPasswordSubmitData.new_password
    );
  }

  signOut() {
    return Auth.signOut({ [`global`]: true });
  }

  loginWithGoogle() {
    Auth.federatedSignIn({
      provider: "Google" as any,
    }).then((federated: any) => {
      console.info("federated", federated);
    });
  }

  loginWithFacebook() {
    Auth.federatedSignIn({
      provider: "Facebook" as any,
    })
      .then((res: any) => {
        localStorage.setItem("RES_FB", JSON.stringify(res));
      })
      .catch((err: any) => {
        localStorage.setItem("ERRO_FB", JSON.stringify(err));
      });
    return;
  }

  getUser() {
    return Auth.currentAuthenticatedUser();
  }

  async getToken() {
    const data = await Auth.currentAuthenticatedUser();
    return data.signInUserSession;
  }

  currentSession() {
    return Auth.currentSession();
  }

  async checkEmailVerified() {
    const currentSession = await this.currentSession();
    const idTokenPayload = currentSession.getIdToken().decodePayload();
    const emailVerified = idTokenPayload?.email_verified;
    return emailVerified;
  }

  verififyUserAttributeSubmit(
    user: CognitoUserModel,
    attribute: string,
    code: string
  ) {
    return Auth.verifyUserAttributeSubmit(user, attribute, code);
  }

  verififyUserAttribute(user: CognitoUserModel, attribute: string) {
    return Auth.verifyUserAttribute(user, attribute);
  }

  async completeNewPassword(firstAccessData: FirstAccessData) {
    return await Auth.completeNewPassword(
      firstAccessData.user,
      firstAccessData.newPassword
    );
  }
}

const cgService = new CognitoAuthService();
cgService.configure();
export const congnitoAuthService = cgService;
