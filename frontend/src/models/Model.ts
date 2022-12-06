/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextFieldProps } from '@mui/material';

type Field = Record<string, unknown>;

type RequiredField = Required<{
  name: string,
  type: string,
}>;

const FieldType: Field = {
  text: '',
  textarea: '',
  question_choices: [{ isAnswer: false, name: '' }],
  email: '',
  url: '',
  tel: '',
  file: {},
  password: '',
  number: 0,
  switch: [],
  checkbox: [],
  select: undefined,
  date: new Date(),
};

type FieldProps = RequiredField & TextFieldProps;

class Model {
  name!: string;

  validationSchema!: unknown;

  fields!: FieldProps[];

  initialValues!: Field;

  data!: any;

  setInitialValues(values: Field = {}) {
    this.fields.forEach((field: FieldProps) => {
      if (!Object.keys(values).includes(field.name)) {
        values[field.name] = FieldType[field.type || 'text'];
      }
      // eslint-disable-next-line no-param-reassign
      field.label = field.label ?? `${this.name.charAt(0).toUpperCase().concat(this.name.slice(1))} ${field.name.charAt(0).toUpperCase().concat(field.name.slice(1))}`;
    });
    this.initialValues = values;
    this.data = {};
  }
}

export default Model;
