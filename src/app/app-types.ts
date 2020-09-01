import { Input, Output, EventEmitter, Directive } from '@angular/core';

export enum phoneTypes {
  mobile = 'Mobile',
  land = 'Land Line',
  other = 'Other',
}
export interface SPhone {
  PersonID: string;
  phoneType: phoneTypes;
  name: string;
  isPrimary: boolean;
  canText: boolean;
  phoneCountryCode: string;
  phoneNumber: string;
  id: string;
}

export const EmptyPhone: SPhone = {
  PersonID: '-1',
  phoneCountryCode: '',
  name: '',
  isPrimary: false,
  canText: false,
  phoneNumber: '',
  phoneType: phoneTypes.land,
  id: '',
};

export var CountryCodes: { [id: string]: string } = {
  '55': 'Brazil (+55)',
  '1': 'United States (+1)',
};
export interface SAddress {
  country: string;
  streetL1: string;
  streetL2: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode: string;
  name: string;
  mailing: boolean;
  id: string;
}

export const EmptyAddress: SAddress = {
  country: '',
  streetL1: '',
  streetL2: '',
  city: '',
  neighborhood: '',
  state: '',
  zipCode: '',
  name: '',
  mailing: false,
  id: '',
};

export interface iSelectDict {
  key: string;
  value: string;
}

export class ItemMeta<T> {
  value: T;
  label: string;
  controlType: string;
  name: string;

  constructor(
    options: {
      name?: string;
      value?: T;
      label?: string;
      controlType?: string;
    } = {}
  ) {
    this.value = options.value;
    this.label = options.label;
    this.controlType = options.controlType;
    this.name = options.name;
  }
}
export class DateMeta extends ItemMeta<string> {
  controlType = 'date';
  constructor(options) {
    super(options);
  }
}
export class AddressMeta extends ItemMeta<object> {
  controlType = 'address';

  constructor(options) {
    super(options);
  }
}

export class PhoneMeta extends ItemMeta<string> {
  controlType = 'phone';
  constructor(options) {
    super(options);
  }
  fieldType: 'text';
}

export class MCMeta extends ItemMeta<string> {
  controlType = 'dropdown';
  choices: iSelectDict[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.choices = options['choices'] || [];
  }
}

export class TextboxMeta extends ItemMeta<string> {
  controlType = 'textBox';
  fieldType: string;

  constructor(options: {} = {}) {
    super(options);
    this.fieldType = options['fieldType'] || '';
  }
}

export class RTEMeta extends ItemMeta<string> {
  controlType = 'richTextEditor';
  constructor(options) {
    super(options);
  }
  options: object;
}

@Directive()
export class AbstractItem {
  @Input() key: string;
  @Input() selected: boolean;
  @Input() edit: boolean;
  @Output() clicked = new EventEmitter<string>();
}
