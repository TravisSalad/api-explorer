declare interface IApiConfig {
  title: string;
  url: string;
  method: string;
  body?: IBodyField[];
}

declare interface IBodyField {
  max?: number;
  min?: number;
  name: string;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text'|'number'|'tel'|'email';
}

declare interface IHashTable<T> {
  [key: string]: T
}

declare interface IReqObject {
  url: string;
  method: string;
  data?: IHashTable<string|number>;
}

declare interface IValidationResponse {
  valid: boolean;
  message?: string;
}
