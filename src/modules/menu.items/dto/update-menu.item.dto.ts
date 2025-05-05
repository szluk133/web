import { Menu } from './../../menus/schemas/menu.schema';
import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu.item.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateMenuItemDto {
        @IsMongoId({ message: "_id không hợp lệ" })
        @IsNotEmpty({ message: "_id không được để trống" })
        _id: string;

        @IsOptional()
        menu: string;

        @IsOptional()
        title: string;

        @IsOptional()
        basePrice: number;

        @IsOptional()
        description: string;

        @IsOptional()
        image: string;
}
