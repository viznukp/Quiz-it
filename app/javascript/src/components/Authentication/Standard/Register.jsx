import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import authApi from "apis/authentication";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "utils/storage";

import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Register = ({ onSuccess, className = "" }) => {
  const { t } = useTranslation();

  const handleStandardUserRegistration = async formData => {
    try {
      const responseData = await authApi.authenticateStandardUser(formData);
      setToLocalStorage({
        authToken: responseData.authenticationToken,
        email: responseData.email,
        userId: responseData.id,
        userName: [responseData.firstName, responseData.lastName]
          .join(" ")
          .trim(),
      });
      setAuthHeaders();
      onSuccess();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className={className}>
      <Formik
        initialValues={REGISTRATION_FORM_INITIAL_VALUES}
        validationSchema={REGISTRATION_FORM_VALIDATION_SCHEMA}
        onSubmit={handleStandardUserRegistration}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex gap-3">
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
            </div>
            <Input
              required
              label={t("labels.email")}
              name="email"
              placeholder="oliver@example.com"
              type="email"
            />
            <Button
              className="h-8"
              disabled={isSubmitting}
              label={t("labels.startQuiz")}
              loading={isSubmitting}
              size="small"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
