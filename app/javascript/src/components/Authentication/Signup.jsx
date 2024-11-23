import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import authApi from "apis/authentication";

import {
  SIGNUP_FORM_INITIAL_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Signup = () => {
  const { t } = useTranslation();

  const handleSignup = async formData => {
    try {
      await authApi.signup(formData);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="neeto-ui-text-gray-800 text-center text-3xl font-extrabold">
          {t("labels.signup")}
        </h2>
        <div className="mb-4 mt-2 flex flex-row items-center justify-start space-x-1">
          <Button label={t("labels.loginNow")} size="small" style="link" />
        </div>
        <Formik
          initialValues={SIGNUP_FORM_INITIAL_VALUES}
          validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("labels.firstName")}
                name="firstName"
                placeholder="Oliver"
                type="text"
              />
              <Input
                required
                label={t("labels.lastName")}
                name="lastName"
                placeholder="Smith"
                type="text"
              />
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
              <Input
                required
                label={t("labels.confirmPassword")}
                name="passwordConfirmation"
                placeholder="******"
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={isSubmitting}
                label={t("labels.signup")}
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

export default Signup;
