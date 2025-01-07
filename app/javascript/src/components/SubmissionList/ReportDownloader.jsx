import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Download as DownloadIcon } from "neetoicons";
import { Button, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";
import {
  useGeneratePdf,
  useDownloadPdf,
} from "hooks/reactQuery/useSubmissionsApi";

import { SUBMISSION_REPORT_FILENAME } from "./constants";

const ReportDownloader = ({ slug }) => {
  const { t } = useTranslation();

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consumer = createConsumer();

  const { mutate: generatePdf } = useGeneratePdf();
  const { mutate: downloadPdf } = useDownloadPdf();

  const closeModal = () => setIsModalOpen(false);

  const handleGeneratePdf = () => generatePdf(slug);

  const handleDownloadPdf = () => {
    downloadPdf(null, {
      onSuccess: data => {
        FileSaver.saveAs(data, SUBMISSION_REPORT_FILENAME);
        closeModal();
      },
    });
  };

  useEffect(() => {
    if (progress === 100) {
      handleDownloadPdf();
    }
  }, [progress]);

  return (
    <div>
      <Button
        icon={DownloadIcon}
        style="text"
        tooltipProps={{
          content: t("labels.download"),
          position: "top",
        }}
        onClick={() => {
          setIsModalOpen(true);
          subscribeToReportDownloadChannel({
            consumer,
            setMessage,
            setProgress,
            generatePdf: handleGeneratePdf,
          });
        }}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="space-y-2 p-6">
          <p className="text-xl font-semibold">{message}</p>
          <ProgressBar progress={progress} />
        </div>
      </Modal>
    </div>
  );
};

export default ReportDownloader;
