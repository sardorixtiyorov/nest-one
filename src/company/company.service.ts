import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyRepo: typeof Company) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const new_company = await this.companyRepo.create(createCompanyDto);
    return new_company;
  }
  async getAllCompany(): Promise<Company[]> {
    const companies = await this.companyRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepo.findByPk(id, {
      include: { all: true },
    });
    // const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      throw 'No such a company found!';
    }
    return company;
  }
  async deleteCompanyById(id: number): Promise<number> {
    return await this.companyRepo.destroy({ where: { id } });
  }
  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0].dataValues;
  }
}
