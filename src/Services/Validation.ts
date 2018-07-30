export function validateMinLength(value: string, min: number, message?: string): IValidationResponse {
  let valid: boolean = true;
  if (min && value && value.length <= min) valid = false;
  return {
    valid,
    message
  }
}

export function validateMaxLength(value: string, max: number, message?: string): IValidationResponse {
  let valid: boolean = true;
  if (max && value && value.length >= max) valid = false;
  return {
    valid,
    message
  }
}

export function validatePattern(value: string, pattern: string, message?: string): IValidationResponse {
  const regExp: RegExp = new RegExp(pattern);
  return {
    valid: !!regExp.test(value),
    message
  };
}

export default {
  validatePattern,
  validateMaxLength,
  validateMinLength
}