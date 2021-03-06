import { Ctx } from "../../../lib/ctx";
import * as Result from "../../../result";
import { NotAuthorized } from "../errors/not_authorized";
import { NotFound } from "../errors/not_found";
import { ServiceUser } from "../organization/service_user";
import { Permissions } from "../permissions";
import * as Project from "./project";
import * as Subproject from "./subproject";

interface Repository {
  getSubproject(
    projectId: Project.Id,
    subprojectId: Subproject.Id,
  ): Promise<Result.Type<Subproject.Subproject>>;
}

export async function getSubprojectPermissions(
  ctx: Ctx,
  user: ServiceUser,
  projectId: Project.Id,
  subprojectId: Subproject.Id,
  repository: Repository,
): Promise<Result.Type<Permissions>> {
  const subprojectResult = await repository.getSubproject(projectId, subprojectId);

  if (Result.isErr(subprojectResult)) {
    return new NotFound(ctx, "subproject", subprojectId);
  }

  const subproject: Subproject.Subproject = subprojectResult;

  if (user.id !== "root") {
    if (!Subproject.permits(subproject, user, ["subproject.intent.listPermissions"])) {
      return new NotAuthorized(ctx, user.id, undefined, "subproject.intent.listPermissions");
    }
  }
  return subproject.permissions;
}
