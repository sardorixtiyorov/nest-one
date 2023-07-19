import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Driver } from 'src/driver/models/driver.model';
import { Machine } from 'src/machine/models/machine.model';

interface Machine_DriverAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver', createdAt: false, updatedAt: false })
export class Machine_Driver extends Model<Machine_Driver, Machine_DriverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  machineId: number;

  // @BelongsTo(() => Machine)
  // machine: Machine;

  // @Column({
  //   type: DataType.INTEGER,
  // })
  // machineId: number;

  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  driverId: number;

  // @BelongsTo(() => Driver)
  // driver: Driver;

  // @Column({
  //   type: DataType.INTEGER,
  // })
  // driverId: number;
}
