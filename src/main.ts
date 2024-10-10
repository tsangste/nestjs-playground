import { NestFactory } from '@nestjs/core'
import { Logger, LoggerService } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
      defaultMeta: { service: 'nestjs-playground' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            utilities.format.nestLike('nestjs-playground', {
              colors: process.env.NO_COLOR === 'false',
              prettyPrint: true,
            })
          ),
        }),
      ],
    }),
  })

  const config = new DocumentBuilder()
    .setTitle('nestjs playground')
    .setDescription('The API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const logger = app.get<LoggerService>(Logger)

  await app.listen(3000)

  logger.log(`Running on port: 3000`)
}

bootstrap()
