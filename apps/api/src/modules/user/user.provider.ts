import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';

export const userProvider = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];
