import { FastifyInstance } from "fastify";
import Joi = require("joi");
import { VError } from "verror";

import { toHttpError } from "./http_errors";
import * as NotAuthenticated from "./http_errors/not_authenticated";
import { AuthenticatedRequest } from "./httpd/lib";
import { assertUnreachable } from "./lib/assertUnreachable";
import { Ctx } from "./lib/ctx";
import * as Result from "./result";
import { ServiceUser } from "./service/domain/organization/service_user";

interface RequestBodyV1 {
  apiVersion: "1.0";
  data: {
    groupId: string;
    userId: string;
  };
}

const requestBodyV1Schema = Joi.object({
  apiVersion: Joi.valid("1.0").required(),
  data: Joi.object({
    groupId: Joi.string().required(),
    userId: Joi.string().required(),
  }).required(),
});

type RequestBody = RequestBodyV1;
const requestBodySchema = Joi.alternatives([requestBodyV1Schema]);

function validateRequestBody(body: any): Result.Type<RequestBody> {
  const { error, value } = Joi.validate(body, requestBodySchema);
  return !error ? value : error;
}

function mkSwaggerSchema(server: FastifyInstance) {
  return {
    beforeHandler: [(server as any).authenticate],
    description: "Remove user from a group",
    tags: ["group"],
    summary: "Remove a user from a group",
    security: [
      {
        bearerToken: [],
      },
    ],
    body: {
      type: "object",
      required: ["apiVersion", "data"],
      properties: {
        apiVersion: { type: "string", example: "1.0" },
        data: {
          type: "object",
          required: ["groupId", "userId"],
          properties: {
            groupId: { type: "string", example: "Manager" },
            userId: { type: "string", example: "aSmith" },
          },
        },
      },
    },
    response: {
      200: {
        description: "successful response",
        type: "object",
        properties: {
          apiVersion: { type: "string", example: "1.0" },
          data: {
            type: "object",
            properties: {
              deleted: { type: "boolean", example: "true" },
            },
          },
        },
      },
      401: NotAuthenticated.schema,
    },
  };
}

interface Service {
  removeGroupMember(ctx: Ctx, user: ServiceUser, groupId: string, userId: string): Promise<void>;
}

export function addHttpHandler(server: FastifyInstance, urlPrefix: string, service: Service) {
  server.post(`${urlPrefix}/group.removeUser`, mkSwaggerSchema(server), (request, reply) => {
    const ctx: Ctx = { requestId: request.id, source: "http" };

    const user: ServiceUser = {
      id: (request as AuthenticatedRequest).user.userId,
      groups: (request as AuthenticatedRequest).user.groups,
    };

    const bodyResult = validateRequestBody(request.body);

    if (Result.isErr(bodyResult)) {
      const { code, body } = toHttpError(
        new VError(bodyResult, "failed to remove user from group"),
      );
      reply.status(code).send(body);
      return;
    }

    let invokeService;
    switch (bodyResult.apiVersion) {
      case "1.0": {
        const { groupId, userId } = bodyResult.data;
        invokeService = service.removeGroupMember(ctx, user, groupId, userId);
        break;
      }
      default:
        assertUnreachable(bodyResult.apiVersion);
    }

    invokeService
      .then(() => {
        const code = 200;
        const body = {
          apiVersion: "1.0",
          data: {
            deleted: true,
          },
        };
        reply.status(code).send(body);
      })
      .catch(err => {
        const { code, body } = toHttpError(err);
        reply.status(code).send(body);
      });
  });
}
