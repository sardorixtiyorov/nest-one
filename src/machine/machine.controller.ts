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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Mashinalar')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}
  @ApiOperation({ summary: 'Mashina yaratish' })
  @Post()
  async createMachine(
    @Body() createMachineDto: CreateMachineDto,
  ): Promise<Machine> {
    return await this.machineService.createMachine(createMachineDto);
  }

  @ApiOperation({ summary: "Mashinalarni ko'rish" })
  @Get()
  async getAllMachine(): Promise<Machine[]> {
    return await this.machineService.getAllMachine();
  }

  @ApiOperation({ summary: "Mashinani Id orqli ko'rish" })
  @Get('/:id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return await this.machineService.getMachineById(+id);
  }
  @ApiOperation({ summary: "Mashinani Id orqli o'chirish" })
  @Delete('/:id')
  async deleteMachineById(@Param('id') id: string) {
    return await this.machineService.deleteMachineById(+id);
  }
  @ApiOperation({ summary: "Mashinani Id orqli o'zgartirish" })
  @Put('/:id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return await this.machineService.updateMachine(+id, updateMachineDto);
  }
}
