import { useRef } from 'react';

import * as Yup from 'yup';

export default function useYupSchema(schema: Yup.ObjectSchema<any>, required = true) {
  const validationSchema = useRef(schema);

  const yupSync = {
    required,
    async validator({ field }: any, value: any) {
      await validationSchema.current.validateSyncAt(field, { [field]: value });
    },
  };

  return { yupSync };
}
