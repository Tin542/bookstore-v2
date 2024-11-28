import {
    Controller,
    UseGuards,
    Get,
    Post,
    Body,
    Logger,
  } from '@nestjs/common';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { Roles } from 'src/shared/decorators/auth/role.decorator';
  import { RoleEnum } from 'src/shared/enum';
import { UsersService } from '../services/user.service';
import { RolesGuard } from 'src/modules/auth/guard/role.guard';
import { CreateUserDto } from '../dto/user-create.dto';
  
  @Controller('api/user')
  export class UserController {
    constructor(private userService: UsersService) {}
    
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    @Get('/profile')
    getProfile() {
      return this.userService.findAllUser();
    }

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Admin)
    @Post()
    crateUser(@Body() createDto: CreateUserDto) {
      const logger = new Logger('UserController');
      try {
        return this.userService.createUser(createDto); 
      } catch (error) {
        logger.error(error);
      }
    }

  }
  