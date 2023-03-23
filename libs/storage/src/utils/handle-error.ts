import { Logger } from '@nestjs/common';

export const failedOrError = (message: string, err: any) => {
  const logger = new Logger();
  logger.error(`${err}  :: ${message}`);
  logger.error(err);
  throw new Error(err);
};
