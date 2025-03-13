import { BasePath } from "@/env/BasePath";
import instance from "@/util/apiInstance";

const basePath = BasePath.EXAM_RESULT;
export default class ExamResultService {
  static takeExam(examId: string): Promise<ApiResponse<ExamResultResponse>> {
    return instance.get(`${basePath}/exam/${examId}`);
  }
  static submitExam(
    id: string,
    data: ExamResultRequest
  ): Promise<ApiResponse<ExamResultResponse>> {
    return instance.put(`${basePath}/${id}`, data);
  }
  static readDetailsById(
    id: number
  ): Promise<ApiResponse<ExamResultDetailsResponse>> {
    return instance.get(`${basePath}/${id}`);
  }
  static readPage(): Promise<ApiResponse<PageResponse<ExamResultResponse>>> {
    return instance.get(`${basePath}`);
  }

}
