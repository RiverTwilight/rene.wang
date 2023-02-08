function parseDate(dateString): Date {
	const dateArray = dateString.split("/");
	const year = parseInt(dateArray[0]);
	const month = parseInt(dateArray[1]) - 1;
	const day = parseInt(dateArray[2]);
	return new Date(year, month, day);
}

export default parseDate;
