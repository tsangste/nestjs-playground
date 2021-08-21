import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { MikroOrmModule } from '@mikro-orm/nestjs'
import { defineConfig } from '@mikro-orm/mongodb'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...defineConfig({
            dbName: configService.get<string>('MONGODB_DATABASE', 'nest'),
            clientUrl: configService.get<string>('MONGODB_CONNECTION_STRING', 'mongodb://127.0.0.1:27017'),
            ensureIndexes: true,
            driverOptions: { ignoreUndefined: true },
            debug: configService.get<string>('NODE_ENV', 'local') !== 'production',
          }),
          autoLoadEntities: true,
        }
      },
    }),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
