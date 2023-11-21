import React, { useEffect, useMemo, useState } from "react";

import {
  useFilters,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import RTableGlobalFilter from "./RTableGlobalFilter";
import ColumnFilter from "./ColumnFilter";
import AddToFavTable from "./AddToFavTable";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  addrTblData,
  addfavTblData,
  getAllTableApi,
  updateTableDataFav,
} from "../../../redux/slice/reactTable/reactTableSlice";

const RTable = () => {
  const dispatch = useDispatch();

  const [tblColumns, setTblColumns] = useState([]);

  const { tblData, rTblData, modelStatus, favStatus } = useSelector(
    (state) => state.reactTableSlice
  );
  const { me, meStatus } = useSelector((state) => state.LoginSlice);

  const handleFav = (view, row) => {
    dispatch(updateTableDataFav({ view, model: row.model }));
  };

  useEffect(() => {
    if (meStatus === "success") {
      dispatch(getAllTableApi(me.id));
    }
  }, [meStatus, me, dispatch]);

  useEffect(() => {
    if (modelStatus === "success" || favStatus === "success") {
      dispatch(getAllTableApi(me.id));
    }
  }, [modelStatus, me, favStatus, dispatch]);

  // dynamic column creation logic
  useEffect(() => {
    if (tblData.length > 0) {
      const obj = tblData[0];
      const objKeys = Object.keys(obj);

      const makeColumns = objKeys.map((col) => {
        if (col === "image") {
          let obj = {
            Header: col,
            accessor: col,
            Cell: (props) => {
              return (
                <img
                  className="rounded-md"
                  src={require(`../assets/img/car/${props.cell.value}`)}
                  alt={props.brand}
                  style={{ width: `150px`, margin: ".5em auto .3em" }}
                />
              );
            },
          };
          return obj;
        } else if (col === "status") {
          let obj = {
            Header: col,
            accessor: col,
            Cell: (props) => {
              if (props.cell.value === "In stock") {
                return (
                  <div className="text-white font-medium	 leading-8 bg-green-500 rounded-md border-green-300 flex items-center justify-center">
                    {props.cell.value}
                  </div>
                );
              } else if (props.cell.value === "Out of stock") {
                return (
                  <div className="text-white font-medium	 leading-8  bg-red-500 rounded-md border-red-300 flex items-center justify-center">
                    {props.cell.value}
                  </div>
                );
              } else if (props.cell.value === "Booked") {
                return (
                  <div className="text-white font-medium	 leading-8 bg-yellow-500 rounded-md border-yellow-300 flex items-center justify-center">
                    {props.cell.value}
                  </div>
                );
              }
            },
          };
          return obj;
        } else if (col === "favorites") {
          let obj = {
            Header: "Favorites",
            accessor: "favorites",
            Cell: (props) => {
              if (props.cell.value === "Yes") {
                return (
                  <button
                    className=" text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    onClick={() => handleFav("remove", props.cell.row.values)}
                  >
                    Remove from fav
                  </button>
                );
              } else {
                return (
                  <button
                    className=" text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    onClick={() => handleFav("add", props.cell.row.values)}
                  >
                    Add to fav
                  </button>
                );
              }
            },
          };
          return obj;
        } else {
          let obj = {
            Header: col,
            accessor: col,
            sortable: true,
          };
          return obj;
        }
      });
      setTblColumns(makeColumns);

      const filterRTableDatas = tblData.filter(
        (data) => data.favorites === "No"
      );
      dispatch(addrTblData(filterRTableDatas));

      const filterFavDatas = tblData.filter((data) => data.favorites === "Yes");
      dispatch(addfavTblData(filterFavDatas));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tblData]);

  const COLUMNS = useMemo(() => tblColumns, [tblColumns]);
  const defaultColumns = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: rTblData,
      initialState: { pageSize: 5 },
      defaultColumn: defaultColumns,
    },

    useFilters,
    useGlobalFilter,

    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="p-4">
      {tblData.length > 0 && tblColumns.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 ">
            <div className="flex items-center justify-center text-2xl font-semibold text-neutral-800 pb-3 ">
              Basic Table
            </div>
            <RTableGlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
            <table
              {...getTableProps()}
              className="w-full text-sm text-left text-gray-500 "
            >
              <thead className="text-xs text-white uppercase bor bg-gray-900">
                {headerGroups?.map((headerGroup, ind) => {
                  return (
                    <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="px-4 py-2 "
                          >
                            <div className="flex">
                              {column.render("Header")}
                              <span className="ml-2">
                                {column.isSorted ? (
                                  !column.isSortedDesc ? (
                                    <FaSortAlphaUp className="text-grey-300" />
                                  ) : (
                                    <FaSortAlphaDown className="text-grey-300" />
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>

                            <div>
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page?.map((row, ind) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={ind}
                      className="bg-white border-b dark:bg-gray-800"
                    >
                      {row.cells?.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="px-4 py-3">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-4 flex justify-center items-center">
              <span className="px-2">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | go to page:
                <input
                  type="number"
                  className="border border-black rounded mx-1"
                  defaultValue={pageIndex + 1}
                  style={{ width: "60px" }}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
              <span>
                <select
                  className="border border-black rounded mx-1"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 25, 50, 100].map((pageSize) => {
                    return (
                      <option value={pageSize} key={pageSize}>
                        Show {pageSize}
                      </option>
                    );
                  })}
                </select>
              </span>
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </button>
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <BiSolidArrowToLeft />
              </button>
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <BiSolidArrowToRight />
              </button>
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
          </div>
          {tblData.length > 0 ? (
            <>
              <AddToFavTable tblColumns={tblColumns} />
            </>
          ) : (
            ""
          )}
          <div className="m-4">
            <KanbanBoard />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RTable;
