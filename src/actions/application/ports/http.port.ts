export abstract class HttpPort {
	abstract get<T>(url: string, headers?: Record<string, string>): Promise<T>;

	abstract post<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<T>;

	abstract put<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<T>;

	abstract delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
}
