import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}

  async createBuilder(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const new_builder = await this.builderRepo.create(createBuilderDto);
    return new_builder;
  }
  async getAllBuilder(): Promise<Builder[]> {
    const companies = await this.builderRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getBuilderById(id: number): Promise<Builder> {
    const builder = await this.builderRepo.findByPk(id, {
      include: { all: true },
    });
    // const builder = await this.builderRepo.findOne({ where: { id } });
    if (!builder) {
      throw 'No such a builder found!';
    }
    return builder;
  }
  async deleteBuilderById(id: number): Promise<number> {
    return await this.builderRepo.destroy({ where: { id } });
  }
  async updateBuilder(
    id: number,
    updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    const builder = await this.builderRepo.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }
}
