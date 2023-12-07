import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports:[PassportModule,forwardRef(()=> UserModule),JwtModule.register({secret:"letmein",signOptions:{expiresIn:'1d'}})],
  controllers: [],
  providers: [AuthService, JwtAuthGuard],
  exports:[AuthService,JwtAuthGuard]
})
export class AuthModule {}
