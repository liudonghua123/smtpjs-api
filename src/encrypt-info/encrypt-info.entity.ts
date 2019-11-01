import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsInt } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class EncryptInfo {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @ApiModelProperty({ required: false, example: 'mail.ynu.edu.cn' })
  @Column()
  host: string;

  @ApiModelProperty({ required: false, default: 25, example: 25 })
  @Column({ default: 25 })
  port: number;

  @ApiModelProperty({ required: false, example: 'username' })
  @Column()
  username: string;

  @ApiModelProperty({ required: false, example: 'password' })
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiModelProperty({ required: false, example: false })
  @Column()
  useSsl: boolean;

  // @ApiModelProperty({ required: false, example: '' })
  @Column()
  encryptKey: string;
}
