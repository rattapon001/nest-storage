import { Inject } from '@nestjs/common';

const getDriverName = (name: string) => {
  return `_STORAGE_${name}`;
};

export const InjectStorage = (name: string): ParameterDecorator =>
  Inject(getDriverName(name));
