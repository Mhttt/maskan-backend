import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, User } from 'src/user/schemas/user.schema';
import { CreateUserAsAdminDto } from './dto/create-user-admin.dto';
import { CreateUserAsCustomerDto } from './dto/create-user-customer.dto';
import { UserAuthDto } from './dto/user-auth-dto';
import { encryptPassword } from 'src/common/util/password';
import { ApprovalStatus, UserPermissions } from './schemas/userconfig.schema';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async findAllPending(): Promise<User[]> {
    return await this.userModel.find({ 'userConfigs.approvalStatus': ApprovalStatus.PENDING });
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
          approvalStatus: ApprovalStatus.PENDING,
          discountPercentage: 0,
          userPermissions: [UserPermissions.CCALLOWED],
        },
        roles: [Role.CUSTOMER],
      });
      return newUser.save();
    } catch (err) {
      throw new ConflictException('Error creating user');
    }
  }

  async findOne(email: string): Promise<UserAuthDto> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: user._id.toString(),
      email: user.email.toLowerCase(),
      password: user.password,
      roles: user.roles,
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

  async updateById(id: string, user: UpdateUserDto): Promise<UpdateUserDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The user with the provided id was not found');
    }

    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The user with the provided id was not found');
    }

    return await this.userModel.findByIdAndDelete(id);
  }

  async approveUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The user with the provided id was not found');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.userConfigs.approvalStatus = ApprovalStatus.APPROVED;
    return await user.save();
  }

  async rejectUser(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The user with the provided id was not found');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.userConfigs.approvalStatus = ApprovalStatus.REJECTED;
    return await user.save();
  }
}
