import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenPayload } from './auth-token-payload.interface';
import { BaseHttpException } from '../base-http-exception';
import { ErrorCodeEnum } from '../error-code.enum';
import { User } from 'apps/register/src/user/models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.header('Authorization')?.split(' ')[1];
        if (!token) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
        const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) throw new BaseHttpException(ErrorCodeEnum.INVALID_TOKEN);
        const user = await User.query().findOne({ id: userId });
        if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_USER);
        return true;
    }
}