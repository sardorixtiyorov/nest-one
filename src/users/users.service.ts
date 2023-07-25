import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByValue('ADMIN');
    if (!role) {
      throw new BadRequestException('No admin Role found');
    }
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('roles', role.id);
      const updatedUser = await this.userRepository.findByPk(
        addRoleDto.userId,
        {
          include: { all: true },
        },
      );

      return updatedUser;
    }
    throw new HttpException(
      'Foydalanuvchi roli topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('roles', role.id);
      const updatedUser = await this.userRepository.findByPk(
        addRoleDto.userId,
        {
          include: { all: true },
        },
      );

      return updatedUser;
    }
    throw new HttpException(
      'Foydalanuvchi roli topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user)
      throw new HttpException('Foydalanuvchi  topilmadi', HttpStatus.NOT_FOUND);

    user.is_active = true;
    await user.save();
    return user;
  }

  async deactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user)
      throw new HttpException('Foydalanuvchi  topilmadi', HttpStatus.NOT_FOUND);

    user.is_active = false;
    await user.save();
    return user;
  }
}
