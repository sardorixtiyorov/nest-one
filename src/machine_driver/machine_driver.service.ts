import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine_Driver } from './models/machine_driver.model';
import { CreateMachine_DriverDto } from './dto/create-machine_driver.dto';
import { UpdateMachine_DriverDto } from './dto/update-machine_driver.dto';

@Injectable()
export class Machine_DriverService {
  constructor(
    @InjectModel(Machine_Driver) private machineRepo: typeof Machine_Driver,
  ) {}

  async createMachine_Driver(
    createMachine_DriverDto: CreateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    const new_machine = await this.machineRepo.create(createMachine_DriverDto);
    return new_machine;
  }
  async getAllMachine_Driver(): Promise<Machine_Driver[]> {
    const companies = await this.machineRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getMachine_DriverById(id: number): Promise<Machine_Driver> {
    const machine = await this.machineRepo.findByPk(id, {
      include: { all: true },
    });
    // const machine = await this.machineRepo.findOne({ where: { id } });
    if (!machine) {
      throw 'No such a machine found!';
    }
    return machine;
  }
  async deleteMachine_DriverById(id: number): Promise<number> {
    return await this.machineRepo.destroy({ where: { id } });
  }
  async updateMachine_Driver(
    id: number,
    updateMachine_DriverDto: UpdateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    const machine = await this.machineRepo.update(updateMachine_DriverDto, {
      where: { id },
      returning: true,
    });
    return machine[1][0].dataValues;
  }
}
