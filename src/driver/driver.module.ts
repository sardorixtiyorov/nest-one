import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';

@Module({
  imports: [SequelizeModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
