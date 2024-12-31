import { useMutation } from "react-query";

import authenticationApi from "apis/authentication";

export const useSignup = () => useMutation(authenticationApi.signup);

export const useLogin = () => useMutation(authenticationApi.login);

export const useLogout = () => useMutation(authenticationApi.logout);
