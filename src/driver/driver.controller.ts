import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Haydovchilar')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
  @ApiOperation({ summary: "Haydovchi qo'shish" })
  @Post()
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<Driver> {
    return await this.driverService.createDriver(createDriverDto);
  }
  @ApiOperation({ summary: "Haydovchilarni ko'rish" })
  @Get()
  async getAllDriver(): Promise<Driver[]> {
    return await this.driverService.getAllDriver();
  }
  @ApiOperation({ summary: "Haydovchini Id orqali ko'rish" })
  @Get('/:id')
  async getDriverById(@Param('id') id: string): Promise<Driver> {
    return await this.driverService.getDriverById(+id);
  }
  @ApiOperation({ summary: "Haydovchini Id orqali o'chirish" })
  @Delete('/:id')
  async deleteDriverById(@Param('id') id: string) {
    return await this.driverService.deleteDriverById(+id);
  }
  @ApiOperation({ summary: "Haydovchini Id orqali o'zgartirish" })
  @Put('/:id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    return await this.driverService.updateDriver(+id, updateDriverDto);
  }
}
