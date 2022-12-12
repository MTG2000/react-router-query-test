import React, { useState } from "react";
import Select from "react-select";
import { DotLoader } from "react-spinners";
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

interface Props {
  isLoading?: boolean;
}

export default function CharactersFilters(props: Props) {
  const filters = useCharactersFilter();

  return (
    <div className="bg-gray-900 p-16 rounded relative">
      {props.isLoading && (
        <div
          data-testid="loading"
          className="absolute inset-0 rounded bg-gray-300 bg-opacity-40 z-10 flex flex-col justify-center items-center"
        >
          <DotLoader color="black" size={48} />
        </div>
      )}
      <h3 className="text-h3 mb-16">Filters</h3>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <label htmlFor="status-filter">Status</label>
          <Select
            id="status-filter"
            aria-label="status-filter"
            formatOptionLabel={(option) => (
              <span data-testid={`select-option ${option.label}`}>
                {option.label}
              </span>
            )}
            options={statusOptions}
            onChange={(option) => filters.setStatus(option?.value)}
            value={statusOptions.find((o) => o.value === filters.status)}
            placeholder="All"
            isClearable
            classNames={{
              option: () => "!text-gray-900",
            }}
          />
        </div>
        <div className="flex flex-col gap-8">
          <label htmlFor="gender-filter">Gender</label>
          <Select
            id="gender-filter"
            aria-label="gender-filter"
            options={genderOptions}
            onChange={(option) => filters.setGender(option?.value)}
            value={genderOptions.find((o) => o.value === filters.gender)}
            placeholder="All"
            isClearable
            formatOptionLabel={(option) => (
              <span data-testid={`select-option ${option.label}`}>
                {option.label}
              </span>
            )}
            classNames={{
              option: () => "!text-gray-900",
            }}
          />
        </div>
      </div>
    </div>
  );
}
