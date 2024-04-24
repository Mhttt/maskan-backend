import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateCustomerDto } from './dto/update-user.dto';
import { Role, User } from 'src/user/schemas/user.schema';
import { CreateUserAsAdminDto } from './dto/create-user-admin.dto';
import { CreateUserAsCustomerDto } from './dto/create-user-customer.dto';
import { UserAuthDto } from './dto/user-auth-dto';
import { encryptPassword } from 'src/common/util/password';
export interface IUserQueryString {
  search: string;
  page: number;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(query: IUserQueryString): Promise<User[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const search = query.search
      ? {
          $or: [
            { name: { $regex: query.search, $options: 'i' } },
            { cvr: { $regex: query.search, $options: 'i' } },
            { company: { $regex: query.search, $options: 'i' } },
          ],
        }
      : {};

    const users = await this.userModel
      .find({ ...search })
      .limit(resPerPage)
      .skip(skip);
    return users;
  }

  async createAsAdmin(user: CreateUserAsAdminDto): Promise<User> {
    const exists = await this.userModel.exists({ email: user.email.toLowerCase() });
    if (exists) {
      throw new ConflictException('user email already exist');
    }

    try {
      const hash = await encryptPassword(user.password);
      const newuser = await new this.userModel({
        ...user,
        email: user.email.toLowerCase(),
        password: hash,
      });
      return newuser.save();
    } catch (err) {
      throw new ConflictException('Error creating user');
    }
  }

  async createAsUser(user: CreateUserAsCustomerDto): Promise<User> {
    const exists = await this.userModel.exists({ email: user.email.toLowerCase() });

    if (exists) {
      throw new ConflictException('User email already exist');
    }

    try {
      const hash = await encryptPassword(user.password);
      const newUser = await new this.userModel({
        ...user,
        email: user.email.toLowerCase(),
        password: hash,
        userConfigs: {
          isApproved: false,
          discountPercentage: 0,
          invoiceAllowed: false,
        },
        roles: [Role.CUSTOMER],
      });
      return newUser.save();
    } catch (err) {
      throw new ConflictException('Error creating user');
    }
  }

  async findOne(email: string): Promise<UserAuthDto> {
    const customer = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return {
      _id: customer._id.toString(),
      email: customer.email.toLowerCase(),
      password: customer.password,
      roles: customer.roles,
    };
  }

  async findById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The user with the provided id was not found');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateById(id: string, user: UpdateCustomerDto): Promise<UpdateCustomerDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    return await this.userModel.findByIdAndDelete(id);
  }

  async approveUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.userConfigs.isApproved = true; // Update isApproved field
    return await user.save();
  }
}
