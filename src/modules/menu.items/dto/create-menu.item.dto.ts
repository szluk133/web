
import { IsNotEmpty } from "class-validator";

export class CreateMenuItemDto {
    @IsNotEmpty({message: 'menu không được để trống'})
    menu: string;

    title: string;

    @IsNotEmpty({message: 'basePrice không được để trống'})
    basePrice: number;

    description: string;
    image: string;
}
