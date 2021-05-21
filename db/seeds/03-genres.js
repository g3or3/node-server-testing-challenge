const genres = [{ genre_type: "House" }, { genre_type: "EDM" }];

exports.seed = function (knex) {
	return knex("genres").insert(genres);
};
