import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly synopsis: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  readonly publicationDate: string;
}
