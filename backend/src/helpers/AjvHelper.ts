/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import merge from 'deepmerge';

import Ajv, {type InstanceOptions as AjvInstanceOptions, type ValidateFunction} from 'ajv';
import AjvI18N from 'ajv-i18n';
import AjvKeywords from 'ajv-keywords';
import AjvErrors, {type ErrorMessageOptions} from 'ajv-errors';
import AjvAddFormats, {type FormatsPluginOptions} from 'ajv-formats';

// helper
import type {JSONSchema7} from 'json-schema';

/**
 * Represents an error message with a key and human-readable message.
 * Used to standardize error reporting in validation contexts.
 */
export interface ErrorMessage {
  /**
   * A unique identifier or property name associated with the error.
   */
  key: string;

  /**
   * A human-readable error message.
   */
  message: string;
}

/**
 * Configuration options for creating an Ajv instance.
 * Allows customization of Ajv validation behavior and error formatting.
 */
export interface InstanceOptions {
  /**
   * Options to pass to the Ajv instance.
   * @example { verbose: true, allErrors: true }
   */
  ajv?: Partial<AjvInstanceOptions>;

  /**
   * Additional Ajv keywords to register.
   * @example ['customKeyword']
   */
  keywords?: string | string[] | null;

  /**
   * Options for Ajv format plugin.
   * @example { formats: ['date-time'] }
   */
  formatsOptions?: Partial<FormatsPluginOptions>;

  /**
   * Options to customize error messages.
   * @example { singleError: true }
   */
  errorOptions?: Partial<ErrorMessageOptions>;
}

/**
 * Type alias for the Ajv instance.
 * Represents an instance of the Ajv validation library.
 */
export type Instance = InstanceType<typeof Ajv>;

/**
 * Options for parsing validation errors.
 * Controls how error messages are formatted.
 */
export interface ParseErrorOptions {
  /**
   * Whether to omit the property name from the error message.
   * @example true
   */
  omitPropertyName?: boolean;
}

export default abstract class AjvHelper {
  /**
   * Creates a new Ajv instance<br>
   * Special replaceable variables in `errorMessage`:
   * <ul>
   *   <li><b>'{t}'</b>: Replace by title's property value</li>
   *   <li><b>'{v}'</b>: Replace by validation rule's value</li>
   * </ul>
   * @param [options] - Additional options
   * @returns Ajv instance
   * @example
   * // Basic example
   * const validate = newInstance()
   * .addKeyword({
   *   keyword: 'minLengthOpt',
   *   type: 'number',
   *   validate: ( schema, data ) =>
   *     !data ? true : !(String(data).length < schema),
   * })
   * .compile({
   *     title: 'Caption',
   *     type: 'string',
   *     minLengthOpt: 5,
   *     maxLength: 30,
   *     errorMessage: {
   *       minLengthOpt: request.t(`{t} length should be greater than {v}`, 5),
   *     }
   * });
   *
   * if ( !validate(data) ) {
   *   const {message} = parseError(validate, request);
   *   return new Error(message);
   * }
   */
  public static create(options: InstanceOptions = {}): Instance {
    const _options = merge<InstanceOptions>(
      {
        ajv: {
          verbose: true,
          allErrors: true,
          $data: true,
          allowMatchingProperties: true,
        },
        formatsOptions: {},
        errorOptions: {singleError: true},
      },
      options,
    );

    const ajv = new Ajv(_options.ajv);

    AjvKeywords(ajv, options?.keywords ?? undefined);
    AjvAddFormats(ajv, options.formatsOptions as FormatsPluginOptions);
    AjvErrors(ajv, options.errorOptions);

    return ajv;
  }

  /**
   * Get i18n/formatted error messages from `ajv` validation errors<br>
   * Special replaceable variables:
   * <ul>
   *   <li><b>'{t}'</b>: Replace by title's property value
   /**
   * Get i18n/formatted error messages from `ajv` validation errors<br>
   * Special replaceable variables:
   * <ul>
   *   <li><b>'{t}'</b>: Replace by title's property value</li>
   *   <li><b>'{v}'</b>: Replace by validation rule's value</li>
   * </ul>
   * @param {validate} validate - Validate function
   * @param [lang='en'] - Language
   * @returns Error message / Nothing
   * @example Simple error
   * if ( !validate(data) ) {
   *   const {message} = parseError(validate);
   *   throw new Error(message);
   * }
   */

  /**
   * Finds the name of the required property in the parent schema.
   * @param parentSchema - The parent JSON schema.
   * @param data - The data being validated.
   * @returns The name of the required property.
   * @developerNotes This method is used internally to determine the missing required property.
   */
  private static findRequiredPropName(parentSchema: JSONSchema7, data: Record<string, any>): string {
    const requiredProps: string[] = parentSchema?.required ?? [];
    if (requiredProps.length === 1) return requiredProps?.at?.(0) ?? '';

    for (const name of requiredProps) {
      if (!Object.hasOwn(data, name)) {
        return name;
      }
    }

    return requiredProps?.at?.(0) ?? '';
  }

  /**
   * Normalizes Ajv validation errors into a standardized format.
   * Replaces placeholders and ensures consistent message formatting.
   * @param errors - The raw Ajv validation errors.
   * @param lang - The language for i18n support.
   * @param options - Additional options for parsing errors.
   * @returns A list of standardized error messages.
   * @developerNotes This method is used internally to format errors consistently across the application.
   */
  private static normalizeErrors(errors: ValidateFunction['errors'], lang: string = 'en', options: ParseErrorOptions = {}): ErrorMessage[] {
    if (!errors?.length) return [];

    const producedErrors: ErrorMessage[] = [];

    for (const error of errors) {
      if (lang in AjvI18N) { // @ts-ignore
        AjvI18N[lang](error);
      }

      const {keyword, instancePath, message, parentSchema, data} = error;

      const key = !instancePath.length ? this.findRequiredPropName(parentSchema as JSONSchema7, data as Record<string, any>) : String(instancePath).replace(/^\//, '');

      let errorMessage = parentSchema?.errorMessage?.[keyword] ?? `${key} ${message}`;

      const hasPropPlaceholder = errorMessage.includes('{t}');

      errorMessage = errorMessage.replace(/\{t}/g, Array.isArray(key) ? key[0] : key).replace(/\{v}/g, String(data || ''));

      if (errorMessage.match(new RegExp(`${key} `, 'g')).length > 1) errorMessage = errorMessage.replace(new RegExp(`${key} `, ''), '');

      errorMessage = hasPropPlaceholder ? errorMessage.replace(new RegExp(`^${key} `, 'g'), '') : errorMessage;

      if (options?.omitPropertyName) {
        errorMessage = String(errorMessage)
          .replace(key || '', '')
          .trim();
      }

      producedErrors.push({
        key,
        message: errorMessage?.[0]?.toUpperCase?.() + errorMessage?.slice?.(1),
      });
    }

    return producedErrors;
  }

  /**
   * Parses Ajv validation errors and returns the first formatted error message.
   * @param validate - The validation function returned by Ajv.
   * @param lang - The language for i18n support (default: 'en').
   * @param options - Additional options for parsing errors.
   * @returns The first formatted error message, or null if no errors.
   * @example
   * if (!validate(data)) {
   *   const error = AjvHelper.parseError(validate, 'en', { omitPropertyName: true });
   *   console.error(error?.message);
   * }
   * @developerNotes Use this method when only the first error is needed for immediate feedback.
   */
  public static parseError(validate: ValidateFunction, lang: string = 'en', options: ParseErrorOptions = {}): ErrorMessage | null {
    return this.parseErrors(validate, lang, options)?.[0] ?? null;
  }

  /**
   * Parses Ajv validation errors and returns formatted error messages.
   * Supports i18n and custom error message formatting using placeholders.
   * @param validate - The validation function returned by Ajv.
   * @param lang - The language for i18n support (default: 'en').
   * @param options - Additional options for parsing errors.
   * @returns An array of formatted error messages.
   * @example
   * if (!validate(data)) {
   *   const errors = AjvHelper.parseErrors(validate, 'en', { omitPropertyName: true });
   *   console.error(errors);
   * }
   * @developerNotes Use this method to extract and format error messages for user-facing feedback.
   */
  public static parseErrors(validate: ValidateFunction, lang: string = 'en', options: ParseErrorOptions = {}): ErrorMessage[] {
    return !validate || !('errors' in validate) || !validate?.errors?.length ? [] : this.normalizeErrors(validate.errors, lang, options);
  }
}
