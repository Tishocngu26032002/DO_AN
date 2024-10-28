import { Test, TestingModule } from '@nestjs/testing';
import { LocationUserService } from './location_user.service';

describe('LocationUserService', () => {
  let service: LocationUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationUserService],
    }).compile();

    service = module.get<LocationUserService>(LocationUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
