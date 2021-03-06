import { FastifyInstance } from "fastify";
import Joi = require("joi");
import { VError } from "verror";

import { toHttpError } from "./http_errors";
import * as NotAuthenticated from "./http_errors/not_authenticated";
import { AuthenticatedRequest } from "./httpd/lib";
import { Ctx } from "./lib/ctx";
import * as Result from "./result";
import { ServiceUser } from "./service/domain/organization/service_user";
import * as Project from "./service/domain/workflow/project";
import * as Subproject from "./service/domain/workflow/subproject";

interface RequestBodyV1 {
  apiVersion: "1.0";
  data: {
    projectId: Project.Id;
    subprojectId: Subproject.Id;
    identity: string;
  };
}

const requestBodyV1Schema = Joi.object({
  apiVersion: Joi.valid("1.0").required(),
  data: Joi.object({
    projectId: Project.idSchema.required(),
    subprojectId: Subproject.idSchema.required(),
    identity: Joi.string().required(),
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
    description:
      "Assign a subproject to a given user. The assigned user will be notified about the change.",
    tags: ["subproject"],
    summary: "Assign a user or group to a subproject",
    security: [
      {
        bearerToken: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        apiVersion: { type: "string", example: "1.0" },
        data: {
          type: "object",
          additionalProperties: false,
          required: ["identity", "subprojectId", "projectId"],
          properties: {
            identity: { type: "string", example: "aSmith" },
            projectId: { type: "string", example: "d0e8c69eg298c87e3899119e025eff1f" },
            subprojectId: { type: "string", example: "er58c69eg298c87e3899119e025eff1f" },
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
            type: "string",
          },
        },
      },
      401: NotAuthenticated.schema,
    },
  };
}

interface Service {
  assignSubproject(
    ctx: Ctx,
    user: ServiceUser,
    projectId: Project.Id,
    subprojectId: Subproject.Id,
    assignee: string,
  ): Promise<void>;
}

export function addHttpHandler(server: FastifyInstance, urlPrefix: string, service: Service) {
  server.post(`${urlPrefix}/subproject.assign`, mkSwaggerSchema(server), (request, reply) => {
    const ctx: Ctx = { requestId: request.id, source: "http" };

    const user: ServiceUser = {
      id: (request as AuthenticatedRequest).user.userId,
      groups: (request as AuthenticatedRequest).user.groups,
    };

    const bodyResult = validateRequestBody(request.body);

    if (Result.isErr(bodyResult)) {
      const { code, body } = toHttpError(new VError(bodyResult, "failed to assign subproject"));
      reply.status(code).send(body);
      return;
    }

    const { projectId, subprojectId, identity: assignee } = bodyResult.data;

    service
      .assignSubproject(ctx, user, projectId, subprojectId, assignee)
      .then(() => {
        const code = 200;
        const body = {
          apiVersion: "1.0",
          data: "OK",
        };
        reply.status(code).send(body);
      })
      .catch(err => {
        const { code, body } = toHttpError(err);
        reply.status(code).send(body);
      });
  });
}
