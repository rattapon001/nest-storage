import { Inject } from '@nestjs/common';

const getDriverName = (name: string) => {
  return name;
};

export const InjectStorage = (name: string): ParameterDecorator =>
  Inject(getDriverName(name));
