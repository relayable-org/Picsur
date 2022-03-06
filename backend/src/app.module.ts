import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicsurConfigModule } from './config/config.module';
import { ServeStaticConfigService } from './config/servestatic.config.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { DemoManagerModule } from './managers/demo/demomanager.module';
import { AuthModule } from './routes/api/auth/auth.module';
import { PrefModule } from './routes/api/pref/pref.module';
import { ImageModule } from './routes/image/imageroute.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useExisting: TypeOrmConfigService,
      imports: [PicsurConfigModule],
    }),
    ServeStaticModule.forRootAsync({
      useExisting: ServeStaticConfigService,
      imports: [PicsurConfigModule],
    }),
    AuthModule,
    ImageModule,
    DemoManagerModule,
    PrefModule,
  ],
})
export class AppModule {}
