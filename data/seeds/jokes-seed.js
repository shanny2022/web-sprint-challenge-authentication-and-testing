/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('jokes').del();

  // Inserts seed entries
  await knex('jokes').insert([
    {id: 1, joke: 'Why did the chicken cross the road?'},
    {id: 2, joke: 'Knock knock'},
    // add more jokes as needed
  ]);
};
