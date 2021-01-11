import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Test if this property is equal to some other property of dto
 */
export function IsEqualStr(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPasswordConfirmed',
      target: object.constructor,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
      propertyName,
    });
  };
}
