import { Migration } from '@mikro-orm/migrations'

export class Migration20250729210412_Initial extends Migration {
  override up() {
    this.addSql(
      `create table "category" ("id" bigserial primary key, "name" varchar(255) not null, "description" varchar(255) null);`
    )
  }

  override down() {
    this.addSql(`drop table if exists "category" cascade;`)
  }
}
