import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiImplicitParam,
  ApiOperation,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { EncryptInfoService } from './encrypt-info/encrypt-info.service';
import { EncryptInfo } from './encrypt-info/encrypt-info.entity';
import { SmtpInfo } from './dto/smtp-info.dto';
import { GeneralResponse } from './dto/general-response.dto';
import { sendMail, getStartTime } from './utils';

@Controller()
@ApiUseTags('api')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly encryptInfoService: EncryptInfoService,
  ) {}

  @Get('uptime')
  uptime(): number {
    return (new Date().getTime() - getStartTime().getTime()) / 1000;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Post('security')
  async security(@Body() encryptInfo: EncryptInfo): Promise<EncryptInfo> {
    const persistedEncryptInfo = await this.encryptInfoService.create(
      encryptInfo,
    );
    return persistedEncryptInfo;
  }

  @HttpCode(200)
  @Post('smtpjs')
  async smtpjs(@Body() smtpInfo: SmtpInfo): Promise<GeneralResponse> {
    let {
      host,
      port,
      username,
      password,
      useSsl,
      encryptKey,
      to,
      cc,
      bcc,
      from,
      subject,
      body,
    } = smtpInfo;
    // overwrite host, port, username, password, useSsl if encryptKey exists
    if (encryptKey) {
      const encryptInfo: EncryptInfo = await this.encryptInfoService.findByEncryptKey(
        encryptKey,
      );
      if (encryptInfo) {
        console.info(`overwrite smtp info use ${JSON.stringify(encryptInfo)}`);
        ({ host, port, username, password, useSsl } = encryptInfo);
      }
    }
    try {
      // send mail
      const info = await sendMail({
        host,
        port,
        username,
        password,
        useSsl,
        encryptKey,
        to,
        cc,
        bcc,
        from,
        subject,
        body,
      });
      console.info('Message sent: %s', info.messageId);
      return GeneralResponse.ok(info);
    } catch (error) {
      console.error(error);
      return GeneralResponse.error(error);
    }
  }
}
