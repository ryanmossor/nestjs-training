import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // create coffee class instance based on partial DTO and save to variable coffee
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    // save to DB
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    /* preload() creates new entity based on object passed to it.
    preload() looks to see if entity already exists in DB; if so, retrieves it and everything related to it.
    If entity exists, preload() replaces all values with the new ones passed here in updateCoffeeDto */
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      // preload() returns undefined if id passed in is not found in DB
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    // retrieve coffee based on ID; if exists, remove it
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
