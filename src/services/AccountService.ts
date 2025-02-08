// import { BasePath } from "../env/BasePath";
// import instance from "../util/apiInstance";

import { BasePath } from "@/env/BasePath";
import instance from "@/util/apiInstance";

const basePath = BasePath.ACCOUNT;
export default class AccountService {
  static readPage(search = "", page = 1, size = 10): Promise<ApiResponse<PageResponse<AccountAuthDetailsResponse>>> {
    return instance.get(`${basePath}`, { params: { search, page, size } });
  }
  static create(account: AccountRequest): Promise<ApiResponse<AccountResponse>> {
    return instance.post(basePath, account);
  }
  static updateStatus(id: string, account: AccountStatusRequest): Promise<ApiResponse<AccountAuthDetailsResponse>> {
    return instance.put(`${basePath}/${id}`, account);
  }
  static updateMyInfo(account: AccountInfoRequest): Promise<ApiResponse<AccountResponse>> {
    return instance.put(`${basePath}`, account);
  }
  static updatePermission(id: string, permissionIds: number[]): Promise<ApiResponse<AccountAuthDetailsResponse>> {
    return instance.put(`${basePath}/${id}/permission`, { permission_ids: permissionIds });
  }
  static readById(id: string): Promise<ApiResponse<AccountDetailsResponse>> {
    return instance.get(`${basePath}/${id}`);
  }
  static updateMyPassword(
    accountPassword: AccountPasswordRequest
  ): Promise<ApiResponse<AccountPasswordRequest>> {
    return instance.put(`${basePath}/change-password`, accountPassword);
  }
  static readDetailsById(id: string): Promise<ApiResponse<AccountDetailsResponse>> {
    return instance.get(`${basePath}/${id}/details`);
  }
}
