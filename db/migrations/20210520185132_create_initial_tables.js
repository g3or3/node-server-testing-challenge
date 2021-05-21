exports.up = function (knex) {
	return knex.schema
		.createTable("artists", (tbl) => {
			tbl.increments("artist_id");
			tbl.string("artist_name", 50).notNullable().unique();
		})
		.createTable("albums", (tbl) => {
			tbl.increments("album_id");
			tbl.string("album_name", 50).notNullable().unique();
		})
		.createTable("genres", (tbl) => {
			tbl.increments("genre_id");
			tbl.string("genre_type", 25).notNullable().unique();
		})
		.createTable("songs", (tbl) => {
			tbl.increments("song_id");
			tbl.string("song_name").notNullable().unique();
			tbl
				.integer("genre_id")
				.unsigned()
				.notNullable()
				.references("genre_id")
				.inTable("genres");
			tbl
				.integer("album_id")
				.unsigned()
				.notNullable()
				.references("album_id")
				.inTable("albums");
		})
		.createTable("song_artists", (tbl) => {
			tbl.increments("association_id");
			tbl
				.integer("song_id")
				.unsigned()
				.notNullable()
				.references("song_id")
				.inTable("songs")
        .onDelete("CASCADE");
			tbl
				.integer("artist_id")
				.unsigned()
				.notNullable()
				.references("artist_id")
				.inTable("artists");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("song_artists")
		.dropTableIfExists("songs")
		.dropTableIfExists("genres")
		.dropTableIfExists("albums")
		.dropTableIfExists("artists");
};
