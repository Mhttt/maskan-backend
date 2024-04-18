import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<UserDto> {
    const customer = await this.userModel.findOne({ email: email });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return {
      _id: customer._id.toString(),
      email: customer.email,
      password: customer.password,
      roles: customer.roles,
    };
  }

  async create(user: CreateUserDto): Promise<User> {
    const exists = await this.userModel.exists({ email: user.email });
    if (exists) {
      throw new ConflictException('User email already exist');
    }

    try {
      const hash = await argon2.hash(user.password);
      const newUser = await new this.userModel({ ...user, password: hash }).save();
      return newUser;
    } catch (err) {
      throw new InternalServerErrorException('There was an error creating the user');
    }
  }
}
