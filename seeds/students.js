exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Ben", cohort_id: 1 },
        { name: "Tommy", cohort_id: 2 },
        { name: "Kai", cohort_id: 3 }
      ]);
    });
};
