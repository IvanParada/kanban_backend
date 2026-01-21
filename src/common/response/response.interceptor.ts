import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Status } from '../enums/status.enum';
import { ApiResponseDto } from '../dto/api-response.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<any>> {
    return next.handle().pipe(
      map((data): ApiResponseDto<any> => {
        if (data && typeof data === 'object' && 'status' in data) {
          return data;
        }

        return {
          status: Status.Success,
          data,
        };
      }),
    );
  }
}
