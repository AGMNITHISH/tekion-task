import React, { useState } from "react";
import { Modal } from "antd";
import { ImEye } from "react-icons/im";
import { GrChannel } from "react-icons/gr";
import { PiClockCountdownFill } from "react-icons/pi";
import { GiThumbUp } from "react-icons/gi";
import { RiMovie2Fill } from "react-icons/ri";

const VideoCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState([]);

  const handleModal = (data) => {
    setIsModalOpen(!isModalOpen);
    setActiveModalContent(data);
  };
  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <img
          onClick={() => handleModal(item)}
          className="rounded-t-lg"
          src={item.thumbnailUrl}
          alt={item.author}
          height="200px"
          width="100%"
        />

        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            {item.title}
          </h5>
          <div className="flex items-center justify-between py-4 text-neutral-500 font-sans font-medium">
            <div className="flex items-center justify-center">
              <ImEye className="pr-1 text-xl" /> {item.views} Views
            </div>

            <div className="flex items-center justify-center">
              <PiClockCountdownFill className="pr-1 text-xl" />
              {item.uploadTime}
            </div>
          </div>
          <p className="mb-4 text-base  text-neutral-600 font-serif">
            {item.description}
          </p>
        </div>
      </div>
      <Modal
        width={1000}
        title={
          <div className="flex items-center justify-start text-xl text-neutral-600 font-normal font-serif ">
            <RiMovie2Fill className="pr-2 text-2xl" />{" "}
            {activeModalContent.title}
          </div>
        }
        destroyOnClose={true}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        footer={null}
      >
        <div className="my-2">
          <video controls className="rounded" width="100%" autoPlay>
            <source src={activeModalContent.videoUrl} type="video/mp4"></source>
          </video>
          <div className="flex items-center justify-between py-4 text-neutral-500 font-sans font-medium">
            <div className="flex items-center justify-center">
              <GrChannel className="pr-1 text-xl" /> {activeModalContent.author}
            </div>
            <div className="flex items-center justify-center">
              <PiClockCountdownFill className="pr-1 text-xl" />
              {activeModalContent.uploadTime}
            </div>
            <div className="flex items-center justify-center">
              <ImEye className="pr-1 text-xl" /> {activeModalContent.views}
              Views
            </div>

            <div className="flex items-center justify-center">
              <GiThumbUp className="pr-1 text-xl" />
              {activeModalContent.subscriber}
            </div>
          </div>

          <p className="my-4 text-base text-neutral-600 font-serif">
            {activeModalContent.description}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default VideoCard;
