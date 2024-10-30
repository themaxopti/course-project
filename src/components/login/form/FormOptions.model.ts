import { InputEnum } from "../input/InputEnum.ts";

export interface FormOptionsModel {
  title?: string;
  fields: FormFieldModel[];
  submit?: {
    textContent?: string,
    handlerName?: string,
    sendId?: string[],
  };
}

export interface FormFieldModel {
  type: Omit<InputEnum, InputEnum.SUBMIT>;
  id?: string;
  textContent?: string;
  addDivider?: boolean;
  validationRules?: FormFieldValidationRule[];
  formatter?: 'card' | 'phone' | 'cardExpire';
  value?: string;
}

export interface FormFieldValidationRule {
  regex: RegExp;
  message: string;
}
