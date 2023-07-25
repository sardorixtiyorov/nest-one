import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Machine_DriverService } from './machine_driver.service';
import { CreateMachine_DriverDto } from './dto/create-machine_driver.dto';
import { Machine_Driver } from './models/machine_driver.model';
import { UpdateMachine_DriverDto } from './dto/update-machine_driver.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mashina va Haydovchilar')
@Controller('machine_driver')
export class Machine_DriverController {
  constructor(private readonly machineService: Machine_DriverService) {}
  @Post()
  async createMachine_Driver(
    @Body() createMachine_DriverDto: CreateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    return await this.machineService.createMachine_Driver(
      createMachine_DriverDto,
    );
  }
  @Get()
  async getAllMachine_Driver(): Promise<Machine_Driver[]> {
    return await this.machineService.getAllMachine_Driver();
  }
  @Get('/:id')
  async getMachine_DriverById(
    @Param('id') id: string,
  ): Promise<Machine_Driver> {
    return await this.machineService.getMachine_DriverById(+id);
  }
  @Delete('/:id')
  async deleteMachine_DriverById(@Param('id') id: string) {
    return await this.machineService.deleteMachine_DriverById(+id);
  }
  @Put('/:id')
  async updateMachine_Driver(
    @Param('id') id: string,
    @Body() updateMachine_DriverDto: UpdateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    return await this.machineService.updateMachine_Driver(
      +id,
      updateMachine_DriverDto,
    );
  }
}
