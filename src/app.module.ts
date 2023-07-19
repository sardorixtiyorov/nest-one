import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { BuilderModule } from './builder/builder.module';
import { Builder } from './builder/models/builder.model';
import { Machine } from './machine/models/machine.model';
import { MachineModule } from './machine/machine.module';
import { Driver } from './driver/models/driver.model';
import { DriverModule } from './driver/driver.module';
import { Machine_Driver } from './machine_driver/models/machine_driver.model';
import { Machine_DriverModule } from './machine_driver/machine_driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Company, Machine, Builder, Driver, Machine_Driver],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    BuilderModule,
    MachineModule,
    DriverModule,
    Machine_DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
