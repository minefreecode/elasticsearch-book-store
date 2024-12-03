import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  series?: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  language?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isbn?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  pages?: string;

  @IsOptional()
  @IsNotEmpty()
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
