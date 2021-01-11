/**
 * convert string to boolean
 */
export function numStringToBool(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value;
  }
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
  }
  return value ? !!parseInt(value) : false;
}
