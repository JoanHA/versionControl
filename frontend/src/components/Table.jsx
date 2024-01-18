import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import DownloadButton from "./DownloadButton";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function Table({ data, columns,  }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFilteting] = useState("");
  const [pageSize, setPageSize] = useState(window.innerWidth);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilteting,
  });

  window.onresize = (e) => {
    setPageSize(window.innerWidth);
  };
  useEffect(() => {
    if (window.innerWidth < 1148) {
      table.setPageSize(Number(5));
    } else {
      table.setPageSize(Number(10));
    }
  }, [pageSize]);
  return (
    <div>
      <div
        className={`d-flex justify-content-between text-center gap-2  flex-wrap align-items-center `}
      >
        <div className=" d-flex flex-row  gap-2">
          <label htmlFor="">Filtrar</label>
          <input
            type="text"
            className="form-control form-control-sm rounded"
            placeholder="filtrar"
            value={filtering}
            onChange={(e) => {
              setFilteting(e.target.value);
            }}
          />
        </div>
        <div>
          {/* <DownloadButton filter={filtering} data={data} /> */}
        </div>

        <div className="d-flex justify-content-center align-items-center text-center">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            style={{
              width: "100px",
            }}
            className="p-2  form-select form-select-sm  "
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
          <button
            className="btn"
            onClick={() => {
              table.setPageIndex(0);
            }}
          >
            <BiFirstPage />
          </button>
          <button
            className="btn"
            onClick={() => {
              if (table.getCanPreviousPage()) {
                table.previousPage();
              }
            }}
          >
            <GrPrevious />
          </button>
          <span className="  ">
            <span> {table.getState().pagination.pageIndex + 1}</span>
            <span> de </span>
            <span> {table.getPageCount()}</span>
          </span>
          <button
            className="btn"
            onClick={() => {
              if (table.getCanNextPage()) {
                table.nextPage();
              }
            }}
          >
            <GrNext />
          </button>
          <button
            className="btn"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
          >
            <BiLastPage />
          </button>
        </div>
      </div>

      <div>
        <table className="table  table-striped table-hover py-3 px-4 mt-1">
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <>
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {
                            { asc: "↑", desc: "↓" }[
                              header.column.getIsSorted() ?? null
                            ]
                          }
                        </div>
                      )}
                    </th>
                  </>
                ))}

                <th colSpan={1}>Opciones</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <>
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  </>
                ))}

                <td className="" colSpan={2}>
                  <div>
                    <Link
                      to={`/document/${row.original.id}`} // this has to have the id of the row
                      className="btn btn-primary btn-sm mx-1 "
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/edit/${row.original.id}`} // this has to have the id of the row
                      className="btn btn-primary btn-sm mx-1 "
                    >
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label htmlFor="">
        <strong>Cantidad total: {data.length}</strong>{" "}
      </label>
    </div>
  );
}

export default Table;
