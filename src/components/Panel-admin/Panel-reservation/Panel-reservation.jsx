import { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import PanelHeader from "../Panel-header/Panel-header";
import { getReservations } from "../../../../api";
import { Modal, Button } from "react-bootstrap";
import { formatToChileanDateShort } from "../../../scripts/utils"

const formatDate = (date) => {
	if (!(date instanceof Date)) {
		date = new Date(date);
	}
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${day}-${month}-${year}`;
};

const PanelReservation = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("all");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [sortColumn, setSortColumn] = useState(null);
	const [sortDirection, setSortDirection] = useState("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [reservations, setReservations] = useState([]);
	const [sortedReservations, setSortedReservations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filteredReservations, setFilteredReservations] = useState([]);
	const [currentReservations, setCurrentReservations] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	
	// New state for handling the detail modal
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [selectedReservation, setSelectedReservation] = useState(null);

	const reservationsPerPage = 10;

	const getQtyCabins = (cabinType, cabinList) => {
		let count = 0;
		for (const cabin of cabinList){
			if (cabin.typeName === cabinType) count++
		}
		return count
	}

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				setLoading(true);
				let { reservations }  = await getReservations();
				reservations = reservations.map((reservation) => {return {...reservation, "Tiny Cabin": getQtyCabins("Tiny Cabin", reservation.reservationCabins), "Couple Room": getQtyCabins("Couple Room", reservation.reservationCabins)}})
				setReservations(reservations);
				// console.log("Fetched reservations:", reservations);
				setError(null);
			} catch (err) {
				setError(err.message);
				// console.error("Error al obtener las reservas:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchReservations();
	}, []);

	useEffect(() => {
		if (!loading && reservations.length > 0) {
			// console.log("Filtering reservations. Current filters:", { filter, searchTerm, startDate, endDate });
			
			const newFilteredReservations = reservations
				.filter((res) => (filter === "all" ? true : res.statusReservation.toLowerCase() === filter.toLowerCase()))
				.filter((res) => res.nameClient.toLowerCase().includes(searchTerm.toLowerCase()))
				.filter((res) => {
					if (!startDate || !endDate) return true; // Don't filter by date if either date is not set
					const checkInDate = new Date(res.checkinDate);
					return checkInDate >= startDate && checkInDate <= endDate;
				});
			
			// console.log("Filtered reservations:", newFilteredReservations.length);
			setFilteredReservations(newFilteredReservations);
			
			// Reset to first page when filters change
			setCurrentPage(1);
		} else if (!loading) {
			// If we have no reservations but we're not loading, set filtered to empty array
			setFilteredReservations([]);
		}
	}, [reservations, startDate, endDate, filter, searchTerm, loading]);

	useEffect(() => {
		const getSortedReservations = () => {
			if (!sortColumn || !filteredReservations.length) return filteredReservations;
			return [...filteredReservations].sort((a, b) => {
				let aValue, bValue;
				
				// Handle nested properties
				if (sortColumn.includes('.') || sortColumn.includes('[')) {
					const parts = sortColumn.split(/[\.\[\]]+/).filter(Boolean);
					aValue = a;
					bValue = b;
					
					for (const part of parts) {
						aValue = aValue && typeof aValue === 'object' ? aValue[part] : undefined;
						bValue = bValue && typeof bValue === 'object' ? bValue[part] : undefined;
					}
				} else {
					aValue = a[sortColumn];
					bValue = b[sortColumn];
				}
				
				if (sortColumn === "checkinDate" || sortColumn === "checkoutDate") {
					aValue = aValue ? new Date(aValue) : new Date(0);
					bValue = bValue ? new Date(bValue) : new Date(0);
				}
				
				if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
				if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
				return 0;
			});
		};
		
		if (!loading) {
			const newSortedReservations = getSortedReservations();
			// console.log("Sorted reservations:", newSortedReservations.length);
			setSortedReservations(newSortedReservations);
			setTotalPages(Math.max(1, Math.ceil(newSortedReservations.length / reservationsPerPage)));
		}
	}, [filteredReservations, sortColumn, sortDirection, loading]);

	useEffect(() => {
		if (!loading) {
			const indexOfLastReservation = currentPage * reservationsPerPage;
			const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
			const newCurrentReservations = sortedReservations.slice(indexOfFirstReservation, indexOfLastReservation);
			// console.log("Current page reservations:", newCurrentReservations.length);
			setCurrentReservations(newCurrentReservations);
		}
	}, [currentPage, sortedReservations, loading]);

	const handleSort = (column) => {
		const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
		setSortColumn(column);
		setSortDirection(newDirection);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.text("Historial de Reservas", 14, 15);

		autoTable(doc, {
			startY: 20,
			head: [["Huésped", "ID", "Cabaña", "Check-In", "Check-Out", "Estado"]],
			body: reservations.map((res) => [
				res.nameClient, 
				res.id, 
				res.detailCabins && res.detailCabins[0] ? res.detailCabins[0].cabin : 'N/A', 
				formatDate(res.checkinDate), 
				formatDate(res.checkoutDate), 
				res.statusReservation
			]),
		});

		doc.save("Historial_Reservas.pdf");
	};

	// Function to handle showing reservation detail
	const handleShowDetail = (reservation) => {
		setSelectedReservation(reservation);
		setShowDetailModal(true);
	};

	// Function to close the detail modal
	const handleCloseDetail = () => {
		setShowDetailModal(false);
		setSelectedReservation(null);
	};

	return loading ? (
		<section className="container-fluid mt-4">
			<div className="spinner-border text-primary" role="status"></div>
			<span>Cargando...</span>
		</section>
	) : (
		<section className="container-fluid mt-4">
			<PanelHeader 
				searchTerm={searchTerm} 
				setSearchTerm={setSearchTerm} 
				filter={filter} 
				setFilter={setFilter} 
				setStartDate={setStartDate} 
				setEndDate={setEndDate} 
				startDate={startDate} 
				endDate={endDate} 
			/>

			{error && (
				<div className="alert alert-danger" role="alert">
					Error: {error}
				</div>
			)}

			{!error && sortedReservations.length === 0 ? (
				<div className="alert alert-info" role="alert">
					No se encontraron reservas con los criterios de búsqueda.
				</div>
			) : (
				<>
					<div className="table-responsive">
						<table className="table table-hover table-striped w-100">
							<thead className="table-success">
								<tr>
									<th onClick={() => handleSort("numReservation")}>
										Num <FaSort />
									</th>
									<th onClick={() => handleSort("nameClient")}>
										Cliente <FaSort />
									</th>
									<th onClick={() => handleSort("Tiny Cabin")}>
										Cabañas reservadas <FaSort />
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
									<th>
										Detalle
									</th>
								</tr>
							</thead>
							<tbody>
								{currentReservations && currentReservations.map((res, index) => (
									<tr key={index}>
										<td>{res.numReservation}</td>
										<td>{res.nameClient}</td>
										<td>{`Tiny C.: ${res["Tiny Cabin"]} | Couple R.: ${res["Couple Room"]}`}</td>
										<td>{formatDate(res.checkinDate)}</td>
										<td>{formatDate(res.checkoutDate)}</td>
										<td>
											<span className={`badge ${
												res.statusReservation === "Pendiente" 
													? "bg-warning" 
													: res.statusReservation === "Confirmada" 
														? "bg-success" 
														: res.statusReservation === "Completada" 
															? "bg-secondary" 
															: "bg-danger"
											}`}>
												{res.statusReservation}
											</span>
										</td>
										<td>
											<Button 
												variant="primary" 
												size="sm" 
												onClick={() => handleShowDetail(res)}
											>
												Ver Detalle
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<nav>
						<ul className="pagination justify-content-center">
							{Array.from({ length: totalPages }, (_, index) => (
								<li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
									<button className="page-link" onClick={() => paginate(index + 1)}>
										{index + 1}
									</button>
								</li>
							))}
						</ul>
					</nav>

					<div className="d-flex justify-content-end mt-3">
						<button className="btn btn-primary text-white" onClick={exportToPDF}>
							Exportar PDF
						</button>
					</div>

					{/* Detail Modal */}
					<Modal show={showDetailModal} onHide={handleCloseDetail} size="lg">
						<Modal.Header closeButton>
							<Modal.Title>
								Detalle de Reserva #{selectedReservation?.numReservation}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{selectedReservation && (
								<div>
									<h5>Información de Cliente</h5>
									<div className="row mb-3">
										<div className="col-md-6">
											<p><strong>Nombre:</strong> {selectedReservation.nameClient}</p>
											<p><strong>Documento:</strong> {selectedReservation.documentTypeClient} {selectedReservation.documentNumberClient}</p>
											<p><strong>País:</strong> {selectedReservation.countryOfResidence}</p>
										</div>
										<div className="col-md-6">
											<p><strong>Teléfono:</strong> {selectedReservation.phoneClient}</p>
											<p><strong>Email:</strong> {selectedReservation.emailClient}</p>
											<p><strong>Precio Total:</strong> ${selectedReservation.totalPrice.toLocaleString()}</p>
										</div>
									</div>

									<h5>Cabañas Reservadas</h5>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead className="table-light">
												<tr>
													<th>Cabaña</th>
													<th>Tipo</th>
													<th>Huésped Principal</th>
													<th>Adultos</th>
													<th>Niños</th>
													<th>Precio</th>
													<th>Tinaja</th>
													<th>Fechas Tinaja</th>
												</tr>
											</thead>
											<tbody>
												{selectedReservation.reservationCabins.map((cabin, idx) => (
													<tr key={idx}>
														<td>{cabin.number}</td>
														<td>{cabin.typeName}</td>
														<td>{cabin.mainGuest}</td>
														<td>{cabin.adults}</td>
														<td>{cabin.childrens}</td>
														<td>${cabin.priceCabin.toLocaleString()}</td>
														<td>
															{cabin.datesHotTub && cabin.datesHotTub.length > 0 ? (
																<>
																	<span className="badge bg-success me-2">Sí</span>
																	${cabin.priceHotTub.toLocaleString()}
																</>
															) : (
																<span className="badge bg-secondary">No</span>
															)}
														</td>
                            <td>{cabin.datesHotTub.map((date) => {
                              return formatToChileanDateShort(date)
                            }).join(", ")}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{selectedReservation.notes && (
										<>
											<h5>Notas</h5>
											<div className="alert alert-info">
												{selectedReservation.notes}
											</div>
										</>
									)}
								</div>
							)}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseDetail}>
								Cerrar
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</section>
	);
};

export default PanelReservation;