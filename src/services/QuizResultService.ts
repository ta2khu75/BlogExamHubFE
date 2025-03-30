import { BasePath } from "@/env/BasePath";
import instance from "@/util/apiInstance";
import qs from 'qs';
const basePath = BasePath.QUIZ_RESULT;
export default class QuizResultService {
  static takeQuiz(examId: string): Promise<ApiResponse<QuizResultResponse>> {
    return instance.get(`${basePath}/exam/${examId}`);
  }
  static submitQuiz(
    id: string,
    data: QuizResultRequest
  ): Promise<ApiResponse<QuizResultResponse>> {
    return instance.put(`${basePath}/${id}`, data);
  }
  static readDetailById(
    id: string
  ): Promise<ApiResponse<QuizResultResponse>> {
    return instance.get(`${basePath}/${id}`);
  }
  static search(quizResultSearch: QuizResultSearch): Promise<ApiResponse<PageResponse<QuizResultResponse>>> {
    return instance.get(basePath, {
      params: { ...quizResultSearch }, paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
  }
}
