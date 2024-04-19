import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model, Types } from 'mongoose';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserService } from 'src/user/user.service';
import { CreateCustomerAsAdminDto } from './dto/create-customer-admin.dto';
import { CreateCustomerAsUserDto } from './dto/create-customer-user.dto';
import { encryptPassword } from 'src/common/util/password';
import { Role } from 'src/user/schemas/user.schema';
export interface ICustomerQueryString {
  search: string;
  page: number;
}
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
    private userService: UserService,
  ) {}

  async findAll(query: ICustomerQueryString): Promise<Customer[]> {
    //TODO: Move to helper function and add to productpage
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

    const customers = await this.customerModel
      .find({ ...search })
      .limit(resPerPage)
      .skip(skip);
    return customers;
  }

  async createAsAdmin(customer: CreateCustomerAsAdminDto): Promise<Customer> {
    const exists = await this.customerModel.exists({ email: customer.email.toLowerCase() });
    if (exists) {
      throw new ConflictException('Customer email already exist');
    }

    const newUser = await this.userService.create({
      email: customer.email.toLowerCase(),
      password: 'Qwer1234',
      roles: customer.roles,
    });

    await newUser.save();

    const newCustomer = await new this.customerModel({
      ...customer,
      userId: newUser._id,
      email: customer.email.toLowerCase(),
    });
    return newCustomer.save();
  }

  async createAsUser(customer: CreateCustomerAsUserDto): Promise<Customer> {
    const exists = await this.customerModel.exists({ email: customer.email.toLowerCase() });
    if (exists) {
      throw new ConflictException('Customer email already exist');
    }

    const hash = await encryptPassword(customer.password);
    const newUser = await this.userService.create({
      email: customer.email.toLowerCase(),
      password: hash,
      roles: [Role.USER],
    });

    await newUser.save();

    const newCustomer = await new this.customerModel({
      ...customer,
      userId: newUser._id,
      email: customer.email.toLowerCase(),
      invoiceAllowed: false,
      discountPercentage: 0,
    });
    return newCustomer.save();
  }

  async findById(id: string): Promise<Customer> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    const customer = await this.customerModel.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async updateById(id: string, customer: UpdateCustomerDto): Promise<UpdateCustomerDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    return await this.customerModel.findByIdAndUpdate(id, customer, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Customer> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('The customer with the provided id was not found');
    }

    return await this.customerModel.findByIdAndDelete(id);
  }
}
