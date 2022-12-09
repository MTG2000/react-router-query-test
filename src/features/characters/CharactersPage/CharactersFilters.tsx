import React, { useState } from "react";
import Select from "react-select";
import { useCharactersFilter } from "./CharactersFiltersContext";

const statusOptions = [
  {
    label: "Alive",
    value: "alive",
  },
  {
    label: "Dead",
    value: "dead",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
] as const;

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Genderless",
    value: "genderless",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
] as const;

interface Props {}

export default function CharactersFilters() {
  const filters = useCharactersFilter();

  return (
    <div className="bg-blue-600 bg-opacity-50 p-16 rounded">
      <h3 className="text-h3 mb-16">Filters</h3>
      <div className="flex flex-col gap-12">
        <Select
          aria-label="status filter"
          formatOptionLabel={(option) => (
            <span data-testid={`select-option ${option.label}`}>
              {option.label}
            </span>
          )}
          options={statusOptions}
          onChange={(option) => filters.setStatus(option?.value)}
          value={statusOptions.find((o) => o.value === filters.status)}
          placeholder="Filter by status"
          isClearable
          classNames={{
            option: () => "!text-gray-900",
          }}
        />
        <Select
          options={genderOptions}
          onChange={(option) => filters.setGender(option?.value)}
          value={genderOptions.find((o) => o.value === filters.gender)}
          placeholder="Filter by gender"
          isClearable
          formatOptionLabel={(option) => (
            <span data-testid={`select-option ${option.label}`}>
              {option.label}
            </span>
          )}
          classNames={{
            option: () => "!text-gray-900",
          }}
          aria-label="gender filter"
        />
      </div>
    </div>
  );
}
