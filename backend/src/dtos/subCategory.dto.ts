import { IsString } from 'class-validator';

export class CreateSubCategoryDto {

    @IsString()
    public categoryId: string;

    @IsString()
    public categoryName: string;

    @IsString()
    public name: string;
}
