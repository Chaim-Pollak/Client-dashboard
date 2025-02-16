import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

function ProfessionSelectBox({ handleChange, id, value }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get_professions"],
    queryFn: async () => await axios.get("/professions/getAllProfessions"),
    select: (data) => data.data.data,
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error}</div>}
      <select
        id={id}
        name={id}
        className="w-full rounded-xl border-2
         border-amber-200 bg-amber-50 py-2 px-3 
         focus:outline-none focus:ring-2 focus:ring-amber-500
          focus:border-amber-500"
        onChange={handleChange}
        value={!value ? "" : value}
      >
        <option value={"all"}>Choose Permission</option>

        {data?.map((profession) => (
          <option key={profession._id} value={profession._id}>
            {profession.profession_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProfessionSelectBox;
