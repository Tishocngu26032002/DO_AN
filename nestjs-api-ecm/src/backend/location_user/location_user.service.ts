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
          await this.updateDefaultMethod(createLocationUserDto);
      }
      return await super.create(createLocationUserDto, {default_location: createLocationUserDto.default_location});
    }

    async detail(id: string) {
        return await super.findOne(id);
    }

    async update(locationUpdateDTO: UpdateLocationUserDto) {
      if(locationUpdateDTO.default_location == true){
          await this.updateDefaultMethod(locationUpdateDTO);
      }
      return await super.update(locationUpdateDTO, locationUpdateDTO.id);
    }

    async updateDefaultMethod(locationDTO: any){
        const locationDefaultInDB = await this.locationRepo.findOne({
            where: {
                default_location: true,
                user_id: locationDTO.user_id,
            },
        });
        if(locationDefaultInDB != null){
            locationDefaultInDB.default_location = false;
            await super.update(locationDefaultInDB, locationDefaultInDB.id);
        }
    }

    async delete(id: string) {
        return await super.delete(id);
    }
}
