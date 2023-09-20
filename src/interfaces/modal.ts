import { FormInstance } from 'antd';

type ModalType = 'default' | 'warning' | 'danger';

export interface UseModalProps {
  isCentered?: boolean;
  className?: string;
  modalBody?: (props: any) => JSX.Element;
  cancelText?: string;
  submitText?: string;
  width?: number; // Use ModalSize enum
  handleSubmit?: (data: Record<string, any>) => void;
  handleCancel?: () => void;
  displayFooter?: boolean;
  displayCancelBtn?: boolean;
  displaySubmitBtn?: boolean;
  form?: string; // make sure this field like name of form when use form modalBody
  onSuccessCallBack?: () => void; // call when handle finish successfully
}

export interface ModalBodyProps extends ModalState {
  closeModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  setIsLoading: (isLoading: boolean) => void;
  onSuccessCallBack?: () => void;
  onValuesChange: () => void;
  isValidForm: boolean;
  form: FormInstance;
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  data: Record<string, any>;
  type: ModalType; // message type
  message: string | JSX.Element;
  isNotChangeValuesForm: boolean;
}

export interface OpenModalProps {
  data?: Record<string, any>;
  title?: string;
  type?: ModalType;
  message?: string | JSX.Element;
  isNotChangeValuesForm?: boolean; // force disable submit button on first render when modal is update data
}

export interface ConfirmModalProps {
  content: string;
}
