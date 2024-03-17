import { Cup } from "./cup.model";

export interface RequestDataInput {
    content: Cup[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
    }
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    },
    totalElements: number;
    totalPages: number;
  }