import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginationDto } from './dto/pagination-query.dto';
import { Pagination } from './paginate.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ): Promise<Pagination<T>> {
    const findOptions: FindManyOptions<T> = {
      skip:
        ((paginationQueryDto.page ?? 1) - 1) * (paginationQueryDto.limit ?? 10),
      take: paginationQueryDto.limit,
    };
    if (where) {
      findOptions.where = where;
    }

    const result = await repository.find(findOptions);
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginationQueryDto.limit ?? 10));
    const nextPage =
      paginationQueryDto.page === totalPages
        ? paginationQueryDto.page
        : paginationQueryDto.page + 1;

    const previousPage =
      paginationQueryDto.page === 1 ? 1 : paginationQueryDto.page - 1;

    const baseUrl = `${this.request.protocol}://${this.request.get('host')}`;
    const newUrl = new URL(this.request.url, baseUrl);

    console.log('baseUrl:>>>>', newUrl);

    const response: Pagination<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: await repository.count(),
        currentPage: paginationQueryDto.page,
        totalPages: Math.ceil(totalItems / paginationQueryDto.limit),
      },
      links: {
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${paginationQueryDto.page}`,
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${previousPage}`,
      },
    };

    return response;
  }
}
