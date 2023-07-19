import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverRepo: typeof Driver) {}

  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const new_driver = await this.driverRepo.create(createDriverDto);
    return new_driver;
  }
  async getAllDriver(): Promise<Driver[]> {
    const companies = await this.driverRepo.findAll({
      include: { all: true },
    });
    return companies;
  }
  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driverRepo.findByPk(id, {
      include: { all: true },
    });
    // const driver = await this.driverRepo.findOne({ where: { id } });
    if (!driver) {
      throw 'No such a driver found!';
    }
    return driver;
  }
  async deleteDriverById(id: number): Promise<number> {
    return await this.driverRepo.destroy({ where: { id } });
  }
  async updateDriver(
    id: number,
    updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    const driver = await this.driverRepo.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0].dataValues;
  }
}
