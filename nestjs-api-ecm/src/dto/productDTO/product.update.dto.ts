import {ApiProperty, PartialType} from '@nestjs/swagger';
import {ProductCreateDTO} from "src/dto/productDTO/product.create.dto";

export class ProductUpdateDTO extends PartialType(ProductCreateDTO){

}
