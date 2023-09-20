import { useEffect, useState } from 'react';

import { Form } from 'antd';

export default function useFormChange(isNotChange = false) {
  const [form] = Form.useForm();
  // Watch all values
  const values = Form.useWatch([], form);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isNotChangeValues, setIsNotChangeValues] = useState(isNotChange);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsValidForm(true);
      },
      () => {
        setIsValidForm(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  // Use when modal is update mode
  const handleValuesChange = () => {
    setIsNotChangeValues(false);
  };

  return { isValidForm, handleValuesChange, isNotChangeValues, form };
}
