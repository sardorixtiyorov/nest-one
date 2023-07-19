import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine) private machineRepo: typeof Machine) {}

  async createMachine(createMachineDto: CreateMachineDto): Promise<Machine> {
    const new_machine = await this.machineRepo.create(createMachineDto);
    return new_machine;
  }
  async getAllMachine(): Promise<Machine[]> {
    const companies = await this.machineRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getMachineById(id: number): Promise<Machine> {
    const machine = await this.machineRepo.findByPk(id, {
      include: { all: true },
    });
    // const machine = await this.machineRepo.findOne({ where: { id } });
    if (!machine) {
      throw 'No such a machine found!';
    }
    return machine;
  }
  async deleteMachineById(id: number): Promise<number> {
    return await this.machineRepo.destroy({ where: { id } });
  }
  async updateMachine(
    id: number,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    const machine = await this.machineRepo.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    return machine[1][0].dataValues;
  }
}
