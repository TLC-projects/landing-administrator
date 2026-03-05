import { DEFAULT_CIPHERS } from "tls";

export const PAGINATION_CONFIG = {
  PROJECTS: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50
  },
  SECTIONS:{
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 30
  }
} as const;

export interface PaginationParamsType {
    page: number;
    limit: number;
}

export class PaginationParams {
    /**
     * Creates a new instance of PaginationParams
     * @param page - The page number (1-based indexing)
     * @param limit - The number of items per page
     */
    constructor(
        public readonly page: number,
        public readonly limit: number
    ) { }

    static forProjects(page?: number, limit?: number): PaginationParams {
        // Get projects-specific pagination configuration
        const config = PAGINATION_CONFIG.PROJECTS;
        // Ensure page is at least 1, defaulting to config value if not provided
        const validPage = Math.max(page || config.DEFAULT_PAGE, 1);
        // Ensure limit is between 1 and MAX_LIMIT, defaulting to config value if not provided
        const validLimit = Math.min(Math.max(limit || config.DEFAULT_LIMIT, 1), config.MAX_LIMIT);

        return new PaginationParams(validPage, validLimit);
    }

    static forSections(page?: number, limit?: number): PaginationParams {
        // Get projects-specific pagination configuration
        const config = PAGINATION_CONFIG.SECTIONS;
        // Ensure page is at least 1, defaulting to config value if not provided
        const validPage = Math.max(page || config.DEFAULT_PAGE, 1);
        // Ensure limit is between 1 and MAX_LIMIT, defaulting to config value if not provided
        const validLimit = Math.min(Math.max(limit || config.DEFAULT_LIMIT, 1), config.MAX_LIMIT);

        return new PaginationParams(validPage, validLimit);
    }
}