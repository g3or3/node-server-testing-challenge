module.exports = {
	development: {
		client: "pg",
		connection: "postgresql://postgres:george02@localhost:5432/music",
		migrations: {
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},

	testing: {
		client: "pg",
		connection: "postgresql://postgres:george02@localhost:5432/music_testing",
		migrations: {
			directory: "./db/migrations",
		},
	},

	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./db/migrations",
		},
	},
};
