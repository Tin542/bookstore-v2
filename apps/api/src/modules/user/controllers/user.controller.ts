import {
    Controller,
    UseGuards,
    Get,
  } from '@nestjs/common';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { Roles } from 'src/shared/decorators/auth/role.decorator';
  import { RoleEnum } from 'src/shared/enum';
import { UsersService } from '../services/user.service';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
  
  @Controller('user')
  
  export class UserController {
    constructor(private userService: UsersService) {}
    
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    @Get('/api/users')
    getProfile() {
      return this.userService.findAllUser();
    }

  }
  