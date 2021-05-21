const db = require("../../db/dbConfig");

const getAll = () => {
	return db
		.select("s.song_id", "song_name", "artist_name", "album_name", "genre_type")
		.from("songs as s")
		.join("song_artists as sa", "sa.song_id", "s.song_id")
		.join("artists as ar", "ar.artist_id", "sa.artist_id")
		.join("albums as al", "al.album_id", "s.album_id")
		.join("genres as g", "g.genre_id", "s.genre_id");
};

const getById = (song_id) => {
	return db
		.select("s.song_id", "song_name", "artist_name", "album_name", "genre_type")
		.from("songs as s")
		.join("song_artists as sa", "sa.song_id", "s.song_id")
		.join("artists as ar", "ar.artist_id", "sa.artist_id")
		.join("albums as al", "al.album_id", "s.album_id")
		.join("genres as g", "g.genre_id", "s.genre_id")
		.where({ "s.song_id": song_id })
		.first();
};

const create = async ({ song_name, artist_name, album_name, genre_type }) => {
	let createdSongId;

	await db.transaction(async (trx) => {
		let artist, album, genre;

		artist = await trx("artists").where({ artist_name }).first();
		album = await trx("albums").where({ album_name }).first();
		genre = await trx("genres").where({ genre_type }).first();

		if (!artist) 
      [artist] = await trx("artists").insert({ artist_name }, ["artist_id"]);

		if (!album) 
      [album] = await trx("albums").insert({ album_name }, ["album_id"]);

		if (!genre) 
      [genre] = await trx("genres").insert({ genre_type }, ["genre_id"]);

		const { artist_id } = artist;
		const { album_id } = album;
		const { genre_id } = genre;

		const [song] = await trx("songs").insert({ song_name, genre_id, album_id }, ["song_id"]);

		const { song_id } = song;

		await trx("song_artists").insert({ song_id, artist_id });

		createdSongId = song_id;
	});

	return getById(createdSongId);
};

const remove = async (song_id) => {
	const removedSong = await getById(song_id);
	await db("songs").where({ song_id }).del();

	return removedSong;
};

module.exports = { getAll, getById, create, remove };
