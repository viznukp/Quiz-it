import React, { useState } from "react";

import { Close, Check } from "neetoicons";
import { Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";
// import { useQueryClient } from "react-query";

// import redirectionsApi from "apis/redirections";
import { BASE_URL } from "components/constants";

const CreateUrl = ({ onClose }) => {
  const { t } = useTranslation();
  // const queryClient = useQueryClient();
  const [fromUrl, setFromUrl] = useState(BASE_URL);
  const [toUrl, setToUrl] = useState("");

  const handleCreateRedirection = async () => {
    try {
      // console.log(replaceBaseUrl(fromUrl, BASE_URL));
      // await redirectionsApi.create({ source: fromUrl, destination: toUrl });
      // queryClient.invalidateQueries("redirections");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Input
        className="w-full"
        name="from"
        placeholder={t("placeHolders.enterSourceUrl")}
        value={fromUrl}
        onChange={event => setFromUrl(event.target.value)}
      />
      <div className="flex items-center gap-2">
        <Input
          className="flex-grow"
          name="to"
          placeholder={t("placeHolders.enterDestinationUrl")}
          value={toUrl}
          onChange={event => setToUrl(event.target.value)}
        />
        <Button
          className="text-green-500"
          disabled={fromUrl.trim() === "" || toUrl.trim() === ""}
          icon={Check}
          size="small"
          style="text"
          tooltipProps={{ content: t("labels.save"), position: "top" }}
          onClick={handleCreateRedirection}
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
    </>
  );
};

export default CreateUrl;
