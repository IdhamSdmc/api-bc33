import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ClientService {

  constructor(private prisma: PrismaService){

  }



  async customerDebts(dni: number){
    return await this.prisma.$queryRaw`
      SELECT
      abonados.nom_abonado,
      abonados.telefono,
      abonados.celular,
      abonados.email,
      contrato.num_contrato,
      cobros.importe,
      cobros.debe,
      cobros.estado,
      cobros.fecha AS FechaPago      
    FROM contrato 
      INNER JOIN cobros ON cobros.num_contrato= contrato.num_contrato
      LEFT JOIN abonados ON abonados.cod_abonado= contrato.cod_abonado          
    WHERE abonados.dni= ${dni} and cobros.estado='P' ORDER BY cobros.fecha DESC
    `;
  }
}
