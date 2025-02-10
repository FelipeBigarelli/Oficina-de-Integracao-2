/* eslint-disable prettier/prettier */
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    "<rootDir>/src/modules/**/useCases/*.ts", 
    "!<rootDir>/src/modules/**/useCases/*Controller.ts", 
  ],

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["text-summary", "lcov"],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: ["**/*.spec.ts"],
};
