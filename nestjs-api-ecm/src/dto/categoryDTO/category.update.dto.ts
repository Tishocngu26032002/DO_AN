import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CategoryCreateDTO} from "src/dto/categoryDTO/category.create.dto";

export class categoryUpdateDTO extends PartialType(CategoryCreateDTO){

}
