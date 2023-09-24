import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ReportDTO {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}
