import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu.item.dto';
import { UpdateMenuItemDto } from './dto/update-menu.item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem } from './schemas/menu.item.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuItemsService {
  constructor(@InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const createdItem = new this.menuItemModel(createMenuItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  async findOne(id: string): Promise<MenuItem> {
    return this.menuItemModel.findById(id).exec();
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndUpdate(id, updateMenuItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<MenuItem> {
    return this.menuItemModel.findByIdAndDelete(id).exec();
  }
}