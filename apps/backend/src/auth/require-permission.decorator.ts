import { SetMetadata } from "@nestjs/common";

import type { AdminPermission } from "./permissions";

export const PERMISSION_KEY = "permission";

export const RequirePermission = (permission: AdminPermission) =>
    SetMetadata(PERMISSION_KEY, permission);
