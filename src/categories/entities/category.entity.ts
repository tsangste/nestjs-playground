import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Category {
  @PrimaryKey({ autoincrement: true })
  id!: bigint

  @Property()
  name: string

  @Property({ nullable: true })
  description?: string
}
