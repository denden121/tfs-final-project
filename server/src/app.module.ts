import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [LinkModule,
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      })
  ],
})
export class AppModule {}
