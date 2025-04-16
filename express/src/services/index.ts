import { BaseService } from "./BaseService";
import { ClaimService } from "./ClaimService";
import { UserService } from "./UserService";

export class DatabaseService extends BaseService {
  claims = new ClaimService(this.prisma);
  users = new UserService(this.prisma);
}