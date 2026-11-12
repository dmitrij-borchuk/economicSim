import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { OnboardCompanyDto } from './dto/onboard-company.dto.js';
import { FirebaseAuthGuard, type AuthenticatedRequest } from '../auth/firebase-auth.guard.js';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('onboard')
  @UseGuards(FirebaseAuthGuard)
  async onboard(
    @Req() req: AuthenticatedRequest,
    @Body() dto: OnboardCompanyDto
  ) {
    const company = await this.companyService.onboardCompany(req.user.uid, dto);
    return {
      success: true,
      data: company,
    };
  }
}
