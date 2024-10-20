import { InputEnum } from "../input/InputEnum.ts";

export interface FormOptionsModel {
  title?: string;
  fields: FormFieldModel[];
  submitButton: string;
}

export interface FormFieldModel {
  type: Omit<InputEnum, InputEnum.SUBMIT>;
  placeholder: string;
  validationRules?: FormFieldValidationRule[];
}

export interface FormFieldValidationRule {
  regex: RegExp;
  message: string;
}
