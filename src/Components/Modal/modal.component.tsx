import { ReactNode, useMemo } from "react";
import ReactModal from "react-modal";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { EmptyFunction } from "../../Utils/common.utils";

interface ModalInterface {
  isVisible?: boolean;
  headingTitle?: string;
  headingSubTitle?: string;
  modalSize?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  className?: string;
  closeModal?: (data?: any) => void;
  openFrom?: "right" | "left" | "bottom";
}

const Modal = ({
  children,
  isVisible,
  headingSubTitle,
  headingTitle,
  modalSize = "md",
  className = "",
  closeModal = EmptyFunction,
  openFrom = "right",
  ...rest
}: ModalInterface) => {
  const { width } = useMemo(() => {
    switch (modalSize) {
      case "sm":
        return {
          width: "400px",
        };
      case "lg":
        return {
          width: "800px",
        };
      case "xl": {
        return {
          width: "1000px",
        };
      }
      default:
        return {
          width: "600px",
        };
    }
  }, [modalSize]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      width: width,
    },
  };

  const handleClosePane = () => {
    closeModal();
  };

  return (
    <ReactModal
      onRequestClose={handleClosePane}
      // closeIcon={<div>Some div containing custom close icon.</div>}
      isOpen={isVisible as boolean}
      style={{
        ...customStyles,
      }}
      contentLabel="Example Modal"

      // hideHeader={true}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
