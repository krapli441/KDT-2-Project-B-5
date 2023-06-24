import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  gethtml(@Res()res: Response): void{
    res.sendFile('index.html',{root: 'public'})
  }
  @Get('/bundle.js')
  getjs(@Res()res: Response): void{
    res.sendFile('bundle.js',{root: 'public'})
  }
}

