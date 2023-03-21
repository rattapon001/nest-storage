export interface FileContent {
  fieldname?: string;
  originalname: string;
  encoding?: string;
  mimetype: string;
  size?: number;
  buffer: Buffer | string;
}
