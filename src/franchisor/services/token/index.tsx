import { useSendToken } from "./sendToken";
import { useValidateToken } from "./validateToken";

export const TokenServices = {
  send: useSendToken,
  validate: useValidateToken,
};
