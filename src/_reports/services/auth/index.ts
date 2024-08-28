import { useGetMe } from "./useGetMe";
import { useLogin } from "./useLogin";

export const AuthServices = {
    login: useLogin,
    me: useGetMe
}