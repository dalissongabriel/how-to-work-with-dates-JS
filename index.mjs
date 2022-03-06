// index.mjs
// Node.js v17.6.0

/**
 * Node.js's original module system is CommonJs  (which uses require and
 * module.exports).
 *
 * Since Node.js was created, the ECMAScript module system (which uses import
 * and export) has become standard and Node.js has added support for it.
 *
 * Node.js will treat .cjs files as CommonJS modules and .mjs files as
 * ECMAScript modules.
 *
 * It will treat .js files as whatever the default module
 * system for the project is (which is CommonJS unless package.json says
 * "type": "module",).
 */

/**
 * The assert module provides a set of assertion
 * functions for verifying invariants.
 *
 * DOCS: https://nodejs.org/api/assert.html
 */
import { strict as assert } from "assert";

class DateUtils {
  static _defaultDateTimeFormatOptions = {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  };

  static _defaultLocale = "pt-br";

  static addDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }

  static subtractDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() - days);
    return cloneDate;
  }

  static addMonths(originalDate, months) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setMonth(cloneDate.getMonth() + months);
    return cloneDate;
  }

  static subtractMonths(originalDate, months) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setMonth(cloneDate.getMonth() - months);
    return cloneDate;
  }

  static addYears(originalDate, years) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setFullYear(cloneDate.getFullYear() + years);
    return cloneDate;
  }

  static subtractYears(originalDate, years) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setFullYear(cloneDate.setFullYear() - years);
    return cloneDate;
  }

  /**
   * @param {Date} originalDate
   * @param {Intl.DateTimeFormatOptions} options
   * @param {string} locale
   * @returns string
   */
  static formatToString(
    originalDate,
    options = DateUtils._defaultDateTimeFormatOptions,
    locale = DateUtils._defaultLocale
  ) {
    return originalDate.toLocaleDateString(locale, {
      ...DateUtils._defaultDateTimeFormatOptions,
      ...options,
    });
  }

  static biggerThan(testeDate, targetDate) {
    return Date.parse(testeDate) > Date.parse(targetDate);
  }

  static lessThan(testeDate, targetDate) {
    return Date.parse(testeDate) < Date.parse(targetDate);
  }
}

//////////////////// START DATE FORMATATION ///////////////////////////

// Scoped blocks to can redeclare constants
{
  const result = DateUtils.formatToString(new Date("1999-03-30 00:01:46"));
  const expected = "30/03/1999";
  assert.equal(result, expected);
}

{
  const result = DateUtils.formatToString(new Date("1999-03-30 00:01:46"), {
    month: "long",
  });
  const expected = "30 de março de 1999";
  assert.equal(result, expected);
}

{
  const result = DateUtils.formatToString(new Date("1999-03-30 00:01:46"), {
    month: "long",
    weekday: "long",
  });
  const expected = "terça-feira, 30 de março de 1999";
  assert.equal(result, expected);
}

//////////////////// END DATE FORMATATION ///////////////////////////

//////////////////// START DATE CHANGE ///////////////////////////

// How to add 30 day in your date
{
  const updatedDate = DateUtils.addDays(new Date("1999-03-22 15:06:00"), 22);

  const result = DateUtils.formatToString(updatedDate);
  const expected = "13/04/1999";
  assert.equal(result, expected);
}

// How to add 8 Months in your date
{
  const updatedDate = DateUtils.addMonths(new Date("1999-03-22 15:06:00"), 8);

  const result = DateUtils.formatToString(updatedDate);
  const expected = "22/11/1999";
  assert.equal(result, expected);
}
{
  const testDate = new Date("1999-03-30");
  const targetDate = new Date("1999-03-29");

  assert.equal(DateUtils.biggerThan(testDate, targetDate), true);
}
{
  const testDate = new Date("2000-03-30");
  const targetDate = new Date("2022-02-15");

  assert.equal(DateUtils.lessThan(testDate, targetDate), true);
}
