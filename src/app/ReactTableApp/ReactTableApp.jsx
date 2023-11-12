import React, { useState } from "react";
import RTable from "./Table/RTable";
import { Button, Modal } from "antd";
import CreateNewRecord from "./Table/CreateNewRecord";

const ReactTableApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <Button type="primary" onClick={handleModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        footer={null}
        open={isModalOpen}
        destroyOnClose={true}
        onCancel={handleModal}
      >
        <CreateNewRecord handleModal={handleModal} isModalOpen={isModalOpen} />
      </Modal>
      <RTable />
    </div>
  );
};

export default ReactTableApp;
