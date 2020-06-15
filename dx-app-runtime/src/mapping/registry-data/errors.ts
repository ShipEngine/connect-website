interface MappingInfo {
  fieldName: string;
  value: string;
}

class MappingError extends Error {
  public readonly destinationType: string;
  public readonly source: MappingInfo;

  constructor(message: string, source: MappingInfo, destinationType: string) {
    super(message);
    this.destinationType = destinationType;
    this.source = source;
  }
}

class ValidationError extends Error {
  public readonly value: string;
  public readonly field: string;

  constructor(message: string, field: string, value: string) {
    super(message);
    this.field = field;
    this.value = value;
  }
}

export { MappingError, ValidationError };
