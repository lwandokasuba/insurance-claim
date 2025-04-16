import { Prisma, PrismaClient } from "@prisma/client";
import { Claim } from "../types";
import { BaseService } from "./BaseService";
import { sendEmail } from "../utils/sendEmail";
import { claimCreatedEmail, claimStatusUpdatedEmail } from "../utils/emailTemplates";
import { getIdNumber } from "../utils/GetIdNumber";

export class ClaimService extends BaseService {
  routes;

  constructor(prisma: PrismaClient) {
    super(prisma);
    this.routes = {
      add: "/claims/add",
      getAll: "/claims/get",
      get: "/claims/get/:id",
      update: "/claims/update/:id",
      delete: "/claims/delete/:id",
    };
  }

  addClaim: (props: IAddClaim) => Promise<any> = async (props) => {
    if (!(props.userId && props.type && props.description && props.incidentDate)) {
      throw new Error("Missing required fields");
    }

    return await this.prisma.claim.create({
      data: {
        status: "PENDING",
        type: props.type,
        userId: props.userId,
        description: props.description,
        incidentDate: props.incidentDate,
        incidentLocation: props.incidentLocation || null,
        reportedDate: props.reportedDate || new Date(),
      },
      include: {
        user: true
      }
    })
    .then(async (claim) => {
      sendEmail({
        to: claim.user.email,
        subject: `${getIdNumber('CL', claim)} Claim Created`,
        text: claimCreatedEmail(claim).text,
        html: claimCreatedEmail(claim).html,
      })

      return claim;
    })
  }

  getClaims: (props: IGetClaims) => Promise<any> = async (props) => {
    return await this.prisma.claim.findMany({
      where: {
        status: props.status,
        type: props.type,
        userId: props.userId,
        incidentDate: props.incidentDate,
        incidentLocation: props.incidentLocation,
        reportedDate: props.reportedDate,
      },
    });
  }

  getClaim: (props: IGetClaim) => Promise<any> = async (props) => {
    if (!props.id) {
      throw new Error("Missing required field: id");
    }

    return await this.prisma.claim.findUnique({
      where: {
        id: props.id,
      },
    });
  }

  updateClaim: (props: IUpdateClaim) => Promise<any> = async (props) => {
    const { id, ...data } = props;
    if (!props.id) {
      throw new Error("Missing required field: id");
    }

    if (Object.keys(data).length === 0) {
      throw new Error("No fields to update");
    }

    const old = await this.prisma.claim.findUnique({
      where: {
        id: props.id,
      },
    });

    return await this.prisma.claim.update({
      where: {
        id: props.id,
      },
      data: {
        status: props.status,
        type: props.type,
        userId: props.userId,
        description: props.description,
        incidentDate: props.incidentDate,
        incidentLocation: props.incidentLocation,
        reportedDate: props.reportedDate,
      },
      include: {
        user: true
      }
    })
    .then(async (claim) => {
      if (props.status && props.status !== old?.status) {
        sendEmail({
          to: claim.user.email,
          subject: `${getIdNumber('CL', claim)} Status Updated`,
          text: claimStatusUpdatedEmail(claim).text,
          html: claimStatusUpdatedEmail(claim).html,
        })
      }
      return claim;
    })
  }

  deleteClaim: (props: IDeleteClaim) => Promise<any> = async (props) => {
    if (!props.id) {
      throw new Error("Missing required field: id");
    }

    return await this.prisma.claim.delete({
      where: {
        id: props.id,
      },
    });
  }
}

export type IAddClaim = Omit<Claim, 'id' | 'createdAt' | 'updatedAt'>
export type IUpdateClaim = Partial<IAddClaim> & Pick<Claim, 'id'>
export type IGetClaims = Pick<Claim, 'status' | 'type' | 'userId' | 'incidentDate' | 'incidentLocation' | 'reportedDate'>
export type IGetClaim = Pick<Claim, 'id'>
export type IDeleteClaim = Pick<Claim, 'id'>
