import { IsArray, IsEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateProductDto {

    // @IsArray()
    public categoryId: true;

    // @IsArray()
    public subCategoryId: true;

    // @IsString()
    public name: string;

    // @IsString()
    public description: string;

    // @IsString()
    public price: string;

    // @IsObject()
    public image: string;
}



