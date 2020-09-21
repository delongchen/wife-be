import { Module } from '@nestjs/common';
import controllers from '../controller'
import providers from '../service';

@Module({
  imports: [],
  controllers,
  providers
})
export class AppModule {}
