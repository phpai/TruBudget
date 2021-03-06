import Intent from "../../../authz/intents";
import { Ctx } from "../../../lib/ctx";
import { BusinessEvent } from "../business_event";
import { InvalidCommand } from "../errors/invalid_command";
import { NotAuthorized } from "../errors/not_authorized";
import { Identity } from "../organization/identity";
import { ServiceUser } from "../organization/service_user";
import * as GlobalPermissionRevoked from "./global_permission_revoked";
import * as GlobalPermissions from "./global_permissions";
import { sourceProjects } from "./project_eventsourcing";

interface Repository {
  getGlobalPermissions(): Promise<GlobalPermissions.GlobalPermissions>;
}

export async function revokeGlobalPermission(
  ctx: Ctx,
  issuer: ServiceUser,
  revokee: Identity,
  intent: Intent,
  repository: Repository,
): Promise<{ newEvents: BusinessEvent[]; errors: Error[] }> {
  // Create the new event:
  const globalPermissionRevoked = GlobalPermissionRevoked.createEvent(
    ctx.source,
    issuer.id,
    intent,
    revokee,
  );

  // Check authorization (if not root):
  if (issuer.id !== "root") {
    const currentGlobalPermissions = await repository.getGlobalPermissions();
    if (!GlobalPermissions.permits(currentGlobalPermissions, issuer, ["global.revokePermission"])) {
      return {
        newEvents: [],
        errors: [new NotAuthorized(ctx, issuer.id, globalPermissionRevoked)],
      };
    }
  }

  // Check that the new event is indeed valid:
  const { errors } = sourceProjects(ctx, [globalPermissionRevoked]);
  if (errors.length > 0) {
    return { newEvents: [], errors: [new InvalidCommand(ctx, globalPermissionRevoked, errors)] };
  }

  return { newEvents: [globalPermissionRevoked], errors: [] };
}
