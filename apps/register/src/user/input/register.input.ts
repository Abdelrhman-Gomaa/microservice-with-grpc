import { LangRegex } from "@app/exceptions/auth/validation-regex";
import { ErrorCodeEnum } from "@app/exceptions/error-code.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserInput {
  @IsNotEmpty()
  @Matches(LangRegex, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_NAME] })
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @IsNotEmpty()
  @Matches(LangRegex, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_NAME] })
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @IsNotEmpty()
  @IsEmail(
    { allow_utf8_local_part: false },
    { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_EMAIL] }
  )
  email: string;

  @IsString()
  @Matches(/[A-Za-z]/, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_PASSWORD] })
  @MinLength(8)
  @MaxLength(26)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  nation?: string;

  @IsNotEmpty()
  @IsString()
  verifyType: string;
}