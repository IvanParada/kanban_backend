import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';

export class ApiResponseDto<T> {
  @ApiProperty({ enum: Status, example: Status.Success })
  status: Status;

  @ApiProperty({ type: Object })
  data: T;
}
