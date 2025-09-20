import { HttpPort } from '@actions/application/ports/http.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchAdapter extends HttpPort {
	async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
		const response = await fetch(url, {
			method: 'GET',
			headers: headers,
		});

		return await response.json();
	}

	async post<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<T> {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		});

		return await response.json();
	}

	async put<T>(
		url: string,
		body: Record<string, unknown>,
		headers?: Record<string, string>,
	): Promise<T> {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: JSON.stringify(body),
		});

		return await response.json();
	}

	async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: headers,
		});

		return await response.json();
	}
}
