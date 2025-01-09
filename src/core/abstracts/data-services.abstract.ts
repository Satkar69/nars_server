import { AdminModel } from '../models';
import { FileModel } from '../models/file.model';
import { IGenericRepository } from './generic-repository.abstract';
import { IAdminRepository } from './repositories/admin.abstract';

export abstract class IDataServices {
  abstract admin: IAdminRepository<AdminModel>;
  abstract file: IGenericRepository<FileModel>;
}
