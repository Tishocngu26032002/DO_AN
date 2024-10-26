import {ApiProperty, PartialType} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import {CreateSupplierDto} from "src/dto/supplierDTO/create-supplier.dto";

export class productUpdateDTO extends PartialType(CreateSupplierDto){

}
