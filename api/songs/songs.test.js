const db = require("../../db/dbConfig");
const Songs = require("./songsModel");
const request = require("supertest");
const app = require("../app");
const cleaner = require("knex-cleaner");

const song1 = {
	song_name: "JS Wizard",
	artist_name: "Francis",
	album_name: "Lambda 2021",
	genre_type: "Rap",
};
const song2 = {
	song_name: "JS Deficient",
	artist_name: "George",
	album_name: "Lambda 2021",
	genre_type: "Rap",
};

const listOfSongs = [
	{
		song_id: 1,
		song_name: "JS Wizard",
		artist_name: "Francis",
		album_name: "Lambda 2021",
		genre_type: "Rap",
	},
	{
		song_id: 2,
		song_name: "JS Deficient",
		artist_name: "George",
		album_name: "Lambda 2021",
		genre_type: "Rap",
	},
];

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await cleaner.clean(db, {
		ignoreTables: ["knex_migrations", "knex_migrations_lock"],
	});
});

afterAll(async () => {
	await db.destroy();
});

describe("[GET} /songs", () => {
	beforeEach(async () => {
		await Songs.create(song1);
		await Songs.create(song2);
	});

	it("responds with 200 status code", async () => {
		const res = await request(app).get("/api/songs");
		expect(res.status).toBe(200);
	});

	it("returns a list of songs", async () => {
		const res = await request(app).get("/api/songs");
		expect(res.body).toMatchObject(listOfSongs);
	});
});

describe("[POST] /songs", () => {
	it("creates a new song succesfully", async () => {
		let res = await request(app).post("/api/songs").send(song1);
		expect(res.body).toMatchObject({ song_id: 1, ...song1 });

		res = await request(app).post("/api/songs").send(song2);
		expect(res.body).toMatchObject({ song_id: 2, ...song2 });
	});
});

describe("[DELETE] /songs/:id", () => {
	beforeEach(async () => {
		await Songs.create(song1);
	});
	it("deletes a song succesfully and returns the deleted song", async () => {
		let res = await request(app).get("/api/songs");
		expect(res.body).toMatchObject([{ song_id: 1, ...song1 }]);

		res = await request(app).delete("/api/songs/1");
		expect(res.body).toMatchObject({ song_id: 1, ...song1 });

		res = await request(app).get("/api/songs");
		expect(res.body).toHaveLength(0);
	});
});
