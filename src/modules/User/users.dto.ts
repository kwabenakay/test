import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseUserDto {
  @IsString()
  readonly profile: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto extends BaseUserDto {}
export class ExistingUserDto extends BaseUserDto {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}

export class IdDto {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;
}
export class DeleteUserDto extends IdDto {}
