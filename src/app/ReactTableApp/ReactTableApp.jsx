import React, { useState } from "react";
import RTable from "./Table/RTable";
import { Modal } from "antd";
import CreateNewRecord from "./Table/CreateNewRecord";
import { useDispatch } from "react-redux";
import { getAllCars } from "../../redux/slice/reactTable/reactTableSlice";
import { resetCreatePopupDatas } from "../../redux/slice/reactTable/reactTableSlice";

const ReactTableApp = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    dispatch(getAllCars());
    dispatch(resetCreatePopupDatas());
  };
  return (
    <div>
      <div className="pt-3 pr-6 flex justify-end ">
        <button
          type="button"
          onClick={handleModal}
          className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
        >
          Add New Record
        </button>
      </div>

      <Modal
        title="Create new record"
        footer={null}
        width="50%"
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
