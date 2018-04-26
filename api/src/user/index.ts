import { AuthToken } from "../authz/token";
import { AllowedUserGroupsByIntent } from "../authz/types";
import { ignoringStreamNotFound } from "../multichain/lib";
import { MultichainClient } from "../multichain";
import { Resource } from "../multichain/Client.h";

const usersStreamName = "users";

export interface UserResource extends Resource {
  data: UserRecord;
}

export interface UserRecord {
  id: string;
  displayName: string;
  organization: string;
  passwordCiphertext: string;
}

export interface UserWithoutPassword {
  id: string;
  displayName: string;
  organization: string;
}

const ensureStreamExists = async (multichain: MultichainClient): Promise<void> => {
  await multichain.getOrCreateStream({
    kind: "users",
    name: usersStreamName
  });
};

export const create = async (
  multichain: MultichainClient,
  token: AuthToken,
  user: UserRecord
): Promise<void> => {
  await ensureStreamExists(multichain);

  // Don't overwrite existing users:
  const userExists = (await multichain.getValues(usersStreamName, user.id, 1)).length !== 0;
  if (userExists) throw { kind: "UserAlreadyExists", targetUserId: user.id };

  const resource = {
    data: user,
    log: [{ issuer: token.userId, action: "user_created" }],
    permissions: {}
  };

  await multichain.setValue(usersStreamName, ["users", user.id], resource);
};

export const get = async (multichain: MultichainClient, userId: string): Promise<UserRecord> => {
  const streamItem = await multichain.getValue(usersStreamName, userId);
  return streamItem.resource.data;
};

export const getAll = async (multichain: MultichainClient): Promise<UserRecord[]> => {
  const streamItems = await multichain.getLatestValues(usersStreamName, "users");
  return streamItems.map(item => item.resource.data);
};
