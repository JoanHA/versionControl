import { useEffect, useState } from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/Calendar/styles/index.css";
import es_ES from "rsuite/locales/es_ES";
import { getProgramFields } from "../../api/AuditAPI/auditProgramsAPI";

const Calendars = {
  sunday: "Do",
  monday: "Lu",
  tuesday: "Ma",
  wednesday: "Mi",
  thursday: "Ju",
  friday: "Vi",
  saturday: "Sa",
  ok: "OK",
  today: "Hoy",
  yesterday: "Ayer",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: "MMM yyyy",
  formattedDayPattern: "dd MMM yyyy",
  dateLocale: es_ES,
};

const locale = {
  common: {
    loading: "Cargando...",
    emptyMessage: "No data found",
  },
  Plaintext: {
    unfilled: "Unfilled",
    notSelected: "Not selected",
    notUploaded: "Not uploaded",
  },
  Pagination: {
    more: "Mas",
    prev: "Previo",
    next: "Siguiente",
    first: "Primero",
    last: "Ultimo",
    limit: "{0} / pagina",
    total: "Total Rows: {0}",
    skip: "Go to{0}",
  },
  Calendar,
  DatePicker: {
    ...Calendars,
  },
  DateRangePicker: {
    ...Calendars,
    last7Days: "Last 7 Days",
  },
  Picker: {
    noResultsText: "No results found",
    placeholder: "Select",
    searchPlaceholder: "Search",
    checkAll: "All",
  },
  InputPicker: {
    newItem: "New item",
    createOption: 'Create option "{0}"',
  },
  Uploader: {
    inited: "Initial",
    progress: "Uploading",
    error: "Error",
    complete: "Finished",
    emptyFile: "Empty",
    upload: "Upload",
  },
  CloseButton: {
    closeLabel: "Close",
  },
  Breadcrumb: {
    expandText: "Show path",
  },
  Toggle: {
    on: "Open",
    off: "Close",
  },
};

export const App = ({ onChange }) => {
  const [dates, setDates] = useState([]);
  const getData = async () => {
    try {
      const res = await getProgramFields();
      const fechas = res.data.map((e) => {
        return new Date(e.date).toISOString().split("T")[0];
      });

      setDates(fechas);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  function renderCell(date) {
    const current = new Date(date).toISOString().split("T")[0];
    var isFound = false;
    dates.forEach((d) => {
      if (d === current) return (isFound = true);
    });
    if (isFound) {
      return (
        <span
          className="px-2 rounded-circle "
          style={{ backgroundColor: " #f80000 ", color: "#f80000" }}
        >
          .
        </span>
      );
    }
  }

  return (
    <>
      <style>
        {`
        .rs-badge-content, .rs-badge-independent {
            background-color: #f44336;
            background-color: var(--rs-badge-bg);
            border-radius: 8px;
            color: #fff;
            color: var(--rs-badge-text);
            font-size: 12px;
            line-height: 16px;
            padding: 0 5px;
        }
      .bg-gray {
        background-color: rgba(242, 242, 242, 0.5);
      }
      .rs-calendar-bordered .rs-calendar-table-row:not(:last-child) .rs-calendar-table-cell, .rs-calendar-bordered .rs-calendar-table-header-row .rs-calendar-table-header-cell {
        border-bottom: 1px solid #f2f2f5;
      
    }
     .rs-calendar-table-cell:hover{
        
        background-color: lightgray

     }
    .rs-calendar-month-dropdown-row-wrapper{
        background-color: #fff
    }
    .rs-calendar-btn-close{
        background-color: #777;
        border-radius:20px

    }
    .rs-calendar-bordered .rs-calendar-table {
        border: 1px solid #e5e5ea;
        border-radius: 6px;
    }
    .rs-calendar-table-cell-content:hover{
        background-color: #e5e5ea;
        
    }
      `}
      </style>

      <Calendar
        compact
        style={{ width: "560px" }}
        bordered
        onChange={onChange}
        locale={locale}
        cellClassName={(date) => (date.getDay() % 2 ? "bg-gray" : undefined)}
        renderCell={renderCell}
      />
    </>
  );
};
