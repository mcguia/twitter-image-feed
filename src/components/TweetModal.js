import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import styled from "styled-components";

export const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  function toggle() {
    setVisible(!isVisible);
  }

  return {
    isVisible,
    toggle
  };
};

const TweetModal = ({ cancel, tweet, visible }) => {
  const images = tweet.extended_entities.media;
  return (
    <Modal title="Basic Modal" visible={visible} onCancel={cancel} width={900}>
      {images.map(img => (
        <div className="image-item" key={img.id}>
          <img
            alt="twitter"
            src={img.media_url_https + "?format=jpg&name=large"}
          />
        </div>
      ))}
    </Modal>
  );
};

TweetModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  tweet: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
};

export default TweetModal;
