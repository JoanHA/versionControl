import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function ProcessTable({ data, columns, edit,name }) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Provide our updateData function to our table meta
  });

  return (
    <div className="p-2 mt-2">
      <table className="table table-striped table-hover ">
        <thead className="table-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <>
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  </>
                );
              })}
              <th className="text-center">Opciones</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
                <td className="" style={{width:"130px"}}>
                  <Link to={`/audits/${edit? edit: "programs"}/${row.original.id}`}>
                  <button className="btn btn-primary btn-sm w-100 fw-bold">
                    {name ? name : "Ver Programa"}
                  </button>
                  </Link>
                 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
