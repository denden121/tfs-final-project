import {LinkInterface} from "../dto/link.interface";
import {path} from "../const/consts";

class LinkApi {
    async getAllLinksAsync(): Promise<LinkInterface[]> {
        const response = await fetch(`${path}/link`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Не удалось получить все ссылки');
        }
        return response.json();
    }

    async getGenerateLink (createLink: { link: string }): Promise<LinkInterface> {
        const response = await fetch(`${path}/link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createLink),
        });
        if (!response.ok) {
            throw new Error('Не удалось сгенерировать ссылку');
        }
        return response.json();
    }

    async getLinkForRedirect (generateLink:string): Promise<LinkInterface> {
        const response = await fetch(`${path}/link/${generateLink}`, {
            method: 'GET',
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error('Не удалось сгенерировать ссылку');
        }
        return response.json();
    }
}

export default new LinkApi();
