import { FastifyInstance } from "fastify";
import Joi = require("joi");
import { VError } from "verror";

import { toHttpError } from "./http_errors";
import * as NotAuthenticated from "./http_errors/not_authenticated";
import { AuthenticatedRequest } from "./httpd/lib";
import { Ctx } from "./lib/ctx";
import * as Result from "./result";
import * as AdditionalData from "./service/domain/additional_data";
import { ServiceUser } from "./service/domain/organization/service_user";
import * as Project from "./service/domain/workflow/project";
import * as ProjectUpdate from "./service/domain/workflow/project_update";
import * as Subproject from "./service/domain/workflow/subproject";

interface RequestBodyV1 {
  apiVersion: "1.0";
  data: {
    projectId: Project.Id;
    subprojectId: Subproject.Id;
    displayName?: string;
    description?: string;
    additionalData?: object;
    currency?: object;
  };
}

const requestBodyV1Schema = Joi.object({
  apiVersion: Joi.valid("1.0").required(),
  data: Joi.object({
    projectId: Project.idSchema.required(),
    subprojectId: Subproject.idSchema.required(),
    displayName: Joi.string(),
    description: Joi.string().allow(""),
    currency: Joi.string(),
    additionalData: AdditionalData.schema,
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
      "Partially update a subproject. Only properties mentioned in the request body are touched, " +
      "others are not affected. The assigned user will be notified about the change.",
    tags: ["subproject"],
    summary: "Update a subproject",
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
          required: ["projectId", "subprojectId"],
          properties: {
            displayName: { type: "string", example: "school" },
            description: { type: "string", example: "school should be built" },
            currency: { type: "string", example: "EUR" },
            additionalData: { type: "object" },
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
  updateSubproject(
    ctx: Ctx,
    user: ServiceUser,
    projectId: Project.Id,
    subprojectId: Subproject.Id,
    requestData: ProjectUpdate.RequestData,
  ): Promise<void>;
}

export function addHttpHandler(server: FastifyInstance, urlPrefix: string, service: Service) {
  server.post(`${urlPrefix}/subproject.update`, mkSwaggerSchema(server), (request, reply) => {
    const ctx: Ctx = { requestId: request.id, source: "http" };

    const user: ServiceUser = {
      id: (request as AuthenticatedRequest).user.userId,
      groups: (request as AuthenticatedRequest).user.groups,
    };

    const bodyResult = validateRequestBody(request.body);

    if (Result.isErr(bodyResult)) {
      const { code, body } = toHttpError(new VError(bodyResult, "failed to update project"));
      reply.status(code).send(body);
      return;
    }

    const { projectId, subprojectId } = bodyResult.data;
    const reqData = {
      displayName: bodyResult.data.displayName,
      description: bodyResult.data.description,
      additionalData: bodyResult.data.additionalData,
      currency: bodyResult.data.currency,
    };

    service
      .updateSubproject(ctx, user, projectId, subprojectId, reqData)
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
