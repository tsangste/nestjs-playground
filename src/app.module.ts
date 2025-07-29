import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { MikroOrmModule } from '@mikro-orm/nestjs'
import { defineConfig, Options } from '@mikro-orm/postgresql'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoriesModule } from './categories/categories.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...defineConfig({
          host: configService.get<string>('POSTGRES_HOST', 'postgres'),
          port: configService.get<number>('POSTGRES_PORT', 5432),
          dbName: configService.get<string>('POSTGRES_DATABASE', 'app'),
          user: configService.get<string>('POSTGRES_USER', 'postgres'),
          password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
          debug: configService.get<string>('NODE_ENV', 'local') !== 'production',
        } as Options),
        autoLoadEntities: true,
      }),
    }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
