import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { getUsers } from '../users';
import { UserType } from './user-type';
import { UserDto } from './user.dto';

export class UserModel {
  @Length(4, 32)
  @IsUnique('username', { context: { array: getUsers() }, message: 'username must be unique' })
  username?: string;

  @IsString()
  @Length(4, 32)
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsEmail()
  email!: string;

  @IsEnum(UserType)
  user_type!: UserType;

  @IsStrongPassword('password', { message: 'password min length is 8, at least 1 number, and 1 letter' })
  password!: string;

  private constructor() {
  }

  static fromDto(dto: UserDto): UserModel {
    const user = new UserModel();
    Object.assign(user, dto);

    return user;
  }
}

export function IsUnique(property: string, options: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return !options.context.array.some((item: any) => item[propertyName] === relatedValue);
        },
      },
    });
  };
}

export function IsStrongPassword(property: string, options: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value.length < 8) {
            return false;
          }

          const hasNumber: boolean = /\d/.test(value);
          const hasLetter: boolean = /[a-zA-Z]/.test(value);

          return hasNumber && hasLetter;
        },
      },
    });
  };
}
