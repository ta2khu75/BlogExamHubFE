import { BasePath } from '@/env/BasePath';
import { ExamSearch } from '@/types/request/search/ExamSearch';
import instance from '@/util/apiInstance';
import qs from 'qs';
const basePath = BasePath.EXAM
export default class ExamService {
    static search(examSearch: ExamSearch): Promise<ApiResponse<PageResponse<ExamResponse>>> {
        return instance.get(basePath, {
            params: { ...examSearch }, paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        })
    }
    // static mySearch(examSearch: ExamSearchRequest): Promise<ApiResponse<PageResponse<ExamResponse>>> {
    //     return instance.get(`${basePath}/mine`, { params: { ...examSearch } })
    // }
    static mySearchBlogNull(keyword: string, page = 1, size = 10): Promise<ApiResponse<PageResponse<ExamResponse>>> {
        return instance.get(`${basePath}/my-exam/blog-null`, { params: { keyword, page, size } })
    }
    static myReadAllById(ids: string[]): Promise<ApiResponse<ExamResponse[]>> {
        return instance.get(`${basePath}/my-exam/ids`, { params: { ids } })
    }
    static create(data: ExamRequest, image: File): Promise<ApiResponse<ExamResponse>> {
        const form = new FormData();
        form.append("image", image)
        form.append("exam_request", JSON.stringify(data));
        return instance.post(basePath, form);
    }
    static update(id: string, data: ExamRequest, image?: File): Promise<ApiResponse<ExamResponse>> {
        const form = new FormData();
        if (image) {
            form.append("image", image)
        }
        form.append("exam_request", JSON.stringify(data));
        return instance.put(`${basePath}/${id}`, form);
    }
    static delete(id: string): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static readDetailById(id: string): Promise<ApiResponse<ExamDetailsResponse>> {
        return instance.get(`${basePath}/${id}/detail`);
    }
    static readById(id: string): Promise<ApiResponse<ExamResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
    static countByAuthor(authorId: string): Promise<ApiResponse<CountResponse>> {
        return instance.get(`${basePath}/${authorId}/count`);
    }
    static myCount(): Promise<ApiResponse<CountResponse>> {
        return instance.get(`${basePath}/my-blog/count`);
    }
}