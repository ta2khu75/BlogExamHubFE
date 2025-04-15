import { BasePath } from "@/env/BasePath";
import instance from "@/util/apiInstance";
import qs from "qs";
const basePath = BasePath.BLOG
export class BlogService {
    static search(blogSearchRequest: BlogSearch): Promise<ApiResponse<PageResponse<BlogResponse>>> {
        return instance.get(`${basePath}`, {
            params: { ...blogSearchRequest }, paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });  // support array query params like tags[]=tag1&tags[]=tag2
            }
        })
    }
    // static mySearch(blogSearchRequest: BlogSearch): Promise<ApiResponse<PageResponse<BlogResponse>>> {
    //     return instance.get(`${basePath}/mine`, { params: { ...blogSearchRequest } })
    // }
    static create(blog: BlogRequest, file?: File): Promise<ApiResponse<BlogResponse>> {
        const form = new FormData();
        if (file) {
            form.append("image", file)
        }
        form.append("blog", JSON.stringify(blog));
        return instance.post(basePath, form);
    }
    static update(id: string, blog: BlogRequest, file?: File): Promise<ApiResponse<BlogResponse>> {
        const form = new FormData();
        if (file) {
            form.append("image", file)
        }
        form.append("blog", JSON.stringify(blog));
        return instance.put(`${basePath}/${id}`, form);
    }
    static delete(id: string): Promise<ApiResponse<void>> {
        return instance.delete(`${basePath}/${id}`);
    }
    static read(id: string): Promise<ApiResponse<BlogResponse>> {
        return instance.get(`${basePath}/${id}`);
    }
    static readDetail(id: string): Promise<ApiResponse<BlogResponse>> {
        return instance.get(`${basePath}/${id}/detail`);
    }
    static countByAuthor(authorId: string): Promise<ApiResponse<CountResponse>> {

        return instance.get(`${basePath}/${authorId}/count`);
    }
    static myCount(): Promise<ApiResponse<CountResponse>> {
        return instance.get(`${basePath}/my-blog/count`);
    }

}