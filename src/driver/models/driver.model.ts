import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, DriverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  last_name: string;
}
