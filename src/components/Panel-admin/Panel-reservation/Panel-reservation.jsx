/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSort } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "react-datepicker/dist/react-datepicker.css";
//import { getReservations } from "../../../../api";

const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const PanelReservation = ({ searchTerm, filter, startDate, endDate }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 10;

  //  useEffect(() => {
  //   const getData = async (apiUrl) => {
  //   try {
  //   const response = await fetch(apiUrl);
  // const data = await response.json(); // Parseamos la respuesta del servidor
  //if (!response.ok) {
  //throw new Error(
  // data.message || `Error al guardar en el servidor la data: ${data}`
  //);
  // }
  //return data;
  // } catch (error) {
  // console.error("Error al enviar la data:", error);
  //throw error; // Lanzamos el error para que sea manejado en el componente
  // }
  //};

  // getData();
  //}, []);

  const reservations = [
    {
      id: 1,
      documentTypeClient: "RUT",
      documentNumberClient: "14790916-0",
      nameClient: "Maria Sol Gordo",
      countryOfResidence: "Chile",
      phoneClient: "+56956102829",
      emailClient: "maria.sol.gordo@hotmail.com",
      checkinDate: new Date(2025, 1, 3),
      checkoutDate: new Date(2025, 1, 5),
      statusReservation: "Completada",
      totalPrice: 250_000,
      notes: "Precios son más bajos, porque los precios subieron el 06/02",
      detailCabins: [
        {
          cabin: 100,
          qty: 2,
          adults: 2,
          children: 0,
          mainGuest: "Daniel Jimenez",
          datesHotTub: [new Date(2025, 1, 3), new Date(2025, 1, 4)],
          priceCabin: 160_000, //precio mas bajo porque es antiguo (80.000 por noche, en vez de 91.900)
          priceHotTub: 90_000, //45.000 * 2 usos de tinaja
        },
      ],
    },
    {
      id: 2,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "11527374-P",
      nameClient: "Abderrahim Miranda",
      countryOfResidence: "País Vasco",
      phoneClient: "+9454827499",
      emailClient: "abderrahim.miranda@hotmail.com",
      checkinDate: new Date(2025, 1, 6),
      checkoutDate: new Date(2025, 1, 8),
      statusReservation: "Completada",
      totalPrice: 228_800,
      notes: "",
      detailCabins: [
        {
          cabin: 102,
          reservation: 2,
          adults: 2,
          children: 0,
          mainGuest: "Hector Mendoza",
          datesHotTub: [new Date(2025, 1, 6)],
          priceCabin: 183_800,
          priceHotTub: 60_000,
        },
      ],
    },
    {
      id: 3,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "44628399-P",
      nameClient: "Jose Pablo Marcos",
      countryOfResidence: "Uruguay",
      phoneClient: "+59839462754",
      emailClient: "jose.pablo.marcos@hotmail.com",
      checkinDate: new Date(2025, 1, 6),
      checkoutDate: new Date(2025, 1, 13),
      statusReservation: "Confirmada",
      totalPrice: 643_300,
      notes: "",
      detailCabins: [
        {
          cabin: 101,
          reservation: 3,
          adults: 2,
          children: 0,
          mainGuest: "Juan Ruiz",
          datesHotTub: [],
          priceCabin: 643_300,
          priceHotTub: 0,
        },
      ],
    },
    {
      id: 4,
      documentTypeClient: "RUT",
      documentNumberClient: "12329970-1",
      nameClient: "Lorena Bustamante",
      countryOfResidence: "Chile",
      phoneClient: "+56956102829",
      emailClient: "lorena.bustamante@hotmail.com",
      checkinDate: new Date(2025, 1, 17),
      checkoutDate: new Date(2025, 1, 19),
      statusReservation: "Confirmada",
      totalPrice: 273_800,
      notes: "",
      detailCabins: [
        {
          cabin: 102,
          reservation: 4,
          adults: 1,
          children: 1,
          mainGuest: "Patricio Mena",
          datesHotTub: [new Date(2025, 1, 11), new Date(2025, 1, 12)],
          priceCabin: 183_800,
          priceHotTub: 90_000,
        },
      ],
    },
    {
      id: 5,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "93746154-L",
      nameClient: "Gaizka Molero",
      countryOfResidence: "España",
      phoneClient: "+349A8242552",
      emailClient: "gaizka.molero@hotmail.com",
      checkinDate: new Date(2025, 1, 10),
      checkoutDate: new Date(2025, 1, 14),
      statusReservation: "Confirmada",
      totalPrice: 367_600,
      notes: "",
      detailCabins: [
        {
          cabin: 103,
          reservation: 5,
          adults: 1,
          children: 1,
          mainGuest: "Luis Cardenas",
          datesHotTub: [],
          priceCabin: 367_600,
          priceHotTub: 0,
        },
      ],
    },
    {
      id: 6,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "02916749-L",
      nameClient: "Salma Cobo",
      countryOfResidence: "España",
      phoneClient: "+349A9313425",
      emailClient: "salma.cobo@hotmail.com",
      checkinDate: new Date(2025, 1, 10),
      checkoutDate: new Date(2025, 1, 13),
      statusReservation: "Confirmada",
      totalPrice: 542_700,
      notes: "",
      detailCabins: [
        {
          cabin: 201,
          reservation: 6,
          adults: 2,
          children: 2,
          mainGuest: "Ruben Jimenez",
          datesHotTub: [new Date(2025, 1, 10)],
          priceCabin: 482_700,
          priceHotTub: 60_000,
        },
      ],
    },
    {
      id: 7,
      documentTypeClient: "RUT",
      documentNumberClient: "18592325-8",
      nameClient: "Bernat Freire",
      countryOfResidence: "Chile",
      phoneClient: "+56956102829",
      emailClient: "bernat.freire@hotmail.com",
      checkinDate: new Date(2025, 1, 11),
      checkoutDate: new Date(2025, 1, 14),
      statusReservation: "Confirmada",
      totalPrice: 1_508_100,
      notes: "",
      detailCabins: [
        {
          cabin: 202,
          reservation: 7,
          adults: 3,
          children: 1,
          mainGuest: "Alexander Perez",
          datesHotTub: [new Date(2025, 1, 11)],
          priceCabin: 482_700,
          priceHotTub: 60_000,
        },
        {
          cabin: 203,
          reservation: 7,
          adults: 3,
          children: 1,
          mainGuest: "Ximena Navarrete",
          datesHotTub: [],
          priceCabin: 482_700,
          priceHotTub: 0,
        },
        {
          cabin: 204,
          reservation: 7,
          adults: 2,
          children: 2,
          mainGuest: "Dayana Escuadro",
          datesHotTub: [],
          priceCabin: 482_700,
          priceHotTub: 0,
        },
      ],
    },
    {
      id: 8,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "12345678-L",
      nameClient: "Yanzhen Lou",
      countryOfResidence: "China",
      phoneClient: "130-8462-4710",
      emailClient: "yanzhen.lou@hotmail.com",
      checkinDate: new Date(2025, 1, 11),
      checkoutDate: new Date(2025, 1, 16),
      statusReservation: "Confirmada",
      totalPrice: 984_500,
      notes: "",
      detailCabins: [
        {
          cabin: 205,
          reservation: 8,
          adults: 4,
          children: 0,
          mainGuest: "Mathew Cyr",
          datesHotTub: [
            new Date(2025, 1, 11),
            new Date(2025, 1, 12),
            new Date(2025, 1, 15),
          ],
          priceCabin: 804_500,
          priceHotTub: 180_000,
        },
      ],
    },
    {
      id: 9,
      documentTypeClient: "Pasaporte",
      documentNumberClient: "84027563-L",
      nameClient: "Jere Lawson",
      countryOfResidence: "EEUU",
      phoneClient: "+1(408) 453-2425",
      emailClient: "jere.lawson123@hotmail.com",
      checkinDate: new Date(2025, 1, 9),
      checkoutDate: new Date(2025, 1, 13),
      statusReservation: "Confirmada",
      totalPrice: 1_467_200,
      notes: "",
      detailCabins: [
        {
          cabin: 206,
          reservation: 9,
          adults: 4,
          children: 0,
          mainGuest: "Mandy Scott",
          datesHotTub: [new Date(2025, 1, 9), new Date(2025, 1, 12)],
          priceCabin: 643_600,
          priceHotTub: 120_000,
        },
        {
          cabin: 207,
          reservation: 9,
          adults: 2,
          children: 2,
          mainGuest: "Billy Mandy",
          datesHotTub: [new Date(2025, 1, 12)],
          priceCabin: 643_600,
          priceHotTub: 60_000,
        },
      ],
    },
    {
      id: 10,
      documentTypeClient: "RUT",
      documentNumberClient: "24018888-0",
      nameClient: "Mario Cespedes",
      countryOfResidence: "Chile",
      phoneClient: "+56956102829",
      emailClient: "mario.cespedes.corto@hotmail.com",
      checkinDate: new Date(2025, 1, 10),
      checkoutDate: new Date(2025, 1, 13),
      statusReservation: "Confirmada",
      totalPrice: 965_400,
      notes: "",
      detailCabins: [
        {
          cabin: 208,
          reservation: 10,
          adults: 4,
          children: 0,
          mainGuest: "Patrick Liu",
          datesHotTub: [],
          priceCabin: 482_700,
          priceHotTub: 0,
        },
        {
          cabin: 209,
          reservation: 10,
          adults: 3,
          children: 0,
          mainGuest: "Ho Chi Min",
          datesHotTub: [],
          priceCabin: 482_700,
          priceHotTub: 0,
        },
      ],
    },
    {
      id: 11,
      documentTypeClient: "RUT",
      documentNumberClient: "14790916-0",
      nameClient: "Angela Maria Santos",
      countryOfResidence: "Chile",
      phoneClient: "+56956102829",
      emailClient: "angel.mari.santo@hotmail.com",
      checkinDate: new Date(2025, 1, 8),
      checkoutDate: new Date(2025, 1, 14),
      statusReservation: "Confirmada",
      totalPrice: 1_726_800,
      notes: "",
      detailCabins: [
        {
          cabin: 210,
          reservation: 11,
          adults: 2,
          children: 2,
          mainGuest: "Sayid Mohammed",
          datesHotTub: [new Date(2025, 1, 8), new Date(2025, 1, 13)],
          priceCabin: 965_400,
          priceHotTub: 120_000,
        },
        {
          cabin: 102,
          reservation: 11,
          adults: 2,
          children: 0,
          mainGuest: "Doña Florinda",
          datesHotTub: [new Date(2025, 1, 8), new Date(2025, 1, 13)],
          priceCabin: 551_400,
          priceHotTub: 90_000,
        },
      ],
    },
  ];

  const handleSort = (column) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const filteredReservations = reservations
    .filter((res) =>
      filter === "all"
        ? true
        : res.statusReservation.toLowerCase() === filter.toLowerCase()
    )
    .filter((res) =>
      res.nameClient.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((res) => {
      if (!startDate || !endDate) return true;
      const checkInDate = new Date(res.checkinDate);
      return checkInDate >= startDate && checkInDate <= endDate;
    });

  const getSortedReservations = () => {
    if (!sortColumn) return filteredReservations;
    return [...filteredReservations].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === "checkinDate" || sortColumn === "checkoutDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedReservations = getSortedReservations();
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = sortedReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedReservations.length / reservationsPerPage);

  // 2. Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Reservas", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["Huésped", "ID", "Cabaña", "Check-In", "Check-Out", "Estado"]],
      body: reservations.map((res) => [
        res.nameClient,
        res.id,
        res.detailCabins[0].cabin,
        formatDate(res.checkinDate),
        formatDate(res.checkoutDate),
        res.statusReservation,
      ]),
    });

    doc.save("Historial_Reservas.pdf");
  };

  return (
    <section className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped w-100">
          <thead className="table-success">
            <tr>
              <th onClick={() => handleSort("nameClient")}>
                Huésped <FaSort />
              </th>
              <th onClick={() => handleSort("id")}>
                ID <FaSort />
              </th>
              <th onClick={() => handleSort("detailCabins[0].cabin")}>
                Cabaña <FaSort />
              </th>
              <th onClick={() => handleSort("checkinDate")}>
                Check-In <FaSort />
              </th>
              <th onClick={() => handleSort("checkoutDate")}>
                Check-Out <FaSort />
              </th>
              <th onClick={() => handleSort("statusReservation")}>
                Estado <FaSort />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentReservations.map((res, index) => (
              <tr key={index}>
                <td>{res.nameClient}</td>
                <td>{res.id}</td>
                <td>{res.detailCabins[0].cabin}</td>
                <td>{formatDate(res.checkinDate)}</td>
                <td>{formatDate(res.checkoutDate)}</td>
                <td>
                  <span
                    className={`badge ${
                      res.statusReservation === "Pendiente"
                        ? "bg-warning"
                        : res.statusReservation === "Confirmada"
                        ? "bg-success"
                        : res.statusReservation === "Completada"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                  >
                    {res.statusReservation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de exportar PDF */}
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary text-white" onClick={exportToPDF}>
          Exportar PDF
        </button>
      </div>
    </section>
  );
};

export default PanelReservation;
