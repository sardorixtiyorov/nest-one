import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
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
  name: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
