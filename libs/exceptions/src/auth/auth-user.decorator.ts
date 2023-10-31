import * as jwt from 'jsonwebtoken';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TokenPayload } from './auth-token-payload.interface';
import { BaseHttpException } from '../base-http-exception';
import { ErrorCodeEnum } from '../error-code.enum';

export const CurrentUserId = createParamDecorator((fieldName, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.header('Authorization').split(' ')[1];
    if (!token) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
    const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) return false;
    return userId;
});
