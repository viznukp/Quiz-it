import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useRegisterStandardUser } from "hooks/reactQuery/useAuthenticationApi";

import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Register = ({ afterRegistration, className = "" }) => {
  const { t } = useTranslation();

  const { mutate: registerStandardUser } = useRegisterStandardUser();

  const handleStandardUserRegistration = formData => {
    registerStandardUser(formData, {
      onSuccess: afterRegistration,
    });
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
