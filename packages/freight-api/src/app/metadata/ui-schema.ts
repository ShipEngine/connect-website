export type UiSchema = Record<
  string,
  {
    'ui:autofocus'?: boolean;
    'ui:description'?: string;
    'ui:disabled'?: boolean;
    'ui:emptyValue'?: string;
    'ui:help'?: string;
    'ui:inputType'?: string;
    'ui:options'?: any;
    'ui:placeholder'?: string;
    'ui:readonly'?: boolean;
    'ui:title'?: string;
    'ui:widget'?:
      | 'hidden'
      | 'radio'
      | 'select'
      | 'textarea'
      | 'password'
      | 'color'
      | 'email'
      | 'uri'
      | 'data-url'
      | 'date'
      | 'date-time';
  }
>;
