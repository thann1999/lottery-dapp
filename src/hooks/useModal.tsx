/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ModalState, OpenModalProps, UseModalProps } from '@interfaces';

import useFormChange from './useFormChange';

export default function useModal({
  modalBody,
  className = '',
  cancelText = 'common.button.cancel',
  submitText = 'common.button.submit',
  handleSubmit,
  handleCancel,
  form = '',
  displayFooter = true,
  displayCancelBtn = true,
  displaySubmitBtn = true,
  isCentered = true,
  width = 700,
  onSuccessCallBack,
}: UseModalProps) {
  const { t } = useTranslation();
  const ModalBodyComponent = modalBody;
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    isNotChangeValuesForm: false,
    title: '',
    data: {},
    message: '',
    type: 'default',
  });

  const open = useCallback(
    ({
      title = '',
      data = {},
      type = 'default',
      message = '',
      isNotChangeValuesForm = false,
    }: OpenModalProps) => {
      setModalState((prev) => ({
        ...prev,
        title,
        data,
        message,
        isNotChangeValuesForm,
        isOpen: true,
        type,
      }));
    },
    []
  );

  const close = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      title: '',
      message: '',
      data: {},
    }));
    handleCancel?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ModalComponent = useCallback(
    (props: any) => {
      const warningModal = modalState.type === 'warning';
      const dangerModal = modalState.type === 'danger';
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const {
        handleValuesChange,
        isValidForm,
        isNotChangeValues,
        form: formRef,
      } = useFormChange(modalState.isNotChangeValuesForm);

      const submit = useCallback(async () => {
        setIsLoading(true);
        await handleSubmit?.(modalState.data);
        setIsLoading(false);
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [modalState.data]);

      return (
        <Modal
          centered={isCentered}
          className={clsx({
            warning: warningModal,
            danger: dangerModal,
            [className]: !!className,
          })}
          open={modalState.isOpen}
          title={
            warningModal || dangerModal ? (
              <div className="title">
                <WarningOutlined />
                <p className="ml-6">{t(modalState.title)}</p>
              </div>
            ) : (
              t(modalState.title)
            )
          }
          width={width}
          onCancel={close}
          footer={
            displayFooter
              ? [
                  displayCancelBtn ? (
                    <Button key="close" className="btn-secondary" onClick={close}>
                      {t(cancelText, 'Close')}
                    </Button>
                  ) : null,
                  displaySubmitBtn ? (
                    <Button
                      form={form}
                      className={clsx({ 'btn-warning': warningModal })}
                      type={warningModal ? 'default' : 'primary'}
                      key="submit"
                      danger={dangerModal}
                      htmlType={form ? 'submit' : 'button'}
                      onClick={form ? () => {} : submit}
                      loading={isLoading}
                      disabled={!isValidForm || isNotChangeValues}
                    >
                      {t(submitText, 'Submit')}
                    </Button>
                  ) : null,
                ]
              : null
          }
        >
          {ModalBodyComponent && (
            <ModalBodyComponent
              {...props}
              {...modalState}
              form={formRef}
              isValidForm={isValidForm}
              closeModal={close}
              onSuccessCallBack={onSuccessCallBack}
              setModalState={setModalState}
              setIsLoading={setIsLoading}
              onValuesChange={handleValuesChange}
            />
          )}
          {modalState.type !== 'default' && <div>{modalState.message}</div>}
        </Modal>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modalState]
  );

  return { open, close, ModalComponent };
}
