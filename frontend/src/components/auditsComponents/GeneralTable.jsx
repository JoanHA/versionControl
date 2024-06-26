import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiLastPage, BiFirstPage } from "react-icons/bi";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useAuth } from "../../context/AuthContext";

function GeneralTable({
  data,
  columns,
  options = true,
  editType,
  justView = false,
  cb = null,
}) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFilteting] = useState("");
  const [pageSize, setPageSize] = useState(window.innerWidth);

  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");

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
  const { isAuthenticated, user } = useAuth();
  //Ajustar la cantidad de datos con respecto al tamaño de la pantalla

  const saveFilter = (e) => {
    const valor = e.target.value;
    sessionStorage.setItem("filtering", valor);
  };

  useEffect(() => {
    const value = sessionStorage.getItem("filtering");
    setFilteting(value);
    console.log(data)
  }, []);

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
              saveFilter(e);
            }}
          />
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
                  <th
                    onDoubleClick={header.column.getToggleSortingHandler()}
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                        cursor: "pointer",
                      },
                    }}
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
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              table.options.columnResizeDirection
                            } ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`,
                            style: {
                              transform:
                                columnResizeMode === "onChange" &&
                                header.column.getIsResizing()
                                  ? `translateX(${
                                      (table.options.columnResizeDirection ===
                                      "rtl"
                                        ? -1
                                        : 1) *
                                      (table.getState().columnSizingInfo
                                        .deltaOffset ?? 0)
                                    }px)`
                                  : "",
                            },
                          }}
                        ></div>
                      </div>
                    )}
                  </th>
                ))}
                {options && (
                  <th colSpan={1} style={{ width: "70px" }}>
                    Opciones
                  </th>
                )}
                {justView && (
                  <th colSpan={1} style={{ width: "70px" }}>
                    Ver plan
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-center"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {justView && (
                  <>
                    <td className="" colSpan={2}>
                      <div className="d-flex flex-wrap gap-1 mb-1 ">
                        <Link
                          to={`/${editType ? editType : ""}/${
                            row.original.audit_plan
                          }`}
                          className="btn btn-secondary btn-sm  flex-fill "
                        >
                          Ver Plan
                        </Link>
                      </div>
                      <div className="d-flex flex-wrap gap-1 ">
                        <Link
                          to={`/audits/finalReports/${row.original.final_id}`}
                          className="btn btn-primary btn-sm  flex-fill "
                        >
                          Ver informe
                        </Link>
                      </div>
                    </td>
                  </>
                )}
                {options && (
                  <>
                    <td className="" colSpan={2}>
                      <div className="d-flex flex-wrap gap-1 ">
                        <Link
                          to={`/${editType ? editType : "view"}/${
                            row.original.id
                          }`}
                          className="btn btn-primary btn-sm  flex-fill "
                        >
                          Ver
                        </Link>
                        {isAuthenticated && (
                          <>
                            {data[row.id].version !== "OBSOLETO" && (
                              <>
                                <Link
                                  to={`/${editType ? editType : "edit"}/${
                                    row.original.id
                                  }`} // this has to have the id of the row
                                  className="btn btn-primary btn-sm flex-fill"
                                >
                                  Editar
                                </Link>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label htmlFor="">
        <strong>
          Cantidad total: {table.getPrePaginationRowModel().rows.length}
        </strong>{" "}
      </label>
    </div>
  );
}

export default GeneralTable;
