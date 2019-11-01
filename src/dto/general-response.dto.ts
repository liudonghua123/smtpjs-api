import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsInt } from 'class-validator';

export class GeneralResponse {
  constructor(code = 0, message = 'ok', data: {}) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
  static ok(data: object = {}): GeneralResponse {
    return new GeneralResponse(0, 'ok', data);
  }
  static error(data: object = {}): GeneralResponse {
    return new GeneralResponse(500, 'error', data);
  }
  @ApiModelProperty({ required: false })
  readonly code: number;
  @ApiModelProperty({ required: false })
  readonly message: string;
  @ApiModelProperty({ required: false })
  readonly data: object;
}
