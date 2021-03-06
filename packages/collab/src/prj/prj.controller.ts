import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrjService } from './prj.service';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreatePrjDto,
  DeletePrjDto,
  PrjListResDto,
  QueryPrjDto,
  UpdatePrjDto,
} from './prj.dto';

@Controller('v1/prj')
@ApiTags('v1/Project')
export class PrjController {
  constructor(private readonly prjService: PrjService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOperation({
    summary: 'Get project list',
  })
  @ApiOkResponse({
    type: PrjListResDto,
  })
  async prjList(@Query() query: QueryPrjDto) {
    return this.prjService.queryPrj(query);
  }

  @Post()
  @ApiCookieAuth('SID')
  async createPrj(@Body() body: CreatePrjDto) {
    return this.prjService.createPrj(body);
  }

  @Put()
  @ApiCookieAuth('SID')
  async updatePrj(@Body() body: UpdatePrjDto) {
    return this.prjService.updatePrj(body);
  }

  @Delete()
  @ApiCookieAuth('SID')
  async deletePrj(@Body() body: DeletePrjDto) {
    return this.prjService.deletePrj(body);
  }
}
