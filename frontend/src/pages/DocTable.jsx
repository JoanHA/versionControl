import React, { useEffect, useMemo, useState } from "react";
import { getAllDocuments } from "../api/documentsAPI";
import { convertNumber } from "../lib/helper";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { downloadDocs } from "../lib/helper";
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

export default function DocTable() {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]);
  const { isAuthenticated } = useAuth();
  const columns = useMemo(
    () => [
      {
        header: "Codigo",
        footer: (props) => props.column.id,

        accessorKey: "code",
        cell: (info) => info.getValue(),
      },
      {
        header: "Nombre",
        footer: (props) => props.column.id,

        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Tipologia",
        footer: (props) => props.column.id,

        accessorKey: "typology_name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Proceso",
        footer: (props) => props.column.id,

        accessorKey: "process_name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Versión",
        footer: (props) => props.column.id,

        accessorKey: "version",
        cell: (info) => info.getValue(),
      },
      {
        header: "Ultima revisión",
        footer: (props) => props.column.id,

        accessorKey: "last_revision",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const downloadData = () => {
    const filtered = table.getFilteredRowModel().rows;
    const originalData = filtered.map((e) => e.original);
    downloadDocs(originalData);
  };

  const getdata = async () => {
    const res = await getAllDocuments();
    const CleanData = convertNumber(res.data);
    setData(CleanData);
  };
  useEffect(() => {
    getdata();
  }, []);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  const [defaultVal,setDefaultVal] = useState("")
  useEffect(()=>{
    setDefaultVal(localStorage.getItem("allfilter"))
    setGlobalFilter(defaultVal)
  },[
    defaultVal
  ])
  return (
    <div className="">
      <div className="d-flex gap-2 justify-content-between mb-2">
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="">Filtrar</label>
          {/* <DebouncedInput
            value={ localStorage.getItem("allfilter")}
            onChange={(value) => setGlobalFilter(String(value))}
            className="form-control  border border-block"
            placeholder="Filtrar todo..."
          /> */}
          <input
            type="text"
            placeholder="Filtrar todo..."
            className="form-control"
            value={defaultVal}
            onChange={(e) => {
              setDefaultVal(localStorage.setItem("allfilter", e.target.value));
              setGlobalFilter(e.target.value)
            }}
          />
        </div>
        <div>
          <button
            id="btnDownloadPDF"
            className="btn btn-dark "
            style={{ borderRadius: "0" }}
            onClick={downloadData}
          >
            DESCARGAR PDF
          </button>
        </div>
        <div className="flex  d-flex items-center gap-2 align-items-center">
          <select
            className="form-select form-select-smp-2 "
            style={{ width: "135px" }}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
          <button
            className="border rounded p-1 btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <span className="flex items-center gap-1 ">
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            className="border rounded p-1 btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>

      <div className=" table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} >
                      {header.isPlaceholder ? null : (
                        <>
                          <div style={{cursor:"pointer"}}
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: "↑",
                              desc: "↓",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
                <th>Opciones</th>
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
                  <td className="" colSpan={2}>
                    <div className="d-flex flex-wrap gap-1 ">
                      <Link
                        to={`/document/${row.original.id}`} // this has to have the id of the row
                        className="btn btn-primary btn-sm  flex-fill "
                      >
                        Ver
                      </Link>
                      {isAuthenticated && (
                        <>
                          {data[row.id].version !== "OBSOLETO" && (
                            <>
                              <Link
                                to={`/edit/${row.original.id}`}
                                className="btn btn-warning btn-sm flex-fill"
                              >
                                Editar
                              </Link>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="h-2" />

      <div>
        <strong>
          {" "}
          Cantidad total: {table.getPrePaginationRowModel().rows.length}
        </strong>{" "}
      </div>
    </div>
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border  rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border  rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border  rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      style={{ maxWidth: "120px" }}
      onChange={(e) => {
        localStorage.setItem("allfilter", e.target.value);
        setValue(e.target.value);
      }}
    />
  );
}
