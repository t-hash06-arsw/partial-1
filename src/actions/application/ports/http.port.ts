export type HttpResponse<T> = {
	status: number;
	data: T;
	headers: Record<string, string>;
};

export abstract class HttpPort {
	abstract get<T>(
		url: string,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>>;

	abstract post<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>>;

	abstract put<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>>;

	abstract delete<T>(
		url: string,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>>;
}
