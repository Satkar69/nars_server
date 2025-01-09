import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './data-services/mgdb/mgdb-datasource.module';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { CryptoModule } from './libs/crypto/crypto.module';
import { TokenModule } from './libs/token/token.module';
import { ControllerModule } from './application/controllers/controller.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './application/guards/auth.guard';
import { HttpLoggingInterceptor } from './application/interceptors/http-logging.interceptor';
import { ResponseInterceptor } from './application/interceptors/response.interceptor';
import { HttpExceptionFilter } from './application/filters/http-exception.filter';
import routes from './application/controllers/routes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSourceModule,
    RouterModule.register(routes),
    CryptoModule,
    TokenModule,
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
