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

/**
 * @type Intl.DateTimeFormatOptions
 **/
const options = {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
};

const locale = "pt-br";

//////////////////// START DATE FORMATATION ///////////////////////////

// Scoped blocks to can redeclare constants
{
  const date = new Date("1999-03-30 00:01:46");
  const actual = date.toLocaleDateString(locale, options);
  const expected = "30/03/1999";
  assert.equal(actual, expected);
}

{
  const date = new Date("1999-03-30 01:06:00");
  const actual = date.toLocaleDateString(locale, {
    ...options,
    month: "long",
  });
  const expected = "30 de março de 1999";
  assert.equal(actual, expected);
}

{
  const dateTime = new Date("1999-03-30 15:06:00");
  const actual = dateTime.toLocaleDateString(locale, {
    ...options,
    month: "long",
    weekday: "long",
  });
  const expected = "terça-feira, 30 de março de 1999";
  assert.equal(actual, expected);
}

//////////////////// FINISH DATE FORMATATION ///////////////////////////

//////////////////// START DATE CHANGE ///////////////////////////

// How to change Day
{
  const dateTime = new Date("1999-03-22 15:06:00");
  dateTime.setDate(29);

  const actual = dateTime.toLocaleDateString(locale, {
    ...options,
    month: "long",
    weekday: "long",
  });
  const expected = "segunda-feira, 29 de março de 1999";
  assert.equal(actual, expected);
}

// How to add 30 day in your date
{
  const dateTime = new Date("1999-03-22 15:06:00");
  dateTime.setDate(dateTime.getDate() + 30);

  const actual = dateTime.toLocaleDateString(locale);
  const expected = "21/04/1999";
  assert.equal(actual, expected);
}

// Create reusable function to add days in date
{
  /**
   *
   * @param {Date} originalDate
   * @param {number} days
   * @returns {Date} Original date + days
   */
  function addDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }

  const dateTime = new Date("1999-03-22 15:06:00");
  const incrementedDate = addDays(dateTime, 90);

  const actual = incrementedDate.toLocaleDateString(locale);
  const expected = "20/06/1999";
  assert.equal(actual, expected);
}

{
  /**
   *
   * @param {Date} originalDate
   * @param {number} days
   * @returns {Date} Original date + days
   */
  function subtractDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() - days);
    return cloneDate;
  }

  const dateTime = new Date("1999-03-22 15:06:00");
  const incrementedDate = subtractDays(dateTime, 90);

  const actual = incrementedDate.toLocaleDateString(locale);
  const expected = "22/12/1998";
  assert.equal(actual, expected);
}

// Create reusable function add months in date
{
  /**
   *
   * @param {Date} originalDate
   * @param {number} months
   * @returns {Date} Original date + months
   */
  function addMonths(originalDate, months) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setMonth(cloneDate.getMonth() + months);
    return cloneDate;
  }

  const dateTime = new Date("1999-01-22 15:06:00");
  const incrementedDate = addMonths(dateTime, 2);

  const actual = incrementedDate.toLocaleDateString(locale);
  const expected = "22/03/1999";
  assert.equal(actual, expected);
}

//////////////////// END DATE CHANGE ///////////////////////////
