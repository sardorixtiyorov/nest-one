import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rollar')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiOperation({ summary: "Rol qo'shish" })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }
  @ApiOperation({ summary: "Rollarni ko'rish" })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }
  @ApiOperation({ summary: "Rolni ko'rish" })
  @Get(':value')
  getByRoleValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
