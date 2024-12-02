import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  bookId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  series?: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  language: string;

  @IsString()
  isbn: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @IsOptional()
  @IsString()
  pages?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  publishDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awards?: string[];

  @IsOptional()
  @IsString()
  numRatings?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ratingsByStars?: string[];

  @IsOptional()
  @IsString()
  likedPercent?: string;

  @IsArray()
  @IsString({ each: true })
  storySetting: string[];

  @IsOptional()
  @IsString()
  coverImg?: string;
}
