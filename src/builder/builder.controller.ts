import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { Builder } from './models/builder.model';
import { UpdateBuilderDto } from './dto/update-builder.dto';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}
  @Post()
  async createBuilder(
    @Body() createBuilderDto: CreateBuilderDto,
  ): Promise<Builder> {
    return await this.builderService.createBuilder(createBuilderDto);
  }
  @Get()
  async getAllBuilder(): Promise<Builder[]> {
    return await this.builderService.getAllBuilder();
  }
  @Get('/:id')
  async getBuilderById(@Param('id') id: string): Promise<Builder> {
    return await this.builderService.getBuilderById(+id);
  }
  @Delete('/:id')
  async deleteBuilderById(@Param('id') id: string) {
    return await this.builderService.deleteBuilderById(+id);
  }
  @Put('/:id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    return await this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
