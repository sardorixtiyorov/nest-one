import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.createCompany(createCompanyDto);
  }
  @Get()
  async getAllCompany(): Promise<Company[]> {
    return await this.companyService.getAllCompany();
  }
  @Get('/:id')
  async getCompanyById(@Param('id') id: string): Promise<Company> {
    return await this.companyService.getCompanyById(+id);
  }
  @Delete('/:id')
  async deleteCompanyById(@Param('id') id: string) {
    return await this.companyService.deleteCompanyById(+id);
  }
  @Put('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.updateCompany(+id, updateCompanyDto);
  }
}
