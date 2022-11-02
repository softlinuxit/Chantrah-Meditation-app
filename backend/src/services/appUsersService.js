const AppUsersRepository = require('../database/repositories/appUsersRepository');
const ValidationError = require('../errors/validationError');
const MongooseRepository = require('../database/repositories/mongooseRepository');
const PasswordResetEmail = require('../emails/passwordResetEmail');
const EmailSender = require('./shared/email/emailSender');
const ValidationErrorNormal = require('../errors/validationErrorNormal');
const config = require('../../config')();
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

/**
 * Handles AppUsers operations
 */
module.exports = class AppUsersService {
  constructor({ currentUser, language }) {
    this.repository = new AppUsersRepository();
    this.currentUser = currentUser;
    this.language = language;
  }


  async create(data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.create(data, {
        session: session,
        currentUser: this.currentUser,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          session,
          currentUser: this.currentUser,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          session,
          currentUser: this.currentUser,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async findAllAutocomplete(search, limit) {
    return this.repository.findAllAutocomplete(
      search,
      limit,
    );
  }

  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }

  async _isImportHashExistent(importHash) {
    const count = await this.repository.count({
      importHash,
    });

    return count > 0;
  }


};
