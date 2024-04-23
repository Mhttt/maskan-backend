import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let model: Model<Customer>;

  beforeEach(async () => {
    const mockCustomerService = {
      findById: jest.fn(),
    };
    const mockUserService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        UserService,
        { provide: getModelToken(Customer.name), useValue: mockCustomerService },
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    model = module.get<Model<Customer>>(getModelToken(Customer.name));
  });

  describe('findById', () => {
    it('should find and return a customer by ID', async () => {
      const mockCustomer = {
        _id: '6627abe2546f443329233323',
        userId: '6627abe2546f443329233320',
        company: 'Test Company',
        name: 'Test Name',
        email: 'Test@email.com',
        cvr: '12345678',
        invoiceAddress: {
          street: 'Test Street',
          city: 'Test City',
          zip: '1234',
          country: 'Test Country',
        },
        shippingAddress: {
          street: 'Test Street',
          city: 'Test City',
          zip: '1234',
          country: 'Test Country',
        },
        discountPercentage: 10,
        invoiceAllowed: true,
        orders: [],
        invoices: [],
      };

      jest.spyOn(model, 'findById').mockResolvedValue(mockCustomer);

      const result = await customerService.findById(mockCustomer._id);

      expect(model.findById).toHaveBeenCalledWith(mockCustomer._id);
      expect(result).toEqual(mockCustomer);
    });
  });
});
