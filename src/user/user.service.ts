import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    const customer = await this.userModel.findOne({ email: email });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async create(user: CreateUserDto): Promise<User> {
    const exists = await this.userModel.exists({ email: user.email });
    if (exists) {
      throw new ConflictException('User email already exist');
    }

    try {
      const hash = await argon2.hash(user.password);
      const newCustomer = await new this.userModel({ ...user, password: hash });
      return newCustomer.save();
    } catch (err) {
      throw new InternalServerErrorException('There was an error creating the user');
    }
  }
}
