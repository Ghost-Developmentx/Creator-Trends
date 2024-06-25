import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";

const { compilerOptions } = require("./tsconfig.json");

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    "^@config/swagger$": "<rootDir>/src/__mocks__/swaggerMock.ts",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testMatch: ["**/src/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globalSetup: "<rootDir>/jest.global-setup.ts",
  globalTeardown: "<rootDir>/jest.global-teardown.ts",
  roots: ["<rootDir>/src"],
};

export default config;
