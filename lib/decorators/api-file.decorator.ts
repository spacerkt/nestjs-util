import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

const File = (filename = 'file', description?: string): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [filename]: {
          type: 'string',
          format: 'binary',
          description: description ?? 'Binary file sended by form data',
        },
      },
    },
  })(target, propertyKey, descriptor);
};

/**
 * Upload file property descriptor for Swagger
 */
export function ApiFile(field = 'file', description?: string) {
  return applyDecorators(
    File(field, description),
    ApiConsumes('multipart/form-data'),
  );
}
