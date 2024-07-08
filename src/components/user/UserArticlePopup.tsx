import { Modal, ModalProps } from "react-bootstrap";

export interface UserPopupProps extends ModalProps {
  onConfirm?: () => void;
  closeButton?: boolean;
  showFooter?: boolean;
}

const UserArticlePopup = (props: UserPopupProps) => {
  const {
    title,
    body,
    onConfirm,
    onHide,
    closeButton = true,
    showFooter = true,
    ...rest
  } = props;

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
      {...rest}
    >
      <Modal.Header closeButton={closeButton} className="pb-32">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-40">{body}</Modal.Body>
      {showFooter && (
        <Modal.Footer className="d-flex gap-20 flex-wrap m-40">
          <button
            className="btn btn-lg btn-outline-primary width-100 width-sm-auto"
            onClick={onHide}
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              className="btn btn-lg btn-primary width-100 width-sm-auto"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default UserArticlePopup;
