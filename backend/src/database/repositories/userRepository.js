const MongooseRepository = require('./mongooseRepository');
const User = require('../models/user');
const AuditLogRepository = require('./auditLogRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
const lodash = require('lodash');
const crypto = require('crypto');
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcrypt');


module.exports = class UserRepository {

  static async create(data, options) {

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const hashedPassword = await bcrypt.hash(
      data.password,
      BCRYPT_SALT_ROUNDS,
    );

    data.password = hashedPassword

    data = this._preSave(data);

    if (MongooseRepository.getSession(options)) {
      await User.createCollection();
    }

    const [user] = await User.create(
      [
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          importHash: data.importHash || null,
          authenticationUid: data.authenticationUid || null,
          avatars: data.avatars || [],
          roles: data.roles || [],
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, options);
  }


  static async createFromAuth(data, options) {
    data = this._preSave(data);

    if (MongooseRepository.getSession(options)) {
      await User.createCollection();
    }

    let [user] = await User.create(
      [
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          fullName: data.fullName,
          authenticationUid: data.authenticationUid,
          roles: data.roles || [],
        },
      ],
      MongooseRepository.getSessionOptionsIfExists(options),
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: user.id },
        {
          authenticationUid: user.id,
        },
      ),
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, options);
  }


  static async updatePassword(id, password, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          authenticationUid: id,
          password,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          authenticationUid: id,
        },
      },
      options,
    );

    return this.findById(id, options);
  }

  static async updateProfile(id, data, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    data = this._preSave(data);

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          updatedBy: currentUser.id,
          avatars: data.avatars || [],
        },
      ),
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }


  static async generateEmailVerificationToken(
    email,
    options,
  ) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 360000;

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  static async generatePasswordResetToken(email, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt = Date.now() + 360000;

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          passwordResetToken,
          passwordResetTokenExpiresAt,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  static async updateStatus(id, disabled, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          disabled,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          disabled,
        },
      },
      options,
    );

    return this.findById(id, options);
  }


  static async updateRoles(id, roles, options) {
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User.findById(id),
      options,
    );

    if (options.addRoles) {
      user.roles = [...user.roles, ...roles];
    } else if (options.removeOnlyInformedRoles) {
      user.roles = lodash.difference(user.roles, roles);
    } else {
      user.roles = roles;
    }

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          roles: user.roles,
        },
      },
      options,
    );

    await user.save();

    return this.findById(user.id, options);
  }

  static async update(id, data, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    data = this._preSave(data);

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          updatedBy: currentUser.id,
          avatars: data.avatars || [],
          roles: data.roles || [],
        },
      ),
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async findByEmail(email, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({ email }),
      options,
    );
  }


  static async findByEmailWithoutAvatar(email, options) {
    return this.findByEmail(email, options);
  }

  static async findAllWithCount(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.fullName) {
        criteria = {
          ...criteria,
          ['fullName']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.fullName,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.email) {
        criteria = {
          ...criteria,
          ['email']: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.email,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.role) {
        criteria = {
          ...criteria,
          ['roles']: {
            $in: filter.role,
          },
        };
      }

      if (filter.status) {
        const disabled = filter.status === 'disabled';
        criteria = {
          ...criteria,
          ['disabled']: disabled,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          criteria = {
            ...criteria,
            ['createdAt']: {
              ...criteria.createdAt,
              $lte: end,
            },
          };
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      User.find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort),
      options,
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      User.countDocuments(criteria),
      options,
    );

    return { rows, count };
  }


  static async findAllAutocomplete(search, limit) {
    let criteria = {};

    if (search) {
      criteria = {
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          {
            fullName: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
          {
            email: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },
        ]
      };
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const users = await User.find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }


  static async findById(id, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findById(id),
      options,
    );
  }


  static async findByIdWithoutAvatar(id, options) {
    return this.findById(id, options);
  }


  static async findAllByDisabled(ids, disabled, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.find({
        _id: { $in: ids },
        disabled: !!disabled,
      }),
      options,
    );
  }

  static async findByPasswordResetToken(token, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options,
    );
  }

  static async findByEmailVerificationToken(
    token,
    options,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options,
    );
  }

  static async markEmailVerified(id, options) {
    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    await MongooseRepository.wrapWithSessionIfExists(
      User.updateOne(
        { _id: id },
        {
          emailVerified: true,
          updatedBy: currentUser.id,
        },
      ),
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  static async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      User.countDocuments(filter),
      options,
    );
  }


  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }
};
