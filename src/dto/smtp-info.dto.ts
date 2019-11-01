import { ApiModelProperty } from '@nestjs/swagger';
import { domainToASCII } from 'url';
import { Length, IsString, IsInt } from 'class-validator';

export class SmtpInfo {
  @ApiModelProperty({ required: false, example: 'mail.ynu.edu.cn' })
  readonly host: string;

  @ApiModelProperty({ required: false, example: 25 })
  readonly port: number;

  @ApiModelProperty({ required: false, example: 'username' })
  readonly username: string;

  @ApiModelProperty({ required: false, example: 'password' })
  readonly password: string;

  @ApiModelProperty({ required: false, example: false })
  readonly useSsl: boolean;

  @ApiModelProperty({ required: false, example: '' })
  readonly encryptKey: string;

  @ApiModelProperty({ required: false, example: 'to@domain.com' })
  readonly to: string;

  @ApiModelProperty({ required: false, example: 'cc@domain.com' })
  readonly cc: string;

  @ApiModelProperty({ required: false, example: 'bcc@domain.com' })
  readonly bcc: string;

  @ApiModelProperty({ example: 'from@domain.com' })
  readonly from: string;

  @ApiModelProperty({ example: 'subject' })
  readonly subject: boolean;

  @ApiModelProperty({ example: 'content' })
  readonly body: string;
}
