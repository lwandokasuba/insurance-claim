import { Prisma, PrismaClient } from "@prisma/client";
import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  routes;

  constructor(prisma: PrismaClient) {
    super(prisma);
    this.routes = {
      add: "/users/add",
      getAll: "/users/get",
      get: "/users/get/:id",
      update: "/users/update/:id",
      delete: "/users/delete/:id",
      login: "/users/login",
    };
  }

  addUser: (props: Prisma.UserCreateInput) => Promise<any> = async (props) => {
    if (!(props.email && props.password)) {
      throw new Error("Missing required fields");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: props.email,
      },
    });
    if (user) {
      return user;
    }

    return await this.prisma.user.create({
      data: props,
    });
  }

  getUsers: () => Promise<any> = async () => {
    return await this.prisma.user.findMany({
      omit: {
        password: true
      }
    });
  }

  login: (props: { email: string, password: string }) => Promise<any> = async (props) => {
    if (!(props.email && props.password)) {
      throw new Error("Missing required fields");
    }

    return await this.prisma.user.findUnique({
      where: {
        email: props.email,
        password: props.password,
      },
      omit: {
        password: true
      }
    });
  }

  getUser: (props: { id: number }) => Promise<any> = async (props) => {
    if (!props.id) {
      throw new Error("Missing required field: id");
    }

    return await this.prisma.user.findUnique({
      where: {
        id: props.id,
      },
      omit: {
        password: true
      }
    });
  }

  updateUser: (props: Prisma.UserUpdateInput & { id: number}) => Promise<any> = async (props) => {
    if (!props.id) {
      throw new Error("Missing required field: id");
    }

    return await this.prisma.user.update({
      where: {
        id: props.id,
      },
      data: props,
    });
  }
}
