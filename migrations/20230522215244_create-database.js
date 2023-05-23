/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('UserStatus', tbl => {
        tbl.increments('UserStatusId')
        tbl.text('Status')
    })
    
    .createTable('SystemUser', tbl=> {
        tbl.increments('SystemUserId')
        tbl.text('FirstName').notNullable()
        tbl.text('LastName').notNullable()
        tbl.text('Email').notNullable()
        tbl.integer('UserStatusId')
            .unsigned()
            .references('UserStatusId')
            .inTable('UserStatus')
            .index()
            .notNullable()
        tbl.timestamps(true, true)
    })
    .createTable('SystemSettings', tbl => {
        tbl.integer('MaxPostsPerDay').notNullable(),
        tbl.integer('MaxRepliesPerDay').notNullable(),
        tbl.integer('MaxSharesPerDay').notNullable(),
        tbl.integer('MaxNewConnectionsPerDay').notNullable(),
        tbl.integer('MaxCharactersPerStatement').notNullable()
        tbl.integer('UserStatementTTLDays').notNullable()
    })
    .createTable('ConnectionNature', tbl => {
        tbl.increments('ConnectionNatureId')
        tbl.text('Nature').notNullable()
    })
    .createTable('Connection', tbl => {
        tbl.increments()
        tbl.integer('SystemUserId1')
            .unsigned()
            .references('SystemUserId')
            .inTable('SystemUser')
            .notNullable()
        tbl.integer('SystemUserId2')
            .unsigned()
            .references('SystemUserId')
            .inTable('SystemUser')
            .notNullable()
        tbl.integer('ConnectionNatureId')
            .unsigned()
            .references('ConnectionNatureId')
            .inTable('ConnectionNature')
            .notNullable()
        tbl.timestamps(true, true)
    })
    .createTable('StatementNature', tbl => {
        tbl.increments()
        tbl.text('Nature').notNullable()
    })
    .createTable('UserStatement', tbl => {
        tbl.increments('UserStatementId')
        tbl.integer('SystemUserId')
            .unsigned()
            .references('SystemUserId')
            .inTable('SystemUser')
            .index()
            .notNullable()
        tbl.text('Statement').notNullable()
        tbl.timestamps(true, true)
        tbl.binary('IsDeleted').notNullable()
        tbl.integer('OriginalStatementId')
            .unsigned()
            .references('UserStatementId')
            .inTable('UserStatement')
            .index()
            .notNullable()
        tbl.integer('StatementNatureId')
            .unsigned()
            .references('StatementNatureId')
            .inTable('StatementNature')
            .index()
            .notNullable()
    })
    .createTable('UserPost', tbl => {
        tbl.increments('UserPostId')
        tbl.integer('UserStatementId')
            .unsigned()
            .references('UserStatementId')
            .inTable('UserStatement')
            .index()
            .notNullable()
        tbl.integer('SystemUserId')
            .unsigned()
            .references('SystemUserId')
            .inTable('SystemUser')
            .index()
            .notNullable()
        tbl.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
