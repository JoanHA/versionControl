import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import DownloadButton from "./DownloadButton";
import ChangeDetails from "../pages/changes/ChangeDetails";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Archived from "../pages/control/Archived";
import { useAuth } from "../context/AuthContext";
import { deleteChanges, deleteControls } from "../api/changes";
import DownloadFile from "./auditsComponents/DownloadFile";
function  Table({
  data,
  columns,
  options = true,
  btnDetails,
  details = false,
  editType,
  cb = null,
  download,
}) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFilteting] = useState(" ");
  const [pageSize, setPageSize] = useState(window.innerWidth);
  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState("ltr");
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const rerender = React.useReducer(() => ({}), {})[1];
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
  window.onresize = (e) => {
    setPageSize(window.innerWidth);
  };
  const saveFilter = (e) => {
    const valor = e.target.value;
    sessionStorage.setItem("filtering", valor);
  };

  useEffect(() => {
    const value = sessionStorage.getItem("filtering");
    setFilteting(value);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1148) {
      table.setPageSize(Number(5));
    } else {
      table.setPageSize(Number(10));
    }
  }, [pageSize]);
  const deleteChange = (id) => {
    Swal.fire({
      title: "Estas seguro de esta acción?",
      text: "No serás capaz de revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, hazlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteChanges(id);

          swal.fire(res.data, "", "success").then(() => {
            cb();
          });
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  const deleteControl = (id) => {
    Swal.fire({
      title: "Estas seguro de esta acción?",
      text: "No serás capaz de revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, hazlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteControls(id);
          swal.fire(res.data, "", "success").then(() => {
            cb();
          });
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };

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
            defaultValue={filtering? filtering:""}
            onChange={(e) => {
              setFilteting(e.target.value);
              saveFilter(e);
            }}
          />
        </div>
        <div>{/* <DownloadButton filter={filtering} data={data} /> */}</div>

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
          type="button"
          
            className="btn"
            onClick={() => {
              table.setPageIndex(0);
            }}
          >
            <BiFirstPage />
          </button>
          <button
          type="button"
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
          type="button"
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
          type="button"
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
                        cursor:"pointer"
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div  >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {
                          { asc: "↑", desc: "↓" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                        <div {...{
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
                      }}></div>
                      
                      </div>
                    )}
                  </th>
                ))}
                {options && (
                  <th colSpan={1} style={{width:"70px"}}>
                    Opciones
                  </th>
                )}
                {editType && (
                  <th colSpan={1} style={{width:"70px"}}>
                    Opciones
                  </th>
                )}
                {btnDetails && (
                  <th colSpan={1} style={{width:"70px"}}>
                    Detalles
                  </th>
                )}
                {details && (
                  <th colSpan={1} style={{width:"70px"}}>
                  Detalles
                </th>
                )}
                {
                  download && (
                    <th colSpan={1} style={{width:"70px"} }className='text-center'>
                    Descargar
                  </th>
                  )
                }
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center"  style= {{
                    width: cell.column.getSize()
                  }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {editType && (
                  <>
                    <td className="text-center" colSpan={2}>
                      <div className="d-flex flex-wrap gap-1 text-center ">
                        <Link
                          to={`/${editType ? editType : "edit"}/${
                            row.original.id
                          }`} // this has to have the id of the row
                          className="btn btn-primary btn-sm flex-fill"
                        >
                          Editar
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

                {
                  download && (
                    <DownloadFile file ={download} index={row.id}/>
                  )
                }
                {btnDetails && (
                  <>
                    <td>
                      <div className="d-flex flex-wrap align-items-center justify-content-center gap-1">
                        <Archived
                          doc={btnDetails.doc[row.id]}
                          text={btnDetails.text}
                          external={btnDetails.external}
                        ></Archived>
                        {user?.rol === 1 && isAuthenticated ? (
                          <button
                          type="button"
                            className="btn btn-danger btn-sm mt-2 "
                            onClick={() => {
                              deleteControl(row.original.id);
                            }}
                          >
                            Eliminar
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </>
                )}
                {details && (
                  <>
                    <td className="">
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <ChangeDetails infor={data[row.id]}></ChangeDetails>
                        {user?.rol === 1 && isAuthenticated ? (
                          <button
                          type="button"
                            className="btn btn-danger btn-sm mt-1"
                            onClick={() => {
                              deleteChange(row.original.id);
                            }}
                          >
                            Eliminar
                          </button>
                        ) : (
                          ""
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

export default Table;
