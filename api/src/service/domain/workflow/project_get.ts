import { VError } from "verror";
import Intent from "../../../authz/intents";
import { Ctx } from "../../../lib/ctx";
import * as Result from "../../../result";
import { NotAuthorized } from "../errors/not_authorized";
import { NotFound } from "../errors/not_found";
import { canAssumeIdentity } from "../organization/auth_token";
import { ServiceUser } from "../organization/service_user";
import * as Project from "./project";
import { ProjectTraceEvent } from "./project_trace_event";

interface Repository {
  getProject(projectId: Project.Id): Promise<Result.Type<Project.Project>>;
}

export async function getProject(
  ctx: Ctx,
  user: ServiceUser,
  projectId: Project.Id,
  repository: Repository,
): Promise<Result.Type<Project.Project>> {
  const project = await repository.getProject(projectId);

  if (Result.isErr(project)) {
    return new NotFound(ctx, "project", projectId);
  }

  if (
    user.id !== "root" &&
    !Project.permits(project, user, ["project.viewSummary", "project.viewDetails"])
  ) {
    return new NotAuthorized(ctx, user.id, undefined, "project.viewSummary");
  }

  return dropHiddenHistoryEvents(project, user);
}

type EventType = string;
const requiredPermissions = new Map<EventType, Intent[]>([
  ["project_created", ["project.viewSummary", "project.viewDetails"]],
  ["project_permission_granted", ["project.intent.listPermissions"]],
  ["project_permission_revoked", ["project.intent.listPermissions"]],
  ["project_assigned", ["project.viewDetails"]],
  ["project_updated", ["project.viewDetails"]],
  ["project_closed", ["project.viewSummary", "project.viewDetails"]],
  ["project_archived", ["project.viewSummary", "project.viewDetails"]],
  ["project_projected_budget_updated", ["project.viewDetails"]],
  ["project_projected_budget_deleted", ["project.viewDetails"]],
]);

function dropHiddenHistoryEvents(
  project: Project.Project,
  actingUser: ServiceUser,
): Project.Project {
  const isEventVisible =
    actingUser.id === "root"
      ? () => true
      : (event: ProjectTraceEvent) => {
          const allowed = requiredPermissions.get(event.businessEvent.type);
          if (!allowed) return false;
          for (const intent of allowed) {
            for (const identity of project.permissions[intent] || []) {
              if (canAssumeIdentity(actingUser, identity)) return true;
            }
          }
          return false;
        };

  return {
    ...project,
    log: (project.log || []).filter(isEventVisible),
  };
}
