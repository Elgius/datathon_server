import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class QueryDto {
  @IsBoolean()
  @IsNotEmpty()
  policy?: boolean;

  @IsString()
  @IsNotEmpty()
  query: string;
}
