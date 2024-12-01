import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly synopsis: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  readonly publicationDate: string;
}
