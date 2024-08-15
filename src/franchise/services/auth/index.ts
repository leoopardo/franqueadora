import { useGetMe } from "./useGetMe";
import { useLogin } from "./useLogin";

export const Auth = {
    me: useGetMe,
    login: useLogin,
}