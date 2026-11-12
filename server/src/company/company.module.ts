import { Module } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { CompanyController } from './company.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
