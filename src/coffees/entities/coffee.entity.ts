import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable() // specifies the owner side of the relationship between coffee/flavor
  // type => Flavor specifies the type of relationship; returns a reference to the Flavor entity
  // flavor => flavor.coffees specifies what coffee is within the Flavor entity
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees)
  flavors: string[];
}
