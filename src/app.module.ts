import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { users } from './auth/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:() =>({
        type:"postgres",
        host:"localhost",
        port:5432,
        username:"postgres",
        password:"12345678",
        database:"yachts",
        synchronize:true,
        entities: [__dirname + '/**/*.entity{.js, .ts}']
      })
    }),
    AuthModule, 
    WarehouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
