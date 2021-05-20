export interface JsonSchema {
  title?: string;
  description?: string;
  type: "object";
  required?: string[];
  properties: Record<
    string,
    {
      type: string;
      title?: string;
      description?: string;
      format?: string;
      enum?: string[] | number[];
      pattern?: string;
    }
  >;
}
