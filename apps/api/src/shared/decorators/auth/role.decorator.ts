import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/shared/constants";
import { RoleEnum } from "src/shared/enum";

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);