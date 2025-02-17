import React from "react";

import { Close, Check } from "neetoicons";
import { Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

import { BASE_URL } from "components/constants";
import {
  useCreateRedirection,
  useUpdateRedirection,
} from "hooks/reactQuery/useRedirectionsApi";
import { prefixUrl } from "utils/url";

import {
  URL_VALIDATION_SCHEMA,
  CREATE_REDIRECTION_FORM_INITIAL_VALUES,
  REDIRECTION_FORM_MODES,
} from "./constants";
import UrlPreview from "./UrlPreview";

const CreateEdit = ({
  id,
  initialValues,
  onClose,
  mode = REDIRECTION_FORM_MODES.create,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: createRedirection } = useCreateRedirection();
  const { mutate: updateRedirection } = useUpdateRedirection();

  const reloadRedirections = () => {
    queryClient.invalidateQueries("redirections");
    onClose();
  };

  const handleCreateOrUpdateRedirection = ({ fromUrl, toUrl }) => {
    const payload = {
      source: prefixUrl(fromUrl, BASE_URL, true),
      destination: prefixUrl(toUrl, BASE_URL),
    };

    if (mode === REDIRECTION_FORM_MODES.edit) {
      updateRedirection({ id, payload }, { onSuccess: reloadRedirections });
    } else {
      createRedirection(payload, { onSuccess: reloadRedirections });
    }
  };

  return (
    <Form
      className="grid w-full grid-cols-2 items-start gap-12 py-2"
      formikProps={{
        initialValues: initialValues || CREATE_REDIRECTION_FORM_INITIAL_VALUES,
        validationSchema: URL_VALIDATION_SCHEMA,
        onSubmit: handleCreateOrUpdateRedirection,
      }}
    >
      {({ values, dirty }) => (
        <>
          <div className="flex flex-col gap-2">
            <UrlPreview url={prefixUrl(values.fromUrl, BASE_URL, true)} />
            <Input
              className="w-full"
              name="fromUrl"
              placeholder={t("placeHolders.enterSourceUrl")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <UrlPreview url={prefixUrl(values.toUrl, BASE_URL)} />
            <div className="flex items-start gap-2">
              <Input
                className="flex-grow"
                name="toUrl"
                placeholder={t("placeHolders.enterDestinationUrl")}
              />
              <Button
                className="text-green-500"
                icon={Check}
                size="small"
                style="text"
                tooltipProps={{ content: t("labels.save"), position: "top" }}
                type="submit"
                disabled={
                  values.fromUrl.trim() === "" ||
                  values.toUrl.trim() === "" ||
                  !dirty
                }
              />
              <Button
                className="text-red-500"
                icon={Close}
                size="small"
                style="text"
                tooltipProps={{ content: t("labels.cancel"), position: "top" }}
                onClick={onClose}
              />
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

export default CreateEdit;
