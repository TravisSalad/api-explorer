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

export function validatePattern(value: any, pattern: string, message?: string): IValidationResponse {
  if (pattern && pattern.charAt(0) === '/' && pattern.charAt(pattern.length - 1) === '/') {
    // remove beginning and end slash as regex prototype will add them by default thus altering the pattern
    pattern = pattern.substring(1, pattern.length - 1);
  }
  const regExp: RegExp = new RegExp(pattern);
  return {valid: regExp.test(value), message};
}

export default {
  validatePattern,
  validateMaxLength,
  validateMinLength
}