import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as meanieMongooseToJson from 'meanie-mongoose-to-json';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/nest', {
      connectionFactory: connection => {
        connection.plugin(meanieMongooseToJson);
        return connection;
      },
    }),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
