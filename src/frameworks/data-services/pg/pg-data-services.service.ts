import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import InjectableString from 'src/common/injectable.string';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IAdminRepository } from 'src/core/abstracts/repositories/admin.abstract';
import { AdminModel } from 'src/core/models';
import { FileModel } from 'src/core/models/file.model';
import { DataSource, Repository } from 'typeorm';
import { AdminEntity } from './entities';
import { FileEntity } from './entities/file.entity';
import { PgGenericRepository } from './pg-generic-repository';
import { PgAdminRepository } from './repositories/admin.repository';

@Injectable()
export class PgDataServices implements IDataServices, OnApplicationBootstrap {
  admin: IAdminRepository<AdminModel>;
  file: PgGenericRepository<FileModel>;

  constructor(
    @Inject(AdminEntity.REPOSITORY)
    private adminRepository: Repository<AdminEntity>,

    @Inject(FileEntity.REPOSITORY)
    private fileRepository: Repository<FileEntity>,

    private readonly cls: IClsStore<AppClsStore>,

    @Inject(InjectableString.APP_DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  onApplicationBootstrap() {
    // admin
    this.admin = new PgAdminRepository(this.cls, this.adminRepository);
    // user
    // file
    this.file = new PgGenericRepository(this.cls, this.fileRepository);
  }
}
