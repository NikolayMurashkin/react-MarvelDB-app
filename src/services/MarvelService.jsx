class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=9348dbb59adab6792791d34da902e88b';

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=230&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		const description = (str, num) => {
			if (str) {
				if (str.length > 150) {
					return str.slice(0, num) + '...';
				}
				return str;
			} else return 'The description of this character was destroyed by Tanos';
		}
		return {
			name: char.name,
			description: description(char.description, 150),
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`
		}
	}
}

export default MarvelService;