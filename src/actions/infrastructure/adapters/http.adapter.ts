import { HttpPort, HttpResponse } from '@actions/application/ports/http.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchAdapter extends HttpPort {
	private async fetchToHttpResponse<T>(
		response: Response,
	): Promise<HttpResponse<T>> {
		const headers: Record<string, string> = {};

		response.headers.forEach((value, key) => {
			headers[key] = value;
		});

		const data = await response.json();

		return {
			status: response.status,
			data: data as T,
			headers: headers,
		};
	}

	async get<T>(
		url: string,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: 'GET',
			headers: headers,
		});

		return await this.fetchToHttpResponse<T>(response);
	}

	async post<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		});

		return await this.fetchToHttpResponse<T>(response);
	}

	async put<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		});

		return await this.fetchToHttpResponse<T>(response);
	}

	async delete<T>(
		url: string,
		headers?: Record<string, string>,
	): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: headers,
		});

		return await this.fetchToHttpResponse<T>(response);
	}
}
