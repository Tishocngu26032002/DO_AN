import { Injectable } from '@nestjs/common';
import { CreateLocationUserDto } from '../../dto/locationUserDTO/create-location_user.dto';
import { UpdateLocationUserDto } from '../../dto/locationUserDTO/update-location_user.dto';
import {BaseService} from "src/base/baseService/base.service";
import {CategoryEntity} from "src/entities/category_entity/category.entity";
import {Location_userEntity} from "src/entities/user_entity/location_user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LocationUserRepository} from "src/repository/LocationUserRepository";
import {CategoryCreateDTO} from "src/dto/categoryDTO/category.create.dto";
import {ApplyStatus} from "src/share/Enum/Enum";

@Injectable()
export class LocationUserService extends BaseService<Location_userEntity>{
  constructor(
      @InjectRepository(Location_userEntity)
      private readonly locationRepo: LocationUserRepository,
  ) {
    super(locationRepo);
  }
    async getList(filters: any) {
        const condition: any = {};
        if (filters.user_id) condition.user_id = filters.user_id;
        if (filters.default_location) condition.default_location = filters.default_location;
        const [list, total] = await this.locationRepo.findAndCount({
            where: condition,
        });

        if (!list) throw new Error('NO LOCATION!');
        return {
            data: list,
            total,
        };
    }

    async createLocation(createLocationUserDto: CreateLocationUserDto) {
      if(createLocationUserDto.default_location){
          const filters = {
              user_id: createLocationUserDto.user_id,
              default_location: createLocationUserDto.default_location
          };
          await this.updateDefaultMethod(filters, null);
      }
      return await this.locationRepo.save(createLocationUserDto);
    }

    async detail(id: string) {
        return await super.findOne(id);
    }

    async update(locationUpdateDTO: UpdateLocationUserDto, id: string, updateDefault: boolean = false) {
      if(updateDefault){
          await this.updateDefaultMethod(locationUpdateDTO, id);
      }
      return await super.update(locationUpdateDTO, id);
    }

    async updateDefaultMethod(locationUpdateDTO: UpdateLocationUserDto, id: string){
        const locationDefaultInDB = await this.locationRepo.findOne({
            where: {
                default_location: true,
                user_id: locationUpdateDTO.user_id,
            },
        });
        if(locationDefaultInDB != null){
            locationDefaultInDB.default_location = false;
            await super.update(locationDefaultInDB, id);
        }
        locationUpdateDTO.default_location = true;
    }

    async delete(id: string) {
        return await super.delete(id);
    }
}
