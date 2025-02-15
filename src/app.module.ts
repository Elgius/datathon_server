import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolicyModule } from './policy/policy.module';
import { ConfigModule } from '@nestjs/config';
import { CohereService } from './cohere/cohere.service';

@Module({
  imports: [
    PolicyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CohereService],
})
export class AppModule {}
