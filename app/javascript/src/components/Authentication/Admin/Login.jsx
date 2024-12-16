import React from "react";

import { Form, Formik } from "formik";
import { capitalize } from "neetocist";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import authApi from "apis/authentication";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "utils/storage";

import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = () => {
  const { t } = useTranslation();

  const handleLogin = async formData => {
    try {
      const responseData = await authApi.login(formData);
      setToLocalStorage({
        authToken: responseData.authenticationToken,
        email: responseData.email,
        userId: responseData.id,
        userName: [
          capitalize(responseData.firstName),
          capitalize(responseData.lastName),
        ]
          .join(" ")
          .trim(),
      });
      setAuthHeaders();
      window.location.href = routes.root;
    } catch (error) {
      logger.error(error);
    }
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
            to={routes.signup}
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
