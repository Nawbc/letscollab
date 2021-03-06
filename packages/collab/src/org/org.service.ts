import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { USER_RMQ } from '../app.constants';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  UpdateOrgDto,
} from './org.dto';
import { ResultCode } from '@letscollab/helper';
import { OrgEntity } from './org.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrgEntity)
    private readonly orgRepo: Repository<OrgEntity>,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  async queryOrg(body: QueryOrgDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize } = body;
    let cond = [];
    name && cond.push({ name });

    if (cond.length === 0) {
      cond = null;
    }

    const [list, total] = await this.orgRepo.findAndCount({
      where: cond,
      relations: ['members'],
      take: pageSize,
      skip: (current - 1) * pageSize,
    });

    return {
      code: ResultCode.SUCCESS,
      pageSize,
      total,
      current,
      d: list,
    };
  }

  async createOrg(body: CreateOrgDto) {
    const teamEntity = this.orgRepo.create(body);
    await this.orgRepo.save(teamEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async updateOrg(body: UpdateOrgDto) {
    const { id, ...rest } = body;
    this.orgRepo.remove;
    await this.orgRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '更新失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '更新成功' };
  }

  async deleteOrg(body: DeleteOrgDto) {
    const { id } = body;
    await this.orgRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: '删除失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '删除成功' };
  }
}
