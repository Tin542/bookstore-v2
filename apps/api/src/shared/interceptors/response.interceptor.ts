import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode || HttpStatus.OK;
  
          return {
            statusCode: statusCode,
            data: data || null,
            message: response.locals.message || null,
          };
        }),
      );
    }
  }
  