import React, { useState, useEffect } from "react";

import { Download as DownloadIcon } from "neetoicons";
import { Button, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import submissionsApi from "apis/submissions";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";

const ReportDownloader = ({ slug }) => {
  const { t } = useTranslation();

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await submissionsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
    consumer.disconnect();
  };

  const downloadPdf = async () => {
    try {
      const data = await submissionsApi.download();
      saveAs({ blob: data, fileName: "granite_task_report.pdf" });
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="px-12 py-16">{message}</div>
      </Modal>
    </div>
  );
};

export default ReportDownloader;
