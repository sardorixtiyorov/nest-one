import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}
  @Post()
  async createMachine(
    @Body() createMachineDto: CreateMachineDto,
  ): Promise<Machine> {
    return await this.machineService.createMachine(createMachineDto);
  }
  @Get()
  async getAllMachine(): Promise<Machine[]> {
    return await this.machineService.getAllMachine();
  }
  @Get('/:id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return await this.machineService.getMachineById(+id);
  }
  @Delete('/:id')
  async deleteMachineById(@Param('id') id: string) {
    return await this.machineService.deleteMachineById(+id);
  }
  @Put('/:id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return await this.machineService.updateMachine(+id, updateMachineDto);
  }
}
