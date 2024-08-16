import { useSendToken } from "./sendToken";
import { useValidateToken } from "./validateToken";

export const Token = {
  send: useSendToken,
  validate: useValidateToken,
};
