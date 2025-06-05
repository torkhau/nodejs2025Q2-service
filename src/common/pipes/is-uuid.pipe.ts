import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class IsUUIDPipe implements PipeTransform<string, string> {
  transform(id: string): string {
    if (!validate(id)) throw new BadRequestException(`Invalid UUID: ${id}`);

    return id;
  }
}
