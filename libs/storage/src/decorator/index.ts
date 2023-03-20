import { Inject } from '@nestjs/common';

const getQueueToken = (name: string) => {
  return `_STORAGE_${name}`;
};

export const InjectStorage = (name: string): ParameterDecorator =>
  Inject(getQueueToken(name));
