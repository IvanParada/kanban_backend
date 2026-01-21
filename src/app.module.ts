import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TaskImagesModule } from './task-images/task-images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'production';

        const databaseUrl = config.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: false,
            ssl:
              config.get('DB_SSL') === 'true'
                ? { rejectUnauthorized: false }
                : false,
          };
        }

        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: Number(config.get('DB_PORT')),
          database: config.get('DB_NAME'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: !isProd,
        };
      },
    }),

    TasksModule,
    AuthModule,
    TaskImagesModule,
  ],
})
export class AppModule {}
