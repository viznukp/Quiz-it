import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Download as DownloadIcon } from "neetoicons";
import { Button, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import submissionsApi from "apis/submissions";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";

const ReportDownloader = ({ slug }) => {
  const { t } = useTranslation();

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consumer = createConsumer();

  const closeModal = () => setIsModalOpen(false);

  const generatePdf = async () => {
    try {
      await submissionsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const data = await submissionsApi.download();
      FileSaver.saveAs(data, "quiz_submissions_report.pdf");
      closeModal();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
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
            generatePdf,
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
