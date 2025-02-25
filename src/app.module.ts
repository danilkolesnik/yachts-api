import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { OfferModule } from './offer/offer.module';
import { PriceListModule } from './price-list/price-list.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    WarehouseModule, 
    TasksModule, 
    OfferModule, PriceListModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
