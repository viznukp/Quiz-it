import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import { setAuthHeaders } from "apis/axios";
import { useLogin } from "hooks/reactQuery/useAuthenticationApi";
import { setToLocalStorage } from "utils/storage";

import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = () => {
  const { t } = useTranslation();

  const { mutate: loginUser } = useLogin();

  const handleLogin = formData => {
    loginUser(formData, {
      onSuccess: ({ authenticationToken, email, id, name }) => {
        setToLocalStorage({
          authToken: authenticationToken,
          email,
          userId: id,
          userName: name,
        });
        setAuthHeaders();
        window.location.href = routes.admin.home;
      },
    });
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="neeto-ui-text-gray-800 text-center text-3xl font-extrabold">
          {t("labels.signIn")}
        </h2>
        <div className="mb-4 mt-2 flex flex-row items-center justify-start space-x-1">
          <Button
            label={t("labels.registerNow")}
            size="small"
            style="link"
            to={routes.admin.signup}
          />
        </div>
        <Formik
          initialValues={LOGIN_FORM_INITIAL_VALUES}
          validationSchema={LOGIN_FORM_VALIDATION_SCHEMA}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("labels.email")}
                name="email"
                placeholder="oliver@example.com"
                type="email"
              />
              <Input
                required
                label={t("labels.password")}
                name="password"
                placeholder="******"
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={isSubmitting}
                label={t("labels.signIn")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
