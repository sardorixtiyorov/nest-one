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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Quruvchilar')
@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}
  @ApiOperation({ summary: "Quruvchi qo'shish" })
  @Post()
  async createBuilder(
    @Body() createBuilderDto: CreateBuilderDto,
  ): Promise<Builder> {
    return await this.builderService.createBuilder(createBuilderDto);
  }
  @ApiOperation({ summary: "Quruvchilarni ko'rish" })
  @Get()
  async getAllBuilder(): Promise<Builder[]> {
    return await this.builderService.getAllBuilder();
  }
  @ApiOperation({ summary: "Quruvchini Id orqali ko'rish" })
  @Get('/:id')
  async getBuilderById(@Param('id') id: string): Promise<Builder> {
    return await this.builderService.getBuilderById(+id);
  }
  @ApiOperation({ summary: "Quruvchini Id orqali o'chirish" })
  @Delete('/:id')
  async deleteBuilderById(@Param('id') id: string) {
    return await this.builderService.deleteBuilderById(+id);
  }
  @ApiOperation({ summary: "Quruvchini Id orqali o'zgartirish" })
  @Put('/:id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    return await this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
