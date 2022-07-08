import { Controller, Get, HttpCode, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { ClientService } from './client.service';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  debts: any;

  @UseGuards(JwtGuard)
  @Get(':dni')
  async debsClients(@Param('dni') dni: number, @Res() res: Response){
    this.debts = await this.clientService.customerDebts(dni);
    return res.status(200).send({
      'ok' : true,
      'data': this.debts
    });
  }
}
